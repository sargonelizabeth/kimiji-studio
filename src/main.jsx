import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/fonts.css';  // @font-face (KIMIJI-NotoKR 600/800)
import './index.css';         // 전역 규칙

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
