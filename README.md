# AI Summarizer

AI Summarizer is a Chrome extension that uses the Gemini API to generate concise and meaningful summaries of web articles. This tool is designed to save time and provide quick insights by summarizing content in various formats.

## Features

- **Multiple Summary Types**: Choose between brief, detailed, or bullet-point summaries.
- **PDF Export**: Download summaries as professionally formatted PDF files.
- **Copy to Clipboard**: Quickly copy the generated summary for easy sharing.
- **Customizable Options**: Set your Gemini API key and adjust preferences in the extension options.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Lithira-Sasmitha/AI_SUMMARISER.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top-right corner.
4. Click "Load unpacked" and select the cloned repository folder.

## Usage

1. Navigate to any article or webpage you want to summarize.
2. Click on the AI Summarizer extension icon.
3. Select the summary type (Brief, Detailed, or Bullets).
4. Click "Summarize" to generate the summary.
5. Use the "Copy" button to copy the summary or "PDF" to download it.

## File Structure

- `popup.html`: The main user interface of the extension.
- `popup.js`: Handles the logic for summarization and user interactions.
- `content.js`: Injected into web pages to extract article text.
- `background.js`: Manages background tasks and API key storage.
- `manifest.json`: Chrome extension configuration.
- `lib/jspdf.umd.min.js`: Local jsPDF library for PDF generation.

## Requirements

- A valid Gemini API key. You can set this in the extension options.
- Chrome browser.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the extension.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [jsPDF](https://github.com/parallax/jsPDF) for PDF generation.
- [Gemini API](https://developers.generativelanguage.googleapis.com/) for content summarization.

---

Enjoy quick and efficient summaries with AI Summarizer!