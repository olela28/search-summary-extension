chrome.history.onVisited.addListener(function (result) {
    if(result.url.includes("google.com/search")) {
        let searchTerm = new URL(result.url).searchParams.get("q");
        if (searchTerm) {
            chrome.storage.local.get(["searchData"], function (data) {
                let searchData = data.searchData || [];
                searchData.push({ term: searchTerm, date: new Date().toISOString() });
                chrome.storage.local.set({ searchData: searchData });
            });
        }
    }
});