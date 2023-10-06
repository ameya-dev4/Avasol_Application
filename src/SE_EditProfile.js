
// import React, { useEffect, useState } from "react";
// import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";
// import Header from "./Header";
// import Admin_sidebar from "./Admin_sidebar";
// import { useNavigate } from "react-router-dom";
// import { GetToken } from "./Api/auth";

// const SE_Edit_Profile = () => {
//   const admin_details = localStorage.getItem("SE_details");
//   const parse_admin = JSON.parse(admin_details);

//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [district, setDistrict] = useState("");
//   const [emailId, setEmailId] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");
//   const [mandal, setMandal] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [username, setUsername] = useState("");
//   const [approvedBy, setApproveBy] = useState("");
//   const [approvedDate, setApproveDate] = useState("");
//   const [bankAccountNo, setBankAccounNo] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [branchName, setBranchName] = useState("");
//   const [ifsc, setIfsc] = useState("");
//   const [performance, setPerformance]=useState("");
//   const [serviceArea, setServiceArea]=useState("");
//   const [trainingDetails, setTrainingDetails]=useState("");
  


  

//   const access_token = GetToken();
//   const navigate = useNavigate();
//   const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle);
//   };

//   function handleEdit() {
//     setAddress(parse_admin.address);
//     setCity(parse_admin.city);
//     setDistrict(parse_admin.district);
//     setEmailId(parse_admin.emailId);
//     setFirstName(parse_admin.firstName);
//     setLastName(parse_admin.lastName);
//     setLatitude(parse_admin.latitude);
//     setLongitude(parse_admin.longitude);
//     setMandal(parse_admin.mandal);
//     setPincode(parse_admin.pincode);
//     setUsername(parse_admin.username);
//     setContactNumber(parse_admin.contactNumber);
//     setApproveBy(parse_admin.approvedBy)
//     setApproveDate(parse_admin.approvedDate)
//     setBankAccounNo(parse_admin.bankAccountNo)
//     setBankName(parse_admin.bankName)
//     setBranchName(parse_admin.branchName)
//     setIfsc(parse_admin.ifsc)
//     setPerformance(parse_admin.performance)
//     setServiceArea(parse_admin.serviceArea)
//     setTrainingDetails(parse_admin.trainingDetails)

    
//   }

//   useEffect(() => {
//     handleEdit();
//   }, []);

//   const UpdateProfile = async () => {
//     const updated_values = {
//       address,
//       city,
//       contactNumber,
//       firstName,
//       lastName,
//       district,
//       emailId,
//       longitude,
//       latitude,
//       mandal,
//       pincode,
//       username,
//       approvedBy,
//       approvedDate,
//       bankAccountNo,
//       bankName,
//       branchName,
//       ifsc,
//       performance,
//       serviceArea,
//       trainingDetails,
//       trainingDetails
//     };

//     try {
//       const response = await fetch("http://100.20.33.222:5000/se/update-profile", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${access_token}`,
//         },
//         body: JSON.stringify(updated_values),
//       });

//       if (response.ok) {
//         console.log("Profile updated successfully");
//         // Optionally, you can perform additional actions after a successful update.
//       } else {
//         console.error("Failed to update profile");
//         // Handle the error here, e.g., display an error message to the user.
//       }
//     } catch (error) {
//       console.error("Error updating profile", error);
//       // Handle the error here, e.g., display an error message to the user.
//     }
//   };

