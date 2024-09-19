import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routing from './Routing';
import MyContextProvider from './component/contextApi/MyContextProvider';

function App() {
  return (
    <MyContextProvider>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </MyContextProvider>
  );
}

export default App;
