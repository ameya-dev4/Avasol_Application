// import { Table,TableRow,TableBody, TableCell,TableHead, TextField,Link,FormControl,Select,InputLabel, MenuItem,FormHelperText, Button ,Box, RadioGroup} from "@mui/material";
// import {Input,Typography} from '@mui/joy';
// import { GetToken } from "./Api/auth";
// import { useEffect,useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import Radio from '@mui/material/Radio';
// import FormControlLabel from '@mui/material/FormControlLabel';



// const authToken = GetToken();

// const url = "http://avasol.ameyalabs.com:5000/get-se-details";
// const userName = localStorage.getItem('username');




// function SE_MyProfile(){
//   const [user_Details,setUserDetails] = useState([]);
//   const navigate = useNavigate();
//   const data = {
//     username : 'setest'
//   }
//   useEffect (() =>{ async function fetchDetails(){
//     const response = await fetch(url,{
//         method : 'POST',
//         headers : {
//             'Authorization' : `Bearer ${authToken}`,
//             'Content-type': 'application/json',
//             "Access-Control-Allow-Origin": "*",
//         },
//         body : JSON.stringify(data)
//     }).then((response) => response.json())
//     .then((user_Details) =>{
//       setUserDetails(user_Details);
//       console.log(user_Details);
        
//     })
//   }
//   fetchDetails();
// },[])


//   return ( 
//     <>
//     { user_Details.length < 1 ?"NO user Found": 
//     <Table sx={{ bgcolor: '#ffff', borderCollapse: 'separate', borderSpacing: '0 5px' }}>
//       <TableHead sx={{bgcolor:'#0275d8 '}}>
//         <TableCell colSpan={4}sx={{fontSize:'24px',alignContent:'center'}}><ModeEditIcon /> My Profile</TableCell>
//       </TableHead>
//       <TableBody >
//         <TableRow>
//             <TableCell colSpan={4} sx={{fontSize : '22px' , fontWeight:'600'}}>Personal Info </TableCell>
//         </TableRow>
//         <TableRow>
//             <TableCell colSpan={4} sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%',border:'none'}}>Profile Photo</Typography> 
//                 <Box sx={{width:120,height:120,border:'1px solid black',ml:'120px'}}>
//             <Box
//       sx={{
//         width: 100,
//         height: 100,
//         ml:'10px',
//         mt:'10px',
//         backgroundColor: '#D3D3D3',
//         '&:hover': {
//           backgroundColor: 'primary.main',
//           opacity: [0.9, 0.8, 0.7],
//         },
//       }}
//     ><Typography sx={{textAlign:'center'}}>No+image</Typography></Box>
//     </Box>
//             </TableCell>
//      </TableRow>
//         <TableRow >
          
//           <TableCell sx={{ border: 'none', '& > *': { margin: '0' } }}><Typography sx={{fontSize:'22px', fontWeight:'400',width:'50%'}}>First Name </Typography></TableCell>
//           <TableCell sx={{ border: 'none', '& > *': { margin: '0' } }}> <Input placeholder="Type in here…" value={user_Details.firstName} size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
//           <TableCell sx={{ border: 'none', '& > *': { margin: '0' } }}><Typography sx={{fontSize:'22px', fontWeight:'400',width:'50%'}}>Last Name</Typography></TableCell>
//           <TableCell sx={{ border: 'none', '& > *': { margin: '0' } }}><Input placeholder="Type in here…"  value={user_Details.lastName} variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
//         </TableRow>

//         <TableRow >
//           <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'400',width:'50%'}}>Contact Number </Typography></TableCell>
//           <TableCell sx={{border : 'none'}}><Input placeholder="Type in here…" value={user_Details.contactNumber} variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
//           <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'400',width:'50%'}}>Email Id </Typography></TableCell>
//           <TableCell sx={{border : 'none'}}><Input placeholder="Type in here…" value={user_Details.emailId} variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
        
//         </TableRow>

//         <TableRow >
          
//           <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'400',width:'50%'}}>Service Area </Typography></TableCell>
//           <TableCell sx={{border : 'none'}} > <Input placeholder="Type in here…" value={user_Details.serviceArea} size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
//           <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'400',width:'50%'}}>Training Completed</Typography></TableCell>
//           <TableCell sx={{border : 'none'}}>
//             <FormControl>
//               <RadioGroup
//               row
//               aria-labelledby="demo-form-control-label-placement"
//               >
//                 <FormControlLabel value="yes" defaultValue ="yes" control={<Radio />} label="Yes" />
//                 <FormControlLabel value="no" control={<Radio />} label="No" />
//             </RadioGroup>
//             </FormControl>
//           </TableCell>

//         </TableRow>

//         <TableRow>
//             <TableCell colSpan={4} sx={{fontSize : '28px' , fontWeight:'600'}}>Address </TableCell>
//         </TableRow>

        

