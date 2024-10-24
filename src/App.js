import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MyContextProvider from './component/contextApi/MyContextProvider';
import Routing from './Routing/Routing';

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
