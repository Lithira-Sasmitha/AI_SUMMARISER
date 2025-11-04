export const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent";

export const DEFAULT_SUMMARY_MESSAGE = "Select a type and click Summarize...";
export const ERROR_NO_API_KEY = "Gemini API key is not set. Please set it in the extension options.";
export const ERROR_NO_ACTIVE_TAB = "No active tab found.";
export const ERROR_TEXT_EXTRACTION = "Could not extract text from this page. Try refreshing or using a normal website (not Chrome internal pages).";
export const ERROR_FETCHING_SUMMARY = "Error occurred while fetching summary.";

export const SUMMARY_TYPES = {
  BRIEF: "brief",
  DETAILED: "detailed",
  BULLETS: "bullets",
};

export const LABEL_SUMMARIZE = "Summarize";
export const LABEL_COPY = "Copy";
export const LABEL_DOWNLOAD_PDF = "PDF";

export const COLOR_PRIMARY = "#667eea";
export const COLOR_SECONDARY = "#764ba2";
export const COLOR_TEXT = "#2d3748";
export const COLOR_HIGHLIGHT = "rgba(102, 126, 234, 0.1)";

export const PDF_TITLE = "AI Summary Report";
export const PDF_FILENAME = "AI_Summary.pdf";

export const MAX_TEXT_LENGTH = 20000;