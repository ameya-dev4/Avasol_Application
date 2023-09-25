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
const apiUrl = 'http://100.20.33.222:5000/user/get-battery-list'; 



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



  return (
      <>
      <Dashboard_upBlocks/><br/>
      {/* <UserDash_upblock/> */}
            <Typography variant='h4' sx={{mb:"2rem",px:'20px'}}>Battery Details <Button  variant='contained' style={{backgroundColor:'lightseagreen'}} onClick={()=>navigate('/battery_add')} sx={{ml:'700px'}} >Add Battery</Button> </Typography>
            { latestRequests.length ===0 ?
            <>
                <Typography sx={{px:'20px'}}>No Recent Requests</Typography>
                <div className=" position-absolute top-50 start-50 translate-middle col-1 shadow p-3 bg-body-tertiary rounded ">
                                
                <div className="text-center  py-1 px-2">
                <div className="spinner-border text-primary " role="status">
                  <span className="visually-hidden ">Loading...</span>
                </div> 
                <p className="text-dark d-flex justify-content-center">Loading....</p>
                </div>  

              </div>
          </>
            
            : 
            <DisplayBattery />
              }
   </>
  );
}

export default ViewBatteryDetails;