document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["geminiApiKey"], ({ geminiApiKey }) => {
    if (geminiApiKey) {
      document.getElementById("api-Key").value = geminiApiKey;
    }
  });

  document.getElementById("save-button").addEventListener("click", () => {
    const apiKey = document.getElementById("api-Key").value.trim();
    if (!apiKey) return;

    chrome.storage.sync.set({ geminiApiKey: apiKey }, () => {
      const msg = document.getElementById("success-message");
      msg.style.opacity = "1";
      setTimeout(() => (msg.style.opacity = "0"), 1500);
      setTimeout(() => window.close(), 2000);
    });
  });
});
