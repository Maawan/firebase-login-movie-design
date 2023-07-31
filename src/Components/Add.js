import React, { useContext, useEffect, useState } from "react";
import UserContext from "../Context/UserContext";
import { useNavigate, Navigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebase from "firebase/compat/app";
import firebaseConfig from "../Utils/FirebaseConfig";
import ProcessingContext from "../Context/ProcessingContext";
import { getDatabase, ref as ref2, set } from "firebase/database";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import UpdateContext from "../Context/UpdateContext";
firebase.initializeApp(firebaseConfig);
const storage = getStorage();
const db = getDatabase();

const Add = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useContext(ProcessingContext);
  const [movieName, setMovieName] = useState("");
  const [mode, setMode] = useState("");
  const [update, setUpdate] = useContext(UpdateContext);

  useEffect(()=>{
    if (update != null) {
        setMovieName(update.name);
        setMode(update.type);
        setImageUrl(update.img);
        
      }
  },[update])
  

  const handleImageSelect = (e) => {
    setImageUrl("");
    setFile(null);
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = function () {
        const imageDataURL = reader.result;
        setImageUrl(imageDataURL);
        console.log("This is Image Url " + imageDataURL); // Log the updated imageUrl here.
      };
    }
    console.log(e.target.files);
  };
  const uploadFile = (selectedFile) => {
    if (selectedFile !== null) {
      const storageRef = ref(storage, "image/" + selectedFile.name);
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          console.log("Image uploaded successfully!");
          return getDownloadURL(storageRef);
        })
        .then((downloadURL) => {
          console.log("Download URL:", downloadURL);
          saveData(downloadURL);
        })
        .catch((error) => {
          setLoading(false);
          toast(error, {
            type: "warning",
          });
        });
    } else {
      saveData(update != null ? update.img : undefined);
    }
  };
  const saveData = (downloadURL) => {
    const tempId = v4();
    const tempUrl = downloadURL === undefined ? "" : downloadURL;
    if (update == null) {
      set(ref2(db, "users/" + user.uid + "/" + tempId), {
        img: tempUrl,
        name: movieName,
        type: mode,
      });
    } else {
      set(ref2(db, "users/" + user.uid + "/" + update.id), {
        img: tempUrl,
        name: movieName,
        type: mode,
      });
    }

    setLoading(false);
    toast("Data Inserted Successfully !", {
      type: "success",
    });
    navigate("/");
    setUpdate(null);
  };
  const insertData = (e) => {
    setLoading(true);
    uploadFile(file);
  };

  useEffect(() => {
    const loginInfo = localStorage.getItem("login");
    if(loginInfo !== undefined && loginInfo !== null && loginInfo !== "null"){
      setUser(JSON.parse(loginInfo));
      
    }else{
      navigate("/")
    }
  },[])

  return (
    <div>
      
        <div class="main-container glass">
          <div className="container glass2">
            <input
              accept="image/*"
              style={{
                backgroundImage:
                  imageUrl !== ""
                    ? `url("${imageUrl}")`
                    : "url(https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png)",
                backgroundSize: "cover",
              }}
              type="file"
              name=""
              id=""
              onChange={(e) => {
                handleImageSelect(e);
              }}
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter Movie Name"
              onChange={(e) => {
                setMovieName(e.target.value);
              }}
              value={movieName}
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter Type of Movie"
              onChange={(e) => {
                setMode(e.target.value);
              }}
              value={mode}
            />
            <button
              onClick={(e) => {
                insertData();
              }}
            >
              Add :)
            </button>
          </div>
        </div>
      
    </div>
  );
};

export default Add;
