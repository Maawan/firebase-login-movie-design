import logo from './logo.svg';
import './App.css';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import Home from './Components/Home';
import Loading from './Components/Loading';
import ProcessingContext from './Context/ProcessingContext';
import { useState } from 'react';
import UserContext from './Context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Add from './Components/Add'
import UpdateContext from './Context/UpdateContext';


const App = () => {
  const loading = useState(false);
  const update = useState(null);
  const user = useState(null);
  return (
    <UpdateContext.Provider value={update} >
    <UserContext.Provider value={user}>
    <ProcessingContext.Provider value={loading}>
    <Router>
      <Routes>
       <Route path="/" element={<Home/>} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </Router>
      <Loading />
      <ToastContainer />
    </ProcessingContext.Provider>
    </UserContext.Provider>
    </UpdateContext.Provider>
  );
}

export default App;
