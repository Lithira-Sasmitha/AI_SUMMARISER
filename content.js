function extractArticleText() {
  // try common article containers first
  const articleEl = document.querySelector("article");
  if (articleEl && articleEl.innerText.trim().length > 200) {
    return articleEl.innerText.trim();
  }

  const mainEl = document.querySelector("main");
  if (mainEl && mainEl.innerText.trim().length > 200) {
    return mainEl.innerText.trim();
  }

  // try largest text block heuristic
  const blocks = Array.from(document.body.querySelectorAll("p, div"));
  let largest = "";
  for (const b of blocks) {
    const t = (b.innerText || "").trim();
    if (t.length > largest.length) largest = t;
  }
  if (largest.length > 200) return largest;

  // fallback to page selection if user highlighted text
  const selection = window.getSelection ? window.getSelection().toString() : "";
  if (selection && selection.length > 50) return selection;

  // lastly use whole page text (may be large)
  return document.body.innerText || "";
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "GET_ARTICLE_TEXT") {
    const text = extractArticleText();
    sendResponse({ text });
  }
  // no async response required here, so don't return true
});
