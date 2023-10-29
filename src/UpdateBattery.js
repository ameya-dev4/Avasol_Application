import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import {  useLocation, useNavigate } from 'react-router-dom';
import {Grid,Box,Typography,Button,Select,MenuItem,Table,Container} from '@mui/material';
import AdminDash_upblock from './AdminDash_upblock';
import Header from "./Header";
import Admin_sidebar from './Admin_sidebar';
import FormField from './Update/InputFormField';
import EditFormField from './Update/EditInputFormField'
import DropDownField from './Update/DropDownField';
import Dashboard_upBlocks from './Dashboard_upBlocks';
import Sidebar from './Sidebar';
import SERVER_URL from './Server/Server';
import ConfirmationModal from './Confirmation';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const authToken = GetToken();



function UpdateBattery() {
  const navigate = useNavigate();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const location = useLocation();
  const batteryDetails = location.state.batteryId
  console.log("**********");
  console.log("data",batteryDetails);
  console.log("***********");
  const [formData, setFormData] = useState(batteryDetails);

  const [status_def, setSatus_def]=useState('')
  const [warranty_def,setWarranty_def]=useState('No')

  const warrantyType = [{value:warranty_def, label :warranty_def},{value:'Yes', label :'Yes'},{label:'No',value:'No'}]
  const statusOptions = [
    { value: status_def, label: status_def },
    { label: 'New', value: 1 },
    { label: 'Active', value: 3 },
    { label: 'Inactive', value: 4 },
    { label: 'Hold', value: 9 },
    { label: 'Deleted', value: 6 },
  ];

  useEffect(()=>{
    setSatus_def(formData.status || 'select Status')
    setWarranty_def(formData.warranty || 'select Warranty')
  })

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

  const handlewarrantyChange = (e) => {
    setWarranty_def(e.target.value)
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


  //View Batteries

  const [latestRequests, setLatestRequests] = useState([]);
  const[displayDetails , setDisplayDetails] = useState(false);


  useEffect(() => {
    // Function to make the GET request
    async function getLatestRequests() {
      try {
        const response = await fetch(`${SERVER_URL}user/get-battery-list`,{
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
                  var batteryName=batteryInfo.batteryName
                  latestRequests.pop(batteryInfo);
                }

              }

            fetch(`${SERVER_URL}user/delete-battery`,{
              method : "DELETE",
              headers : {
                'Authorization':`Bearer ${authToken}`,
                'Content-Type' : 'application/json',
              },
              body: JSON.stringify(batteryInfo),
            }).then(response => {
              if (response.ok) {
                toast.success(`${batteryName} deleted Successfully...!`, {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose:3000
                });
                setTimeout(() => {
                  navigate('/userMyBatteries')
                },4000);
                
                // Handle success or update the UI accordingly
              } 
            })
            .catch(error => {
              toast.error('Network Error! please check internet connection...')
              // console.error('Error occurred during DELETE request:', error);
              // Handle error or update the UI accordingly
            });
          }


  const FormatDate = (dateString)=>{
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleString("en-US",{
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      // timeZoneName: "short",
    });
    return formattedDate;

  }


  const onSubmit = async(e) => {
    e.preventDefault();
    // formData contains the form values
    formData.purchaseDate=formData.purchaseDate.slice(0,10)
    console.log(formData)
    try{
    const response= await fetch(`${SERVER_URL}user/update-battery`,{
      method:'PUT',
      headers:{
        'Authorization':`Bearer ${authToken}`,
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData)
    })
    if (response.ok){
      const result =await response.json()
      toast.success(`${formData.batteryName} updated Successfully...!`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose:3000
      });
      setTimeout(() => {
        navigate('/userMyBatteries')
      },4000);
      // alert('Details are Successfully Updated');
      // navigate(-1);
    }
  }catch{
    toast.error('Something went wrong! please Try again...')
  }
  };
   
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

  return (
    <div className="grid-container"  style={{borderBlock:'2px solid black'}}>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
      <Dashboard_upBlocks />
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
                <Typography variant="h5" sx={{textAlign :'left',textTransform:'none'}}>Update Battery Details</Typography>
              </Button>
            </Grid>
       
        {/* Row 1 */}
        <EditFormField label="Battery Name" name="batteryName" value={formData.batteryName} onChange={handleInputChange} />
        <EditFormField  label="Battery Number" name="batteryNumber"  value={formData.batteryNumber} onChange={handleInputChange}  />

        {/* Row 2 */}
        <EditFormField label="Make" name="make" onChange={handleInputChange} value={formData.make}/>
        <EditFormField label="Model" name="model" onChange={handleInputChange}  value={formData.model}/>

        {/* Row 3 */}
        <EditFormField label="Battery Voltage" name="batteryVoltage" onChange={handleInputChange} value={formData.batteryVoltage}/>
        <EditFormField label="Battery Current" name="batteryCurrent" onChange={handleInputChange}  value={formData.batteryCurrent}/>

        {/* Row 4 */}
        <EditFormField label="Purchase Date" name="purchaseDate" onChange={handleInputChange} value={formData.purchaseDate.slice(0,10)}/>
        <DropDownField label="Warranty" name="warranty" onChange={handlewarrantyChange}  value={warranty_def} options={warrantyType}/>
        
        <EditFormField label="Warranty Years" name="warrantyYears" onChange={handleInputChange} value={formData.warrantyYears}/>
        <EditFormField label="Vechicle Type" name="vechicleType" onChange={handleInputChange} value={formData.vechicleType}/>

        {/* Row 6 */}
        <EditFormField label="Dealer Addrees" name="dealerAddress" onChange={handleInputChange} value={formData.delearAddress}/>
        <EditFormField label="Dealer Contact" name="Dealer Contact" onChange={handleInputChange} value={formData.DealerContact}/>

        {/* Row 7 */}
        <EditFormField label="Sub-DealerAddress" name="subDealerAddress" onChange={handleInputChange}  value={formData.subDealerAddress}/>
        <EditFormField label="Sub-Dealer Contact" name="subDealer Contact" onChange={handleInputChange} value={formData.subDealerContact}/>

        {/* Row 8 */}
        <DropDownField label="Status" name="status" onChange={handleStatusChange}   value={Number(status_def)} options={statusOptions}/>
        {/* options={Rating} */}
        </Grid>
        <Grid container spacing={3} sx={{p:3}}>
        <Grid item xs={3}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 5,mb:2}}
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
                sx={{ mt: 5,mb:2  }}
                onClick={onSubmit}
              >
                Save Changes
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                
                variant="contained"
                size="large"
                fullWidth
                color='error'
                sx={{ mt: 5,mb:2  }}
                onClick={() => handleDelete(formData.batteryId)}
              >
                Delete Battery
              </Button>

            {/* Toast Notification */}
            <ToastContainer/>
            
            <ConfirmationModal
          open={isConfirmationOpen}
          onClose={handleCloseConfirmation}
          onConfirm={handleConfirm}
          
        />

        
            </Grid>
        </Grid>
        </Table>
      </form>
              
            </Container>
      </main>
    </div>
  )
}


export default UpdateBattery;