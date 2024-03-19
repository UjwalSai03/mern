import React, {useEffect, useState} from 'react'
import './MyProfile.css'
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
const MyProfile = () => {

  const [data, setData] = useState([]);
  const [review, setReview] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:8080/myprofile', {
          headers : {
            'x-token' : localStorage.getItem('token') 
          }}
        )
        .then(res => setData(res.data))
        axios.get('http://localhost:8080/myreview', {
          headers : {
            'x-token' : localStorage.getItem('token') 
          }}
        )
        .then(res => {
          setReview(res.data);
         
        })
    }, [])
    if(!localStorage.getItem('token')){
        return <Navigate to = '/login'/>
    }

  return (
    <div className='myProfile'>
      <div className='right'>
        <ul>
                
                <button><li><Link to = '/logout'>Logout</Link></li></button>
        </ul>
        </div>
      <button>Back to Profiles</button>
      {data && 
        <div className='main'>
        <div className='body'>
            <img  className = 'image' src = "https://icon-library.com/images/generic-user-icon/generic-user-icon-13.jpg" alt="Profile" />
            <h1 className='large'>{data.fullname}</h1>
            <h3>{data.email}</h3>
            <div>India</div>
            <h3>Reviews and Ratings</h3>
          <div className='right'>
            {review ? 
              review.map(review => 
                <div className='review-box'>
                    <h4 className='reviews'><Link to = "#">{review.taskprovider}</Link></h4>
                    <p className='points'>
                      {review.rating}/5
                    </p>
                </div>
              ) : <p>No Reviews added yet</p>
            }
          </div>
      </div>
      <div className='bottom'>
          <h3>Enter your reviews</h3>
          <form>
            <input placeholder='Enter your rating out of 5'/>
            <button type = 'submit'>Add Rating</button>
          </form>
      </div>
      </div>
      }

    </div>
  )
}

export default MyProfile
