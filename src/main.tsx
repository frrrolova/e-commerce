import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/styles.scss';
import client from './client/client.ts';

const root: HTMLElement = document.createElement('div');
root.setAttribute('id', 'root');

// TODO: add nice page loader
document.body.insertAdjacentElement('afterbegin', root);

client
  .getClient()
  .get()
  .execute()
  .then((resp) => {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App project={resp.body} />
      </React.StrictMode>,
    );
  });
