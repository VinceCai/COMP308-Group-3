import React , { useState, useEffect } from 'react';
import axios from 'axios';
import Predict from './predict'
import Spinner from 'react-bootstrap/Spinner';
import './AiHealth.css';
//import { Fade } from 'react-bootstrap';

function AiHealth() { 


 const [showLoading, setShowLoading] = useState(true);
 const apiTrainUrl ="http://localhost:5000/api/train";

 //runs once after the first rendering of page
 useEffect (()=>{
   const fetchData = async () =>{
     axios.post(apiTrainUrl)
     .then(result =>{
       console.log('result.data： ', result.data);
       setShowLoading (false)
      }).catch((error)=>{
        console.log ('error in fatchData: ',error);
      });
   };
   fetchData();
 },[]);
 return (
   <div>
     {
       showLoading === false
       ? <Predict />
        :<div>
          {
           showLoading && <Spinner animation ="border" role ="status">
             <span className="sr-only"> Wait for results ......</span>
           </Spinner>}
           </div>
         }     
        </div>
      );     
}


export default AiHealth;
