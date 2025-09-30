# HubSpot Account Tracker

## Overview
The HubSpot Account Tracker is a Chrome extension designed to help users track their HubSpot accounts efficiently. This extension provides a seamless experience by integrating with the HubSpot application, allowing users to access relevant information directly from their browser.

## Features
- **Background Tasks**: Utilizes a service worker to manage background tasks and events related to the extension's lifecycle.
- **Content Script**: Interacts with the HubSpot application on specified web pages, enhancing user experience.
- **Popup Interface**: Provides a user-friendly popup interface for quick access to tracking features.
- **Custom Icon**: Includes a custom icon for easy identification in the Chrome toolbar.

## File Structure
```
chrome-extension
├── src
│   ├── background.js       # Service worker for background tasks
│   ├── contentScript.js     # Content script for interacting with HubSpot
│   ├── popup.html           # HTML structure for the popup interface
│   └── images
│       └── hubSpot.png      # Icon image for the extension
├── manifest.json            # Configuration file for the Chrome extension
└── README.md                # Documentation for the project
```

## Installation
1. Clone the repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click on "Load unpacked" and select the `chrome-extension` directory.

## Usage
- Click on the HubSpot Account Tracker icon in the Chrome toolbar to open the popup interface.
- The extension will automatically interact with the HubSpot application on supported pages.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.