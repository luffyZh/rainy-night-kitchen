import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
       theme={{
        token: {
          colorPrimary: '#389e0d',
        }
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
