# Overview
Search Summary is a Chrome extension that tracks and summarizes your Google search activity.<br> The extension categorizes searches by date and provides a clear, formatted summary for easy review.<br> Additional features include a dark mode toggle and a data-clearing option.

## Features
- Track Search Activity: Automatically logs Google search terms.
- View Summary: Displays search history grouped by date in a clean and formatted style.
- Clear Data: Allows users to delete their logged search history.
- Dark Mode: Toggle between light and dark themes for better accessibility and aesthetics.
## Files in the Project
- manifest.json: Defines the extension's metadata and permissions.
- popup.html: The user interface for the extension.
- popup.js: Handles UI interactions, data fetching, and theme toggling.
- background.js: Monitors Google search activity and logs search terms.
- icon.png: Icon displayed in the Chrome toolbar.
## How to Install
- Clone or download this repository to your computer.
- Open Chrome and navigate to chrome://extensions/.
- Enable Developer mode in the top right corner.
- Click Load unpacked and select the project folder.
- The extension will appear in your Chrome toolbar as an icon.
## Usage Instructions
1. Click on the extension icon in the Chrome toolbar to open the popup.
2. View Summary:
   - Click the View weekly summary button to see your search history grouped by date.
3. Clear Data:
    - Click the Clear Data button to delete all logged search activity.
4. Toggle Dark Mode:
    - Click the Dark Mode Toggle button to switch between light and dark themes.
## Permissions Required
- History: To access your search history and extract search terms.
- Storage: To store search terms locally in the browser for summarization.
## Planned Improvements
- Add functionality to filter search terms by keywords or categories.
- Provide export options for the search summary (e.g., download as a CSV).
- Implement real-time activity tracking beyond Google searches.
## Contributing
Feel free to fork this repository and submit pull requests for any bug fixes or feature enhancements.
