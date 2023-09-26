import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import {Grid,Typography,Button,Table,Link} from '@mui/material';
//import AdminDash_upblock from "../../Pages/Admin_Upblocks";
import Header from "./Header";
import Sidebar from "./Sidebar";
import FormField from './Update/InputFormField';
import DropDownField from './Update/DropDownField';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const authToken = GetToken();
const trainingOptions = [{value:'Yes', label :'Yes'},{label:'No',value:'No'}]
const statusOptions = [{label:'New',value:1},{label:'Assigned',value:2},{label:'Rejected',value:5},{label:'Closed',value:14}];
const performanceOptions = [{label:'Average',value:'average'},{label:'Good',value:'good'},{label:'Excellent',value:'excellent'},{label:'Needs Improvement',value:'needs Improvement'}];



function Update() {
  const navigate = useNavigate();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  const location = useLocation();
  const updateDetails = location.state.updateArray;
  const [formData, setFormData] = useState(updateDetails);

  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://100.20.33.222:5000/se/get-profile', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: ServiceEngineerName })
        });
        if (response.ok) {
          const data = await response.json();
          // Set form values using setFormData
          setFormData({
            ...data,
          status : findselectedOption(data.status , statusOptions),
          trainingDetails : findselectedOption(data.trainingDetails,trainingOptions),
          performance : findselectedOption(data.performance ,performanceOptions),
        });
        } else {
          // Handle error if API request fails
        }
      } catch (error) {
        // Handle any other errors
      }
    };

    fetchData();
  }, []);

  */

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const {name , value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const findselectedOption = (value,options) =>{
    return options.find((option) => option.value === value) || 'hello' ;

  }


  const onSubmit = (e) => {
    e.preventDefault();
    // formData contains the form values
    console.log(formData);
    fetch('http://100.20.33.222:5000/se/update-service-request',{
      method:'PUT',
      headers:{
        'Authorization':`Bearer ${authToken}`,
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData)
    }).then((response) => response.json())
    .then((data) =>{
      console.log(data);
      alert('Details are Successfully Updated');
      navigate(-1);
    }).catch((error) => {
      console.log(error);
    })
    // Perform your form submission logic here
  };

  return (
    <div className="grid-container"  style={{borderBlock:'2px solid black'}}>
      {/* ... form rendering ... */}
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
     {/* <AdminDash_upblock /> */}
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
                <Typography variant="h5" sx={{textAlign :'left',textTransform:'none'}}>Update Ticket Details</Typography>
              </Button>
            </Grid>
       
        {/* Row 1 */}
        <FormField label="Ticket Id" name="ticketId" value={formData.ticketId} onChange={handleInputChange} />
        <FormField  label="Battery Number" name="batteryId"  value={formData.batteryId} onChange={handleInputChange}  />

        {/* Row 2 */}
        <FormField label="Battery Make" name="batteryMake" onChange={handleInputChange} value={formData.batteryMake}/>
        <FormField label="Battery Model" name="batteryModel" onChange={handleInputChange}  value={formData.batteryModel}/>

        {/* Row 3 */}
        <FormField label="Battery Voltage" name="batteryVoltage" onChange={handleInputChange} value={formData.batteryVoltage}/>
        <FormField label="Battery Current" name="batteryCurrent" onChange={handleInputChange}  value={formData.batteryCurrent}/>

        
        {/* Row 4 */}
        <DropDownField label="Assigned By" name="assignedBy" onChange={handleSelectChange} options={trainingOptions} value={formData.assignedBy}/>
        <FormField label="Assigned Date" name="assignedDate" type = "Date" onChange={handleInputChange} value={formData.assignedDate}/>
        
        {/* Row 5 */}
        <FormField label="Ticket Description" name="shortDescription" onChange={handleInputChange} value={formData.shortDescription}/>
        <FormField label="Note to Service Engineer" name="noteToServiceEngineer" onChange={handleInputChange}  value={formData.noteToServiceEngineer}/>

        {/* Row 6 */}
        <FormField label="Customer Name" name="username" onChange={handleInputChange} value={formData.username}/>
        <FormField label="Customer contact" name="contactNumber" onChange={handleInputChange}  value={formData.batteryCurrent}/>
        
        {/* Row 7 */}
        <FormField label="Service Location" name="serviceArea" onChange={handleInputChange} value={formData.serviceArea}/>
        <Typography sx={{mt:5,ml:10,mb:3}}><LocationOnIcon  style={{ fontSize: 60 }} /><Link sx={{fontSize : '24px' , cursor:'pointer'}}  href={`${'https://'}`} target='_blank'>Hello</Link></Typography>
       
       
        {/* Row 8 */}
        <FormField label="Attended Date" type='date' name="attendedDate" onChange={handleInputChange} value={formData.attendedDate}/>
        <FormField label="Service Engineer Notes" name="serviceEngineerNotes" onChange={handleInputChange} value={formData.serviceEngineerNotes}/>

       {/* Row 9 */}
        <DropDownField label="Status" name="status" onChange={handleSelectChange} options={statusOptions} value={formData.status}/>
        <FormField label="Amount" name="amount" onChange={handleInputChange} value={formData.amount} disabled={false} />
        
        {/* Row 7 */}
        <DropDownField label="Payment" name="payment" onChange={handleSelectChange} options={performanceOptions}  value={formData.payment}/>
        <FormField label="Pefr Otp" name="otpId" onChange={handleInputChange} value={formData.otpId}/>

        
       
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



export default Update;
