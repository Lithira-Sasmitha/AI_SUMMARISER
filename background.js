chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["geminiApiKey"], (result) => {
    if (!result.geminiApiKey) {
      // Open options page for the user to enter their API key
      chrome.tabs.create({ url: "options.html" });
    }
  });
});
