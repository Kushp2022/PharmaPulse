import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Dashboard from './Dashboard.jsx'
import Pharmacy from './Pharmacy.jsx';
import Shopping from './Shopping.jsx';

const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="{Google client ID insert}">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />    
          <Route path="/Pharmacy" element={<Pharmacy />} />   
          <Route path="/Shopping" element={<Shopping />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  root
);
