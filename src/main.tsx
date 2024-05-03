import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/styles.scss';
import { BrowserRouter } from 'react-router-dom';

const root: HTMLElement = document.createElement('div');
root.setAttribute('id', 'root');
document.body.insertAdjacentElement('afterbegin', root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
