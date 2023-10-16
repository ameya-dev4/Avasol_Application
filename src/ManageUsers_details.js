import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import { useNavigate ,useLocation} from 'react-router-dom';
import {Grid,Typography,Button,Table,Link,FormControl,FormControlLabel,Radio,RadioGroup,Box,Avatar,Container} from '@mui/material';
import AdminDash_upblock from './AdminDash_upblock';
import Header from "./Header";
import Admin_sidebar from './Admin_sidebar';
import EditFormField from './Update/InputFormField';
import SERVER_URL from './Server/Server';

const ManageUsers_details=()=>{
    
  const location = useLocation();
  const batteryDetails = location.state.username
    const access_token=GetToken()
    const [user_Details, setUserDetails] = useState([])
    const navigate= useNavigate()
  console.log("battery Details",batteryDetails)
    useEffect(()=>{
        const FetchData= async()=>{
            try {
           
              const response=  await fetch(`${SERVER_URL}admin/get-users`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${access_token}`
                },
                body:JSON.stringify({status:-1})
              })
              if(response.ok){
                const result= await response.json()
                setUserDetails(result)
              }

        } catch (error) {
            console.error("Failed to get Users details...!",error)
        }
    } 
    FetchData()
    },[])
    console.log("users",user_Details)


    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

    return(
        <>
        <div className="grid-container"  style={{borderBlock:'2px solid black'}}>
      <Header OpenSidebar={OpenSidebar}/>
      <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
      <AdminDash_upblock />
      <Container style={{margin:'50px 0px',marginBottom:'60px'}}>
                <form noValidate>
        <Table sx={{border:'1px solid black',p:2,mt:3,backgroundColor:'white'}}>
        <Grid container spacing={2} sx={{border:'1px black'}}>
        <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                color='primary'
                fullWidth
                sx={{ mb: 3  }}
                
              >
                <Typography variant="h5" sx={{textAlign :'left',textTransform:'none'}}>Manage User Details</Typography>
              </Button>
            </Grid>
       
        {/* Row 1 */}
        <EditFormField label="First Name" name="firstName" value={batteryDetails.firstName}  />
        <EditFormField  label="Last Name" name="lastName"  value={batteryDetails.lastName}   />

        {/* Row 2 */}
        <EditFormField label="Email ID" name="emailId"  value={batteryDetails.emailId}/>
        <EditFormField label="Contact Number" name="contactNumber"   value={batteryDetails.contactNumber}/>

        {/* Row 3 */}
        <EditFormField label="Address" name="address"  value={batteryDetails.address}/>
        <EditFormField label="City" name="city"   value={batteryDetails.city}/>

        {/* Row 4 */}
        <EditFormField label="Mandal" name="mandal"  value={batteryDetails.mandal}/>
        <EditFormField label="District" name="district"   value={batteryDetails.district} />
        
        <EditFormField label="Pincode" name="pincode"  value={batteryDetails.pincode}/>
        <EditFormField label="Latitude" name="latitude"  value={batteryDetails.latitude}/>

        {/* Row 6 */}
        <EditFormField label="Longitude" name="longitude"  value={batteryDetails.longitude}/>
        </Grid>
        <Grid container spacing={1} sx={{p:3}}>
        <Grid item xs={3}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 5,mb:2}}
                onClick={() => navigate(-1)}
              >
               close
              </Button>
            </Grid>
            
        </Grid>
        </Table>
      </form>
              
            </Container>
      </main>
    </div>
        </>

    )

}

export default ManageUsers_details;