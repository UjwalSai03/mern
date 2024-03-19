import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './Dashboard.css'
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
const Dashboard = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/allprofiles', 
            {headers : {'x-token' : localStorage.getItem('token') }}
        )
        .then( (res) => {
            setData(res.data)
        })
    }, [])
    if(!localStorage.getItem('token')){
        return <Navigate to = '/login'/>
    }

    const onclickHandler= () =>{
        localStorage.removeItem('token');
    }
    return (
        <div>
           <nav className='navigation'>
                <h1>You are Logged in now</h1>
                <button>My Profile</button>
                <button onClick={onclickHandler}>Logout</button>
           </nav>
           <h1 className='heading-1'>Developers</h1>
           <h4 className='heading-2'>Browse and connect with developers</h4>
           <div className='profiles'>
               {data.length >= 1 ?
               data.map((profile) => 
                    <div className='container'>
                    <img src = "https://icon-library.com/images/generic-user-icon/generic-user-icon-13.jpg" alt="Profile" />
                        <h1>{profile.fullname}</h1>
                        <h3>{profile.email}</h3>
                        <h4>India</h4>
                        {console.log(profile)}
                        
                        <Link to = {`/indprofile/${profile.fullname}/${profile.email}/${profile.skill}/${profile._id}`} className='view-profile'>View Profile</Link>
                        <ul>
                            {profile.skill.split(",").map(s=>{
                                return <li>{s}</li>
                            })}
                        </ul> 
                    </div>
               )
                : null}
           </div>
           <Link to = '/myprofile'>My Profile</Link>
           <Link to = '/login' onClick={() => localStorage.removeItem('token')}>Logout</Link>
        </div>
    )
}

export default Dashboard
