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
import DeleteConfirm from './DeleteConfirm';

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
  const [vechicel_def,setVechicle_def]=useState(0)
  const [principalList,setPrincipalsList] =useState('')
  const [principalId,setPrincipalId]= useState('')
  const [dealerId,setDealerId] =useState('')
  const [dealerList, setDealerList] =useState([])


  const warrantyType = [{value:warranty_def, label :warranty_def},{value:'Yes', label :'Yes'},{label:'No',value:'No'}]
  const statusOptions = [
    // { value: status_def, label: status_def },
    { label: 'New', value: 1 },
    { label: 'Reject', value: 5 },
    { label: 'Visit amount due', value: 11 },
    { label: 'Visit amount paid', value: 12 },
    { label: 'To be assigned', value: 2},
    { label: 'Assigned', value: 7 },
    { label: 'In progress', value: 8 },
    { label: 'Hold', value: 9 },
    { label: 'Cant be fulfilled ', value: 15 },
    { label: 'Service amount due', value: 13 },
    { label: 'Service amount paid', value: 14 },
    { label: 'Service amount verified', value: 18 },
    { label: 'Completed', value: 16 },
    { label: 'Closed', value: 17},
    {label:'Active',value:3}

  ];

  const vechicleType = [{value:vechicel_def, label :'Select Vechicle Type  '},{value:'2', label:'Two'},{label:'Three',value:'3'}]

  useEffect(()=>{
    setSatus_def(formData.status || 'select Status')
    setWarranty_def(formData.warranty || 'select Warranty')
    setVechicle_def(formData.vehicleType|| 'select Vehicle Type')
    setPrincipalId(formData.principalId || 'select Principal ID')
    setDealerId(formData.dealerId || 'select Dealer ID')

  })

  console.log("formdata",typeof(formData.vehicleType))
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
  const handleVechicleChange= (e) => {
    setVechicle_def(e.target.value)
    const {name , value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  //View Batteries

  const [latestRequests, setLatestRequests] = useState([]);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
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
              setIsDeleteConfirmOpen(false)
              let batteryInfo;
              let batteryId = input_value;
              for(let i=0; i<latestRequests.length ; i++){
                if(batteryId === latestRequests[i].batteryId){
                  batteryInfo = latestRequests[i]
                  var batteryName=batteryInfo.batteryName
                  latestRequests.pop(batteryInfo);
                }

              }

            batteryInfo.vehicleType = parseInt(batteryInfo.vehicleType);
            batteryInfo.warrantyYears = parseInt(batteryInfo.warrantyYears);
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
    //below 2 lines are converting string type to integer type:
    formData.vehicleType = parseInt(formData.vehicleType);
    formData.warrantyYears = parseInt(formData.warrantyYears);
    formData.dealerId = formData.dealerId;
    formData.principalId = formData.principalId;

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
        setIsConfirmationOpen(false);
      },4000);
      // alert('Details are Successfully Updated');
      // navigate(-1);
    }else{
      toast.error('Something went wrong! please Try again...')
    }
    
  }catch{
    toast.error('Something went wrong! please Try again...')
  }
  };

