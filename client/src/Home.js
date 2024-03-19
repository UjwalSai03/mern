import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className='home'>
        <div className='container'>
          <h1>Developers Hub</h1>
          <p>Create a developer profile/Portfolio, Sharepost and get help from other developers</p>
          <div className='button'>
            <Link className = 'link' to = '/signup' style={{color : 'white'}}>Signup</Link>
            <Link className = 'link' to = '/login' style={{color : 'white'}}>Login</Link>
          </div>
        </div>
    </div>
  )
}

export default Home;
