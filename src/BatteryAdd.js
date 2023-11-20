
import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import {  useLocation, useNavigate } from 'react-router-dom';
import {Grid,Box,Typography,Button,Select,MenuItem,Table,Container} from '@mui/material';
import AdminDash_upblock from './AdminDash_upblock';
import Header from "./Header";
import Admin_sidebar from './Admin_sidebar';
import FormField from './Update/EditInputFormField';
import NoEditable from './Update/InputFormField'
import DropDownField from './Update/DropDownField';
import Dashboard_upBlocks from './Dashboard_upBlocks';
import Sidebar from './Sidebar';
import SERVER_URL from './Server/Server';
import ConfirmationModal from './Confirmation';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";




function BatteryAdd() {
  const authToken = GetToken();
  const [warranty_def, setWarranty_def]=useState('no')
  const [vechicel_def, setVechicle_def]=useState('None')
  const [principal_def, setPrincipal_def]=useState({})

  const warrantyType = [{value:warranty_def, label :'Select Warranty'},{value:'yes', label :'Yes'},{label:'No',value:'no'}]
  const principalType = [{value:principal_def, label :'Select Principal'},{label:1,value:1},{label:2,value:2},{label:3,value:3},{label:4,value:4}];
  const vechicleType = [{label:'Two',value:2},{label:'Three',value:3},{label:'Four',value:4}];

  const navigate = useNavigate();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const location = useLocation();

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
    const day = currentDate.getDate();
  
    return `${day}/${month}/${year}`;
  }
  
  const currentDate = getCurrentDate();

  const username=localStorage.getItem('username')
  const parse_username=JSON.parse(username)
  const [formData, setFormData] = useState({
  batteryCapacity: "",
  batteryCurrent: "",
  batteryId:"",
  batteryVoltage: "",
  invoiceFilePath: "",
  invoiceNumber: "invoice number",
  invoiceUploaded: "",
  // lastUpdated:"",
  make:"",
  model: "",
  principalId:0,
  purchaseDate: currentDate,
  status:Number(0),
  username:parse_username,
  // updatedBy:"",
  warranty:"",
  dealerId:0,
  batteryName:"",
  warrantyYears:Number(6),



});


//   console.log("formdata",formData)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVechicleChange = (e) => {
    setVechicle_def(e.target.value) 
    const {name , value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleWarrentyChange = (e) => {
    setWarranty_def(e.target.value)
    const {name , value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePrincipalChange = (e) => {
    setPrincipal_def(e.target.value)
    const {name , value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const [latestRequests, setLatestRequests] = useState([]);
  const[displayDetails , setDisplayDetails] = useState(false);


   const onSubmit = async(e) => {
    e.preventDefault();
    // formData contains the form values
    try{
    const response=await fetch(`${SERVER_URL}user/add-new-battery`,{
      method:'POST',
      headers:{
        'Authorization':`Bearer ${authToken}`,
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData)
    })
    if(response.ok){
      const result= await response.json()
      toast.success("Battery Added Successfully...!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose:3000
      });
      setTimeout(() => {
        navigate('/userMyBatteries');
      }, 4000);
      
    }
  }catch{
    toast.error('Something went wrong! Try Again..')
  }
    
  };

  


  // Confirmation Dailog box
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleCancle = () => {
    setIsConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleConfirm = () => {
    navigate('/userMyBatteries')
    setIsConfirmationOpen(false);
  };

function handleLabel(){
  return <>
    <p><b>Note: </b>you can extend warranty more than 6 months</p>
  </>
  
}


   


  return (
    <div className="grid-container"  style={{borderBlock:'2px solid black'}}>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
      <Dashboard_upBlocks />
      <Container style={{margin:'50px 0px'}}>
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
                <Typography variant="h5" sx={{textAlign :'left',textTransform:'none'}}>New Battery Details</Typography>
              </Button>
            </Grid>
       
        <FormField label="Battery Name" name="batteryName" value={formData.batteryName} placeholder='Enter Battery Name' onChange={handleInputChange} />
        <FormField  label="Battery ID" name="batteryId"   placeholder='eg:1234' value={formData.batteryId} onChange={handleInputChange}  />
        
        {/* Row 2 */}
        <FormField label="Make" name="make" onChange={handleInputChange} placeholder='Enter Battery Make' value={formData.make}/>
        <FormField label="Model" name="model" onChange={handleInputChange} placeholder='Enter Battery Model' value={formData.model}/>

        {/* Row 3 */}
        <FormField label="Battery Voltage" name="batteryVoltage" onChange={handleInputChange}  placeholder='Enter  Battery Voltage' value={formData.batteryVoltage}/>
        <FormField label="Battery Current" name="batteryCurrent" onChange={handleInputChange} placeholder='Enter Current '  value={formData.batteryCurrent}/>
        <FormField  label="Battery Capacity" name="batteryCapacity" placeholder='Enter Battery Capacity' value={formData.batteryCapacity} onChange={handleInputChange}  />

        {/* Row 4 */}
        <DropDownField label="Vechicle Type" name="vechicleType" onChange={handleVechicleChange} value={vechicel_def} options={vechicleType}/>
        <FormField label="Purchase Date" name="purchaseDate" onChange={handleInputChange} placeholder='YYYY-MM-DD' value={formData.purchaseDate.slice(0,10)} disabled={false} />
        <DropDownField label="Warranty" name="warranty" onChange={handleWarrentyChange}  value={warranty_def} options={warrantyType} />

        
        {/* para_label={handleLabel()} */}

        {warranty_def==='yes' && (
          <>
            <FormField label="Warranty Years" name="warrantyYears" onChange={handleInputChange} value={formData.warrantyYears} placeholder='Enter Warranty Years' />
            <DropDownField label="Principal Id" name="principalId" onChange={handlePrincipalChange}  placeholder='Enter Principal ID' options={principalType} value={principal_def}/>
            <FormField label="Dealer Id" name="dealerId" onChange={handleInputChange} placeholder='Enter Dealer ID' value={formData.dealerId}/>
            {/* <FormField label="Warranty Years" name="warrantyYears" onChange={handleInputChange} value={formData.warrantyYears} placeholder='Enter Warranty Years'/> */}
          </>
            
        )}

      {/* {warranty_def==='no' && (
          <>
            <NoEditable label="Warranty Years" name="warrantyYears" onChange={handleInputChange} value={formData.warrantyYears} placeholder='Enter Warranty Years'/>
            <NoEditable label="Principal Id" name="principalId" onChange={handlePrincipalChange}  placeholder='Enter Principal ID' options={principalType} value={Number(principal_def)}/>
            <NoEditable label="Dealer Id" name="dealerId" onChange={handleInputChange} placeholder='Enter Dealer ID' value={Number(formData.dealerId)}/>

          </>
            
        )}  */}
        
        </Grid>
        <Grid container spacing={3} sx={{p:3}}>
        <Grid item xs={3}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ mb:2}}
                onClick={handleCancle}
              >
               close
              </Button>
            </Grid>
        <Grid item xs={3}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                fullWidth
                sx={{mb:2  }}
                onClick={onSubmit}
              >
                Add
              </Button>

              {/* Toast Notification */}
              <ToastContainer/>

            </Grid>
            <ConfirmationModal
        open={isConfirmationOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirm}
        
      />

      

        </Grid>
        
        
        </Table>
      </form>
            </Container>
      </main>
    </div>
  )
}


export default BatteryAdd;
