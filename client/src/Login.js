import React from 'react'
import { Link , Navigate} from 'react-router-dom'
import './Login.css'
import { useState } from 'react'
import axios from 'axios';

const Login = () => {
  const [data, setData] = useState({email : '', password : ''});
  const [auth,setAuth] =useState(false);
  const changeHandler = (e) => {
    setData({...data, [e.target.name] : e.target.value});
  }
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/login', data).then(
      res => {localStorage.setItem('token',res.data.token)
      setAuth(true);
    });
  }
  if(auth){
    return <Navigate to ='/dashboard'/>
  }
  return (
    <div className='login'>
    
      <h1 className='heading'>Sign in</h1>
      <h3 className='text'>Sign in into your Account</h3>
      <form onSubmit={submitHandler}>
        <input type='text' placeholder='Email Address' name = "email" required = {true} onChange={changeHandler}/><br />
        <input type='text' placeholder='Password' name = "password" required = {true} onChange={changeHandler}/><br />
        <input type='submit' value="login" />
      </form>
      <div>Dont have an account?</div>
      <Link className='link' to = "/signup">Sign Up</Link>
    </div>
  )
}

export default Login
