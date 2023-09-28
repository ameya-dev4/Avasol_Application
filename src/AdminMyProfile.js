// import React,{useState} from "react";
// import {Container,Col,Row,Card,Form,Button} from 'react-bootstrap'
// import Header from "./Header";
// import Admin_sidebar from "./Admin_sidebar";
// import { json, useNavigate } from "react-router-dom";
// import { GetToken } from "./Api/auth";

// const AdminMyProfile = () => {
//     const [isdetails, setIsdetails]=useState(false)
//     const access_token=GetToken()
//     const navigate=useNavigate()
//     const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
//     const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle)
//     }

//     try{
//         fetch('http://100.20.33.222:5000/admin/get-profile',{
//             method:'GET',
//             mode:'cors',
//             headers:{
//                 'Content-Type':'application/json',
//                 'Authorization':`Bearer ${access_token}`
//             }

//         })
//         .then(resp=> resp.json())
//         .then(data=>{
//             console.log("data",data)
//             setIsdetails(true)
//             localStorage.setItem('admin_details',JSON.stringify(data))
//         })

//     }
//     catch(err){
//         console.error("fetching admin details error:",err)
//     }

//     const admin_details=localStorage.getItem('admin_details')
//     const parse_admin=JSON.parse(admin_details)
//     console.log(parse_admin.firstName)


//     return (
//       <>
//     <div className='grid-container'>
//       <Header OpenSidebar={OpenSidebar}/>
//       <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
//       <main className="main-container">
//       <div className="col">
//         <Container className="m-3 mt-3 col ">
//             <div className="bg-primary rounded mb-3 text-white m-2 p-2 px-3">
//                 <header>My Profile</header>
//             </div>
//             {isdetails?
//             (
//                 <Card className="shadow p-2 mb-5 bg-body-tertiary rounded">
//                 <h4> Personal Info</h4>
//                 <hr></hr>
//                 <Col className="m-3 mt-3 col" >
//                     <Row className="mb-2" >
//                         <Col>
//                             <Form.Label>First Name</Form.Label>
//                             <Form.Control type="text" value={parse_admin.firstName} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
//                         </Col>
//                         <Col>
//                             <Form.Label>Last Name</Form.Label>
//                             <Form.Control type="text" value={parse_admin.lastName} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
//                         </Col>
//                     </Row>
//                     <Row className="mb-2" >
//                         <Col>
//                             <Form.Label>Email ID</Form.Label>
//                             <Form.Control type="text" placeholder="Example@gmail.com" value={parse_admin.emailId} style={{cursor:'not-allowed'}}  readOnly ></Form.Control>
//                         </Col>
//                         <Col>
//                             <Form.Label>Mobile Number</Form.Label>
//                             <Form.Control type="text"  value={parse_admin.contactNumber} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
//                         </Col>
//                     </Row>
//                     <Row className="mb-2" >
//                         <Col>
//                             <Form.Label>Service State</Form.Label>
//                             <Form.Control type="text" placeholder="Delhi" value={parse_admin.firstName} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
//                         </Col>
//                         <Col>
//                             <Row  className="mt-5">
//                                 <Col >
//                                     <Form.Label>Training Completed</Form.Label>
//                                 </Col>
//                                 <Col style={{cursor:'not-allowed'}}  readOnly>
//                                     <div className="form-check">
//                                         <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
//                                         <label className="form-check-label" for="flexRadioDefault1">
//                                             Yes
//                                         </label>
//                                     </div>
//                                 </Col>
//                                 <Col style={{cursor:'not-allowed'}}  readOnly>
//                                     <div className="form-check">
//                                     <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
//                                             <label className="form-check-label" for="flexRadioDefault2">
//                                                 No
//                                             </label>
//                                     </div>         
//                                 </Col>
//                             </Row>
//                         </Col>
//                     </Row><br/>
//                     <h4> Address</h4>
//                     <hr></hr>
//                     <Row className="mb-2" >
//                         <Col>
//                             <Form.Label>Address 1</Form.Label>
//                             <Form.Control type="text" value={parse_admin.address} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
//                         </Col>
//                         <Col>
//                             <Form.Label>Address 2</Form.Label>
//                             <Form.Control type="text" style={{cursor:'not-allowed'}}  readOnly ></Form.Control>
//                         </Col>
//                     </Row>
//                     <Row className="mb-2" >
//                         <Col>
//                             <Form.Label>District</Form.Label>
//                             <Form.Control type="text" value={parse_admin.district} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
//                             {/* <select className="form-select" aria-label="Default select example" >
//                                 <option selected>Select State</option>
//                                 <option value="1">Telangana</option>
//                                 <option value="2">Krishna</option>
//                                 <option value="3">Guntur</option>
//                             </select> */}
//                         </Col>
//                         <Col>
//                             <Form.Label>Mandal</Form.Label>
//                             <Form.Control type="text" value={parse_admin.mandal} style={{cursor:'not-allowed'}}  readOnly ></Form.Control>
//                             {/* <select className="form-select" aria-label="Default select example">
//                                 <option selected>Select District</option>
//                                 <option value="1">khammam</option>
//                                 <option value="2">Hyderabad</option>
//                                 <option value="3">Warangal</option>
//                             </select> */}
//                         </Col>
//                     </Row>
//                     <Row className="mb-2" >
//                         <Col >
//                             <Form.Label>Area 1</Form.Label>
//                             <Form.Control type="text" value={parse_admin.city} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
//                         </Col>
//                         <Col >
//                             <Form.Label>Pincode</Form.Label>
//                             <Form.Control type="text" value={parse_admin.pincode} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
//                         </Col>
                        
