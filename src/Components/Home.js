import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ProcessingContext from '../Context/ProcessingContext'
import UserContext from '../Context/UserContext'
import firebase from 'firebase/compat/app';
import { getAuth, signOut } from "firebase/auth";
import firebaseConfig from '../Utils/FirebaseConfig'
import { toast } from 'react-toastify'
import Table from './Table'


firebase.initializeApp(firebaseConfig)
const auth = getAuth;
const Home = () => {

  const [user  ,setUser] = useContext(UserContext)
  useEffect(() => {
    const loginInfo = localStorage.getItem("login");
    if(loginInfo !== undefined && loginInfo !== null){
      setUser(JSON.parse(loginInfo));
    }
  } , [])

  const [loading , setLoading] = useContext(ProcessingContext);  
  
  
  const handleSignOut = () => {
    setLoading(true);
    const auth = getAuth();
      signOut(auth).then(() => {
          toast("Successfully Signed out ! " , {
            type : "success"
          })
          setLoading(false);
          setUser(null);
          localStorage.setItem("login" , null);
      }).catch((error) => {
          toast("Oops ! Went into some Issue" , {
            type : "warning"
          })
          setLoading(false);
      });
  }

  return (
    <div>
    <div className="navbar glass">
      <div className="section1">
        <img src="./movix-logo.png"  />
        <h3>Movix Player</h3>
      </div>
      <div className="section2">
        {
          user == null ? (<>
            <Link to="/signup"><h3>Register</h3></Link>
            <Link to="/signin"><h3>Login</h3></Link>
            </>) : ( <h3 
            onClick={(e) => {
              handleSignOut();
            }}>Signout</h3>)
        }
        
       
        
      </div>
    </div>
    {

        (user !== null) ? (<Table />) : (null)
    }
        
    </div>
  )
}

export default Home