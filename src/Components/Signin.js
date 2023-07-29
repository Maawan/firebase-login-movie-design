import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import firebase from 'firebase/compat/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from '../Utils/FirebaseConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import ProcessingContext from '../Context/ProcessingContext';
firebase.initializeApp(firebaseConfig)
const auth = getAuth();
const Signin = () => {
  const navigate = useNavigate();
  const [loading , setLoading] = useContext(ProcessingContext);
  const [email , setEmail] = useState("");
  const [pass , setPass] = useState("");
  const [user , setUser] = useContext(UserContext);
  const handleSubmit = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      toast("Congratulation !" , {
        type : "success"
      })
      setLoading(false);
      const user = userCredential.user;
      setUser({
        email : user.email,
        id : user.uid
      })
      navigate("/")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast(errorMessage , {
      type : "warning"
    })
    setUser(null);
    setLoading(false);
  });
  }

  return (
    <div className="main-container glass">
        <div className="container glass2">
            <img id="logo" src="./movix-logo.png"/>
            <h5>Login to Continue :)</h5>
            <input placeholder="Enter your E-mail Address" type="email"  name="" id="" value={email} onChange={(e)=>{
              setEmail(e.target.value);
            }}/>
            <input placeholder="Create a Password" type="password"  name="" id="" value={pass} onChange={(e)=>{
              setPass(e.target.value);
            }}/>
            <button onClick={(e)=>{
              handleSubmit();
            }}>Signin</button>
            <p>Don't have an Account ? <Link to="/signup" style={{textDecoration:"none"}}><span>Register</span></Link></p>
        </div>
    </div>
  )
}

export default Signin;