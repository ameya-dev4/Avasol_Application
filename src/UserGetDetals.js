import React ,{useState,useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {GetToken} from '../src/Api/auth'
import {Col,Card,Row,Button} from 'react-bootstrap'


function UserGetDetails(){
  const [showdetails,setDetails]=useState([])
  const user_name=localStorage.getItem('username')
  const parse_username=JSON.parse(user_name)
  console.log("user",parse_username)
  const access_token= GetToken();
    useEffect(()=>{
      const jsonData={
        username :parse_username,
      }

    fetch("http://avasol.ameyalabs.com:5000/get-user-details",{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Access-Control-Allow-Origin': 'https://localhost:3000',
        'Authorization':`Bearer ${access_token}`,
        'Content-Type':'application/json'
      },
      body:JSON.stringify(jsonData),

    }) 
    .then(response=>response.json())
      .then(data=>{
        console.log(data)
        localStorage.setItem('userdetails',JSON.stringify(data))
        setDetails(data)
        
      }).catch(error =>{
        console.error(error)
      })
      
    },[])
      

   const user_details=localStorage.getItem('userdetails')
   const parse_userDetails=JSON.parse(user_details)
   console.log("parse",parse_userDetails)
  
  
}

export default UserGetDetails;