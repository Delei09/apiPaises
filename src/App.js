import './App.css';
import Header from './components/Header';
import Routes from './Paginas/Routes'
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <Header />
        <BrowserRouter >
            <Routes />
        </BrowserRouter>

    </div>
  );
}

export default App;
