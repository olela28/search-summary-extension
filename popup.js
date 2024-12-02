document.getElementById("viewSummary").addEventListener("click", function () {
    chrome.storage.local.get(["searchData"], function (data) {
        if (chrome.runtime.lastError) {
            console.error("Error retrieving search data:", chrome.runtime.lastError);
            return;
        }

        let summary = data.searchData || [];
        let searches = summary.reduce((acc, search) => {
            let date = new Date(search.date).toDateString();
            if (!acc[date]) acc[date] = [];
            acc[date].push(search.term);
            return acc;
        }, {});
        
        let summaryDiv = document.getElementById("summary");
        summaryDiv.innerHTML = "";
        if (Object.keys(searches).length === 0) {
            summaryDiv.innerHTML = "<p>No search data available.</p>";
        } else {
            for (let date in searches) {
                summaryDiv.innerHTML += `<strong>${date}</strong>: ${searches[date].join(", ")}<br/>`;
            }
        }
    });
});

document.getElementById("clearSummary").addEventListener("click", function () {
    chrome.storage.local.remove("searchData", function () {
        if (chrome.runtime.lastError) {
            console.error("Error clearing search data:", chrome.runtime.lastError);
            return;
        }
        let summaryDiv = document.getElementById("summary");
        summaryDiv.innerHTML = "<p>Data Cleared!</p>";
    });
});

document.getElementById("themeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    let isDarkMode = document.body.classList.contains("dark-mode");
    chrome.storage.local.set({theme: isDarkMode ? "dark" : "light" }, function () {
        if (chrome.runtime.lastError) {
            console.error("Error saving theme:", chrome.runtime.lastError);
        }
    });
});

chrome.storage.local.get(["theme"], function (data) {
    if (chrome.runtime.lastError) {
        console.error("Error retrieving theme:", chrome.runtime.lastError);
        return;
    }
    if (data.theme === "dark") {
        document.body.classList.add("dark-mode");
    }
});