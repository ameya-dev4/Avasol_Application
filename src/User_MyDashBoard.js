import React, { useState,useEffect } from 'react'
import LatestServReqHome from './LatestSerReqHome'
import ErrorBoundary from './ErrorHandlingPage'
import { GetToken } from './Api/auth'
import SERVER_URL from './Server/Server'

const User_MyDashBoard = () => {
  const authToken =GetToken()
  const [user_Details, setUserDetails] = useState([])
  useEffect (() =>{ async function fetchDetails(){
    const response = await fetch(`${SERVER_URL}user/get-profile`,{
        method : 'GET',
        headers : {
            'Authorization' : `Bearer ${authToken}`,
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    }).then((response) => response.json())
    .then((user_Details) =>{
      setUserDetails(user_Details);
      console.log(user_Details);
        
    })
  }
  fetchDetails();
},[])

 localStorage.setItem('profile_details',JSON.stringify(user_Details))

  return (
    
      <LatestServReqHome/>
    
    
  )
}

export default User_MyDashBoard
