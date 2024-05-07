import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/styles.scss';
import { apiRoot } from './client/client.ts';

const root: HTMLElement = document.createElement('div');
root.setAttribute('id', 'root');

// TODO: add nice page loader
document.body.insertAdjacentElement('afterbegin', root);

apiRoot
  .stores()
  .withKey({ key: import.meta.env.VITE_STORE_KEY })
  .get()
  .execute()
  .then((resp) => {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App shop={resp.body} />
      </React.StrictMode>,
    );
  });
