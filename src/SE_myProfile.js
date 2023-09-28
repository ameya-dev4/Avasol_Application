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

import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import { useNavigate } from 'react-router-dom';
import {Grid,Typography,Button,Table,Link,FormControl,FormControlLabel,Radio,RadioGroup,Box} from '@mui/material';
import Header from "./Header";
import FormField from './Update/InputFormField';
import SE_Sidebar from './SE_Sidebar';
import SE_Dash_upblocks from './SE_Dash_upblocks';


const authToken = GetToken();



function SE_MyProfile() {
  const navigate = useNavigate();
  const [user_Details,setUserDetails] = useState({})
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  
  useEffect (() =>{ async function fetchDetails(){
    const response = await fetch('http://100.20.33.222:5000/se/get-profile',{
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
    navigate('/update-Profile');
  };

  return (
    <div className="grid-container"  style={{borderBlock:'2px solid black'}}>
      {/* ... form rendering ... */}
      <Header OpenSidebar={OpenSidebar}/>
      <SE_Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
     <SE_Dash_upblocks/>
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
        <FormField label="Area" name="area" onChange={handleInputChange} value={user_Details.area}/>
        <FormField label="Postal Code" name="postalcode" onChange={handleInputChange}  value={user_Details.postalcode}/>
        
        
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

export default SE_MyProfile;

