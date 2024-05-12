import './styles/app.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./components/AppRouter"
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <AppRouter/>
      </BrowserRouter>
    </div>
  )
}

export default App
