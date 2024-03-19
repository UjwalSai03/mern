import React, {useState} from 'react'
import './Signup.css'
import axios from 'axios';
const Signup = () => {
  const [data, setData] = useState({
    email : '',
    password : '',
    fullname : '',
    skills : '', 
    confirmpassword : '',
    mobile : ''
  });
  const changeHandler = (e) => {
    setData({...data, [e.target.name] : e.target.value});
  }
  const submitHandler = async(e) => {
    e.preventDefault();
    const newUser=await JSON.stringify(data);
    console.log(newUser);
    axios.post('http://localhost:8080/register',newUser).then(res=>console.log(res));
  }
  return (
    <div className='signup'>
      <h1>Sign Up</h1>
      <h3>Create your Account</h3>
      <form className='form' onSubmit={submitHandler}>
        <input placeholder='Name' name = 'fullname' type = 'text' onChange={changeHandler}/>
        <input placeholder='Email address' name = 'email' type = 'email' onChange={changeHandler}/>
        <input placeholder='Mobile' name = 'mobile' type = 'number' onChange={changeHandler}/>
        <input placeholder='Skills' name = 'skills' type = 'text' onChange={changeHandler}/>
        <small>Please provide the skills seperated by comma(,)</small>
        <input placeholder='Password' name = 'password' type = 'password' onChange={changeHandler}/>
        <input placeholder='Confirm Password' name = 'confirmpassword' type = 'password' onChange={changeHandler}/>
        <input type = 'submit'/>
      </form>
    </div>
  )
}

export default Signup