//   return (
//     <>
//       <div className='grid-container'>
//       <Header OpenSidebar={OpenSidebar}/>
//       <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
//       <main className="main-container">
//       <div className="col">
//         <Container className="m-3 mt-3 col ">
//             <div className="bg-primary rounded mb-3 text-white m-2 p-2 px-3">
//                 <header>My Profile</header>
//             </div>
//             <Card className="shadow p-2 mb-5 bg-body-tertiary rounded">
//                 <h4> Personal Info</h4>
//                 <hr></hr>
//                 <Col className="m-3 mt-3 col" >
//                     <Row className="mb-2" >
//                     <Col>
//                             <Form.Label>Username</Form.Label>
//                             <Form.Control type="text" value={username} onChange={(e)=>setUsername(e.target.value)}></Form.Control>
//                         </Col>
//                         <Col>
//                             <Form.Label>First Name</Form.Label>
//                             <Form.Control type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}></Form.Control>
//                         </Col>
//                         <Col>
//                             <Form.Label>Last Name</Form.Label>
//                             <Form.Control type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}></Form.Control>
//                         </Col>
//                     </Row>
//                     <Row className="mb-2" >
//                         <Col>
//                             <Form.Label>Email ID</Form.Label>
//                             <Form.Control type="text" placeholder="Example@gmail.com"  value={emailId} onChange={(e)=>setEmailId(e.target.value)}></Form.Control>
//                         </Col>
//                         <Col>
//                             <Form.Label>Mobile Number</Form.Label>
//                             <Form.Control type="text"  value={contactNumber} onChange={(e)=>setContactNumber(e.target.value)}></Form.Control>
//                         </Col>
//                     </Row>
//                     <Row className="mb-2" >
//                         <Col>
//                             <Form.Label>Service State</Form.Label>
//                             <Form.Control type="text" placeholder="Delhi" readOnly ></Form.Control>
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
//                             <Form.Control type="text" value={address} onChange={(e)=>setAddress(e.target.value)} ></Form.Control>
//                         </Col>
//                         <Col>
//                             <Form.Label>Address 2</Form.Label>
//                             <Form.Control type="text"  ></Form.Control>
//                         </Col>
//                     </Row>
//                     <Row className="mb-2" >
//                         <Col>
//                             <Form.Label>District</Form.Label>
//                             <Form.Control type="text" value={district} onChange={(e)=>setDistrict(e.target.value)}></Form.Control>
//                             {/* <select className="form-select" aria-label="Default select example" >
//                                 <option selected>Select State</option>
//                                 <option value="1">Telangana</option>
//                                 <option value="2">Krishna</option>
//                                 <option value="3">Guntur</option>
//                             </select> */}
//                         </Col>
//                         <Col>
//                             <Form.Label>Mandal</Form.Label>
//                             <Form.Control type="text" value={mandal} onChange={(e)=>setMandal(e.target.value)} ></Form.Control>
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
//                             <Form.Control type="text" value={city} onChange={(e)=>setCity(e.target.value)} ></Form.Control>
//                         </Col>
//                         <Col >
//                             <Form.Label>Pincode</Form.Label>
//                             <Form.Control type="text" value={pincode} onChange={(e)=>setPincode(e.target.value)}></Form.Control>
//                         </Col>
                        
//                     </Row><br/>
//                     <h4>Bank Details</h4>
//                     <hr></hr>
//                     <Row>
//                         <Col>
//                             <Form.Label>Account Holder Name</Form.Label>
//                             <Form.Control type="text"  ></Form.Control>
//                         </Col>
//                         <Col>
//                             <Form.Label>Account</Form.Label>
//                             <Form.Control type="text" value={bankAccountNo} onChange={(e)=>setBankAccounNo(e.target.value)} ></Form.Control>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col>
//                             <Form.Label>Bank Name</Form.Label>
//                             <Form.Control type="text" value={bankName} onChange={(e)=>setBankName(e.target.value)}></Form.Control>
//                         </Col>
//                         <Col>
//                             <Form.Label>IFSC Code</Form.Label>
//                             <Form.Control type="text"  value={ifsc} onChange={(e)=>setIfsc(e.target.value)}></Form.Control>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col md={9}></Col>   
//                         <Col md={3} className="d-flex flex-row-reverse mt-4">
//                                 <Col>
//                                     <Button  variant='danger'onClick={()=>navigate('/se_profile')} className="feather icon-x"> Cancle</Button>
//                                 </Col>
//                                 <Col>
//                                     <Button variant="success"  onClick={UpdateProfile}><i className="fa fa-check">Submit</i> </Button>
//                                 </Col>    
                            
