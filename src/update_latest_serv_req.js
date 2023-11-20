// import React, { useEffect, useState } from 'react';
// import { GetToken } from './Api/auth';
// import {  useLocation, useNavigate } from 'react-router-dom';
// import {Grid,Box,Typography,Button,Select,MenuItem,Table,Container} from '@mui/material';
// import AdminDash_upblock from './AdminDash_upblock';
// import Header from "./Header";
// import Admin_sidebar from './Admin_sidebar';
// import FormField from './Update/InputFormField';
// import DropDownField from './Update/DropDownField';
// import EditFormField from './Update/EditInputFormField';
// import Dashboard_upBlocks from './Dashboard_upBlocks';
// import Sidebar from './Sidebar';
// import SERVER_URL from './Server/Server';

// const authToken = GetToken();



// function UpdateLatestServReq() {
//   const location = useLocation();
//   const batteryDetails = location.state.shortDescription
//   console.log("**********");
//   console.log(batteryDetails);
//   console.log("***********");

//   // batteryDetails.otpId=5
//   // batteryDetails.requestId=0
//   const [formData, setFormData] = useState(batteryDetails);

  
//   const [status_def, setSatus_def]=useState('')
//   const [preform_def,setPerform_def]=useState('None')
//   const [warranty_def,setWarranty_def]=useState('No')
//   const [Declare_def, setDeclare_def] = useState(false)

//   useEffect(()=>{
//     setSatus_def(formData.status)
//     setDeclare_def(formData.selfDeclaration)
//     setWarranty_def(formData.warranty)
//     setPerform_def(formData.performance)
//   })

//   console.log("warranty",warranty_def)
//   const warrantyType = [{value:warranty_def, label :warranty_def},{value:'Yes', label :'Yes'},{label:'No',value:'No'}]
//   const Declaration = [{value:Declare_def, label :Declare_def},{value:true, label :'Yes'},{label:'No',value:false}]
//   const statusOptions = [{value:status_def, label :status_def},{label:'New',value:1},{label:'Assigned',value:2},{label:'Rejected',value:5},{label:'Closed',value:14}];
//   const performanceOptions = [{value:preform_def, label :preform_def},{label:'Average',value:'average'},{label:'Good',value:'good'},{label:'Excellent',value:'excellent'},{label:'Needs Improvement',value:'needs Improvement'}];

//   const navigate = useNavigate();
//   const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle)
//   }

  
 
  


//   console.log("formdata",formData)

//   const handleInputChange = (e) => {

//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handlewarrantyChange = (e) => {
//     setWarranty_def(e.target.value)
//     const {name , value} = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleDeclareChange = (e) => {
//     setDeclare_def(e.target.value)
//     const {name , value} = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleStatusChange = (e) => {
//     setSatus_def(e.target.value)
//     const {name , value} = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handlePerformChange = (e) => {
//     setPerform_def(e.target.value)
//     const {name , value} = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const [latestRequests, setLatestRequests] = useState([]);
//   const[displayDetails , setDisplayDetails] = useState(false);

//   useEffect(() => {
//     // Function to make the GET request
//     async function getLatestRequests() {
//       try {
//         const response = await fetch(`${SERVER_URL}user/latest-service-requests`,{
//             method:"GET",
//             headers:{
//                 'Content-Type':"application/json",
//                 "Authorization": "Bearer " + authToken,
//             },
//         });
//         const data = await response.json();
//         setLatestRequests(data);
//         // console.log(data)
//       } catch (error) {
//         console.error('Error fetching latest requests:', error);
//       }
//     }

//     // Call the function to get and display the latest service requests on page load
//     getLatestRequests();
//   }, []);



//   const handleDelete = (input_value) =>{
//     let batteryInfo;
//     let batteryId = input_value;
//     for(let i=0; i<latestRequests.length ; i++){
//       if(batteryId === latestRequests[i].batteryId){
//         batteryInfo = latestRequests[i]
//         latestRequests.pop(batteryInfo);
//       }

//     }