//         <TableRow >
//           <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Address 1 </Typography></TableCell>
//           <TableCell sx={{border : 'none'}}> 
//           <TextField
//           multiline
//           rows={3}
//           sx={{width : '80%',bgcolor:'ecf9fe'}}
//           placeholder="Enter your address here"/></TableCell>
//           <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Address 2</Typography></TableCell>
//           <TableCell sx={{border : 'none'}}>
//           <TextField
//           multiline
//           rows={3}
//           sx={{width : '80%',bgcolor:'ecf9fe'}}
//           placeholder="Enter your address here"/>
//           </TableCell>
//         </TableRow>

//         <TableRow >
//           <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>State</Typography></TableCell>
//           <TableCell sx={{border : 'none'}}> <Input placeholder="Type in here…" size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
//           <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>District</Typography></TableCell>
//           <TableCell sx={{border : 'none'}}><Input placeholder="Type in here…" variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
//         </TableRow>
        
//         <TableRow >
//           <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Area </Typography></TableCell>
//           <TableCell sx={{border : 'none'}}> <Input placeholder="Type in here…" size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
//           <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Postal Code </Typography></TableCell>
//           <TableCell sx={{border : 'none'}}><Input placeholder="Type in here…" variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
//         </TableRow>

//         <TableRow>
//             <TableCell colSpan={4} sx={{fontSize : '28px' , fontWeight:'600'}}>Bank Details</TableCell>
//         </TableRow>

//         <TableRow >
//           <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Account Holder Name </Typography></TableCell>
//           <TableCell sx={{border : 'none'}}> <Input placeholder="Type in here…" size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
//           <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Account # </Typography></TableCell>
//           <TableCell sx={{border : 'none'}}><Input placeholder="Type in here…" value={user_Details.bankAccountNo} variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
//         </TableRow>

//         <TableRow >
//           <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Bank Name </Typography></TableCell>
//           <TableCell sx={{border : 'none'}}> <Input placeholder="Type in here…" value={user_Details.bankName} size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
//           <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>IFSC Code </Typography></TableCell>
//           <TableCell sx={{border : 'none'}}><Input placeholder="Type in here…" value={user_Details.ifsc} variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
//         </TableRow>
//       <Box display='flex' justifyContent='space-between' size='large' sx={{mb:'100px',mt:'50px'}}>
//         <Button variant="contained" sx={{ml:'190%',fontSize:'22px',minWidth:'100px'}} onClick={() => navigate(-1)} >
//           Cancel
//         </Button>
//         <Button variant="contained" color="success" sx={{ml:'30px',fontSize:'22px',minWidth:'100px'}}>
//              Submit
//         </Button>
//         </Box>

//       </TableBody>
//     </Table>
// }
//     </>)
// }

// export default SE_MyProfile;

import React,{useState} from "react";
import {Container,Col,Row,Card,Form,Button} from 'react-bootstrap'
import Header from "./Header";
import Admin_sidebar from "./Admin_sidebar";
import { json, useNavigate } from "react-router-dom";
import { GetToken } from "./Api/auth";
import SE_Sidebar from "./SE_Sidebar";

