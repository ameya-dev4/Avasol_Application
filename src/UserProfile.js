
import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import { useNavigate } from 'react-router-dom';
import {Grid,Typography,Button,Table,Link,FormControl,FormControlLabel,Radio,RadioGroup,Box} from '@mui/material';
import Header from "./Header";
import FormField from './Update/InputFormField';
import Sidebar from './Sidebar';
import Dashboard_upBlocks from './Dashboard_upBlocks';
import SERVER_URL from './Server/Server';

const authToken = GetToken();



function UserProfile() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const navigate = useNavigate();
  const [user_Details,setUserDetails] = useState({})
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  const password=localStorage.getItem('password')
  const parse_password=JSON.parse(password)
  
  useEffect (() =>{ async function fetchDetails(){
    try {
      
      const response = await fetch(`${SERVER_URL}user/get-profile`,{
        method : 'GET',
        headers : {
            'Authorization' : `Bearer ${authToken}`,
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    })
        if(response.ok){
          const result =await response.json()
          setData(result)
          setUserDetails(result)
          console.log("fetching succesful....!")
        }else{
          throw new Error("failed to fetch user details...!")
        }
    } catch (error) {
      setError(error.message)
    }
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
                
                
              >
                <Typography variant="h5" sx={{textAlign :'left',textTransform:'none'}}>Update Profile</Typography>
              </Button>
            </Grid>
       
          <Grid item xs={12} sm={12}>
            <Box>
              <Typography sx={{color:'black',fontWeight:'500',fontSize:'28px',m:1,px:2}}>Personal Info</Typography>
            </Box>
          </Grid>
        {/* Horizontal Line */}
        <Grid sm={12} xs={12}>
        <hr style={{width:'98%',color:'grey',align:'right',marginLeft:'2%'}} noshade />
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
              <Typography sx={{color:'black',fontWeight:'500',fontSize:'28px',m:1,mt:2,px:2}}>Address Details </Typography>
            </Box>
          </Grid>
        {/* Horizontal Line */}
        <Grid sm={12} xs={12}>
        <hr style={{width:'98%',color:'grey',align:'right',marginLeft:'2%'}} noshade />
        </Grid>


        
        {/* Row 4 */}
        <FormField label="District" name="district" onChange={handleSelectChange}  value={user_Details.district}/>
        <FormField label="Mandal" name="mandal"  onChange={handleInputChange} value={user_Details.mandal} />
        
        {/* Row 5 */}
        <FormField label="Latitude" name="latitude" onChange={handleInputChange} value={user_Details.latitude}/>
        <FormField label="Longitude" name="longitude" onChange={handleInputChange}  value={user_Details.longitude}/>

        {/* Row 6 */}
        <FormField label="Pincode" name="pincode" onChange={handleInputChange} value={user_Details.pincode}/>
        <FormField label="Current Password"  name="currentPassword" onChange={handleInputChange}  value={parse_password} type='password'/>
        
        
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