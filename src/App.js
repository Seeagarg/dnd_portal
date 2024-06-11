import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <div>
  <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/login' element={<LoginPage/>}/>
  </Routes>
 
  </div>
  );
}

export default App;
