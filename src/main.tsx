import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/styles.scss';

const root: HTMLElement = document.createElement('div');
root.setAttribute('id', 'root');

document.body.insertAdjacentElement('afterbegin', root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
