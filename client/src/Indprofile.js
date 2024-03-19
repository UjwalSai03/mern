import React, {useState} from 'react'
import { Link,  useParams } from 'react-router-dom'
import axios from 'axios'
import './Indprofile.css'

//11111111111111111
const Indprofile = () => {
    const { fullname, email, id } = useParams();
    
    const [taskprovider, setTaskProvider] = useState('');
    const [rating,setRating] = useState('');
  
    const submitHandler = async (e) => {
      e.preventDefault();
       
      await axios.get('http://localhost:8080/myprofile', {
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => res.data).then( async(res)=>await setTaskProvider(res.fullname))

        console.log(taskprovider);
      try {
        const review = {
          taskprovider,
          taskworker: id,
          rating,
        };
        console.log(JSON.stringify(review))
      
      
       
      
        
  
        // Add error handling for axios requests
        await axios.post('http://localhost:8080/addreview',review, {
          headers: {
            'x-token': localStorage.getItem('token'),
          },
        });
  
        // Handle success, you can show a success message or redirect
        alert('Review added successfully');
  
      } 
      catch (error) {
        console.error('Error adding review:', error);
        // Handle error, show an error message or log it
        alert('Error adding review. Please try again.');
      }
    };
  return (
    <div>
       <nav className='navbar'>
            <h1><Link to = '/'>Developers hub</Link></h1>
            <ul>
                <button><li><Link to = '/myprofile'>My Profile</Link></li></button>
                <button><li><Link to = '/login'>Logout</Link></li></button>
            </ul>
       </nav>
       <section className='container'>
            <Link to = '/myprofile'>Back to Profile</Link>
            <div className='profile-grid'>
                <div>
                <img src = "https://icon-library.com/images/generic-user-icon/generic-user-icon-13.jpg" alt="Profile" />
                    { 
                        <div><h1>{fullname}</h1>
                        <p>{email}</p></div>
                    }
                    <p>India</p>
                </div>
            </div>


            <div className="profile-github">
                <h2 className="text-primary my-1" >
                    <i className="fab fa-github"></i> Reviews and Ratings
                </h2>
                <div className="repo bg-white p-1 my-1">
                    <div>
                        <h4>Enter your reviews</h4>
                        <form className="form" autoComplete="off" onSubmit={submitHandler}> 
                            <div className="form-group">
                                <input
                                    type="text" placeholder="Enter your rating out of 5" name="rating"
                                    required 
                                    onChange={e => setRating(e.target.value)}
                                />
                            </div>
                            <input type="submit" className="btn btn-primary" value="Add Rating" />
                        </form>
                    </div>
                </div>
                </div>

       </section>
    </div>
  )
}

export default Indprofile
