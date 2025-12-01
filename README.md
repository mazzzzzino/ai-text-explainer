# AI Explainer Pro

A powerful Chrome extension that lets you select any text on the web, right-click, and get instant AI-powered explanations with follow-up chat capabilities.

## Features

- 🌟 **Context Menu Integration**: Right-click any selected text and choose "Explain with AI"
- 💬 **Interactive Chat Window**: Beautiful floating chat interface with conversation history
- 🎨 **Modern UI**: Glassmorphic design with smooth animations and Shadow DOM isolation
- 🔒 **Secure API Handling**: Your Gemini API key is stored securely and never exposed
- 📝 **Markdown Support**: AI responses rendered with full markdown formatting
- 🚀 **Built with Modern Tech**: Vite, React 18, TypeScript, Tailwind CSS

## Installation

### Development

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Build the Extension**
   ```bash
   npm run build
   ```

3. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `dist` folder from this project

### Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key

### Configure the Extension

1. Click the extension icon in your Chrome toolbar
2. Paste your Gemini API key
3. Click "Save API Key"

## Usage

1. **Select Text**: Highlight any text on any webpage
2. **Right-Click**: Choose "Explain with AI" from the context menu
3. **Chat**: The AI will explain the selected text, and you can ask follow-up questions

## Tech Stack

- **Build Tool**: Vite with @crxjs/vite-plugin for HMR and Manifest V3
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS (injected into Shadow DOM)
- **Icons**: Lucide React
- **Markdown**: react-markdown
- **AI Model**: Google Gemini 1.5 Flash

## Architecture

- **Background Service Worker**: Handles context menu, secure API calls to Gemini
- **Content Script**: Injects Shadow DOM with isolated React app
- **Popup**: Settings interface for API key management
- **Shadow DOM**: Ensures extension UI doesn't conflict with website styles

## Development

```bash
# Install dependencies
npm install

# Development with HMR
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check
```

## Project Structure

```
src/
├── background/        # Service worker for context menu & API
├── content/          # Injected chat UI with Shadow DOM
├── popup/            # Extension settings popup
├── components/       # Reusable UI components (shadcn)
└── index.css        # Design system and Tailwind config
```

## License

MIT
