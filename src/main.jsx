import React from 'react';
import ReactDOM from 'react-dom/client';

import './fonts.css';   // 산돌 @import (있으면 유지, 없다면 생략 가능)
import './index.css';

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
