import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import App from './app/App';
import store from './app/redux/store';
import './stylesheet/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