//                         </Col>
//                     </Row>
//                 </Col>
//             </Card>
//         </Container>

//             </div>
        
        
  
//       </main> 
//           </div>
//     </>
//   );
// };

// export default SE_Edit_Profile;


import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import { useNavigate } from 'react-router-dom';
import {Grid,Typography,Button,Table,Link,FormControl,FormControlLabel,Radio,RadioGroup,Box} from '@mui/material';
//import AdminDash_upblock from "../../Pages/Admin_Upblocks";
import Header from "./Header";
import SE_Sidebar from './SE_Sidebar';
import EditInputFormField from './Update/EditInputFormField';
import SERVER_URL from './Server/Server';

const authToken = GetToken();



function EditSe_Profile() {
  const navigate = useNavigate();
  const [user_Details,setUserDetails] = useState({})
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  
  useEffect (() =>{ async function fetchDetails(){
    const response = await fetch(`${SERVER_URL}se/get-profile`,{
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
    
    fetch(`${SERVER_URL}se/update-profile`,{
      method:'PUT',
      headers:{
        'Authorization':`Bearer ${authToken}`,
        'Content-Type':'application/json',
      },
      body:JSON.stringify(user_Details)
    }).then((response) => response.json())
    .then((data) =>{
      console.log(data);
      alert('Details are Successfully Updated');
      navigate('/se_myDashboard');
    }).catch((error) => {
      console.log(error);
    })
    // Perform your form submission logic here
  };

  return (
    <div className="grid-container"  style={{borderBlock:'2px solid black'}}>
      {/* ... form rendering ... */}
      <Header OpenSidebar={OpenSidebar}/>
      <SE_Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
     {/*<AdminDash_upblock /> */}
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
        <EditInputFormField label="First Name" name="firstName" value={user_Details.firstName} onChange={handleInputChange} />
        <EditInputFormField  label="Last Name" name="lastName"  value={user_Details.lastName} onChange={handleInputChange}  />

        {/* Row 2 */}
        <EditInputFormField label="Contact Number#" name="contactNumber" onChange={handleInputChange} value={user_Details.contactNumber}/>
        <EditInputFormField label="Email Id" name="emailId" onChange={handleInputChange}  value={user_Details.emailId}/>
        
        {/* Row 3 */}
        <EditInputFormField label="Service Area" name="serviceArea" onChange={handleInputChange} value={user_Details.serviceArea}/>
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
        <EditInputFormField label="Address 1" name="address" onChange={handleSelectChange}  value={user_Details.address}/>
        <EditInputFormField label="Address 2" name="address2"  onChange={handleInputChange} />
        
        {/* Row 5 */}
        <EditInputFormField label="State" name="state" onChange={handleInputChange} value={user_Details.state}/>
        <EditInputFormField label="District" name="district" onChange={handleInputChange}  value={user_Details.district}/>

        {/* Row 6 */}
        <EditInputFormField label="Area" name="area" onChange={handleInputChange} value={user_Details.area}/>
        <EditInputFormField label="Postal Code" name="postalcode" onChange={handleInputChange}  value={user_Details.postalcode}/>
        
        
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
        <EditInputFormField label="Account Holder Name" name="accountHolderName" onChange={handleInputChange} value={user_Details.accountHolderName}/>
        <EditInputFormField label="Account #" name="bankAccountNo" onChange={handleInputChange} value={user_Details.bankAccountNo}/>
       
        {/* Row 8 */}
        <EditInputFormField label="Bank Name"  name="bankName" onChange={handleInputChange} value={user_Details.bankName}/>
        <EditInputFormField label="Ifsc Code" name="ifsc" onChange={handleInputChange} value={user_Details.ifsc}/>
       
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
                Save Changes
              </Button>
            </Grid>
        </Grid>
        </Table>
      </form>
      </main>
    </div>
  );
}

export default EditSe_Profile;