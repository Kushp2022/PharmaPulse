import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import signUp from './signUp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="95639048462-8lsi1tt69rhq8sdp19hv23nmvluijcl4.apps.googleusercontent.com">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/test" element={<signUp />} />
          </Routes>
        </BrowserRouter>
        <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
