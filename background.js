chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ mySetting: true }, () => {
        if (!XPathResult.geminiApiKey){
            chrome.tabs.create({ url: 'options.html' });
        }
    });
});
