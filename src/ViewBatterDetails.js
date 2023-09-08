import React, { useEffect, useState } from 'react';
import { AppBar, Button, Container, Toolbar, Typography ,Divider} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetToken } from '../src/Api/auth'
import { NavLink,Link, useNavigate} from 'react-router-dom';
import {Card,Col,Collapse, Row} from 'react-bootstrap'
import DisplayBattery from './batteryComponent';
import UserDash_upblock from './UserDash_upblock';
import Dashboard_upBlocks from './Dashboard_upBlocks';

const access_token =GetToken()
const apiUrl = 'http://avasol.ameyalabs.com:5000/view-batteries'; 



let batteryId_value;

function ViewBatteryDetails({Toggle}) {
  const [latestRequests, setLatestRequests] = useState([]);
  const[displayDetails , setDisplayDetails] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    // Function to make the GET request
    async function getLatestRequests() {
      try {
        const response = await fetch(apiUrl,{
            method:"GET",
            headers:{
                'Content-Type':"application/json",
                "Authorization": "Bearer " + access_token,
            },
        });
        const data = await response.json();
        setLatestRequests(data);
        // console.log(data)
      } catch (error) {
        console.error('Error fetching latest requests:', error);
      }
    }

    // Call the function to get and display the latest service requests on page load
    getLatestRequests();
  }, []);

  function handleClick(batteryId){
    setDisplayDetails(true)
    batteryId_value = batteryId;
    // console.log("hello",batteryId);
  }

  function Display(){
    console.log(batteryId_value)
    let BatteryInfo = []
    for (let i=0 ; i<latestRequests.length ; i++){
      if(batteryId_value === latestRequests[i].batteryId){
        BatteryInfo = latestRequests[i];
         console.log("battery",BatteryInfo);
      }
    }

    return(
      <DisplayBattery/>
    )
  }

  function handleDelete(){
    
    let BatteryInfo = [];
    for (let i=0 ; i<latestRequests.length ; i++){
      if(batteryId_value === latestRequests[i].batteryId){
        BatteryInfo = latestRequests[i];
        console.log(BatteryInfo);

      }
    }

    fetch('http://avasol.ameyalabs.com:5000/delete-service-request',{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':"Bearer "+access_token,
            },
            body : JSON.stringify(BatteryInfo),
        }).then((response) => response.json())
        .then((Data) =>{
          setDisplayDetails(false);
            alert("Details are successfully Deleted");
            console.log(Data);
            navigate('/basic/Home')
            
        })
        .catch((error) => {
            console.log(error)
        });
  }




  return (
      <>
      <Dashboard_upBlocks/><br/>
      {/* <UserDash_upblock/> */}
            <Typography variant='h4' sx={{mb:"2rem",px:'20px'}}>Battery Details <Button  variant='contained' style={{backgroundColor:'lightseagreen'}} onClick={()=>navigate('/battery_add')} sx={{ml:'700px'}} >Add Battery</Button> </Typography>
            { latestRequests.length ===0 ? <Typography sx={{px:'20px'}}>No Recent Requests</Typography> : 
            <DisplayBattery />
              }
   </>
  );
}

export default ViewBatteryDetails;