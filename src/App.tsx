import { BrowserRouter } from 'react-router-dom';
import RouteIndex from 'routes';
import './App.scss';

const App = () => (
  <div className='w-100 app'>
    <BrowserRouter>
      <RouteIndex />
    </BrowserRouter>
  </div>
);

export default App;
