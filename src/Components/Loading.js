import React, { useContext } from 'react'
import Loader from 'react-spinner-loader';
import ProcessingContext from '../Context/ProcessingContext';

const Loading = () => {
    const [loading , setLoading] = useContext(ProcessingContext);
    const st = {
        display : loading ? "flex" : "none"
    }
  return (
    <div className="loading-container glass" style={st}>
        <div className="loading-container2 glass2">
        <Loader show = {true} style={{marginTop:"10px"}}>Processing</Loader>
            <p id="pro">Processing</p>
        </div>
    </div>
  )
}

export default Loading