chrome.tabs.onSelectionChanged.addListener(function (tabId) {
    tab_id = tabId;

    chrome.tabs.get(tab_id, function (tab) {
        if (tab.url.match('netflix\.com')) {
            chrome.pageAction.show(tab_id);
        }
    })
});

chrome.tabs.onUpdated.addListener(function (tabId, info) {
    if (info.status === 'complete') {
        chrome.tabs.get(tab_id, function (tab) {
            if (tab.url.match('netflix\.com')) {
                chrome.pageAction.show(tab_id);
            }
        });
    }
});