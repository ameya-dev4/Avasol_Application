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
import SERVER_URL from './Server/Server';
import Table_Batteries from './Table_Batteries';

const access_token =GetToken()
const apiUrl = `${SERVER_URL}user/get-battery-list`; 



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
      <Dashboard_upBlocks/><br/><br/>
      {/* <UserDash_upblock/> */}
            
            { latestRequests.length ===0 ?
            <>
                <Typography sx={{px:'20px'}}>No Recent Requests</Typography>
          </>
            
            : 
            <Table_Batteries array_Details={latestRequests}/>
            // <DisplayBattery />
              }
   </>
  );
}

export default ViewBatteryDetails;