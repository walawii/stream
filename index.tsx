
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Application failed to start:", error);
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 40px; color: white; text-align: center; font-family: sans-serif; background: #09090b; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <h1 style="color: #ef4444; margin-bottom: 10px;">Startup Error</h1>
        <p style="color: #a1a1aa; margin-bottom: 20px;">The application crashed during initialization.</p>
        <pre style="background: #18181b; padding: 15px; border: 1px solid #27272a; border-radius: 8px; overflow: auto; text-align: left; max-width: 90vw; color: #f43f5e; font-size: 12px;">${error instanceof Error ? error.stack || error.message : String(error)}</pre>
        <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #dc2626; color: white; border: none; border-radius: 6px; cursor: pointer;">Retry Loading</button>
      </div>
    `;
  }
}
