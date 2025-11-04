function tryParseJson(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
}

function formatSummary(text, type) {
  let formatted = '';

  if (type === 'bullets') {
    const points = text.split('\n').filter(line => line.trim());
    formatted += '<div class="summary-section">';
    points.forEach(point => {
      let cleanPoint = point.trim().replace(/^[•\-\*]\s*/, '');
      cleanPoint = cleanPoint
        .replace(/"([^"]+)"/g, '"<span class="important-text">$1</span>"')
        .replace(/([A-Za-z\s]+):/g, '<span class="important-text">$1</span>:')
        .replace(/(\d+(?:\.\d+)?(?:\s*%)?)/g, '<span class="important-text">$1</span>')
        .replace(/\b(key|main|important|significant|crucial|essential)\b/gi, '<span class="important-text">$1</span>');
      formatted += `<div class="bullet-point">${cleanPoint}</div>`;
    });
    formatted += '</div>';
  } else {
    const paragraphs = text.split('\n\n').filter(para => para.trim());
    paragraphs.forEach(para => {
      const formattedPara = para
        .replace(/"([^"]+)"/g, '"<span class="important-text">$1</span>"')
        .replace(/([^.!?]+(?:key|main|important|significant|crucial|essential)[^.!?]+[.!?])/gi, 
          '<span class="important-text">$1</span>')
        .replace(/([A-Za-z\s]+):/g, '<span class="important-text">$1</span>:')
        .replace(/(\d+(?:\.\d+)?(?:\s*%)?)/g, '<span class="important-text">$1</span>')
        .replace(/^([^.!?]+[.!?])/, '<span class="important-text">$1</span>');
      formatted += `<div class="summary-section">${formattedPara}</div>`;
    });
  }
  return `<div class="summary-content">${formatted}</div>`;
}

document.getElementById("summarize").addEventListener("click", async () => {
  const resultDiv = document.getElementById("result");
  const summaryType = document.getElementById("summary-type").value;

  resultDiv.innerHTML = `<div class="loader"></div>`;

  chrome.storage.sync.get(["geminiApiKey"], async ({ geminiApiKey }) => {
    if (!geminiApiKey) {
      resultDiv.textContent = "Gemini API key is not set. Please set it in the extension options.";
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs && tabs[0];
      if (!tab || !tab.id) {
        resultDiv.textContent = "No active tab found.";
        return;
      }

      chrome.scripting.executeScript(
        { target: { tabId: tab.id }, files: ["content.js"] },
        () => {
          if (chrome.runtime.lastError) {
            resultDiv.textContent = "Cannot inject content script: " + chrome.runtime.lastError.message;
            return;
          }

          chrome.tabs.sendMessage(
            tab.id,
            { type: "GET_ARTICLE_TEXT" },
            async (response) => {
              if (chrome.runtime.lastError || !response) {
                resultDiv.textContent = "Could not extract text from this page. Try refreshing or using a normal website (not Chrome internal pages).";
                return;
              }

              const text = response?.text || "";
              if (!text || text.trim().length < 50) {
                resultDiv.textContent = "Couldn't extract enough article text from the page.";
                return;
              }

              try {
                const summary = await getGeminiSummary(
                  text,
                  summaryType,
                  geminiApiKey
                );
                const formattedSummary = formatSummary(summary, summaryType);
                resultDiv.innerHTML = formattedSummary;
              } catch (err) {
                resultDiv.textContent = "Error occurred while fetching summary: " + (err?.message || err);
              }
            }
          );
        }
      );
    });
  });
});

async function getGeminiSummary(rawText, type, apiKey) {
  const max = 20000;
  const text =
    rawText.length > max ? rawText.slice(0, max) + "..." : rawText;

  const promptMap = {
    brief: `Summarize in 2-3 sentences:\n\n${text}`,
    detailed: `Give a detailed summary:\n\n${text}`,
    bullets: `Summarize in 5-7 bullet points:\n\n${text}`,
  };

  const prompt = promptMap[type] || promptMap.brief;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${encodeURIComponent(
    apiKey
  )}`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data?.contents?.[0]?.parts?.[0]?.text || "";
}
