import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '~/context/Auth';
import App from './App';
import AbilityProvider from '~/context/Ability';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AbilityProvider>
          <App />
        </AbilityProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
