// background.ts
chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => {
    console.log('onClicked event fired');
    if (tab.id)
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['contentScript.js'],
        });
});
