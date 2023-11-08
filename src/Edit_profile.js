
import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import { useNavigate } from 'react-router-dom';
import {Grid,Typography,Button,Table,Link,FormControl,FormControlLabel,Radio,RadioGroup,Box, Avatar} from '@mui/material';
//import AdminDash_upblock from "../../Pages/Admin_Upblocks";
import Header from "./Header";
import Sidebar from './Sidebar';
import EditInputFormField from './Update/EditInputFormField';
import SERVER_URL from './Server/Server';
import ConfirmationModal from './Confirmation';
import ErrorBoundary from './ErrorHandlingPage';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import NoEditFormField from './Update/InputFormField';


const authToken = GetToken();



function EditProfile() {
  const navigate = useNavigate();
  const [user_Details,setUserDetails] = useState({})
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const password=localStorage.getItem('password')
  const parse_password=JSON.parse(password)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  
  useEffect (() =>{ async function fetchDetails(){
    try{
    const response = await fetch(`${SERVER_URL}user/get-profile`,{
        method : 'GET',
        headers : {
            'Authorization' : `Bearer ${authToken}`,
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    })
        if (response.ok) {
          const result = await response.json();
          setUserDetails(result);
      } 
    } catch (error) {
      toast.error('Error Occured! Try again...')
      // setError(error.message);
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

  

  const onSubmit = async(e) => {
    e.preventDefault();
    // formData contains the form values
    try{
    const response= await fetch(`${SERVER_URL}user/profile-update`,{
      method:'PUT',
      headers:{
        'Authorization':`Bearer ${authToken}`,
        'Content-Type':'application/json',
      },
      body:JSON.stringify(user_Details)
    })
    if (response.ok) {
      const result = await response.json();
      setUserDetails(result);
      toast.success("Profile Update Successfully...!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose:3000
      });
      setTimeout(() => {
        navigate('/user_profile');
      }, 4000);
  } 
    } catch (error) {
      toast.error('Error Occured! Try again...')
      // setError(error.message);
    }
        // Perform your form submission logic here
  };  

  const [selectedImage, setImageSelected]=useState(null)
  const [remove_bool, setRemove_bool] = useState(true)

  const imageUpload=(e)=>{
    const file=e.target.files[0]
    if(file){
      const reader = new FileReader()
      reader.onloadend=()=>{
        setImageSelected(reader.result)
      }
      reader.readAsDataURL(file)
      setRemove_bool(!remove_bool)
    }

  }


  const handlAddImage=()=>{
    document.getElementById('imageselect').click()
  }

   //Confirmation alert box
   const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

   const handleCancle = () => {
     setIsConfirmationOpen(true);
   };
 
   const handleCloseConfirmation = () => {
     setIsConfirmationOpen(false);
   };
 
   const handleConfirm = () => {
     navigate('/user_profile')
     setIsConfirmationOpen(false);
   };

  return (
    <div className="grid-container"  style={{borderBlock:'2px solid black'}}>
      {/* ... form rendering ... */}
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
     {/*<AdminDash_upblock /> */}
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
          
        {/* Horizontal Line */}
        <Grid sm={12} xs={12}>
        <hr style={{width:'98%',color:'grey',align:'right',marginLeft:'2%'}} noshade />
        </Grid>
        <input
        type='file'
        accept='image/*'
        id='imageselect'
        style={{display:'none'}}
        onChange={imageUpload}
        />
        <Avatar
        sx={{
          height:100,
          width:100,
          color:'white',
          backgroundColor:'secondary',
          fontSize:30,
          position:'relative',
          cursor:'pointer',
          m:3,
          borderRadius:'5%'
        }}
        onClick={handlAddImage}
        variant='square'
        >
        {selectedImage ? (
              <>
              <img src={selectedImage} loading='lazy'  alt="Profile" style={{width:'100%',height:'100%'}} />
                    
              </>
          ) : (
              <div className='text-center fs-6 '>Add Photo</div>
            )}
                  
        </Avatar>
        <i hidden={remove_bool} className='mx-3 text-danger  feather icon-x ' ><a  href='#'  style={{textDecoration:'none'}} onClick={()=>{
        setImageSelected(null)
        setRemove_bool(!remove_bool)
        }} > Remove Photo</a></i>

    </Grid>
        
        {/* Row 1 */}
        <EditInputFormField label="First Name" name="firstName" value={user_Details.firstName} onChange={handleInputChange} />
        <EditInputFormField  label="Last Name" name="lastName"  value={user_Details.lastName} onChange={handleInputChange}  />

        {/* Row 2 */}
        <EditInputFormField label="Contact Number#" name="contactNumber" onChange={handleInputChange} value={user_Details.contactNumber}/>
        <EditInputFormField label="Email Id" name="emailId" onChange={handleInputChange}  value={user_Details.emailId}/>
        <EditInputFormField label="Username" name="username" onChange={handleInputChange}  value={user_Details.username}/>
        <NoEditFormField label="Current Password"  name="currentPassword" onChange={handleInputChange}  value={parse_password} type='password'/>
        
        {/* Row 3 */}
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
        <EditInputFormField label="Address" name="address" onChange={handleSelectChange}  value={user_Details.address}/>
        <EditInputFormField label="City" name="city" onChange={handleSelectChange}  value={user_Details.city}/>
        <EditInputFormField label="Mandal" name="mandal"  onChange={handleInputChange} value={user_Details.mandal} />
        <EditInputFormField label="District" name="district" onChange={handleSelectChange}  value={user_Details.district}/>
       
        {/* Row 5 */}
        <EditInputFormField label="State" name="state"  onChange={handleInputChange} value={user_Details.state} />
        <EditInputFormField label="Pincode" name="pincode" onChange={handleInputChange} value={user_Details.pincode}/>
        <EditInputFormField label="Latitude" name="latitude" onChange={handleInputChange} value={user_Details.latitude}/>
        <EditInputFormField label="Longitude" name="longitude" onChange={handleInputChange}  value={user_Details.longitude}/>
 
        {/* Row 7 */}
        <EditInputFormField label="New Password" name="password" onChange={handleInputChange} value={user_Details.password}/>
        <EditInputFormField label="Re-Enter Password" name="re-enterPassword" onChange={handleInputChange} value={user_Details.re_enterPassword}/>
      
        <Grid item xs={2}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 7,mb:2,ml:40}}
                onClick={handleCancle}
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

              <ConfirmationModal
              open={isConfirmationOpen}
              onClose={handleCloseConfirmation}
              onConfirm={handleConfirm}
              />
            
            {/* Toast Notification */}
            <ToastContainer/>
            </Grid>
        </Grid>
        </Table>
      </form>
      </main>
    </div>
  );
}

export default EditProfile;