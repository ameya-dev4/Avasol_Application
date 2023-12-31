// import React, { useEffect, useState } from 'react';
// import { GetToken } from './Api/auth';
// import { useNavigate } from 'react-router-dom';
// import {Grid,Typography,Button,Table,Link,FormControl,FormControlLabel,Radio,RadioGroup,Box} from '@mui/material';
// //import AdminDash_upblock from "../../Pages/Admin_Upblocks";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import FormField from './Update/InputFormField';


// const authToken = GetToken();



// function UpdateProfile() {
//   const navigate = useNavigate();
//   const [user_Details,setUserDetails] = useState({})
//   const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle)
//   }
  
//   useEffect (() =>{ async function fetchDetails(){
//     const response = await fetch('http://100.20.33.222:5000/se/get-profile',{
//         method : 'GET',
//         headers : {
//             'Authorization' : `Bearer ${authToken}`,
//             'Content-type': 'application/json',
//             "Access-Control-Allow-Origin": "*",
//         }
//     }).then((response) => response.json())
//     .then((user_Details) =>{
//       setUserDetails(user_Details);
//       console.log(user_Details);
        
//     })
//   }
//   fetchDetails();
// },[])

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSelectChange = (e) => {
//     const {name , value} = e.target;
//     setUserDetails((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

  

//   const onSubmit = (e) => {
//     e.preventDefault();
//     // formData contains the form values
    
//     fetch('http://100.20.33.222:5000/se/update-profile',{
//       method:'PUT',
//       headers:{
//         'Authorization':`Bearer ${authToken}`,
//         'Content-Type':'application/json',
//       },
//       body:JSON.stringify(user_Details)
//     }).then((response) => response.json())
//     .then((data) =>{
//       console.log(data);
//       alert('Details are Successfully Updated');
//       navigate(-1);
//     }).catch((error) => {
//       console.log(error);
//     })
//     // Perform your form submission logic here
//   };

//   return (
//     <div className="grid-container"  style={{borderBlock:'2px solid black'}}>
//       {/* ... form rendering ... */}
//       <Header OpenSidebar={OpenSidebar}/>
//       <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
//       <main className='main-container'>
//      {/* <AdminDash_upblock /> */}
//       <form onSubmit={onSubmit}>
//         <Table sx={{border:'1px solid black',p:2,mt:10,bgcolor:'white'}}>
//         <Grid container spacing={2} sx={{border:'1px black'}}>
//         <Grid item xs={12}>
//               <Button
//                 variant="contained"
//                 size="large"
//                 color='primary'
//                 fullWidth
//                 sx={{ mb: 3  }}
                
//               >
//                 <Typography variant="h5" sx={{textAlign :'left',textTransform:'none'}}>Update Profile</Typography>
//               </Button>
//             </Grid>
       
//           <Grid item xs={12} sm={12}>
//             <Box>
//               <Typography sx={{color:'black',fontWeight:'500',fontSize:'28px',m:5,mt:1}}>Personal Info</Typography>
//             </Box>
//           </Grid>
        
//         {/* Row 1 */}
//         <FormField label="First Name" name="firstName" value={user_Details.firstName} onChange={handleInputChange} />
//         <FormField  label="Last Name" name="lastName"  value={user_Details.lastName} onChange={handleInputChange}  />

//         {/* Row 2 */}
//         <FormField label="Contact Number#" name="contactNumber" onChange={handleInputChange} value={user_Details.contactNumber}/>
//         <FormField label="Email Id" name="emailId" onChange={handleInputChange}  value={user_Details.emailId}/>
        
//         {/* Row 3 */}
//         <FormField label="Service Area" name="serviceArea" onChange={handleInputChange} value={user_Details.serviceArea}/>
//         <Grid item xs={12} sm={6}>
//         <Box>
//           <Typography sx={{color:'black',fontSize:'24px',mb:3,ml:3}} >Training Completed</Typography>
//         <FormControl>
//               <RadioGroup
//               row
//               aria-labelledby="demo-form-control-label-placement"
//               sx={{ml:3}}
//               >
//                 <FormControlLabel value="yes" defaultValue ="yes" control={<Radio />} label="Yes" sx={{fontSize:'14px',color:'black'}}/>
//                 <FormControlLabel value="no" control={<Radio />} label="No" sx={{fontSize:'14px',color:'black'}}/>
//             </RadioGroup>
//             </FormControl>
//           </Box>
//           </Grid>
          
//           {/* Horizontal Line */}
//           <Grid sm={12} xs={12} sx={{mt:7}}>
        
//         </Grid>

//         <Grid item xs={12} sm={12}>
//             <Box>
//               <Typography sx={{color:'black',fontWeight:'500',fontSize:'28px',m:5,mt:1}}>Address Details </Typography>
//               <hr style={{width:'98%',color:'#D8D8D8',align:'right'}} noshade />
//             </Box>
//           </Grid>

        
//         {/* Row 4 */}
//         <FormField label="Address 1" name="address" onChange={handleSelectChange}  value={user_Details.address}/>
//         <FormField label="Address 2" name="address2"  onChange={handleInputChange} />
        
//         {/* Row 5 */}
//         <FormField label="State" name="state" onChange={handleInputChange} value={user_Details.state}/>
//         <FormField label="District" name="district" onChange={handleInputChange}  value={user_Details.district}/>

//         {/* Row 6 */}
//         <FormField label="Area" name="area" onChange={handleInputChange} value={user_Details.area}/>
//         <FormField label="Postal Code" name="postalcode" onChange={handleInputChange}  value={user_Details.postalcode}/>
        
//         {/*Horizontal Line */}
//         <Grid sm={12} xs={12} sx={{mt:7}}>
//         <hr style={{width:'98%',color:'#FAFAFA',align:'right'}} noshade />
//         </Grid>

//         <Grid item xs={12} sm={12}>
//             <Box>
//               <Typography sx={{color:'black',fontWeight:'500',fontSize:'28px',m:5,mt:1}}>Bank Details </Typography>
//             </Box>
//           </Grid>
        
//         {/* Row 7 */}
//         <FormField label="Account Holder Name" name="accountHolderName" onChange={handleInputChange} value={user_Details.accountHolderName}/>
//         <FormField label="Account #" name="bankAccountNo" onChange={handleInputChange} value={user_Details.bankAccountNo}/>
       
//         {/* Row 8 */}
//         <FormField label="Bank Name"  name="bankName" onChange={handleInputChange} value={user_Details.bankName}/>
//         <FormField label="Ifsc Code" name="ifsc" onChange={handleInputChange} value={user_Details.ifsc}/>
       
//         <Grid item xs={2}>
//               <Button
//                 variant="contained"
//                 size="large"
//                 fullWidth
//                 sx={{ mt: 7,mb:2,ml:40}}
//                 onClick={() => navigate(-1)}
//               >
//                close
//               </Button>
//             </Grid>
//         <Grid item xs={2}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="success"
//                 size="large"
//                 fullWidth
//                 sx={{ ml: 45,mb:2,mt:7  }}
//               >
//                 Save Changes
//               </Button>
//             </Grid>
//         </Grid>
//         </Table>
//       </form>
//       </main>
//     </div>
//   );
// }

// export default UpdateProfile;

import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import { useNavigate } from 'react-router-dom';
import {Grid,Typography,Button,Table,Link,FormControl,FormControlLabel,Radio,RadioGroup,Box} from '@mui/material';
//import AdminDash_upblock from "../../Pages/Admin_Upblocks";
import Header from "./Header";
import SE_Sidebar from './SE_Sidebar';
import FormField from './Update/InputFormField';
import SERVER_URL from './Server/Server';


const authToken = GetToken();



function SE_Profile() {
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
    navigate('/update-Profile');
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

export default SE_Profile;