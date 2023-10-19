// import React, { useEffect, useState } from 'react';
// import { AppBar, Button, Container, Toolbar, Typography, Divider } from '@mui/material';
// import { GetToken } from '../src/Api/auth';
// import { Row, Col } from 'react-bootstrap';
// import { NavLink, Link, Navigate, BrowserRouter, useNavigate } from 'react-router-dom';
// import Dashboard_upBlocks from './Dashboard_upBlocks';
// import Header from './Header'
// import Sidebar from './Sidebar'
// import DisplayBattery from './table_js';
// import SERVER_URL from './Server/Server';
// import Popup from './Popup';

// const access_token = GetToken()
// const apiUrl = `${SERVER_URL}user/get-battery-list`;
// const user_name = localStorage.getItem('username')
// const parse_username = JSON.parse(user_name)
// let batteryId_value;

// function LatestServReqHome({ Toggle }) {
//   const navigate = useNavigate();
//   const [latestRequests, setLatestRequests] = useState([]);
//   const [displayDetails, setDisplayDetails] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     // Function to make the GET request
//     async function getBatteryData() {
//       try {
//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             'Content-Type': "application/json",
//             "Authorization": "Bearer " + access_token,
//           },
//         });
//         const data = await response.json();
//         setLatestRequests(data);
//       } catch (error) {
//         console.error('Error fetching battery details:', error);
//       }
//     }

//     // Call the function to get and display the latest service requests on page load
//     getBatteryData();
//   }, [])

//   const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle)
//   }

//   const togglePopup = () => {
//     setIsOpen(!isOpen);
//   }
//   const handleRequest=()=>{
//     if(latestRequests.length>0){
      
//       navigate('/Service_ReqPage')
//     }else{
//       setIsOpen(!isOpen)
//     }
//   }

//   return (
//     <>
//       <div className='grid-container'>
//         <Header OpenSidebar={OpenSidebar} />
//         <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
//         <main className="main-container">
//           <Dashboard_upBlocks /><br />

//           <Container className='mt-5'>
//             <Row md={12}>
//               <Col>
//                 <Typography variant='h4'> Latest Request Details</Typography>
//               </Col>
//               <Col >
//                 <Typography variant='h4' ><Button variant='contained' style={{ backgroundColor: 'lightseagreen', color: 'white', marginLeft: '70%' }} onClick={handleRequest}  >Add Service Request</Button> </Typography>
//               </Col>
//             </Row><br />
//             <DisplayBattery />
//           </Container>

//           {isOpen && (
//             <Popup
//               content={
//                 <>
//                   <div className='alert alert-info'>
//                   <h3 style={{fontFamily:'sans-serif'}}>{parse_username}..! There are no Batteries added.</h3>
//                   <p><i>Please add battery by click on <b>Add Battery</b></i></p>
//                   <Row>
//                     <Col>
//                       <Button  variant='contained' onClick={togglePopup}>Close</Button>
//                     </Col>
//                     <Col>
//                       <Button variant='contained' onClick={()=>navigate('/battery_add')}>Add Battery</Button>
//                     </Col>
//                   </Row>
                  
//                   </div>
//                 </>
//               }
//               handleClose={togglePopup}
//             />
//           )}

//         </main>

//       </div>
//     </>
//   )
// }

// export default LatestServReqHome;

import React, { useEffect, useState } from 'react';
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import { GetToken } from '../src/Api/auth';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Dashboard_upBlocks from './Dashboard_upBlocks';
import Header from './Header';
import Sidebar from './Sidebar';
import DisplayBattery from './table_js';
import SERVER_URL from './Server/Server';
import Popup from './Popup';

const access_token = GetToken();
const apiUrl = `${SERVER_URL}user/get-battery-list`;
const user_name = localStorage.getItem('username');
const parse_username = JSON.parse(user_name);
let batteryId_value;

function LatestServReqHome({ Toggle }) {
  const navigate = useNavigate();
  const [latestRequests, setLatestRequests] = useState([]);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    // Function to make the GET request
    async function getBatteryData() {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + access_token,
          },
        });
        const data = await response.json();
        setLatestRequests(data);
        setIsLoading(false); // Set loading state to false after fetching the data
      } catch (error) {
        console.error('Error fetching battery details:', error);
        setIsLoading(false); // Set loading state to false even if an error occurs
      }
    }

    // Call the function to get and display the latest service requests on page load
    getBatteryData();
  }, []);

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleRequest = () => {
    if (isLoading) {
      return; // Return if data is still loading
    }
    if (latestRequests.length > 0) {
      navigate('/Service_ReqPage');
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <main className="main-container">
          <Dashboard_upBlocks />
          <br />

          <Container className="mt-5">
            <Row md={12}>
              <Col>
                <Typography variant="h4"> Latest Request Details</Typography>
              </Col>
              <Col>
                <Typography variant="h4">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: 'lightseagreen', color: 'white', marginLeft: '70%' }}
                    onClick={handleRequest}
                  >
                    Add Service Request
                  </Button>{' '}
                </Typography>
              </Col>
            </Row>
            <br />
            <DisplayBattery />
          </Container>

          {isOpen && (
            <Popup
              content={
                <>
                  <div className="alert alert-info">
                    <h3 style={{ fontFamily: 'sans-serif' }}>
                      {parse_username}..! There are no Batteries added.
                    </h3>
                    <p>
                      <i>Please add battery by click on <b>Add Battery</b></i>
                    </p>
                    <Row>
                      <Col>
                        <Button variant="contained" onClick={togglePopup}>
                          Close
                        </Button>
                      </Col>
                      <Col>
                        <Button variant="contained" onClick={() => navigate('/battery_add')}>
                          Add Battery
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </>
              }
              handleClose={togglePopup}
            />
          )}
        </main>
      </div>
    </>
  );
}

export default LatestServReqHome;