//                     </Row><br/>
//                     <h4>Bank Details</h4>
//                     <hr></hr>
//                     <Row>
//                         <Col>
//                             <Form.Label>Account Holder Name</Form.Label>
//                             <Form.Control type="text" style={{cursor:'not-allowed'}}  readOnly></Form.Control>
//                         </Col>
//                         <Col>
//                             <Form.Label>Account</Form.Label>
//                             <Form.Control type="text" style={{cursor:'not-allowed'}}  readOnly></Form.Control>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col>
//                             <Form.Label>Bank Name</Form.Label>
//                             <Form.Control type="text" style={{cursor:'not-allowed'}}  readOnly></Form.Control>
//                         </Col>
//                         <Col>
//                             <Form.Label>IFSC Code</Form.Label>
//                             <Form.Control type="text" style={{cursor:'not-allowed'}}  readOnly></Form.Control>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col md={9}></Col>   
//                         <Col md={3} className="d-flex flex-row-reverse mt-4">
//                                 <Col>
//                                     <Button  variant='danger'onClick={()=>navigate('/admin_home')} className="feather icon-x"> Cancle</Button>
//                                 </Col>
//                                 <Col>
//                                     <Button variant="success" onClick={()=>navigate('/admin_profile_update')}><i className="fa fa-check">Update</i> </Button>
//                                 </Col>    
                            
//                         </Col>
//                     </Row>
//                 </Col>
//             </Card>
//             ):(
//                 <Container style={{width:'100%',height:'100%',backgroundColor:'white'}}>
//               <div className=" position-absolute top-50 start-50 translate-middle col-1 shadow p-3 bg-body-tertiary rounded ">
                    
//                       <div className="text-center d-flex justify-content-center py-2 px-2">
//                       <div className="spinner-border text-primary " role="status">
//                         <span className="visually-hidden ">Loading...</span>
//                       </div> 
//                       </div>  
                            
//                     </div>

//                 </Container>
//             )}

//         </Container>

//             </div>
        
        
  
//       </main> 
//           </div>
  
            
    
//     </>

//   )
// }

// export default AdminMyProfile

import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import { useNavigate } from 'react-router-dom';
import {Grid,Typography,Button,Table,Link,FormControl,FormControlLabel,Radio,RadioGroup,Box} from '@mui/material';
import AdminDash_upblock from './AdminDash_upblock';
import Header from "./Header";
import Admin_sidebar from './Admin_sidebar';
import FormField from './Update/InputFormField';


const authToken = GetToken();



function AdminMyProfile() {
  const navigate = useNavigate();
  const [user_Details,setUserDetails] = useState({})
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  
  useEffect (() =>{ async function fetchDetails(){
    const response = await fetch('http://100.20.33.222:5000/admin/get-profile',{
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
    navigate('/admin_profile_update');
  };

  return (
    <div className="grid-container"  style={{borderBlock:'2px solid black'}}>
      {/* ... form rendering ... */}
      <Header OpenSidebar={OpenSidebar}/>
      <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
     <AdminDash_upblock /> 
      <form onSubmit={onSubmit}>
        <Table sx={{border:'1px solid black',p:2,mt:10,bgcolor:'white'}}>
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
        <FormField label="Service Area" name="serviceArea" onChange={handleInputChange} value={user_Details.serviceArea}/>
        <Grid item xs={12} sm={6}>
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
          </Grid>
          
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
        <FormField label="Address 1" name="address" onChange={handleSelectChange}  value={user_Details.address}/>
        <FormField label="Address 2" name="address2"  onChange={handleInputChange} />
        
        {/* Row 5 */}
        <FormField label="State" name="state" onChange={handleInputChange} value={user_Details.state}/>
        <FormField label="District" name="district" onChange={handleInputChange}  value={user_Details.district}/>

        {/* Row 6 */}
        <FormField label="Area" name="area" onChange={handleInputChange} value={user_Details.city}/>
        <FormField label="Postal Code" name="pincode" onChange={handleInputChange}  value={user_Details.pincode}/>
        
        
        <Grid item xs={12} sm={12}>
            <Box>
              <Typography sx={{color:'black',fontWeight:'500',fontSize:'28px',m:2,mt:5,mb:1}}>Bank Details </Typography>
            </Box>
          </Grid>
        
        {/*Horizontal Line */}
        <Grid sm={12} xs={12} >
        <hr style={{width:'96%',color:'grey',align:'right'}} noshade />
        </Grid>

        
        {/* Row 7 */}
        <FormField label="Account Holder Name" name="accountHolderName" onChange={handleInputChange} value={user_Details.accountHolderName}/>
        <FormField label="Account #" name="bankAccountNo" onChange={handleInputChange} value={user_Details.bankAccountNo}/>
       
        {/* Row 8 */}
        <FormField label="Bank Name"  name="bankName" onChange={handleInputChange} value={user_Details.bankName}/>
        <FormField label="Ifsc Code" name="ifsc" onChange={handleInputChange} value={user_Details.ifsc}/>
       
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
  );
}

export default AdminMyProfile;