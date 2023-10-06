import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import {  useLocation, useNavigate } from 'react-router-dom';
import {Grid,Box,Typography,Button,Select,MenuItem,Table,Container} from '@mui/material';
import AdminDash_upblock from './AdminDash_upblock';
import Header from "./Header";
import Admin_sidebar from './Admin_sidebar';
import FormField from './Update/InputFormField';
import DropDownField from './Update/DropDownField';
import EditFormField from './Update/EditInputFormField';
import Dashboard_upBlocks from './Dashboard_upBlocks';
import Sidebar from './Sidebar';
import SERVER_URL from './Server/Server';

const authToken = GetToken();



function UpdateLatestServReq() {
  const location = useLocation();
  const batteryDetails = location.state.shortDescription
  console.log("**********");
  console.log(batteryDetails);
  console.log("***********");

  // batteryDetails.otpId=5
  // batteryDetails.requestId=0
  const [formData, setFormData] = useState(batteryDetails);

  
  const [status_def, setSatus_def]=useState('')
  const [preform_def,setPerform_def]=useState('None')
  const [warranty_def,setWarranty_def]=useState('No')
  const [Declare_def, setDeclare_def] = useState(false)

  const warrantyType = [{value:warranty_def, label :warranty_def},{value:'Yes', label :'Yes'},{label:'No',value:'No'}]
  const Declaration = [{value:Declare_def, label :Declare_def},{value:true, label :'Yes'},{label:'No',value:false}]
  const statusOptions = [{value:status_def, label :status_def},{label:'New',value:1},{label:'Assigned',value:2},{label:'Rejected',value:5},{label:'Closed',value:14}];
  const performanceOptions = [{value:preform_def, label :preform_def},{label:'Average',value:'average'},{label:'Good',value:'good'},{label:'Excellent',value:'excellent'},{label:'Needs Improvement',value:'needs Improvement'}];

  const navigate = useNavigate();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  useEffect(()=>{
    setSatus_def(formData.status)
    setDeclare_def(formData.selfDeclaration)
    setWarranty_def(formData.warranty)
    setPerform_def(formData.performance)
  })
 
  


  console.log("formdata",formData)

  const handleInputChange = (e) => {

    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlewarrantyChange = (e) => {
    setWarranty_def(e.target.value)
    const {name , value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeclareChange = (e) => {
    setDeclare_def(e.target.value)
    const {name , value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    setSatus_def(e.target.value)
    const {name , value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePerformChange = (e) => {
    setPerform_def(e.target.value)
    const {name , value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [latestRequests, setLatestRequests] = useState([]);
  const[displayDetails , setDisplayDetails] = useState(false);

  useEffect(() => {
    // Function to make the GET request
    async function getLatestRequests() {
      try {
        const response = await fetch(`${SERVER_URL}user/latest-service-requests`,{
            method:"GET",
            headers:{
                'Content-Type':"application/json",
                "Authorization": "Bearer " + authToken,
            },
        });
        const data = await response.json();
        setLatestRequests(data);
        // console.log(data)
      } catch (error) {
        console.error('Error fetching latest requests:', error);
      }
    }

    // Call the function to get and display the latest service requests on page load
    getLatestRequests();
  }, []);



  const handleDelete = (input_value) =>{
    let batteryInfo;
    let batteryId = input_value;
    for(let i=0; i<latestRequests.length ; i++){
      if(batteryId === latestRequests[i].batteryId){
        batteryInfo = latestRequests[i]
        latestRequests.pop(batteryInfo);
      }

    }

      formData.status=6
      formData.transactionId=1
      fetch(`${SERVER_URL}user/delete-service-request`,{
        method : "DELETE",
        headers : {
          'Authorization':`Bearer ${authToken}`,
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      }).then(response => {
        if (response.ok) {
          console.log('DELETE request successful.');
          alert("Deleted Succesfully")
          navigate('/latest_serv_request')
          // Handle success or update the UI accordingly
        } else {
          console.error('DELETE request failed.');
          // Handle error or update the UI accordingly

        }
      })
      .catch(error => {
        console.error('Error occurred during DELETE request:', error);
        // Handle error or update the UI accordingly
      });
    }


  const onSubmit = (e) => {
    e.preventDefault();
    // formData contains the form values
    console.log(formData);
    fetch(`${SERVER_URL}user/update-service-request`,{
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
                <Typography variant="h5" sx={{textAlign :'left',textTransform:'none'}}>Update Service Details</Typography>
              </Button>
            </Grid>
       
        {/* Row 1 */}
        <FormField label="Battery ID" name="batteryId" value={formData.batteryId}  />
        <EditFormField  label="Description" name="shortDescription"  value={formData.shortDescription} onChange={handleInputChange}  />

        {/* Row 2 */}
        <EditFormField label="Make" name="make" onChange={handleInputChange} value={formData.make}/>
        <EditFormField label="Model" name="model" onChange={handleInputChange}  value={formData.model}/>

        {/* Row 3 */}
        <EditFormField label="Battery Voltage" name="batteryVoltage" onChange={handleInputChange} value={formData.batteryVoltage}/>
        <EditFormField label="Battery Current" name="batteryCurrent" onChange={handleInputChange}  value={formData.batteryCurrent}/>

        {/* Row 4 */}
        <EditFormField label="Vehicle Type" name="vehicleType" onChange={handleInputChange} value={formData.vehicleType}/>
        <EditFormField label="Service Location" name="serviceLocation" onChange={handleInputChange}  value={formData.service_location}/>

        {/* Row 5 */}
        <FormField label="Date Opened" name="openDate" onChange={handleInputChange} value={formData.openDate}/>
        <EditFormField label="NoteToServiceEngineer" name="noteToServiceEngineer" onChange={handleInputChange} value={formData.noteToServiceEngineer}/>

        {/* Row 6 */}
        <DropDownField label="Under Warrenty" name="warranty" onChange={handlewarrantyChange}  value={warranty_def} options={warrantyType}/>
        <DropDownField label="self Declaration" placeholder='I agree terms & conditions' name='selfDeclaration' onChange={handleDeclareChange} options={Declaration} value={Declare_def}/>

        {/* Row 7 */}
        <DropDownField label="Status" name="status" onChange={handleStatusChange}  value={status_def} options={statusOptions}/>
        <FormField label="Last Status Updated" name="status" onChange={handleInputChange} value={formData.status}/>

        <EditFormField label="Visit Amount" name="visitAmount" onChange={handleInputChange}  value={formData.amount}/>
        <EditFormField label="Visit Amount Paid" name="visitAmountPaid" onChange={handleInputChange} value={formData.visitAmountPaid}/>
        
        <EditFormField label="Service Date" name="serviceDate" onChange={handleInputChange}  value={formData.serviceDate}/>
        <EditFormField label="ServiceEngineer Notes" name="serviceEnggNotes" onChange={handleInputChange} value={formData.serviceEngineerNotes}/>

        <EditFormField label="Service Amount" name="serviceAmount" onChange={handleInputChange}  value={formData.serviceAmount}/>
        <EditFormField label="service Amount Paid" name="serviceAmountPaid" onChange={handleInputChange} value={formData.serviceAmountPaid}/>
            
        <DropDownField label="Customer Rating" name="performance" onChange={handlePerformChange}  value={preform_def} options={performanceOptions}/>
        
        </Grid>
        <Grid container spacing={3} sx={{p:3}}>
        <Grid item xs={3}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ mb:2}}
                onClick={() => navigate(-1)}
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
                Update
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                
                variant="contained"
                size="large"
                fullWidth
                color='error'
                sx={{mb:2}}
                onClick={() => handleDelete(formData.batteryId)}
              >
                Delete Service
              </Button>
            </Grid>

        </Grid>
        
        
        </Table>
      </form>
            </Container>
      </main>
    </div>
  )
}


export default UpdateLatestServReq;