
import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import { useNavigate } from 'react-router-dom';
import {Grid,Typography,Button,Table,Link,FormControl,FormControlLabel,Radio,RadioGroup,Box} from '@mui/material';
import AdminDash_upblock from './AdminDash_upblock';
import Header from "./Header";
import Admin_sidebar from './Admin_sidebar';
import EditInputFormField from './Update/EditInputFormField';
import SERVER_URL from './Server/Server';

const authToken = GetToken();

function Admin_Edit_Profile() {
  const [data, setData]= useState(null)
  const [error, SetError] = useState(null)
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

        try {
          const response=fetch(`${SERVER_URL}admin/profile-update`,{
            method:'PUT',
            headers:{
              'Authorization':`Bearer ${authToken}`,
              'Content-Type':'application/json',
            },
            body:JSON.stringify(user_Details)
          })
          if (response.ok){
            alert('Details are Successfully Updated');
            navigate('/admin_profile');
            const result =response.json()
            setData(result)
          }else{
            throw new Error("Failed to fetch Details...!")
          }
          
        } catch (error) {
         SetError(error.message) 
        }   
    
  };

  return (
    <div className="grid-container"  style={{borderBlock:'2px solid black'}}>
      {/* ... form rendering ... */}
      <Header OpenSidebar={OpenSidebar}/>
      <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
     {/* <AdminDash_upblock />  */}
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
              <Typography sx={{color:'black',fontWeight:'500',fontSize:'28px',m:1,mt:2,px:2}}>Address Details </Typography>
            </Box>
          </Grid>
        {/* Horizontal Line */}
        <Grid sm={12} xs={12}>
        <hr style={{width:'98%',color:'grey',align:'right',marginLeft:'2%'}} noshade />
        </Grid>


        
        {/* Row 4 */}
        <EditInputFormField label="Address 1" name="address" onChange={handleSelectChange}  value={user_Details.address}/>
        <EditInputFormField label="Address 2" name="address2"  onChange={handleInputChange} />
        
        {/* Row 5 */}
        <EditInputFormField label="State" name="state" onChange={handleInputChange} value={user_Details.state}/>
        <EditInputFormField label="District" name="district" onChange={handleInputChange}  value={user_Details.district}/>

        {/* Row 6 */}
        <EditInputFormField label="Area" name="area" onChange={handleInputChange} value={user_Details.city}/>
        <EditInputFormField label="Postal Code" name="pincode" onChange={handleInputChange}  value={user_Details.pincode}/>
        
        
        <Grid item xs={12} sm={12}>
            <Box>
              <Typography sx={{color:'black',fontWeight:'500',fontSize:'28px',m:1,mt:2,px:2}}>Bank Details </Typography>
            </Box>
          </Grid>
        
        {/*Horizontal Line */}
        <Grid sm={12} xs={12} >
        <hr style={{width:'98%',color:'grey',align:'right',marginLeft:'2%'}} noshade />
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

export default Admin_Edit_Profile;