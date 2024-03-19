import './App.css';
import Home from './Home';
import Login from './Login';
import MyProfile from './MyProfile';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from './Signup';
import Dashboard from './Dashboard';
import Indprofile from './Indprofile';

function App() {
  return (
    <div className="App">
      <div className = 'navbar'>
          <div className='left'>
            <h2>Developers Hub</h2>
          </div>
          <div className='right'>
            <button>Sign Up</button>
            <button>Login</button>
          </div>
        </div>
      <BrowserRouter >
        <Routes>
            <Route path = '/' exact element = {<Home />}/>
            <Route path = '/login' exact element = {<Login />}/>
            <Route path = '/myprofile' exact element = {<MyProfile />}/>
            <Route path = '/signup' element = {<Signup />}/>
            <Route path = '/dashboard' exact element = {<Dashboard />}/>
            <Route path = '/indprofile/:fullname/:email/:skill/:id' element = {<Indprofile />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
