// import React ,{useState,useEffect} from "react";
// import {Row,Col,Card,Form, Button, Container} from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom';
// import { GetToken } from "../src/Api/auth";
// import Sidebar from './Sidebar'
// import Header from "./Header";
// import 'bootstrap/dist/css/bootstrap.min.css'

// const UserProfile = () => {
//     const [isdetails, setIsdetails]=useState(false);
//     const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
//     const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle)
//   }

//   const [showdetails,setDetails]=useState([])
//   const user_name=localStorage.getItem('username')
//   const parse_username=JSON.parse(user_name)
// //   console.log("parse_user",parse_username)
//   const navigate=useNavigate()
//   const access_token=GetToken()


//     useEffect(()=>{
//       const jsonData={
//         username :parse_username,
//       }
//       console.log("jsondata",jsonData)
//     fetch("http://100.20.33.222:5000/user/get-profile",{
//       method:'GET',
//       headers:{
//         'Accept':'application/json',
//         'Access-Control-Allow-Origin':'https://localhost:3000',
//         'Authorization':`Bearer ${access_token}`,
//         'Content-Type':'application/json'
//       },
//     //   body:JSON.stringify(jsonData),

//     }) 
//     .then(response=>response.json())
//       .then(data=>{
//         console.log(data)
//         setDetails(data)
//         setIsdetails(true)
//         localStorage.setItem('userdetails',JSON.stringify(data))
        
        
//       }).catch(error =>{
//         console.error(error)
//       })
      
//     },[])
      

// //    const user_details=localStorage.getItem('userdetails')
//    const password=localStorage.getItem('password')
//    const parse_password=JSON.parse(password)
// //    const parse_userDetails=JSON.parse(user_details)
// //    console.log("parse",parse_userDetails)

//    console.log("details",showdetails)

   
 
//    return (
//      <>
       
//      <div className='grid-container'>
//        <Header OpenSidebar={OpenSidebar}/>
//        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
//        <main className="main-container">
//        <Container className="m-3 mt-5 col ">
//             <div className="bg-primary rounded mb-3 text-white m-2 p-2 px-3">
//                 <header>UserProfile</header>
//             </div>
//             {isdetails?
//             (
//             <Card className="shadow p-3 mb-5 bg-body-tertiary rounded">
//             <Col className="m-3 mt-5 col" >
//                 <Row className="mb-2" >
//                     <Col>
//                         <Form.Label>First Name</Form.Label>
//                         <Form.Control type="text" value={showdetails.firstName} readOnly style={{cursor:'not-allowed'}}></Form.Control>
//                     </Col>
//                     <Col>
//                         <Form.Label>Last Name</Form.Label>
//                         <Form.Control type="text" value={showdetails.lastName} readOnly style={{cursor:'not-allowed'}}></Form.Control>
//                     </Col>
//                 </Row>
//                 <Row className="mb-2" >
//                     <Col>
//                         <Form.Label>Email ID</Form.Label>
//                         <Form.Control type="text" value={showdetails.emailId} readOnly style={{cursor:'not-allowed'}}></Form.Control>
//                     </Col>
//                     <Col>
//                         <Form.Label>Mobile Number</Form.Label>
//                         <Form.Control type="text" value={showdetails.contactNumber} readOnly style={{cursor:'not-allowed'}}></Form.Control>
//                     </Col>
//                 </Row>
//                 <Row className="mb-2" >
//                     <Col>
//                         <Form.Label>House No</Form.Label>
//                         <Form.Control type="text" value={showdetails.address} readOnly style={{cursor:'not-allowed'}}></Form.Control>
//                     </Col>
//                     <Col>
//                         <Form.Label>Area Name</Form.Label>
//                         <Form.Control type="text" value={showdetails.city} readOnly style={{cursor:'not-allowed'}}></Form.Control>
//                     </Col>
//                 </Row>
//                 <Row className="mb-2" >
//                     <Col>
//                         <Form.Label>District</Form.Label>
//                         <Form.Control type="text" value={showdetails.district} readOnly style={{cursor:'not-allowed'}}></Form.Control>
//                     </Col>
//                     <Col>
//                         <Form.Label>Mandal</Form.Label>
//                         <Form.Control type="text" value={showdetails.mandal} readOnly style={{cursor:'not-allowed'}}></Form.Control>
//                     </Col>
//                 </Row>
//                 <Row className="mb-2" >
//                     <Col>
//                         <Form.Label>Latitude</Form.Label>
//                         <Form.Control type="text" value={showdetails.latitude} readOnly style={{cursor:'not-allowed'}}></Form.Control>
//                     </Col>
//                     <Col>
//                         <Form.Label>Longitude</Form.Label>
//                         <Form.Control type="text" value={showdetails.longitude} readOnly style={{cursor:'not-allowed'}} ></Form.Control>
//                     </Col>
//                 </Row>
//                 <Row className="mb-2" >
//                     <Col>
//                         <Form.Label>Pincode</Form.Label>
//                         <Form.Control type="text" value={showdetails.pincode} readOnly style={{cursor:'not-allowed'}}></Form.Control>
//                     </Col>
//                 </Row>
//                 <Row className="mb-2" >
//                     <Col >
//                         <Form.Label>Current Password</Form.Label>
//                         <Form.Control type="password" value={parse_password} readOnly style={{cursor:'not-allowed'}} ></Form.Control>
//                     </Col>
//                     <Col md={6}>
//                     </Col>
//                     <Col md={3} className="d-flex flex-row-reverse mt-4">
//                         <Col>
//                             <Button  variant='danger'onClick={()=>navigate('/latest_serv_request')} className="feather icon-x"> Cancle</Button>
//                         </Col>
//                         <Col>
//                             <Button variant="success" onClick={()=>navigate('/edit_profile')}><i className="fa fa-edit"> Edit</i> </Button>
//                         </Col>    
                    
