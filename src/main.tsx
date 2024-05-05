import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/styles.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import { ThemeProvider } from '@mui/material';
import theme from './themes/theme.ts';

const root: HTMLElement = document.createElement('div');
root.setAttribute('id', 'root');
document.body.insertAdjacentElement('afterbegin', root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
