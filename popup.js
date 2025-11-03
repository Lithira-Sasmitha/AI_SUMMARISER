// Helper: safe parse JSON, return null on parse error
function tryParseJson(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
}

document.getElementById("summarize").addEventListener("click", async () => {
  const resultDiv = document.getElementById("result");
  const summaryType = document.getElementById("summary-type").value;

  resultDiv.innerHTML = `<div class="loader"></div>`;

  // get API key
  chrome.storage.sync.get(["geminiApiKey"], async ({ geminiApiKey }) => {
    if (!geminiApiKey) {
      resultDiv.textContent = "Gemini API key is not set. Please set it in the extension options.";
      return;
    }

    // get active tab and ask content script for text
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs && tabs[0];
      if (!tab || !tab.id) {
        resultDiv.textContent = "No active tab found.";
        return;
      }

      // send message to content script
      chrome.tabs.sendMessage(tab.id, { type: "GET_ARTICLE_TEXT" }, async (response) => {
        if (chrome.runtime.lastError) {
          // content script may not be injected or there is an error
          resultDiv.textContent = "Could not extract text from this page: " + chrome.runtime.lastError.message;
          return;
        }

        const text = response?.text || "";
        if (!text || text.trim().length < 50) {
          resultDiv.textContent = "Couldn't extract enough article text from the page.";
          return;
        }

        try {
          const summary = await getGeminiSummary(text, summaryType, geminiApiKey);
          resultDiv.textContent = summary;
        } catch (err) {
          // show friendly message
          resultDiv.textContent = "Error occurred while fetching summary: " + (err?.message || err);
        }
      });
    });
  });
});

// Use safe fetch and robust response handling
async function getGeminiSummary(rawText, type, apiKey) {
  const max = 20000;
  const text = rawText.length > max ? rawText.slice(0, max) + "..." : rawText;

  const promptMap = {
    brief: `Summarize in 2-3 sentences:\n\n${text}`,
    detailed: `Give a detailed summary:\n\n${text}`,
    bullets: `Summarize in 5-7 bullet points:\n\n${text}`
  };

  const prompt = promptMap[type] || promptMap.brief;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${encodeURIComponent(apiKey)}`;


  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.2 }
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  // If response status is not ok, try to read the body text for error details
  if (!res.ok) {
    let errText = "";
    try {
      errText = await res.text();
      if (errText) {
        // try parse for better message
        const j = tryParseJson(errText);
        if (j && j.error && j.error.message) {
          throw new Error(`API error ${res.status}: ${j.error.message}`);
        } else {
          throw new Error(`API error ${res.status}: ${errText}`);
        }
      } else {
        throw new Error(`API request failed: ${res.status} ${res.statusText}`);
      }
    } catch (e) {
      // if reading/parsing failed, throw generic
      throw e;
    }
  }

  // Read raw text first
  const raw = await res.text();
  if (!raw) {
    throw new Error("Empty response from API");
  }

  // Try to parse JSON; if parse fails, but raw contains text, return it
  const data = tryParseJson(raw);
  if (!data) {
    // not JSON — return raw text (some endpoints may return plain text)
    return raw;
  }

  // Safely extract model output from different possible shapes
  const candidateText =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    data?.candidates?.[0]?.contents?.[0]?.text ||
    data?.output?.[0]?.content?.text ||
    data?.result?.output?.[0]?.content?.text ||
    null;

  if (candidateText) return candidateText;

  // Otherwise, if JSON but no expected fields, return pretty-printed JSON (or some message)
  return JSON.stringify(data, null, 2);
}

// Copy button
document.getElementById("copy-btn").addEventListener("click", () => {
  const text = document.getElementById("result").innerText;
  if (!text) {
    alert("Nothing to copy.");
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    alert("Summary copied to clipboard!");
  }).catch(() => {
    alert("Couldn't copy to clipboard.");
  });
});
