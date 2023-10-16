
// import React, { useEffect, useState } from 'react';
// import { GetToken } from './Api/auth';
// import {  useLocation, useNavigate } from 'react-router-dom';
// import {Grid,Box,Typography,Button,Select,MenuItem,Table,Container} from '@mui/material';
// import AdminDash_upblock from './AdminDash_upblock';
// import Header from "./Header";
// import Admin_sidebar from './Admin_sidebar';
// import FormField from './Update/EditInputFormField';
// import DropDownField from './Update/DropDownField';
// import Dashboard_upBlocks from './Dashboard_upBlocks';
// import Sidebar from './Sidebar';
// import SERVER_URL from './Server/Server';

// const authToken = GetToken();



// function PostNewBattery() {
// const [warranty_def, setWarranty_def]=useState('no')
// const [vechicel_def, setVechicle_def]=useState('None')
// const [status_def, setStatus_def]=useState('None')
// const [rating_def, setRating_def]=useState('None')
// const [batteryId, setBatteryId] =useState('')

// const [batteryDetails, setBatteryDetails]= useState([])

// const vechicleType = [{value:vechicel_def, label :'Select Vechicle Type  '},{value:'2', label:'Two'},{label:'Three',value:'3'}]
// const selfDeclaration = [{value:true, label :'Yes'},{label:'No',value:false}]
// const statusOptions = [{value:status_def, label :'Select Status'},{label:'New',value:1},{label:'Assigned',value:2},{label:'Rejected',value:5},{label:'Closed',value:14}];
// const performanceOptions = [{value:rating_def, label :'Select Rating'},{label:'Average',value:'average'},{label:'Good',value:'good'},{label:'Excellent',value:'excellent'},{label:'Needs Improvement',value:'needs Improvement'}];

// const Rating = [{label:'Average',value:'average'},{label:'Good',value:'good'},{label:'Excellent',value:'excellent'},{label:'Needs Improvement',value:'needs Improvement'}];
// const navigate = useNavigate();
 
//   const warrantyType = [{value:warranty_def, label :'select warranty '},{value:'Yes', label :'Yes'},{label:'No',value:'No'}]
//   const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle)
//   }

//   const location = useLocation();
//   const batteryList=[]
//   console.log("veh",vechicleType)
//   useEffect(()=>{
    
//     const fetchData=async()=>{
      
//       try {
//         const response=await fetch(`${SERVER_URL}user/get-battery-list`,{
//           method:'GET',
//           headers:{
//             'Content-Type':'application/json',
//             'Authorization':`Bearer ${authToken}`
//           }
  
//         })
//         if(response.ok){
//           const result= await response.json()
//           setBatteryDetails(result)
          
        
//         }else{
//           throw new Error('Failed to Get Battery Details...!')
//         }

//         batteryDetails.map((eachBattery)=>{
//           batteryList.push({
//             label:eachBattery.batteryId,
//             value:eachBattery.batteryId
//           })
//         })
      
//         console.log("list",batteryList)


//       } catch (error) {
//         console.log('Error',error)
//       }
//     }
//     fetchData()
//   },[])

 


//   const username=localStorage.getItem('username')
//   const parse_username=JSON.parse(username)
//   const [formData, setFormData] = useState({
//     amount: "",
//     assignedBy: "",
//     assignedDate: "2023-09-09", 
//     attendedDate:"2023-07-12",
//     batteryId: "",
//     noteToServiceEngineer: "",
//     openDate: "2023-08-10",
//     otpId: 5,
//     payerId:"",
//     requestId: 0,
//     selfDeclaration: true,
//     serviceEngineerId: "",
//     serviceEngineerNotes: "",
//     shortDescription: "",
//     status: 6,
//     transactionId: 1,
//     username: parse_username

//   });


//   const handleBatteryChange = (e) => {
//     setBatteryId(e.target.value) 
//     const {name , value} = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

// //   console.log("formdata",formData)
//   const handleInputChange = (e) => {

//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleVechicleChange = (e) => {
//     setVechicle_def(e.target.value) 
//     const {name , value} = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
  
//   const handleWarrentyChange = (e) => {
//     setWarranty_def(e.target.value)
//     const {name , value} = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleStatusChange = (e) => {
//     setStatus_def(e.target.value)
//     const {name , value} = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
//   const handleRatingChange = (e) => {
//     setRating_def(e.target.value)
//     const {name , value} = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const [latestRequests, setLatestRequests] = useState([]);
//   const[displayDetails , setDisplayDetails] = useState(false);


//   const onSubmit = (e) => {
//     e.preventDefault();
//     // formData contains the form values
//     console.log(formData);
//     fetch(`${SERVER_URL}user/add-service-request`,{
//       method:'POST',
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
//         <Table sx={{border:'1px solid black',p:1,mt:3,backgroundColor:'white'}}>
//         <Grid container spacing={2} sx={{border:'1px black'}}>
//         <Grid item xs={12}>
//               <Button
//                 variant="contained"
//                 size="large"
//                 color='primary'
//                 fullWidth
//                 sx={{ mb: 3  }}
                
