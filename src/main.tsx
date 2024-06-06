import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/styles.scss';
// import client from './client/client.ts';
import { initCart } from './services/basketService.ts';

const root: HTMLElement = document.createElement('div');
root.setAttribute('id', 'root');

// TODO: add nice page loader
document.body.insertAdjacentElement('afterbegin', root);

initCart().then((resp) => {
  ReactDOM.createRoot(root).render(<App cart={resp} />);
});
