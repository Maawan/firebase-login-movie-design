import React, { useContext , useState } from 'react'
import {Link} from 'react-router-dom'
import ProcessingContext from '../Context/ProcessingContext'
import firebase from 'firebase/compat/app'
import firebaseConfig from '../Utils/FirebaseConfig'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import UserContext from '../Context/UserContext'

firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const Signup = () => {

  const handleEnter = (event) => {
    if (event.key === "Enter") {
        handleSubmit();
    }
  };

  const navigate = useNavigate();
  const [loading , setLoading] = useContext(ProcessingContext);
  const [user , setUser] = useContext(UserContext);
  const [email , setEmail] = useState("");
  const [pass , setPass] = useState("");
  const [repass , setRepass] = useState(""); 
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if(pass !== repass){
      return toast("Password does not Match" , {
        type:"warning"
      })
    }
    if(pass.length < 6){
      return toast("Password should be more than 6" , {
        type : "warning"
      })
    }
    if(email === ""){
      return toast("Email should not be empty" , {
        type : "warning"
      })
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setLoading(false);
    setUser({
      email : user.email,
      uid : user.uid
    })
    toast("Congratulation ! You are Registered" , {
      type : "success"
    })
    navigate("/");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setLoading(false);
    if(errorCode === "auth/email-already-in-use"){
      toast("Email Address is already in use :(" , {
        type : "warning"
      })
    }
    setUser(null);
    
    console.log(errorCode);
    // ..
  });
  }
  return (
    
    <div className="main-container glass">
        <div className="container glass2">
            <img id="logo" src="./movix-logo.png"/>
            <h5>Register with us and Enjoy :)</h5>
            <input placeholder="Enter your E-mail Address" type="email"  name="" id="" value={email} onChange={(e)=>{
              setEmail(e.target.value);
            }} />
            <input placeholder="Create a Password" type="password"  name="" id="" value={pass} onChange={(e)=>{
              setPass(e.target.value);
            }}/>
            <input onKeyDown={handleEnter} placeholder="Re- enter Password" type="password"  name="" id="" value={repass} onChange={(e)=>{
              setRepass(e.target.value);
            }}/>
            <button onClick={(e) => {
                handleSubmit(e);
            }}>Signup</button>
            <p>Already have an Account ? <Link to="/signin" style={{textDecoration:"none"}}><span>Signin</span></Link></p>
        </div>
    </div>
  )
}

export default Signup