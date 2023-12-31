
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Button, Table, Container,Checkbox,FormControlLabel } from '@mui/material';
import DropDownField from './Update/DropDownField';
import EditFormField from './Update/EditInputFormField';
import FormField from './Update/InputFormField';
import Dashboard_upBlocks from './Dashboard_upBlocks';
import Sidebar from './Sidebar';
import SERVER_URL from './Server/Server';
import { GetToken } from './Api/auth';
import ConfirmationModal from './Confirmation';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



function PostNewBattery() {
  const authToken = GetToken();
  const [warranty_def, setWarranty_def] = useState('NO');
  const [vechicel_def, setVechicle_def] = useState('None');
  const [status_def, setStatus_def] = useState('None');
  const [preform_def, setPerform_def] = useState(0);
  const [batteryId, setBatteryId] = useState('');
  const [batterySelected, setBatterySelected] = useState('');
  const [batteryDetails, setBatteryDetails] = useState([]);
  const [batteryList, setBatteryList] = useState([]);
  const [selfDeclaration, setDeclaration] = useState(false);
  const [isDeclared, setIsDeclared] = useState(false)
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
    const day = currentDate.getDate();

    return `${day}/${month}/${year}`;
  };

  const currentDate = getCurrentDate();
  const username = localStorage.getItem('username');
  const parse_username = JSON.parse(username);
  const [formData, setFormData] = useState({
    adminnotes:"",
    amount: "",
    assignedBy: "",
    assignedDate: "2023-09-09",
    attendedDate: "2023-07-12",
    batteryId:"",
    customerRating:0,
    noteToServiceEngineer: "",
    openDate: currentDate,
    otpId: 5,
    payerId: "",
    requestId: 0,
    selfDeclaration:false,
    serviceEngineerId: "",
    serviceEngineerNotes: "",
    shortDescription: "",
    serviceLatitude: "",
    serviceLocation: "",
    serviceLongitude: "",
    status: 6,
    transactionId: 1,
    username: parse_username
    

  });


  const vechicleType = [
    { value: vechicel_def, label: 'Select Vehicle Type' },
    { value: '2', label: 'Two' },
    { label: 'Three', value: '3' }
  ];



  const performanceOptions = [
    { value: preform_def, label: preform_def },
    { label: 'Average', value:3 },
    { label: 'Good', value: 4 },
    { label: 'Excellent', value: 5 },
    { label: 'Needs Improvement', value: 2 },
    { label: 'bad', value: 1 },
    { label: 'Select rating', value:0 },
  ];
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
  
          if (result.length > 0) {
            setBatterySelected(result[0]);
          }
        } else {
          throw new Error('Failed to Get Battery Details...!');
        }
      } catch (error) {
        console.log('Error', error);
      }
    };
  
    fetchData();
  }, [authToken]); // Add authToken as a dependency
  
  // Use another useEffect to handle changes in batteryDetails
  useEffect(() => {
    if (batteryDetails.length > 0) {
      setBatteryId(batteryDetails[0].batteryId);
      setBatterySelected(batteryDetails[0]);
    }
  }, [batteryDetails]);
  
  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${SERVER_URL}user/get-battery-list`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${authToken}`
  //         }
  //       });
  //       if (response.ok) {
  //         const result = await response.json();
  //         setBatteryDetails(result);

  //         // Extract battery IDs into the batteryList array
  //         const batteryIds = result.map(eachBattery => ({
  //           label: eachBattery.batteryId,
  //           value: eachBattery.batteryId
  //         }));
  //         setBatteryList(batteryIds);
  //         if  (result.length > 0) {
  //           setBatterySelected(result[0]);
  //           setBatteryId(result[0].batteryId);
  //           handleBatteryChange({ target: { value: result[0].batteryId } });
            
  //         }

  //       } else {
  //         throw new Error('Failed to Get Battery Details...!');
  //       }

  //     } catch (error) {
  //       console.log('Error', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  
 
  const warrantyType = [
    // { value: warranty_def, label: warranty_def },
    { value: 'YES', label: 'Yes' },
    { label: 'No', value: 'NO' }
  ];

  const handleBatteryChange = (e) => {
    
    const selectedBatteryId = e.target.value; // Get the value directly from the event target
      //getting the selected batteryID details
      batteryDetails.forEach((selectBatteryId) => {
        if (selectBatteryId.batteryId === selectedBatteryId) { // Use the selectedBatteryId variable
          setBatterySelected(selectBatteryId);
          setWarranty_def(selectBatteryId.warranty.toUpperCase());
        }
        setBatteryId(selectedBatteryId);
  });

  

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
  const { name, value } = e.target;
  setWarranty_def(value);  // Update the warranty_def state with the new value
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

  const onSubmit = async(e) => {
    e.preventDefault();
    // formData contains the form values
    formData.customerRating=parseInt(formData.customerRating)
    formData.batteryId=batteryId
    formData.selfDeclaration=selfDeclaration
    try{
    const response =await fetch(`${SERVER_URL}user/add-service-request`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
        if (response.ok) {
          const result = await response.json();
          toast.success("Add Request Successfully...!", {
            position: toast.POSITION.TOP_CENTER
          });
          setTimeout(() => {
            navigate('/latest_serv_request')
          }, 5100);

      } else {
          throw new Error('Failed to fetch New ticket Details....!');
        }
    } catch (error) {
        toast.error("Error Occured...!", {
            position: toast.POSITION.TOP_LEFT
          });
      } 
  };

  const checkboxHandler = () => {
    setAgree(!agree);
    
  };

  const selfDeclare=(e)=>{
    // setIsDeclared(!isDeclared)
    // const declarationValue = isDeclared ? 'no' : 'yes';
    setDeclaration(!selfDeclaration);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  console.log(selfDeclaration)

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

  return (
    <div className="grid-container" style={{ borderBlock: '2px solid black' }}>
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
                    New Request Details
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

                <FormField label="Make" name="make" placeholder='eg:Exide' onChange={handleInputChange} value={batterySelected.make} />
                <FormField label="Model" name="model" placeholder='eg:Exide_21V6' onChange={handleInputChange} value={batterySelected.model} />

                {/* Row 3 */}
                <FormField label="Battery Capacity" name="batteryCapacity" placeholder='Enter Battery Capacity' onChange={handleInputChange} value={batterySelected.batteryCapacity} />
                <FormField label="Battery Current" name="batteryCurrent" placeholder='Enter Current' onChange={handleInputChange} value={batterySelected.batteryCurrent} />
                <FormField label="Battery Voltage" name="batteryVoltage" placeholder='Enter Voltage' onChange={handleInputChange} value={batterySelected.batteryVoltage} />
                <EditFormField label="Description" name="shortDescription" placeholder='Enter Short Description' value={formData.shortDescription} onChange={handleInputChange} />
                <EditFormField label="noteToServiceEngineer" name="noteToServiceEngineer" placeholder='Enter note to service engineer' value={formData.noteToServiceEngineer} onChange={handleInputChange} />

                {/* Row 4 */}
                {/* <DropDownField label="Vehicle Type" name="vehicleType" onChange={handleVechicleChange} value={vechicel_def} options={vechicleType} /> */}

                <EditFormField label="Service Location" name="serviceLocation" placeholder='eg:Hyderabad' onChange={handleInputChange} value={batterySelected.serviceLocation} />
                <EditFormField label="Service Latitude" name="serviceLatitude" placeholder='eg:36.2' onChange={handleInputChange} value={batterySelected.serviceLatitude} />
                <EditFormField label="Service Longitude" name="serviceLongitude" placeholder='eg:15.5' onChange={handleInputChange} value={batterySelected.serviceLongitude} />

                {/* Row 5 */}
                {/* <EditFormField label="Date Opened" name="openDate" placeholder='YYYY-MM-DD' onChange={handleInputChange} value={formData.openDate}  /> */}
                {/* <EditFormField label="ServiceEngineer ID" name="serviceEngineerId" placeholder='abcXX23' onChange={handleInputChange} value={batterySelected.serviceEngineerId} />
                <EditFormField label="ServiceEngineer Notes" name="serviceEngineerNotes" placeholder='Enter Note to Service Engineer' onChange={handleInputChange} value={formData.serviceEngineerNotes} />
                <DropDownField label="Customer Rating" name="performance" onChange={handlePerformChange} value={preform_def} options={performanceOptions} /> */}

                {/* Row 6 */}
                <FormField label="Under Warranty" name="warranty" value={warranty_def} options={warrantyType}   onChange={handleWarrentyChange} />
                
                  {warranty_def==='YES' &&(<Grid item xs={12} className='mx-3 text-primary text-center'>
                  <FormControlLabel
                    control={<Checkbox  checked={selfDeclaration}  onChange={selfDeclare} />}
                    label="I self Declared for warranty"/>
                    <FormControlLabel
                    control={<Checkbox checked={agree} onChange={checkboxHandler} />}
                    label="Agree to Pay the Visit Charges of Rs 400/- "/>
                </Grid>)}
                {warranty_def==='NO' &&(<Grid item xs={12} className='mx-3 text-primary text-center'>
                    <FormControlLabel
                    control={<Checkbox checked={agree} onChange={checkboxHandler} />}
                    label="Agree to Pay the Visit Charges of Rs 400/- "/>
                </Grid>)}

                {/* <Grid item xs={12} className='mx-3 text-primary text-center'>
                  <FormControlLabel
                    control={<Checkbox checked={agree} onChange={checkboxHandler} />}
                    label="Agree to Pay the Visit Charges of Rs 400/- "/>
                </Grid> */}
              </Grid>
              <Grid container spacing={3} sx={{ p: 3 }}>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    size="large"
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
                    size="large"
                    fullWidth
                    sx={{ mb: 2 }}
                    onClick={onSubmit}
                    disabled={warranty_def==='YES' ?(selfDeclaration && agree?false:true):!agree}
                  >
                    Add Request
                  </Button>

                   
              <ConfirmationModal
          open={isConfirmationOpen}
          onClose={handleCloseConfirmation}
          onConfirm={handleConfirm}
          
        />

        {/* success Notification */}
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

export default PostNewBattery;
