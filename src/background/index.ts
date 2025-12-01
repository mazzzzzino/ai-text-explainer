// Background Service Worker for AI Explainer Pro

interface Message {
  type: string;
  payload?: any;
}

interface AIResponse {
  text?: string;
  error?: string;
}

// Create context menu on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'explain-with-ai',
    title: 'Explain with AI',
    contexts: ['selection']
  });
  
  console.log('AI Explainer Pro installed successfully');
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'explain-with-ai' && tab?.id) {
    const selectedText = info.selectionText || '';
    
    // Send message to content script to open chat with selected text
    chrome.tabs.sendMessage(tab.id, {
      type: 'OPEN_CHAT',
      payload: { text: selectedText }
    }).catch(err => {
      console.error('Failed to send message to content script:', err);
    });
  }
});

// Secure API proxy - handle AI queries from content script
chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
  if (message.type === 'QUERY_AI') {
    handleAIQuery(message.payload)
      .then(response => sendResponse(response))
      .catch(error => sendResponse({ error: error.message }));
    
    return true; // Keep message channel open for async response
  }
});

async function handleAIQuery(payload: { prompt: string; history?: any[] }): Promise<AIResponse> {
  try {
    // Retrieve API key from storage
    const result = await chrome.storage.local.get(['geminiApiKey']);
    const apiKey = result.geminiApiKey;
    
    if (!apiKey) {
      return { error: 'API key not configured. Please set your Gemini API key in the extension popup.' };
    }

    // Build conversation history for context
    const contents = payload.history || [];
    contents.push({
      role: 'user',
      parts: [{ text: payload.prompt }]
    });

    // Call Google Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 401 || response.status === 403) {
        return { error: 'Invalid API key. Please check your Gemini API key in settings.' };
      }
      
      return { 
        error: errorData.error?.message || `API error: ${response.status} ${response.statusText}` 
      };
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      return { error: 'No response generated. Please try again.' };
    }

    return { text };
    
  } catch (error) {
    console.error('AI query error:', error);
    return { 
      error: error instanceof Error ? error.message : 'Network error. Please check your connection.' 
    };
  }
}
