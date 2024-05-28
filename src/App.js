import './App.css';
import Routing from './Routing';
import MyContextProvider from './component/contextApi/MyContextProvider';

function App() {
  return (
    <MyContextProvider>
      <Routing />
    </MyContextProvider>
  );
}

export default App;
