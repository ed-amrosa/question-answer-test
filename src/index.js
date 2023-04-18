import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { ModalProvider } from './features/stores/ModalStore';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ModalProvider>
      <App />
    </ModalProvider>
);