//               >
//                 <Typography variant="h5" sx={{textAlign :'left',textTransform:'none'}}>New Request Details</Typography>
//               </Button>
//             </Grid>
       
//         <DropDownField name="batteryId" placeholder='eg:1234' value={batteryId}  onChange={handleBatteryChange}  options={batteryList}/>
//         <FormField  label="Description" name="shortDescription"   placeholder='Enter Description' value={formData.shortDescription} onChange={handleInputChange}  />

//         {/* Row 2 */}
//         <FormField label="Make" name="make" placeholder='eg:Exide' onChange={handleInputChange} value={formData.make}/>
//         <FormField label="Model" name="model" placeholder='eg:Exide_21V6' onChange={handleInputChange}  value={formData.model}/>

//         {/* Row 3 */}
//         <FormField label="Battery Voltage" name="batteryVoltage"  placeholder='Enter voltage'onChange={handleInputChange} value={formData.voltage}/>
//         <FormField label="Battery Current" name="batteryCurrent" placeholder='Enter Current' onChange={handleInputChange}  value={formData.current}/>

//         {/* Row 4 */}
//         <DropDownField label="Vehicle Type" name="vehicleType" onChange={handleVechicleChange} value={vechicel_def} options={vechicleType}/>
//         <FormField label="Service Location" name="service_location"  placeholder='eg:Hyderabad'onChange={handleInputChange}  value={formData.service_location}/>

//         {/* Row 5 */}
//         <FormField label="Date Opened" name="openDate"  placeholder='YYYY/MM/DD' onChange={handleInputChange} value={formData.openDate}/>
//         <FormField label="NoteToServiceEngineer" name="noteToServiceEngineer" placeholder='Enter Note to Service Engineer' onChange={handleInputChange} value={formData.noteToServiceEngineer}/>

//         {/* Row 6 */}
        
//         <DropDownField label="Under Warranty" name="warranty"  value={warranty_def} options={warrantyType} onChange={handleWarrentyChange}/>
//         <DropDownField label="self Declaration"  value={formData.selfDeclaration} options={selfDeclaration} onChange={handleInputChange}  />

//         {/* Row 7 */}
//         <DropDownField label="Status" name="status" onChange={handleStatusChange}  value={status_def} options={statusOptions}/>
//         <FormField label="Last Status Updated" name="lastStatusUpdated" onChange={handleInputChange} value={formData.status}/>

//         <FormField label="Visit Amount" name="visitAmount" onChange={handleInputChange} placeholder='Enter Visit Amount' value={formData.amount}/>
//         <FormField label="Visit Amount Paid" name="visitAmountPaid" onChange={handleInputChange}  placeholder='Enter Amount Paid' value={formData.visitAmountPaid}/>
        
//         <FormField label="Service Date" name="serviceDate" placeholder='YYYY/MM/DD' onChange={handleInputChange}  value={formData.serviceDate}/>
//         <FormField label="ServiceEngineer Notes" name="serviceEngineerNotes"  placeholder='Enter Amount' onChange={handleInputChange} value={formData.serviceEngineerNotes}/>

//         <FormField label="Service Amount" name="serviceAmount" placeholder='Enter Amount' onChange={handleInputChange}  value={formData.ServiceAmount}/>
//         <FormField label="service Amount Paid" name="serviceAmountPaid" placeholder='Enter Amount Paid' onChange={handleInputChange} value={formData.serviceAmountPaid}/>
            
//         <DropDownField label="Customer Rating" name="customerRating" onChange={handleRatingChange}  value={rating_def} options={performanceOptions} />
        
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
//                 Add Request
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


// export default PostNewBattery;

import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, Button, Select, MenuItem, Table, Container,Checkbox,FormControlLabel } from '@mui/material';
import AdminDash_upblock from './AdminDash_upblock';
import Header from "./Header";
import Admin_sidebar from './Admin_sidebar';
import EditFormField from './Update/EditInputFormField';
import FormField from './Update/InputFormField';
import DropDownField from './Update/DropDownField';
import Dashboard_upBlocks from './Dashboard_upBlocks';
import Sidebar from './Sidebar';
import SERVER_URL from './Server/Server';

const authToken = GetToken();

