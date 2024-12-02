document.getElementById("viewSummary").addEventListener("click", function () {
    chrome.storage.local.get(["searchData"], function (data) {
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