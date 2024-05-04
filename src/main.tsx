import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/styles.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.ts';

const root: HTMLElement = document.createElement('div');
root.setAttribute('id', 'root');
document.body.insertAdjacentElement('afterbegin', root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
