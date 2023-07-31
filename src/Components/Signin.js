import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import firebaseConfig from "../Utils/FirebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import ProcessingContext from "../Context/ProcessingContext";
import GoogleButton from "react-google-button";

firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const Signin = () => {
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  const [user, setUser] = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(() => {
    const loginInfo = localStorage.getItem("login");
    if (loginInfo !== undefined && loginInfo !== null && loginInfo !== "null") {
      setUser(JSON.parse(loginInfo));
      console.log(loginInfo);
      console.log("checked");
      navigate("/")
    }else{
      setUser(null);
      console.log("oops null");
    }
  }, []);

  const [loading, setLoading] = useContext(ProcessingContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handleSubmit = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        toast("Congratulation !", {
          type: "success",
        });
        setLoading(false);
        const user = userCredential.user;
        setUser({
          email: user.email,
          uid: user.uid,
        });
        localStorage.setItem(
          "login",
          JSON.stringify({
            email: user.email,
            uid: user.uid,
          })
        );
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast(errorMessage, {
          type: "warning",
        });
        setUser(null);
        setLoading(false);
      });
  };
  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        setUser({
          email: user.email,
          uid: user.uid,
        });
        localStorage.setItem(
          "login",
          JSON.stringify({
            email: user.email,
            uid: user.uid,
          })
        );
        toast("Congratulation !", {
          type: "success",
        });
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        setUser(null);
        setLoading(false);
        toast(errorMessage, {
          type: "warning",
        });
      });
  };

  return (
    <div className="main-container glass">
      
        <div className="container glass2">
        <img id="logo" src="./movix-logo.png" />
        <h5>Login to Continue :)</h5>
        <input
          placeholder="Enter your E-mail Address"
          type="email"
          name=""
          id=""
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          onKeyDown={handleEnter}
          placeholder="Create a Password"
          type="password"
          name=""
          id=""
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            handleSubmit();
          }}
        >
          Signin
        </button>
        <GoogleButton type="light" onClick={() => handleGoogleSignIn()} />
        <p>
          Don't have an Account ?{" "}
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <span>Register</span>
          </Link>
        </p>
      </div>
      
    </div>
  );
};

export default Signin;
