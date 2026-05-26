import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AppProvider } from './context/AppContext.jsx';
import { ModalProvider } from './context/ModalContext.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
