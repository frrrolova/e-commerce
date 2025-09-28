import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/styles.scss';
import { initCart } from './services/cartService.ts';
import { Cart } from '@commercetools/platform-sdk';

const root: HTMLElement = document.createElement('div');
root.setAttribute('id', 'root');

document.body.insertAdjacentElement('afterbegin', root);

initCart().then((resp: Cart | null) => {
  ReactDOM.createRoot(root).render(<App cart={resp} />);
});