function PostNewBattery() {
  const [warranty_def, setWarranty_def] = useState('no');
  const [vechicel_def, setVechicle_def] = useState('None');
  const [status_def, setStatus_def] = useState('None');
  const [rating_def, setRating_def] = useState('None');
  const [batteryId, setBatteryId] = useState('');
  const [batterySelected, setBatterySelected]=useState('')

  const [batteryDetails, setBatteryDetails] = useState([]);
  const [batteryList, setBatteryList] = useState([]);   // Store battery list separately
  const [selfDeclaration, setDeclaration] = useState('no');

  const vechicleType = [{ value: vechicel_def, label: 'Select Vechicle Type  ' }, { value: '2', label: 'Two' }, { label: 'Three', value: '3' }];
  
 
  const navigate = useNavigate();

  const warrantyType = [{ value: warranty_def, label: 'select warranty ' }, { value: 'Yes', label: 'Yes' }, { label: 'No', value: 'No' }];
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };



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
          setBatteryDetails(result);

          // Extract battery IDs into the batteryList array
        
          const batteryIds = result.map(eachBattery => ({
            label: eachBattery.batteryId,
            value: eachBattery.batteryId
          }));
          setBatteryList(batteryIds);
        } else {
          throw new Error('Failed to Get Battery Details...!');
        }

      } catch (error) {
        console.log('Error', error);
      }
    };
    fetchData();
  }, []);

  const username = localStorage.getItem('username');
  const parse_username = JSON.parse(username);
  const [formData, setFormData] = useState({
    amount: "",
    assignedBy: "",
    assignedDate: "2023-09-09",
    attendedDate: "2023-07-12",
    batteryId: "",
    noteToServiceEngineer: "",
    openDate: "",
    otpId: 5,
    payerId: "",
    requestId: 0,
    selfDeclaration: true,
    serviceEngineerId: "",
    serviceEngineerNotes: "",
    shortDescription: "",
    status: 6,
    transactionId: 1,
    username: parse_username
  });

  const handleBatteryChange = (e) => {
    setBatteryId(e.target.value);
    //getting the selected batteryID  details
    batteryDetails.map((selectBatteryId)=>{
      if (selectBatteryId.batteryId=== batteryId){
          setBatterySelected(selectBatteryId)
          setWarranty_def(selectBatteryId.warranty)
          
      }
    })

    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
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

  const handleWarrentyChange = (e) => {
    setWarranty_def(e.target.value);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const onSubmit = (e) => {
    e.preventDefault();
    // formData contains the form values
    console.log(formData);
    fetch(`${SERVER_URL}user/add-service-request`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert('Service Request done successfully..!');
        navigate(-1);
      }).catch((error) => {
        console.log(error);
      })
    // Perform your form submission logic here
  };

  console.log("battery",batterySelected)

  const [agree,setAgree]=useState(false)
  const checkboxHandler=()=>{
      setAgree(!agree)
      agree?setDeclaration('no'):setDeclaration('yes')
  }
console.log(selfDeclaration)
  
  return (
    <div className="grid-container" style={{ borderBlock: '2px solid black' }}>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
        <Dashboard_upBlocks />
        <Container style={{ margin: '50px 0px' }}>
          <form noValidate>
            <Table sx={{ border: '1px solid black', p: 1, mt: 3, backgroundColor: 'white' }}>
              <Grid container spacing={2} sx={{ border: '1px black' }}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    color='primary'
                    fullWidth
                    sx={{ mb: 3 }}
                  >
                    <Typography variant="h5" sx={{ textAlign: 'left', textTransform: 'none' }}>New Request Details</Typography>
                  </Button>
                </Grid>

                {batteryList.length > 0 ? (
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
                )}

                <EditFormField label="Description" name="shortDescription" placeholder='Enter Description' value={formData.shortDescription} onChange={handleInputChange} />

                {/* Row 2 */}
                <FormField label="Make" name="make" placeholder='eg:Exide' onChange={handleInputChange} value={batterySelected.make} />
                <FormField label="Model" name="model" placeholder='eg:Exide_21V6' onChange={handleInputChange} value={batterySelected.model} />

                {/* Row 3 */}
                <FormField label="Battery Capacity" name="batteryCapacity" placeholder='Enter Battery Capacity' onChange={handleInputChange} value={batterySelected.batteryCapacity} />
                <FormField label="Battery Current" name="batteryCurrent" placeholder='Enter Current' onChange={handleInputChange} value={batterySelected.batteryCurrent} />
                <FormField label="Battery Voltage" name="batteryVoltage" placeholder='Enter Voltage' onChange={handleInputChange} value={batterySelected.batteryVoltage} />

                {/* Row 4 */}
                <DropDownField label="Vehicle Type" name="vehicleType" onChange={handleVechicleChange} value={vechicel_def} options={vechicleType} />
                <EditFormField label="Service Location" name="service_location" placeholder='eg:Hyderabad' onChange={handleInputChange} value={batterySelected.service_location} />

                {/* Row 5 */}
                <EditFormField label="Date Opened" name="openDate" placeholder='YYYY-MM-DD' onChange={handleInputChange} value={formData.openDate}  />
                <EditFormField label="NoteToServiceEngineer" name="noteToServiceEngineer" placeholder='Enter Note to Service Engineer' onChange={handleInputChange} value={formData.noteToServiceEngineer} />

                {/* Row 6 */}
                <DropDownField label="Under Warranty" name="warranty" value={warranty_def} options={warrantyType} onChange={handleWarrentyChange} />
                {/* <DropDownField label="self Declaration" value={formData.selfDeclaration} options={selfDeclaration} onChange={handleInputChange} /> */}

                <Grid item xs={12} className='mx-3 text-primary text-center'>
                <FormControlLabel
                  control={<Checkbox value={selfDeclaration}  onChange={checkboxHandler}/>}
                  label="Warranty"
                />
              </Grid>
              </Grid>
              <Grid container spacing={3} sx={{ p: 3 }}>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ mb: 2 }}
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
                    sx={{ mb: 2 }}
                    onClick={onSubmit}
                  >
                    Add Request
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

export default PostNewBattery;
