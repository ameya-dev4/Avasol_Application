
import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import { useNavigate } from 'react-router-dom';
import {Grid,Typography,Button,Table,Link,FormControl,FormControlLabel,Radio,RadioGroup,Box,Avatar} from '@mui/material';
//import AdminDash_upblock from "../../Pages/Admin_Upblocks";
import Header from "./Header";
import SE_Sidebar from './SE_Sidebar';
import EditInputFormField from './Update/EditInputFormField';
import SERVER_URL from './Server/Server';
import ConfirmationModal from './Confirmation';

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
      navigate('/se_myProfile')
      setIsConfirmationOpen(false);
    };

  return (
    <div className="grid-container"  style={{borderBlock:'2px solid black'}}>
      {/* ... form rendering ... */}
      <Header OpenSidebar={OpenSidebar}/>
      <SE_Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
     {/*<AdminDash_upblock /> */}
      <form onSubmit={onSubmit}>
        <Table sx={{border:'1px solid black',p:2,mt:3,bgcolor:'white'}}>
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
              <Typography sx={{color:'black',fontWeight:'500',fontSize:'28px',m:3,mt:2}}>Personal Info</Typography>
            </Box>
          
        {/* Horizontal Line */}
        <Grid sm={12} xs={12}>
        <hr style={{width:'98%',color:'grey',align:'right'}} noshade />
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
            </Grid>
        </Grid>
        </Table>
      </form>
      </main>
    </div>
  );
}

export default EditSe_Profile;