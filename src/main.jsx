import React from 'react';
import ReactDOM from 'react-dom/client';

import './fonts.css';  // Sandoll CSS 번들 포함(@import)
import './index.css';  // 전역 색/폰트 규칙

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
