import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import firebaseConfig from "../Utils/FirebaseConfig";
import UserContext from "../Context/UserContext";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import UpdateContext from "../Context/UpdateContext";
firebase.initializeApp(firebaseConfig);
const database = getDatabase();

const Table = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [dataFromDB, setDataFromDB] = useState();
  const [update , setUpdate] = useContext(UpdateContext);
  const check = () => {
    if (user !== null) {
      const starCountRef = ref(database, "users/" + user.uid);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        console.log("Done...");

        setDataFromDB(data);
        
        
      });
    }
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <div>
      {user == null ? (
        <p>Please Signin/Register</p>
      ) : (
        <div>
          <div className="movie-container glass">
            <div className="item">
              <div className="sub-item-1">
                <h3>Poster</h3>
              </div>
              <div className="sub-item-2">
                <h3>Movie Name</h3>
              </div>
              <div className="sub-item-3">
                <h3>Mode</h3>
              </div>
              <div className="sub-item-4">
                <h3>Actions</h3>
              </div>
            </div>
            <hr />
            
            {
                (dataFromDB != null) ? (Object.keys(dataFromDB).map((key) => (
                    <div className="item2">
              <div className="sub-item-1">
                <img src={dataFromDB[key].img} alt="" />
              </div>
              <div className="sub-item-2">
                <h3>{dataFromDB[key].name}</h3>
              </div>
              <div className="sub-item-3">{dataFromDB[key].type}</div>
              <div className="sub-item-4">
                <AiFillEdit onClick={(e)=>{
                    setUpdate({
                        id : key,
                        name : dataFromDB[key].name,
                        type : dataFromDB[key].type,
                        img : dataFromDB[key].img
                    });
                    navigate("/add");
                }} />
                <AiFillDelete />
              </div>
            </div>
                ))) : (null)
            }
          </div>
          <div
            className="add-button glass"
            onClick={(e) => {
              navigate("/add");
            }}
          >
            <img src="./plus.png" alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
