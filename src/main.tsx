import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/styles.scss';
import { Provider } from 'react-redux';
import store from './store/store.ts';

const root: HTMLElement = document.createElement('div');
root.setAttribute('id', 'root');
root.dataset.testid = 'root-component';
document.body.insertAdjacentElement('afterbegin', root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
