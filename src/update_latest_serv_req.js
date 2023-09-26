import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import {  useLocation, useNavigate } from 'react-router-dom';
import {Grid,Box,Typography,Button,Select,MenuItem,Table,Container} from '@mui/material';
import AdminDash_upblock from './AdminDash_upblock';
import Header from "./Header";
import Admin_sidebar from './Admin_sidebar';
import FormField from './Update/InputFormField';
import DropDownField from './Update/DropDownField';
import Dashboard_upBlocks from './Dashboard_upBlocks';
import Sidebar from './Sidebar';

const authToken = GetToken();
const SEoptions = [{value:'SE1', label :'SE1'},{label:'SE2',value:'SE2'}]
const statusOptions = [{label:'New',value:1},{label:'Assigned',value:2},{label:'Rejected',value:5},{label:'Closed',value:14}];
const performanceOptions = [{label:'Average',value:'average'},{label:'Good',value:'good'},{label:'Excellent',value:'excellent'},{label:'Needs Improvement',value:'needs Improvement'}];



function UpdateLatestServReq() {
    const Rating = [{label:'Average',value:'average'},{label:'Good',value:'good'},{label:'Excellent',value:'excellent'},{label:'Needs Improvement',value:'needs Improvement'}];
  const navigate = useNavigate();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const location = useLocation();
  const batteryDetails = location.state.shortDescription
  console.log("**********");
  console.log(batteryDetails);
  console.log("***********");
  const [formData, setFormData] = useState(batteryDetails);



  // useEffect (()=> {
  //   async function fetchDetails() {
  //     try {
  //       const response = await fetch('http://100.20.33.222:5000/user/get-battery-details', {
  //         method: 'POST',
  //         headers: {
  //           'Authorization': `Bearer ${authToken}`,
  //           'Content-type': 'application/json',
  //         },
  //         body: JSON.stringify({ batteryId: batteryId }),
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const batteryDetails = await response.json();
  //       setFormData(batteryDetails);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }
  //   fetchDetails();
  // }, [batteryId, authToken]);


  console.log("formdata",formData)
  // const fdata=JSON.stringify(formData)
  // const parse_formdata=JSON.parse(fdata)
  // console.log("parse",parse_formdata)
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

  const [latestRequests, setLatestRequests] = useState([]);
  const[displayDetails , setDisplayDetails] = useState(false);

  useEffect(() => {
    // Function to make the GET request
    async function getLatestRequests() {
      try {
        const response = await fetch('http://100.20.33.222:5000/user/get-service-request-details',{
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
    

            fetch("http://100.20.33.222:5000/user/delete-service-request",{
              method : "DELETE",
              headers : {
                'Authorization':`Bearer ${authToken}`,
                'Content-Type' : 'application/json',
              },
              body: JSON.stringify(batteryInfo),
            }).then(response => {
              if (response.ok) {
                console.log('DELETE request successful.');
                alert("Deleted Succesfully")
                navigate('/userMyBatteries')
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
    fetch('http://100.20.33.222:5000/user/update-battery',{
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
        <FormField  label="Description" name="description"  value={formData.shortDescription} onChange={handleInputChange}  />

        {/* Row 2 */}
        <FormField label="Make" name="make" onChange={handleInputChange} value={formData.make}/>
        <FormField label="Model" name="model" onChange={handleInputChange}  value={formData.model}/>

        {/* Row 3 */}
        <FormField label="Battery Voltage" name="batteryVoltage" onChange={handleInputChange} value={formData.voltage}/>
        <FormField label="Battery Current" name="batteryCurrent" onChange={handleInputChange}  value={formData.current}/>

        {/* Row 4 */}
        <FormField label="Vehicle Type" name="vehicleType" onChange={handleInputChange} value={formData.vehicleType}/>
        <FormField label="Service Location" name="serviceLocation" onChange={handleInputChange}  value={formData.service_location}/>

        {/* Row 5 */}
        <FormField label="Date Opened" name="openDate" onChange={handleInputChange} value={formData.openDate}/>
        <FormField label="NoteToServiceEngineer" name="NoteToServiceEngineer" onChange={handleInputChange} value={formData.noteToServiceEngineer}/>

        {/* Row 6 */}
        <FormField label="Under Warrenty" name="underWarrenty" />
        <FormField label="self Declaration" placeholder='I agree terms & conditions'/>

        {/* Row 7 */}
        <FormField label="Status" name="status" onChange={handleInputChange}  value={formData.status}/>
        <FormField label="Last Status Updated" name="lastStatusUpdated" onChange={handleInputChange} value={formData.laststatusUpdated}/>

        <FormField label="Visit Amount" name="visitAmount" onChange={handleInputChange}  value={formData.amount}/>
        <FormField label="Visit Amount Paid" name="visitAmountPaid" onChange={handleInputChange} value={formData.visitAmountPaid}/>
        
        <FormField label="Service Date" name="serviceDate" onChange={handleInputChange}  value={formData.serviceDate}/>
        <FormField label="ServiceEngineer Notes" name="serviceEnggNotes" onChange={handleInputChange} value={formData.serviceEngineerNotes}/>

        <FormField label="Service Amount" name="serviceAmount" onChange={handleInputChange}  value={formData.ServiceAmount}/>
        <FormField label="service Amount Paid" name="serviceAmountPaid" onChange={handleInputChange} value={formData.serviceAmountPaid}/>
            
        <DropDownField label="Customer Rating" name="customerRating" onChange={handleInputChange}  value={formData.rating} options={Rating}/>
        
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