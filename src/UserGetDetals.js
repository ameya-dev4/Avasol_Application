import React ,{useState,useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {GetToken} from '../src/Api/auth'
import {Col,Card,Row,Button} from 'react-bootstrap'
import SERVER_URL from './Server/Server'

function UserGetDetails(){
  const [data, setData]= useState(null)
  const [ error, setError] = useState(null)

  const [showdetails,setDetails]=useState([])
  const user_name=localStorage.getItem('username')
  const parse_username=JSON.parse(user_name)
  console.log("user",parse_username)
  const access_token= GetToken();
    useEffect(async ()=>{
      const jsonData={
        username :parse_username,
      }

    try {
      const response= await fetch(`${SERVER_URL}user/get-profile`,{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Access-Control-Allow-Origin': 'https://localhost:3000',
          'Authorization':`Bearer ${access_token}`,
          'Content-Type':'application/json'
        },
        body:JSON.stringify(jsonData),
  
      }) 
        if (response.ok){
          const result=await response.json()
          setData(result)
        }else{
          throw new Error('Failed to get user details...!')
        }
    } catch (error) {
      setError(error.message)
    }
    
      
    },[])
      

    .then(response=>response.json())
      .then(data=>{
        console.log(data)
        localStorage.setItem('userdetails',JSON.stringify(data))
        setDetails(data)
        
      }).catch(error =>{
        console.error(error)
      })

   const user_details=localStorage.getItem('userdetails')
   const parse_userDetails=JSON.parse(user_details)
   console.log("parse",parse_userDetails)
  
  
}

export default UserGetDetails;