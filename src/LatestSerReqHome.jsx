import React, { useEffect, useState } from 'react';
import { AppBar, Button, Container, Toolbar, Typography ,Divider} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetToken } from '../src/Api/auth';
import { NavLink,Link, Navigate,BrowserRouter, useNavigate} from 'react-router-dom';
import PostDisplayDetails from './table_js';
import UserDash_upblock from './UserDash_upblock';
import Dashboard_upBlocks from './Dashboard_upBlocks';
import Header from './Header'
import Sidebar from './Sidebar'

const access_token =GetToken()
const apiUrl = 'http://avasol.ameyalabs.com:5000/latest-service-requests'; 
const user_name=localStorage.getItem('username')
const parse_username=JSON.parse(user_name)
let batteryId_value;

function LatestServReqHome({Toggle}) {
  const navigate=useNavigate();
  const [latestRequests, setLatestRequests] = useState([]);
  const[displayDetails , setDisplayDetails] = useState(false);
  


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
      } catch (error) {
        console.error('Error fetching latest requests:', error);
      }
    }

    // Call the function to get and display the latest service requests on page load
    getLatestRequests();
  }, [])

  function handleClick(batteryId){
    setDisplayDetails(true)
    batteryId_value = batteryId;
    console.log(batteryId);
  }

  function Display(){
    console.log(batteryId_value)
    let BatteryInfo = []
    for (let i=0 ; i<latestRequests.length ; i++){
      if(batteryId_value === latestRequests[i].batteryId){
        BatteryInfo = latestRequests[i];
        console.log(BatteryInfo);
      }
    }

    return(
      <PostDisplayDetails/>
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
            navigate('/latest_serv_request')
            
        })
        .catch((error) => {
            console.log(error)
        });
  }

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <>
      
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className="main-container">
      <Dashboard_upBlocks/><br/>
      
      <Container>
          <Typography variant='h4' sx={{mb:"2rem"}}>Latest Service Request <Button variant='contained' style={{backgroundColor:'lightseagreen'}} onClick={()=>navigate('/Service_ReqPage')} sx={{ml:'520px'}} >Add Service Request</Button> </Typography>
          { latestRequests.length ===0 ? <Typography >No Recent Requests</Typography> : 

          <PostDisplayDetails/>
        }
      </Container>

      </main> 
      
        
    </div>

            
    
    </>
    
  )

  // return (
  //   <div>
  //     {/* <UserDash_upblock/> */}
  //     <Dashboard_upBlocks/><br/>
      
  //       <Container>
  //           <Typography variant='h4' sx={{mb:"2rem"}}>Latest Service Request <Button variant='contained' style={{backgroundColor:'lightseagreen'}} onClick={()=>navigate('/Service_ReqPage')} sx={{ml:'520px'}} >Add Service Request</Button> </Typography>
  //           { latestRequests.length ===0 ? <Typography >No Recent Requests</Typography> : 

  //           <PostDisplayDetails/>
            
  //     }
  // </Container>





  //   </div>
  // );
}

export default LatestServReqHome;