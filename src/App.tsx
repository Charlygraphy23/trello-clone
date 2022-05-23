import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RouteIndex from 'routes/index.routes';
import store from 'store';
import './App.scss';

const App = () => (
  <div className='w-100 app'>
    <Provider store={store}>
      <BrowserRouter>
        <RouteIndex />
        <ToastContainer position='top-right' />
      </BrowserRouter>
    </Provider>
  </div>
);

export default App;
