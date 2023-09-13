import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import App from './app/App';
import store from './app/redux/store';
import './stylesheet/style.scss';
import { BrowserRouter } from 'react-router-dom';
import Login from './app/pages/auth/login/Login';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  </Provider>
);
