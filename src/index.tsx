import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import App from './app/App';
import store from './app/stores/store';
import './stylesheet/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
