import React, { useContext } from 'react'
import firebase from 'firebase/compat/app'
import { getDatabase , ref , set } from 'firebase/database'
import firebaseConfig from '../Utils/FirebaseConfig'
import UserContext from '../Context/UserContext'
import {AiFillEdit , AiFillDelete} from 'react-icons/ai'

firebase.initializeApp(firebaseConfig)

const database = getDatabase();

const Table = () => {

    const [user , setUser] = useContext(UserContext);
    const handleClick = () => {
        set(ref(database, 'users/'+ user.uid ), {
            username: "TestName",
            email: "test@test.com"
        });
    }
    handleClick();
    return (
        <div>
            {
                (user == null) ? (<p>Please Signin/Register</p>) : (
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
                        <hr/>
                        <div className="item2">
                            <div className="sub-item-1">
                                <img src="https://picsum.photos/200" alt="" />
                            </div>
                            <div className="sub-item-2">
                                <h3>Movie Name</h3>
                            </div>
                            <div className="sub-item-3">
                                Mode  
                            </div>
                            <div className="sub-item-4">
                            <AiFillEdit />
                                <AiFillDelete />
                            </div>



                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Table