const SE_MyProfile = () => {
    const [isdetails,setIsdetails]=useState(false)
    const access_token=GetToken()
    const navigate=useNavigate()
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
    }

    
        fetch('http://100.20.33.222:5000/se/get-profile',{
            method:'GET',
            mode:'cors',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${access_token}`
            },
            

        })
        .then(resp=> resp.json())
        .then(data=>{
            console.log("data",data)
            setIsdetails(true)
            localStorage.setItem('SE_details',JSON.stringify(data))
        })

const url = "http://100.20.33.222:5000/se/get-profile";
const userName = localStorage.getItem('username');

    const admin_details=localStorage.getItem('SE_details')
    const parse_admin=JSON.parse(admin_details)
    console.log("se-details",parse_admin)
      
    return (
        <>
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <main className="main-container">
        <div className="col">
          <Container className="m-3 mt-3 col ">
              <div className="bg-primary rounded mb-3 text-white m-2 p-2 px-3">
                  <header>My Profile</header>
              </div>
              {isdetails?
              (
                  <Card className="shadow p-2 mb-5 bg-body-tertiary rounded">
                  <h4> Personal Info</h4>
                  <hr></hr>
                  <Col className="m-3 mt-3 col" >
                      <Row className="mb-2" >
                          <Col>
                              <Form.Label>First Name</Form.Label>
                              <Form.Control type="text" value={parse_admin.firstName} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                          </Col>
                          <Col>
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control type="text" value={parse_admin.lastName} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                          </Col>
                      </Row>
                      <Row className="mb-2" >
                          <Col>
                              <Form.Label>Email ID</Form.Label>
                              <Form.Control type="text" placeholder="Example@gmail.com" value={parse_admin.emailId} style={{cursor:'not-allowed'}}  readOnly ></Form.Control>
                          </Col>
                          <Col>
                              <Form.Label>Mobile Number</Form.Label>
                              <Form.Control type="text"  value={parse_admin.contactNumber} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                          </Col>
                      </Row>
                      <Row className="mb-2" >
                          <Col>
                              <Form.Label>Service State</Form.Label>
                              <Form.Control type="text" placeholder="Delhi" value={parse_admin.firstName} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                          </Col>
                          <Col>
                              <Row  className="mt-5">
                                  <Col >
                                      <Form.Label>Training Completed</Form.Label>
                                  </Col>
                                  <Col style={{cursor:'not-allowed'}}  readOnly>
                                      <div className="form-check">
                                          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                          <label className="form-check-label" for="flexRadioDefault1">
                                              Yes
                                          </label>
                                      </div>
                                  </Col>
                                  <Col style={{cursor:'not-allowed'}}  readOnly>
                                      <div className="form-check">
                                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                                              <label className="form-check-label" for="flexRadioDefault2">
                                                  No
                                              </label>
                                      </div>         
                                  </Col>
                              </Row>
                          </Col>
                      </Row><br/>
                      <h4> Address</h4>
                      <hr></hr>
                      <Row className="mb-2" >
                          <Col>
                              <Form.Label>Address 1</Form.Label>
                              <Form.Control type="text" value={parse_admin.address} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                          </Col>
                          <Col>
                              <Form.Label>Address 2</Form.Label>
                              <Form.Control type="text" style={{cursor:'not-allowed'}}  readOnly ></Form.Control>
                          </Col>
                      </Row>
                      <Row className="mb-2" >
                          <Col>
                              <Form.Label>District</Form.Label>
                              <Form.Control type="text" value={parse_admin.district} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                              {/* <select className="form-select" aria-label="Default select example" >
                                  <option selected>Select State</option>
                                  <option value="1">Telangana</option>
                                  <option value="2">Krishna</option>
                                  <option value="3">Guntur</option>
                              </select> */}
                          </Col>
                          <Col>
                              <Form.Label>Mandal</Form.Label>
                              <Form.Control type="text" value={parse_admin.mandal} style={{cursor:'not-allowed'}}  readOnly ></Form.Control>
                              {/* <select className="form-select" aria-label="Default select example">
                                  <option selected>Select District</option>
                                  <option value="1">khammam</option>
                                  <option value="2">Hyderabad</option>
                                  <option value="3">Warangal</option>
                              </select> */}
                          </Col>
                      </Row>
                      <Row className="mb-2" >
                          <Col >
                              <Form.Label>Area 1</Form.Label>
                              <Form.Control type="text" value={parse_admin.city} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                          </Col>
                          <Col >
                              <Form.Label>Pincode</Form.Label>
                              <Form.Control type="text" value={parse_admin.pincode} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                          </Col>
                          
                      </Row><br/>
                      <h4>Bank Details</h4>
                      <hr></hr>
                      <Row>
                          <Col>
                              <Form.Label>Account Holder Name</Form.Label>
                              <Form.Control type="text" style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                          </Col>
                          <Col>
                              <Form.Label>Account</Form.Label>
                              <Form.Control type="text" style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                          </Col>
                      </Row>
                      <Row>
                          <Col>
                              <Form.Label>Bank Name</Form.Label>
                              <Form.Control type="text" style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                          </Col>
                          <Col>
                              <Form.Label>IFSC Code</Form.Label>
                              <Form.Control type="text" style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                          </Col>
                      </Row>
                      <Row>
                          <Col md={9}></Col>   
                          <Col md={3} className="d-flex flex-row-reverse mt-4">
                                  <Col>
                                      <Button  variant='danger'onClick={()=>navigate('/admin_home')} className="feather icon-x"> Cancle</Button>
                                  </Col>
                                  <Col>
                                      <Button variant="success" onClick={()=>navigate('/admin_profile_update')}><i className="fa fa-check">Update</i> </Button>
                                  </Col>    
                              
                          </Col>
                      </Row>
                  </Col>
              </Card>
              ):(
                  <Container style={{width:'100%',height:'100%',backgroundColor:'white'}}>
                <div className=" position-absolute top-50 start-50 translate-middle col-1 shadow p-3 bg-body-tertiary rounded ">
                      
                        <div className="text-center d-flex justify-content-center py-2 px-2">
                        <div className="spinner-border text-primary " role="status">
                          <span className="visually-hidden ">Loading...</span>
                        </div> 
                        </div>  
                              
                      </div>
  
                  </Container>
              )}
  
          </Container>
  
              </div>
          
          
    
        </main> 
            </div>
    
              
      
      </>
  
    )
  }
  
export default SE_MyProfile

