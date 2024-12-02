document.getElementById("viewSummary").addEventListener("click", function () {
    chrome.storage.sync.get(["searchData"], function (data) {
        let summary = data.searchData || [];
        let searches = summary.reduce((acc, search) => {
            let date = new Date(search.date).toDateString();
            if (!acc[date]) acc[date] = [];
            acc[date].push(search.term);
            return acc;
        }, {});
        
        let summaryDiv = document.getElementById("summary");
        summaryDiv.innerHTML = "";
        for (let date in searches) {
            summaryDiv.innerHTML += `<strong>${date}</strong>: ${searches[date].join(", ")}<br/>`;
        }
    });
});
document.getElementByID("clearSummary").addEventListener("click", function () {
    chrome.storage.sync.remove("searchData", function () {
        document.getElementByID("summary").innerHTML = "<p>Data Cleared!</p>";
    });
});