//                     </Col>
//                 </Row>
//             </Col>
//             </Card>
//    )
//          :(
//             <Container style={{width:'100%',height:'100%',backgroundColor:'white'}}>
//               <div className=" position-absolute top-50 start-50 translate-middle col-1 shadow p-3 bg-body-tertiary rounded ">
                    
//                       <div className="text-center d-flex justify-content-center py-2 px-2">
//                       <div className="spinner-border text-primary " role="status">
//                         <span className="visually-hidden ">Loading...</span>
//                       </div> 
//                       </div>  
                            
//                     </div>

//                 </Container>
//          )
//          }
//         </Container> 
//        </main> 
 
         
//            </div>
 
             
     
//      </>
     
//    )

// }

// export default UserProfile


import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import { useNavigate } from 'react-router-dom';
import {Grid,Typography,Button,Table,Link,FormControl,FormControlLabel,Radio,RadioGroup,Box} from '@mui/material';
import Header from "./Header";
import FormField from './Update/InputFormField';
import Sidebar from './Sidebar';
import Dashboard_upBlocks from './Dashboard_upBlocks';


const authToken = GetToken();



function UserProfile() {
  const navigate = useNavigate();
  const [user_Details,setUserDetails] = useState({})
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  const password=localStorage.getItem('password')
  const parse_password=JSON.parse(password)
  
  useEffect (() =>{ async function fetchDetails(){
    const response = await fetch('http://100.20.33.222:5000/user/get-profile',{
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const {name , value} = e.target;
    setUserDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  

  const onSubmit = (e) => {
    e.preventDefault();
    // formData contains the form values
    navigate('/edit_profile');
  };

  return (
    <div className="grid-container"  style={{borderBlock:'2px solid black'}}>
      {/* ... form rendering ... */}
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
      <form onSubmit={onSubmit}>
        <Table sx={{border:'1px solid black',p:2,bgcolor:'white'}}>
        <Grid container spacing={2} sx={{border:'1px black'}}>
        <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                color='primary'
                fullWidth
                sx={{ mb: 3  }}
                
              >
                <Typography variant="h5" sx={{textAlign :'left',textTransform:'none'}}>Update Profile</Typography>
              </Button>
            </Grid>
       
          <Grid item xs={12} sm={12}>
            <Box>
              <Typography sx={{color:'black',fontWeight:'500',fontSize:'28px',m:3,mt:2}}>Personal Info</Typography>
            </Box>
          </Grid>
        {/* Horizontal Line */}
        <Grid sm={12} xs={12}>
        <hr style={{width:'98%',color:'grey',align:'right'}} noshade />
        </Grid>

        
        {/* Row 1 */}
        <FormField label="First Name" name="firstName" value={user_Details.firstName} onChange={handleInputChange} />
        <FormField  label="Last Name" name="lastName"  value={user_Details.lastName} onChange={handleInputChange}  />

        {/* Row 2 */}
        <FormField label="Contact Number#" name="contactNumber" onChange={handleInputChange} value={user_Details.contactNumber}/>
        <FormField label="Email Id" name="emailId" onChange={handleInputChange}  value={user_Details.emailId}/>
        
        {/* Row 3 */}
        <FormField label="House No" name="houseNo" onChange={handleInputChange} value={user_Details.houseNo}/>
        <FormField label="Area Name" name="areaName" onChange={handleInputChange} value={user_Details.areaName}/>
        {/* <Grid item xs={12} sm={6}>
        <Box>
          <Typography sx={{color:'black',fontSize:'24px',mb:3,ml:3}} >Training Completed</Typography>
        <FormControl>
              <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              sx={{ml:3}}
              >
                <FormControlLabel value="yes" defaultValue ="yes" control={<Radio />} label="Yes" sx={{fontSize:'14px',color:'black'}}/>
                <FormControlLabel value="no" control={<Radio />} label="No" sx={{fontSize:'14px',color:'black'}}/>
            </RadioGroup>
            </FormControl>
          </Box>
          </Grid> */}
          
        <Grid item xs={12} sm={12}>
            <Box>
              <Typography sx={{color:'black',fontWeight:'500',fontSize:'28px',m:3,mt:5}}>Address Details </Typography>
            </Box>
          </Grid>
        {/* Horizontal Line */}
        <Grid sm={12} xs={12}>
        <hr style={{width:'98%',color:'grey',align:'right'}} noshade />
        </Grid>


        
        {/* Row 4 */}
        <FormField label="District" name="district" onChange={handleSelectChange}  value={user_Details.district}/>
        <FormField label="Mandal" name="mandal"  onChange={handleInputChange} value={user_Details.mandal} />
        
        {/* Row 5 */}
        <FormField label="Latitude" name="latitude" onChange={handleInputChange} value={user_Details.latitude}/>
        <FormField label="Longitude" name="longitude" onChange={handleInputChange}  value={user_Details.longitude}/>

        {/* Row 6 */}
        <FormField label="Pincode" name="pincode" onChange={handleInputChange} value={user_Details.pincode}/>
        <FormField label="Current Password" name="currentPassword" onChange={handleInputChange}  value={parse_password}/>
        
        
        <Grid item xs={2}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 7,mb:2,ml:40}}
                onClick={() => navigate(-1)}
              >
               close
              </Button>
            </Grid>
        <Grid item xs={2}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                fullWidth
                sx={{ ml: 45,mb:2,mt:7  }}
              >
                Edit
              </Button>
            </Grid>
            </Grid>
        </Table>
      </form>
      </main>
    </div>

  )
}

export default UserProfile;