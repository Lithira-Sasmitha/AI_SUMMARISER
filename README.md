# 🤖 AI Summarizer

<div align="center">

![AI Summarizer Banner](https://img.shields.io/badge/AI-Summarizer-purple?style=for-the-badge&logo=google-chrome&logoColor=white)

**Transform lengthy articles into concise insights with the power of AI** ✨

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=google-chrome&logoColor=white)](https://github.com/Lithira-Sasmitha/AI_SUMMARISER)
[![Gemini API](https://img.shields.io/badge/Powered_by-Gemini_API-8E75B2?style=flat-square&logo=google&logoColor=white)](https://developers.generativelanguage.googleapis.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[Installation](#-installation) • [Features](#-features) • [Usage](#-usage) • [Contributing](#-contributing)

</div>

---

## 🌟 Overview

AI Summarizer is a powerful Chrome extension that leverages the **Gemini API** to deliver instant, intelligent summaries of web articles. Say goodbye to information overload and hello to efficient reading! 

Whether you're a researcher, student, professional, or casual reader, AI Summarizer helps you grasp key insights in seconds.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 📝 **Multiple Summary Types**
- **Brief**: Quick 2-3 sentence overview
- **Detailed**: Comprehensive analysis
- **Bullets**: Key points at a glance

</td>
<td width="50%">

### 📄 **PDF Export**
- Download professionally formatted PDFs
- Perfect for archiving and sharing
- Maintains clean, readable layout

</td>
</tr>
<tr>
<td width="50%">

### 📋 **Copy to Clipboard**
- One-click copying
- Instant sharing capability
- Seamless workflow integration

</td>
<td width="50%">

### ⚙️ **Customizable Settings**
- Secure API key management
- Personalized preferences
- Easy configuration options

</td>
</tr>
</table>

---

## 🚀 Installation

### Method 1: Clone from GitHub

```bash
# Clone the repository
git clone https://github.com/Lithira-Sasmitha/AI_SUMMARISER.git

# Navigate to the directory
cd AI_SUMMARISER
```

### Method 2: Load into Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right corner)
3. Click **"Load unpacked"**
4. Select the cloned repository folder
5. 🎉 Done! The extension is now installed

---

## 🎯 Usage

### Getting Started

1. **Navigate** to any article or webpage you want to summarize
2. **Click** the AI Summarizer extension icon in your toolbar
3. **Select** your preferred summary type:
   - 🎯 Brief
   - 📖 Detailed
   - • Bullets
4. **Click** "Summarize" to generate your summary
5. **Choose** your action:
   - 📋 Copy to clipboard
   - 📄 Download as PDF

### First-Time Setup

> ⚠️ **Important**: You'll need a Gemini API key to use this extension

1. Click the extension icon
2. Navigate to **Options**
3. Enter your [Gemini API key](https://developers.generativelanguage.googleapis.com/)
4. Save your settings

---

## 📁 Project Structure

```
AI_SUMMARISER/
│
├── 📄 manifest.json          # Extension configuration
├── 🎨 popup.html             # User interface
├── ⚙️ popup.js               # Summarization logic
├── 📝 content.js             # Text extraction script
├── 🔧 background.js          # Background tasks & API key storage
├── 📚 lib/
│   └── jspdf.umd.min.js     # PDF generation library
├── 🖼️ icons/                 # Extension icons
└── 📖 README.md              # You are here!
```

---

## 🛠️ Technologies Used

<div align="center">

| Technology | Purpose |
|:----------:|:-------:|
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | Core functionality |
| ![Chrome API](https://img.shields.io/badge/Chrome_API-4285F4?style=flat&logo=google-chrome&logoColor=white) | Extension integration |
| ![Gemini API](https://img.shields.io/badge/Gemini_API-8E75B2?style=flat&logo=google&logoColor=white) | AI-powered summarization |
| ![jsPDF](https://img.shields.io/badge/jsPDF-EC1C24?style=flat&logo=adobe-acrobat-reader&logoColor=white) | PDF generation |

</div>

---

## 📋 Requirements

- ✅ Google Chrome browser (latest version)
- ✅ Valid Gemini API key ([Get yours here](https://developers.generativelanguage.googleapis.com/))
- ✅ Active internet connection

---

## 🤝 Contributing

We love contributions! 💜 Here's how you can help:

### Ways to Contribute

1. 🐛 **Report bugs** - Found an issue? Let us know!
2. 💡 **Suggest features** - Have an idea? We'd love to hear it!
3. 🔧 **Submit pull requests** - Code contributions are always welcome!
4. 📖 **Improve documentation** - Help others understand the project better

### Contribution Steps

```bash
# Fork the repository
# Create your feature branch
git checkout -b feature/AmazingFeature

# Commit your changes
git commit -m 'Add some AmazingFeature'

# Push to the branch
git push origin feature/AmazingFeature

# Open a Pull Request
```

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - Copyright (c) 2024 Lithira Sasmitha
```

---

## 🙏 Acknowledgments

Special thanks to:

- **[jsPDF](https://github.com/parallax/jsPDF)** - For making PDF generation a breeze
- **[Gemini API](https://developers.generativelanguage.googleapis.com/)** - For powering our AI summarization
- **Open Source Community** - For continuous inspiration and support

---

## 🌈 Support

If you find this project helpful, please consider:

- ⭐ **Starring** the repository
- 🐛 **Reporting** issues
- 📢 **Sharing** with others
- ☕ **Supporting** the developer

---

<div align="center">

### 💻 Built with ❤️ by [Lithira Sasmitha](https://github.com/Lithira-Sasmitha)

**Enjoy quick and efficient summaries with AI Summarizer!** 🚀

[⬆ Back to Top](#-ai-summarizer)

</div>
