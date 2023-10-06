import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import {  useLocation, useNavigate } from 'react-router-dom';
import {Grid,Box,Typography,Button,Select,MenuItem,Table} from '@mui/material';
import AdminDash_upblock from './AdminDash_upblock';
import Header from "./Header";
import Admin_sidebar from './Admin_sidebar';
import FormField from './Update/InputFormField';
import DropDownField from './Update/DropDownField';
import SERVER_URL from './Server/Server';

const authToken = GetToken();
const SEoptions = [{value:'SE1', label :'SE1'},{label:'SE2',value:'SE2'}]
const statusOptions = [{label:'New',value:1},{label:'Assigned',value:2},{label:'Rejected',value:5},{label:'Closed',value:14}];
const performanceOptions = [{label:'Average',value:'average'},{label:'Good',value:'good'},{label:'Excellent',value:'excellent'},{label:'Needs Improvement',value:'needs Improvement'}];



function UpdateTicket() {
  const navigate = useNavigate();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const location = useLocation();
  const ticketId = location.state.ticketId
  console.log("**********");
  console.log(ticketId);
  console.log("***********");
  const [formData, setFormData] = useState({});

  useEffect (()=> {
    async function fetchDetails(){
        const response = await fetch(`${SERVER_URL}admin/get-ticket-details`,{
            method : 'POST',
            headers : {
                'Authorization' : `Bearer ${authToken}`,
                'Content-type': 'application/json',
            },
            body : JSON.stringify({ticketId:ticketId})
        }).then((response) => response.json())
        .then((array_Details) =>{
            setFormData(array_Details);
        })
      }
      fetchDetails();
  },[])

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



  const onSubmit = (e) => {
    e.preventDefault();
    // formData contains the form values
    console.log(formData);
    fetch(`${SERVER_URL}admin/update-ticket`,{
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
      <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
      <AdminDash_upblock />
      <form onSubmit={onSubmit} >
        <Table sx={{border:'1px solid black',p:2,mt:10 ,backgroundColor:'white'}}>
        <Grid container spacing={2} sx={{border:'1px black'}}>
        <Grid  item xs={12}>
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
        <FormField  label="Description" name="shortDescription"  value={formData.shortDescription} onChange={handleInputChange} />
        <FormField  label="Battery Id" name="batteryId"  value={formData.batteryId} onChange={handleInputChange}  />

        {/* Row 2 */}
        <FormField label="Battery Make" name="batteryMake" onChange={handleInputChange} value={formData.batteryMake}/>
        <FormField label="Battery Model" name="batteryModel" onChange={handleInputChange}  value={formData.batteryModel}/>

        {/* Row 3 */}
        <FormField label="Date Opened" name="date" onChange={handleInputChange} value={formData.openDate}/>
        <FormField label="Service Location" name="serviceArea" onChange={handleInputChange}  value={formData.serviceArea}/>

        {/*Row 4 */}
        <FormField label="Customer Name" name="username" onChange={handleInputChange} value={formData.username}/>
        <FormField label="Contact" name="contactNumber" onChange={handleInputChange}  value={formData.contactNumber}/>

        
        {/* Row 5 */}
        <DropDownField label="Status" name="status"  onChange={handleSelectChange} options={statusOptions} value={formData.status}/>
        <DropDownField label="Service Engineer"  name="serviceEngineerId" options={SEoptions} onChange={handleInputChange} value={formData.serviceEngineerId} disabled={false} />

        {/* Row 5 */}
        <FormField label="Notes" name="notes1" onChange={handleInputChange} value={formData.noteToServiceEngineer}/>
        <FormField label="Visit Amount" name="visitAmount" onChange={handleInputChange} value={formData.visitAmount}/>

        {/* Row 6 */}
        <FormField label="SE Notes" name="serviceEngineerNotes" onChange={handleInputChange} value={formData.serviceEngineerNotes}/>
        <FormField label="Service Amount" name="amount" onChange={handleInputChange} value={formData.amount}/>

        {/* Row 7 */}
        <FormField label="Service Date" name="assignedDate" onChange={handleInputChange}  value={formData.assignedDate}/>
        <FormField label="Customer Rating" name="rating" onChange={handleInputChange} value={formData.rating}/>

        <Grid item xs={2}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ml:65,mt:5,mb:3}}
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
                sx={{ml:70, mb:3,mt:5  }}
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


export default UpdateTicket;