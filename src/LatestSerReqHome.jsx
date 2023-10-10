import React, { useEffect, useState } from 'react';
import { AppBar, Button, Container, Toolbar, Typography ,Divider} from '@mui/material';
import { GetToken } from '../src/Api/auth';
import { Row,Col } from 'react-bootstrap';
import { NavLink,Link, Navigate,BrowserRouter, useNavigate} from 'react-router-dom';
import Dashboard_upBlocks from './Dashboard_upBlocks';
import Header from './Header'
import Sidebar from './Sidebar'
import DisplayBattery from './table_js';
import SERVER_URL from './Server/Server';

const access_token =GetToken()
const apiUrl = `${SERVER_URL}user/latest-service-requests`; 
const user_name=localStorage.getItem('username')
const parse_username=JSON.parse(user_name)
let batteryId_value;

function LatestServReqHome({Toggle}) {
  const navigate=useNavigate();
  const [latestRequests, setLatestRequests] = useState([]);
  const[displayDetails , setDisplayDetails] = useState(false);
  


  // useEffect(() => {
  //   // Function to make the GET request
  //   async function getLatestRequests() {
  //     try {
  //       const response = await fetch(apiUrl,{
  //           method:"GET",
  //           headers:{
  //               'Content-Type':"application/json",
  //               "Authorization": "Bearer " + access_token,
  //           },
  //       });
  //       const data = await response.json();
  //       setLatestRequests(data);
  //     } catch (error) {
  //       console.error('Error fetching latest requests:', error);
  //     }
  //   }

  //   // Call the function to get and display the latest service requests on page load
  //   getLatestRequests();
  // }, [])



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
        <Row md={12}>
          <Col>
          <Typography variant='h4'> Latest Request Details</Typography>
          </Col>
          <Col >
                <Typography variant='h4' ><Button  variant='contained' style={{backgroundColor:'lightseagreen',color:'white',marginLeft:'70%'}} onClick={()=>navigate('/Service_ReqPage')}  >Add Service Request</Button> </Typography>
          </Col>
            
        </Row><br/>
        <DisplayBattery/>
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