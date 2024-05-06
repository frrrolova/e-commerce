import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/styles.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import { ThemeProvider } from '@mui/material';
import theme from './themes/theme.ts';
// import { apiRoot } from './client/client.ts';

const root: HTMLElement = document.createElement('div');
root.setAttribute('id', 'root');
// root.innerHTML = '<div>Loading...</div>';
document.body.insertAdjacentElement('afterbegin', root);

// apiRoot
//   .stores()
//   .get()
//   .execute()
//   .then((resp) => {
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
// });
