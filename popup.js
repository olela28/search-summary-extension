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
            let table = document.createElement("table");
            table.style.width = "100%";
            table.style.borderCollapse = "collapse";

            // Add table header
            let thead = document.createElement("thead");
            thead.innerHTML = `
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Date</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Search Terms</th>
                </tr>
            `;
            table.appendChild(thead);

            // Add table body
            let tbody = document.createElement("tbody");
            for (let date in searches) {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td style="border: 1px solid #ddd; padding: 8px;">${date}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${searches[date].join(", ")}</td>
                `;
                tbody.appendChild(row);
            }
            table.appendChild(tbody);

            summaryDiv.appendChild(table);
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