//       formData.status=6
//       formData.transactionId=1
//       fetch(`${SERVER_URL}user/delete-service-request`,{
//         method : "DELETE",
//         headers : {
//           'Authorization':`Bearer ${authToken}`,
//           'Content-Type' : 'application/json',
//         },
//         body: JSON.stringify(formData),
//       }).then(response => {
//         if (response.ok) {
//           console.log('DELETE request successful.');
//           alert("Deleted Succesfully")
//           navigate('/latest_serv_request')
//           // Handle success or update the UI accordingly
//         } else {
//           console.error('DELETE request failed.');
//           // Handle error or update the UI accordingly

//         }
//       })
//       .catch(error => {
//         console.error('Error occurred during DELETE request:', error);
//         // Handle error or update the UI accordingly
//       });
//     }


//   const onSubmit = (e) => {
//     e.preventDefault();
//     // formData contains the form values
//     console.log(formData);
//     fetch(`${SERVER_URL}user/update-service-request`,{
//       method:'PUT',
//       headers:{
//         'Authorization':`Bearer ${authToken}`,
//         'Content-Type':'application/json',
//       },
//       body:JSON.stringify(formData)
//     }).then((response) => response.json())
//     .then((data) =>{
//       console.log(data);
//       alert('Details are Successfully Updated');
//       navigate(-1);
//     }).catch((error) => {
//       console.log(error);
//     })
//     // Perform your form submission logic here
//   };
   

//   return (
//     <div className="grid-container"  style={{borderBlock:'2px solid black'}}>
//       <Header OpenSidebar={OpenSidebar}/>
//       <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
//       <main className='main-container'>
//       <Dashboard_upBlocks />
//       <Container style={{margin:'50px 0px'}}>
//               <form noValidate>
//         <Table sx={{border:'1px solid black',p:2,mt:3,backgroundColor:'white'}}>
//         <Grid container spacing={2} sx={{border:'1px black'}}>
//         <Grid item xs={12}>
//               <Button
//                 variant="contained"
//                 size="large"
//                 color='primary'
//                 fullWidth
//                 sx={{ mb: 3  }}
                
//               >
//                 <Typography variant="h5" sx={{textAlign :'left',textTransform:'none'}}>Update Service Details</Typography>
//               </Button>
//             </Grid>
       
//         {/* Row 1 */}
//         <FormField label="Battery ID" name="batteryId" value={formData.batteryId}  />
//         <EditFormField  label="Description" name="shortDescription"  value={formData.shortDescription} onChange={handleInputChange}  />

//         {/* Row 2 */}
//         <EditFormField label="Make" name="make" onChange={handleInputChange} value={formData.make}/>
//         <EditFormField label="Model" name="model" onChange={handleInputChange}  value={formData.model}/>

//         {/* Row 3 */}
//         <EditFormField label="Battery Voltage" name="batteryVoltage" onChange={handleInputChange} value={formData.batteryVoltage}/>
//         <EditFormField label="Battery Current" name="batteryCurrent" onChange={handleInputChange}  value={formData.batteryCurrent}/>

//         {/* Row 4 */}
//         <EditFormField label="Vehicle Type" name="vehicleType" onChange={handleInputChange} value={formData.vehicleType}/>
//         <EditFormField label="Service Location" name="serviceLocation" onChange={handleInputChange}  value={formData.service_location}/>

//         {/* Row 5 */}
//         <FormField label="Date Opened" name="openDate" onChange={handleInputChange} value={formData.openDate.slice(0,10)}/>
//         <EditFormField label="NoteToServiceEngineer" name="noteToServiceEngineer" onChange={handleInputChange} value={formData.noteToServiceEngineer}/>

//         {/* Row 6 */}
//         <DropDownField label="Under Warranty" name="warranty" onChange={handlewarrantyChange}  value={warranty_def} options={warrantyType}/>
//         <DropDownField label="self Declaration" placeholder='I agree terms & conditions' name='selfDeclaration' onChange={handleDeclareChange} options={Declaration} value={Declare_def}/>

//         {/* Row 7 */}
//         <DropDownField label="Status" name="status" onChange={handleStatusChange}  value={status_def} options={statusOptions}/>
//         <FormField label="Last Status Updated" name="status" onChange={handleInputChange} value={formData.status}/>

