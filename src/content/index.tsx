import React from 'react';
import { createRoot } from 'react-dom/client';
import ContentApp from './ContentApp';
// Import styles inline to inject into Shadow DOM
import styles from '../index.css?inline';

// Create host element for Shadow DOM
const hostId = 'ai-explainer-root';
let shadowRoot: ShadowRoot | null = null;
let root: any = null;

function initializeShadowDOM() {
  // Check if already initialized
  if (document.getElementById(hostId)) {
    return;
  }

  // Create host div
  const host = document.createElement('div');
  host.id = hostId;
  
  // High z-index to float above everything
  host.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2147483647;
    pointer-events: none;
  `;
  
  document.body.appendChild(host);

  // Create Shadow DOM for style isolation
  shadowRoot = host.attachShadow({ mode: 'open' });

  // Inject Tailwind CSS into Shadow DOM
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  shadowRoot.appendChild(styleSheet);

  // Create root element for React
  const appContainer = document.createElement('div');
  appContainer.id = 'shadow-app-root';
  appContainer.style.cssText = `
    width: 100%;
    height: 100%;
    pointer-events: none;
  `;
  shadowRoot.appendChild(appContainer);

  // Mount React app
  root = createRoot(appContainer);
  root.render(
    <React.StrictMode>
      <ContentApp />
    </React.StrictMode>
  );
}

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeShadowDOM);
} else {
  initializeShadowDOM();
}
