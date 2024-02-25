import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Dashboard from './Dashboard.jsx'

const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="95639048462-8lsi1tt69rhq8sdp19hv23nmvluijcl4.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />        
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  root
);