//         <EditFormField label="Visit Amount" name="visitAmount" onChange={handleInputChange}  value={formData.amount}/>
//         <EditFormField label="Visit Amount Paid" name="visitAmountPaid" onChange={handleInputChange} value={formData.visitAmountPaid}/>
        
//         <EditFormField label="Service Date" name="serviceDate" onChange={handleInputChange}  value={formData.serviceDate}/>
//         <EditFormField label="ServiceEngineer Notes" name="serviceEnggNotes" onChange={handleInputChange} value={formData.serviceEngineerNotes}/>

//         <EditFormField label="Service Amount" name="serviceAmount" onChange={handleInputChange}  value={formData.serviceAmount}/>
//         <EditFormField label="service Amount Paid" name="serviceAmountPaid" onChange={handleInputChange} value={formData.serviceAmountPaid}/>
            
//         <DropDownField label="Customer Rating" name="performance" onChange={handlePerformChange}  value={preform_def} options={performanceOptions}/>
        
//         </Grid>
//         <Grid container spacing={3} sx={{p:3}}>
//         <Grid item xs={3}>
//               <Button
//                 variant="contained"
//                 size="large"
//                 fullWidth
//                 sx={{ mb:2}}
//                 onClick={() => navigate(-1)}
//               >
//                close
//               </Button>
//             </Grid>
//         <Grid item xs={3}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="success"
//                 size="large"
//                 fullWidth
//                 sx={{mb:2  }}
//                 onClick={onSubmit}
//               >
//                 Update
//               </Button>
//             </Grid>
//             <Grid item xs={3}>
//               <Button
                
//                 variant="contained"
//                 size="large"
//                 fullWidth
//                 color='error'
//                 sx={{mb:2}}
//                 onClick={() => handleDelete(formData.batteryId)}
//               >
//                 Delete Service
//               </Button>
//             </Grid>

//         </Grid>
        
        
//         </Table>
//       </form>
//             </Container>
//       </main>
//     </div>
//   )
// }


// export default UpdateLatestServReq;
 
import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import { Form, useLocation, useNavigate } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Table,
  Container,
  Checkbox,FormControlLabel
} from '@mui/material';
import AdminDash_upblock from './AdminDash_upblock';
import Header from './Header';
import Admin_sidebar from './Admin_sidebar';
import FormField from './Update/InputFormField'; // Replace with your actual component
import DropDownField from './Update/DropDownField'; // Replace with your actual component
import EditFormField from './Update/EditInputFormField'; // Replace with your actual component
import Dashboard_upBlocks from './Dashboard_upBlocks';
import Sidebar from './Sidebar';
import SERVER_URL from './Server/Server';
import ConfirmationModal from './Confirmation';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import DeleteConfirm from './DeleteConfirm';

const authToken = GetToken();