//Get principals details

  useEffect(()=>{
    const fetchDetails= async()=>{
  const response = await fetch(`${SERVER_URL}user/get-principals`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-type': 'application/json',
      'Accept': 'application/json', // Add this line
      "Access-Control-Allow-Origin": "*",
    }
  });
    if (response.ok) {
      const user_Details = await response.json();
      const principalIds = user_Details.map(eachprincpal => ({
        label: eachprincpal.principalName,
        value: eachprincpal.principalName
      }));
      setPrincipalsList(principalIds);

         

        } else {
          console.error('Failed to fetch user details:', response.status, response.statusText);
        }
    }
    fetchDetails();
    },[])
  
  //Get Delear details
  //Get principals details

  useEffect(()=>{
    const fetchDetails= async()=>{
  const response = await fetch(`${SERVER_URL}user/get-dealers`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-type': 'application/json',
      'Accept': 'application/json', // Add this line
      "Access-Control-Allow-Origin": "*",
    }
  });
      if (response.ok) {
        const user_Details = await response.json();
        const dealerIds = user_Details.map(eachdealer => ({
          label: eachdealer.dealerName,
          value: eachdealer.dealerName
        }));
        setDealerList(dealerIds);


      } else {
        console.error('Failed to fetch user details:', response.status, response.statusText);
      }
  }
  fetchDetails();
  },[])
  



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



   const deleteCancle = () => {
     setIsDeleteConfirmOpen(true);
   };
 
   const deleteCloseConfirmation = () => {
     setIsDeleteConfirmOpen(false);
   };
 
  //  const deleteConfirm = () => {
  //    navigate('/userMyBatteries')
  //    setIsConfirmationOpen(false);
  //  };

  const [parse_statusOptions, setParse_statusOptions]= useState(0)
  useEffect(()=>{
    const status_values=JSON.stringify(statusOptions.find(({value})=>value===formData.status).label)
  // console.log("status",status_values)
  setParse_statusOptions(JSON.parse(status_values))
  // console.log("parse",parse_statusOptions)
  },[])

  const handlePrincipalChange = (e) => {
    
    setPrincipalId(e.target.value)
    const {name , value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
}

const handleDealerChange = (e) => {
    
  setDealerId(e.target.value)
  const {name , value} = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
}

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
        <EditFormField  label="Battery ID" name="batteryId"  value={formData.batteryId} onChange={handleInputChange}  />

        {/* Row 2 */}
        <EditFormField label="Make" name="make" onChange={handleInputChange} value={formData.make}/>
        <EditFormField label="Model" name="model" onChange={handleInputChange}  value={formData.model}/>

        {/* Row 3 */}
        <EditFormField label="Battery Voltage" name="batteryVoltage" onChange={handleInputChange} value={formData.batteryVoltage}/>
        <EditFormField label="Battery Current" name="batteryCurrent" onChange={handleInputChange}  value={formData.batteryCurrent}/>
        <EditFormField label="Battery Capacity" name="batteryCapacity" onChange={handleInputChange}  value={formData.batteryCapacity}/>

        {/* Row 4 */}
        <EditFormField label="Purchase Date" name="purchaseDate" onChange={handleInputChange} value={formData.purchaseDate.slice(0,10)}/>
        <DropDownField label="Warranty" name="warranty" onChange={handlewarrantyChange}  value={warranty_def} options={warrantyType}/>
        
        {warranty_def==='Yes' && <EditFormField label="Warranty Years" name="warrantyYears" onChange={handleInputChange} value={formData.warrantyYears}/>}
        <DropDownField label="Vechicle Type" name="vehicleType" onChange={handleVechicleChange}  options={vechicleType} value={formData.vehicleType}/>

        {/* Row 6 */}
        {dealerList.length > 0 ? (
                  <DropDownField
                    name="dealerId"
                    label='Dealer ID'
                    placeholder="eg:1234"
                    value={dealerId}
                    onChange={handleDealerChange}
                    options={dealerList}
                    
                  />
                ) : (
                  <EditFormField label="Dealer ID" name="dealerId" placeholder='Enter dealerId' value="DealerId's fetching...!" />
                )}
        {principalList.length > 0 ? (
                  <DropDownField
                    name="principalId"
                    label='Principal ID'
                    placeholder="eg:1234"
                    value={principalId}
                    onChange={handlePrincipalChange}
                    options={principalList}
                  />
                ) : (
                  <EditFormField label="Princilap ID" name="principalId" placeholder='Enter principalId' value="PrincipalId's fetching...!" />
                )}

        <FormField label="Status" name="status" onChange={handleStatusChange}   value={parse_statusOptions} options={statusOptions}/>
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
                onClick={deleteCancle}
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

        {/* delete confirmation */}
        <DeleteConfirm
          open={isDeleteConfirmOpen}
          onClose={deleteCloseConfirmation}
          onConfirm={()=>handleDelete(formData.batteryId)}
          
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