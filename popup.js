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

document.getElementById("clearSummary").addEventListener("click", function () {
    chrome.storage.local.remove("searchData", function () {
        let summaryDiv = document.getElementById("summary");
        summaryDiv.innerHTML = "<p>Data Cleared!</p>";
    });
});

document.getElementById("themeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    let isDarkMode = document.body.classList.contains("dark-mode");
    chrome.storage.local.set({theme: isDarkMode ? "dark" : "light" });
});

chrome.storage.local.get(["theme"], function (data) {
    if (data.theme === "dark") {
        document.body.classList.add("dark-mode");
    }
});