function UpdateLatestServReq() {
  const location = useLocation();
  const batteryDetails = location.state.shortDescription;
  console.log('**********');
  console.log(batteryDetails);
  console.log('***********');

  const [batterySelected, setBatterySelected] = useState('');
  const [batteryDetailsAll, setBatteryDetailsAll] = useState([]);
  const [batteryList, setBatteryList] = useState([]);
  const [batteryId,setBatteryId] = useState('')
  const [agree, setAgree]=useState(false)
  const [formData, setFormData] = useState(
    batteryDetails || {} 
  );

  const [batteryInfo, setbatteryInfo] = useState([])
  const [status_def, setSatus_def] = useState('');
  const [preform_def, setPerform_def] = useState('None');
  const [warranty_def, setWarranty_def] = useState('NO');
  const [vechicel_def, setVechicle_def] = useState(0);

  useEffect(() => {
    setSatus_def(formData.status || 'select Status'); 
    setVechicle_def(formData.vehicleType ||'select Vehicle Type');
    setWarranty_def(formData.warranty.toUpperCase() || 'select Warranty'); 
    setPerform_def(formData.customerRating || 'select Performance'); 
  }, [formData]);

  console.log('warranty', warranty_def);

  // Define options for your select fields
  const warrantyType = [
    { value: 'YES', label: 'Yes' },
    { label: 'No', value: 'NO' },
  ];

  const vechicleType = [
    { value:2, label: 'Two' },
    { label: 'Three', value: 3 },
    { label: 'Four', value: 4 },
  ];

 
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
    { label: 'service amount verified', value: 18 },
    { label: 'completed', value: 16 },
    { label: 'closed', value: 17},

  ];


  const [parse_statusOptions, setParse_statusOptions]= useState('')
  useEffect(()=>{
    const status_values=JSON.stringify(statusOptions?statusOptions.find(({value})=>value===formData.status).label:'')
  // console.log("status",status_values)
  setParse_statusOptions(JSON.parse(status_values))
  // console.log("parse",parse_statusOptions)
  },[])

  

  const performanceOptions = [
    { value: preform_def, label: preform_def },
    { label: 'Average', value: 3},
    { label: 'Good', value: 4 },
    { label: 'Excellent', value:5},
    { label: 'Needs Improvement', value:2},
    { label: 'bad', value: 1},
  ];

  const navigate = useNavigate();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlewarrantyChange = (e) => {
    setWarranty_def(e.target.value);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVechicleChange = (e) => {
    setVechicle_def(e.target.value);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    setSatus_def(e.target.value);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePerformChange = (e) => {
    setPerform_def(e.target.value);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleBatteryChange = (e) => {
    // setBatteryId(e.target.value);
    // //getting the selected batteryID  details
    // batteryDetails.map((selectBatteryId) => {
    //   if (selectBatteryId.batteryId === batteryId) {
    //     setBatterySelected(selectBatteryId);
    //     setWarranty_def(selectBatteryId.warranty);
    //   }
    // });
    const selectedBatteryId = e.target.value; // Get the value directly from the event target
      setBatteryId(selectedBatteryId);
      //getting the selected batteryID details
      batteryDetailsAll.forEach((selectBatteryId) => {
        if (selectBatteryId.batteryId === selectedBatteryId) { // Use the selectedBatteryId variable
          setBatterySelected(selectBatteryId);
          setWarranty_def(selectBatteryId.warranty);
        }
    });
  }

  const [latestRequests, setLatestRequests] = useState([]);
  const [displayDetails, setDisplayDetails] = useState('');

  useEffect(() => {
    // Function to make the GET request
    async function getLatestRequests() {
      try {
        const response = await fetch(`${SERVER_URL}user/latest-service-requests`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken,
          },
        });
        const data = await response.json();
        setLatestRequests(data);
        // console.log(data)
      } catch (error) {
        toast.error('Network Error! Please check internet connection',{
          position:toast.POSITION.TOP_LEFT,
          autoClose:3000
        })
      }
    }

    // Call the function to get and display the latest service requests on page load
    getLatestRequests();
  }, []);

  const handleDelete = (input_value) => {
    setIsDeleteConfirmOpen(false)
    let batteryInfo;
    let batteryId = input_value;
    for (let i = 0; i < latestRequests.length; i++) {
      if (batteryId === latestRequests[i].batteryId) {
        batteryInfo = latestRequests[i];
        latestRequests.pop(batteryInfo);
      }
    }

    const deleteRequest={
      username:formData.username,
      requestId:formData.requestId
    }
    fetch(`${SERVER_URL}user/delete-service-request`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteRequest),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Delete Successfully...!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose:3000
            
          });
           setTimeout(() => {
            navigate('/latest_serv_request');
           },5100);
          
          // Handle success or update the UI accordingly
        } else {
          toast.error('Something went wrong! Try again...')
          // console.error('DELETE request failed.');
          // Handle error or update the UI accordingly
        }
      })
      .catch((error) => {
        toast.error('Might Newtork Error! Try again...')
        // console.error('Error occurred during DELETE request:', error);
        // Handle error or update the UI accordingly
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // formData contains the form values
    // console.log(formData);
    formData.selfDeclaration=agree?true:false
    fetch(`${SERVER_URL}user/update-service-request`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => {
      if (response.ok) {
        toast.success("Update Request Successfully...!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose:3000
        });
         setTimeout(() => {
          navigate('/latest_serv_request');
         },5100);
        
        // Handle success or update the UI accordingly
      } else {
        toast.error('Something went wrong! Try again...',{
          autoClose:3000
        })
       
      }
    })
    .catch((error) => {
      toast.error('Might Newtork Error! Try again...',{
        autoClose:3000
      })
    });
  };


  //Showing battery Details
  useEffect(() => {
    // Function to make the GET request
    async function batteryDetails() {
      try {
        const response = await fetch(`${SERVER_URL}user/get-battery-details`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken,
          },
          body:JSON.stringify({batteryId:formData.batteryId})
        });
        const data = await response.json();
        setbatteryInfo(data[0]);
        // console.log(data)
      } catch (error) {
        toast.error('Newtork Error! please check internet connection...',{
          delay:3000
        })
        // console.error('Error  in fetching battery details:', error);
      }
    }

    // Call the function to get and display the latest service requests on page load
    batteryDetails();
  }, []);

  console.log("batteryInfo",batteryInfo)

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

   const handleCancle = () => {
     setIsConfirmationOpen(true);
   };
 
   const handleCloseConfirmation = () => {
     setIsConfirmationOpen(false);
   };
 
   const handleConfirm = () => {
     navigate('/latest_serv_request')
     setIsConfirmationOpen(false);
   };

   const deleteCancle = () => {
    setIsDeleteConfirmOpen(true);
  };

  const deleteCloseConfirmation = () => {
    setIsDeleteConfirmOpen(false);
  };

   function handlepara(){
    return<>
    <div><b>Note:</b>amount will show only  after service engineer alloted</div>
    </>
   }


   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}user/get-battery-list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
        if (response.ok) {
          const result = await response.json();
          setBatteryDetailsAll(result);

          // Extract battery IDs into the batteryList array
          const batteryIds = result.map(eachBattery => ({
            label: eachBattery.batteryId,
            value: eachBattery.batteryId
          }));
          setBatteryList(batteryIds);
          if (result.length > 0) {
            setBatterySelected(result[0]);
            setBatteryId(formData.batteryId);
          }

        } else {
          throw new Error('Failed to Get Battery Details...!');
        }

      } catch (error) {
        console.log('Error', error);
      }
    };
    fetchData();
  }, []);

  const checkboxHandler = () => {
    setAgree(!agree);
    
  };



  return (
    <div className="grid-container" style={{ borderBlock: '2px solid black' }}>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className="main-container">
        <Dashboard_upBlocks />  
        <Container style={{ margin: '50px 0px' }}>
          <form noValidate>
            <Table sx={{ border: '1px solid black', p: 2, mt: 3, backgroundColor: 'white' }}>
              <Grid container spacing={2} sx={{ border: '1px black' }}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    fullWidth
                    sx={{ mb: 3 }}
                  >
                    <Typography variant="h5" sx={{ textAlign: 'left', textTransform: 'none' }}>
                      Update Service Details
                    </Typography>
                  </Button>
                </Grid>

                
                {/* <FormField label="Battery ID" name="batteryId" value={formData.batteryId} /> */}
                {status_def===1?(
                      batteryList.length > 0 ? (
                      <DropDownField
                        name="batteryId"
                        label='Battery ID'
                        placeholder="eg:1234"
                        value={batteryId}
                        onChange={handleBatteryChange}
                        options={batteryList}
                      />
                    ) : (
                      <EditFormField label="Battery ID" name="batteryId" placeholder='Enter BatteryID' value="BatteryID's fetching...!" />
                    )
                ):<FormField label="Battery ID" name="batteryId" value={formData.batteryId} />}
                
                <EditFormField label="Description" name="shortDescription" value={formData.shortDescription} onChange={handleInputChange} />

                {/* Row 2 */}
                <FormField label="Make" name="make"  value={batteryInfo.make} />
                <FormField label="Model" name="model"  value={batteryInfo.model} />

                {/* Row 3 */}
                <FormField label="Battery Voltage" name="batteryVoltage"  value={batteryInfo.batteryVoltage} />
                <FormField label="Battery Current" name="batteryCurrent"  value={batteryInfo.batteryCurrent} />
                <FormField label="Battery Capacity" name="batteryCapacity"  value={batteryInfo.batteryCapacity} />


                {/* Row 4 */}
                <EditFormField label="Service Latitude" name="serviceLatitude" onChange={handleInputChange} value={formData.serviceLatitude} />
                <EditFormField label="Service Longitude" name="serviceLongitude" onChange={handleInputChange} value={formData.serviceLongitude} />
                <EditFormField label="Service Location" name="serviceLocation" onChange={handleInputChange} value={formData.serviceLocation} />

                {/* Row 5 */}
                <FormField label="Date Opened" name="openDate" onChange={handleInputChange} value={formData.openDate ? formData.openDate.slice(0, 10) : ''} />
                <EditFormField label="NoteToServiceEngineer" name="noteToServiceEngineer" onChange={handleInputChange} value={formData.noteToServiceEngineer} />

                {/* Row 6 */}
                <DropDownField label="Under Warranty" name="warranty" onChange={handlewarrantyChange} value={warranty_def} options={warrantyType} />
                {/* <DropDownField label="self Declaration" placeholder="I agree terms & conditions" name="selfDeclaration" onChange={handleDeclareChange} options={Declaration} value={Declare_def} /> */}
                <FormField label="Status" name="status" onChange={handleStatusChange} value={parse_statusOptions} />
                <DropDownField label="Vehicle Type" name="vehicleType" onChange={handleVechicleChange}  options={vechicleType} value={formData.vehicleType} />
              
              {status_def!==1 && 
              (
                <>
                <FormField label="Visit Amount" name="visit_amount" onChange={handleInputChange} value={formData.visit_amount} />
                <EditFormField label="Visit Amount Paid Ref" name="visitAmountPaid" onChange={handleInputChange} value={formData.visitAmountPaid} />

                <FormField label="Service Date" name="targetDate" onChange={handleInputChange} value={formData.targetDate ? formData.targetDate.slice(0, 10) : ''} />
                <FormField label="ServiceEngineer Notes" name="serviceEngineerNotes" onChange={handleInputChange} value={formData.serviceEngineerNotes} />

                <FormField label="Service Amount" name="service_amount" para_label={handlepara()} onChange={handleInputChange} value={formData.service_amount?formData.service_amount:'Not yet decided'} />
                <EditFormField label="Service Amount Paid Ref" name="serviceAmountPaid" onChange={handleInputChange} value={formData.serviceAmountPaid} />
                {/* <DropDownField label="Customer Rating" name="customerRating" onChange={handlePerformChange} value={preform_def} options={performanceOptions} /> */}
                </>
                )
              }

              {warranty_def==='Yes' && (<Grid item xs={12} className='mx-3 text-primary text-center'>
                    <FormControlLabel
                    control={<Checkbox checked={agree} onChange={checkboxHandler} />}
                    label="I self declared warranty"/>
                </Grid>)
              }          
            
              </Grid>
              <Grid container spacing={3} sx={{ p: 3 ,mt:3}}>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    size="medium"
                    fullWidth
                    sx={{ mb: 2 }}
                    onClick={handleCancle}
                  >
                    Close
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    size="medium"
                    fullWidth
                    sx={{ mb: 2 }}
                    onClick={onSubmit}
                  
                  >
                    Update
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    size="medium"
                    fullWidth
                    color="error"
                    sx={{ mb: 2 }}
                    disabled={status_def===1?false:true}
                    onClick={deleteCancle}
                  >
                    Delete Service
                  </Button>

                  <ConfirmationModal
              open={isConfirmationOpen}
              onClose={handleCloseConfirmation}
              onConfirm={handleConfirm}
          
            />

        <DeleteConfirm
          open={isDeleteConfirmOpen}
          onClose={deleteCloseConfirmation}
          onConfirm={()=>handleDelete(formData.batteryId)}
          
        />

            {/* Toast Notification */}
            <ToastContainer/>
                </Grid>
              </Grid>
            </Table>
          </form>
        </Container>
      </main>
    </div>
  );
}

export default UpdateLatestServReq;
