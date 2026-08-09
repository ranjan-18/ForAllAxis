import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <App />
        <Toaster position="top-center" containerStyle={{ zIndex: 999999 }} toastOptions={{
          style: { background: '#111827', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
        }} />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
