
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

const authToken = GetToken();

function PostNewBattery() {
  const [warranty_def, setWarranty_def] = useState('no');
  const [vechicel_def, setVechicle_def] = useState('None');
  const [status_def, setStatus_def] = useState('None');
  const [rating_def, setRating_def] = useState('None');
  const [batteryId, setBatteryId] = useState('');
  const [batterySelected, setBatterySelected] = useState('');
  const [batteryDetails, setBatteryDetails] = useState([]);
  const [batteryList, setBatteryList] = useState([]);
  const [selfDeclaration, setDeclaration] = useState('no');
  const [agree, setAgree] = useState(false);

  const vechicleType = [
    { value: vechicel_def, label: 'Select Vehicle Type' },
    { value: '2', label: 'Two' },
    { label: 'Three', value: '3' }
  ];

  const navigate = useNavigate();

  const warrantyType = [
    { value: warranty_def, label: 'select warranty' },
    { value: 'Yes', label: 'Yes' },
    { label: 'No', value: 'No' }
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
            setBatteryId(result[0].batteryId);
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
    amount: "",
    assignedBy: "",
    assignedDate: "2023-09-09",
    attendedDate: "2023-07-12",
    batteryId: "",
    noteToServiceEngineer: "",
    openDate: currentDate,
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
    const selectedBatteryId = e.target.value; // Get the value directly from the event target
      setBatteryId(selectedBatteryId);
      //getting the selected batteryID details
      batteryDetails.forEach((selectBatteryId) => {
        if (selectBatteryId.batteryId === selectedBatteryId) { // Use the selectedBatteryId variable
          setBatterySelected(selectBatteryId);
          setWarranty_def(selectBatteryId.warranty);
        }
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
      });
    // Perform your form submission logic here
  };

  const checkboxHandler = () => {
    setAgree(!agree);
    const declarationValue = agree ? 'no' : 'yes';
    setDeclaration(declarationValue);
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

                                {/* Row 2 */}
                                <FormField label="Make" name="make" placeholder='eg:Exide' onChange={handleInputChange} value={batterySelected.make} />
                <FormField label="Model" name="model" placeholder='eg:Exide_21V6' onChange={handleInputChange} value={batterySelected.model} />

                {/* Row 3 */}
                <FormField label="Battery Capacity" name="batteryCapacity" placeholder='Enter Battery Capacity' onChange={handleInputChange} value={batterySelected.batteryCapacity} />
                <FormField label="Battery Current" name="batteryCurrent" placeholder='Enter Current' onChange={handleInputChange} value={batterySelected.batteryCurrent} />
                <FormField label="Battery Voltage" name="batteryVoltage" placeholder='Enter Voltage' onChange={handleInputChange} value={batterySelected.batteryVoltage} />
                <EditFormField label="Description" name="shortDescription" placeholder='Enter Description' value={formData.shortDescription} onChange={handleInputChange} />

                {/* Row 4 */}
                <DropDownField label="Vehicle Type" name="vehicleType" onChange={handleVechicleChange} value={vechicel_def} options={vechicleType} />
                <EditFormField label="Service Location" name="service_location" placeholder='eg:Hyderabad' onChange={handleInputChange} value={batterySelected.service_location} />

                {/* Row 5 */}
                {/* <EditFormField label="Date Opened" name="openDate" placeholder='YYYY-MM-DD' onChange={handleInputChange} value={formData.openDate}  /> */}
                <EditFormField label="NoteToServiceEngineer" name="noteToServiceEngineer" placeholder='Enter Note to Service Engineer' onChange={handleInputChange} value={formData.noteToServiceEngineer} />

                {/* Row 6 */}
                <DropDownField label="Under Warranty" name="warranty" value={warranty_def} options={warrantyType} onChange={handleWarrentyChange} />
                
                  {warranty_def==='Yes' &&(<EditFormField label="self Declaration"  name='selfDeclaration' value={formData.selfDeclaration} placeholder='Agree the terms & conditions' onChange={handleInputChange} /> )}

                {/* <Grid item xs={12} className='mx-3 text-primary text-center'>
                  <FormControlLabel
                    control={<Checkbox checked={agree} onChange={checkboxHandler} />}
                    label="Warranty"
                  />
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
                  >
                    Add Request
                  </Button>

                   
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
  );
}

export default PostNewBattery;
