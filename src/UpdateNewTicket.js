
import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, Button, Select, MenuItem, Table } from '@mui/material';
import AdminDash_upblock from './AdminDash_upblock';
import Header from "./Header";
import Admin_sidebar from './Admin_sidebar';
import FormField from './Update/InputFormField';
import EditFormField from './Update/EditInputFormField';
import DropDownField from './Update/DropDownField';
import SERVER_URL from './Server/Server';
import ConfirmationModal from './Confirmation';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function UpdateNewTickets() {
  const authToken = GetToken();
  const navigate = useNavigate();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const location = useLocation();
  const ticketId = location.state.ticketId;

  const [serviceEnggID, setServiceEnggId] = useState('<TBD>');
  const [all_serviceEngg, setAll_serviceEngg] = useState([]);
  const [status_def, setStatus_def] = useState('');
  const Each_ticket=localStorage.getItem('Ticket_Record')
  const parse_Ticket=JSON.parse(Each_ticket)
  const [formData, setFormData] = useState(parse_Ticket);
  console.log("fom",parse_Ticket.status)
  const statusOptions = [
    { label: 'New', value: 1 },
    { label: 'Assigned', value: 2 },
    { label: 'Active', value: 3 },
    { label: 'Inactive', value: 4 },
    { label: 'Hold', value: 9 },
    { label: 'Deleted', value: 6 },
    { label: 'Rejected', value: 5 },
    { label: 'In Progress', value: 7},
    { label: 'Open', value: 8 },
    { label: 'Visit Amount Paid', value: 13},
    { label: 'Service Amount Due', value: 12},
    { label: 'Service Amount Paid', value: 15 },

  ];
  useEffect(()=>{
    setServiceEnggId(parse_Ticket.serviceEngineerId || 'select Service Engineer');
    setStatus_def(parse_Ticket.status || 'select Status');
  },[formData])

  useEffect(() => {
    async function fetchDetails() {
      try{
      const response = await fetch(`${SERVER_URL}admin/get-ticket-details`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ ticketId: ticketId })
      });
        if (response.ok) {
          const result = await response.json();
          setFormData(result);
          // setServiceEnggId(result.serviceEngineerId || 'select Service Engineer');
          // setStatus_def(result.status || 'select Status');
          
        }
      }catch{
          toast.error('Error Occured! Try again...')
      }
    }
    fetchDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStausChange = (e) => {
    setStatus_def(e.target.value)
    const {name , value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  


  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

   const handleCancle = () => {
     setIsConfirmationOpen(true);
   };
 
   const handleCloseConfirmation = () => {
     setIsConfirmationOpen(false);
   };
 
   const handleConfirm = () => {
     navigate('/admin_mydash')
     setIsConfirmationOpen(false);
   };


  const handleSEChange = (e) => {
    const selectedValue = e.target.value || '<TBD>'; // Provide a default value if it's empty
  setServiceEnggId(selectedValue);
  };

  useEffect(() => {
    async function fetchData() {
      try{
      const response = await fetch(`${SERVER_URL}admin/get-service-engineers`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ ticketId: ticketId })
      });
        if (response.ok) {
          const result = await response.json();
        
        }
      }catch{
        toast.error('Error Occured! Try again...')
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try{
      const response = await fetch(`${SERVER_URL}admin/get-service-engineers`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ status: -1 }),
      });
        if (response.ok) {
          const array_Details = await response.json();
          setAll_serviceEngg(array_Details);
          const serviceEngineers = array_Details.map(eachSE => ({
            label: eachSE.username,
            value: eachSE.username
          }));
          //If SE Id is <TBD> then
          serviceEngineers.push({label:'Not Yet Assigned',value:'<TBD>'})
          setAll_serviceEngg(serviceEngineers);
        }
      }catch{
        toast.error('Error Occured! Try again...')
      }
    }
    fetchData();
  }, []);



  const onSubmit = async (e) => {
    e.preventDefault();
    // Create a copy of the form data with all the default values
    try{
    const updatedData = {
      // ...formData,
      status: status_def,
      serviceEngineerId: serviceEnggID,
      requestId:parse_Ticket.requestId
    };

    const response = await fetch(`${SERVER_URL}admin/update-ticket`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData)
    });
    if (response.ok) {
      const result = await response.json();
      // alert('Details are Successfully Updated');
    toast.success("Updated Successfully...!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose:3000
      });
      setTimeout(()=>{
        navigate(-1);
      },4000) 
    } else {
      throw new Error('Failed to Update Ticket Details...!');
    }
  }
    catch{
      toast.error("Error Occured...!");
    }

  };

console.log("hello",parse_Ticket)
console.log("ser",serviceEnggID)
  return (
    <div className="grid-container" style={{ borderBlock: '2px solid black' }}>
      <Header OpenSidebar={OpenSidebar} />
      <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
        <AdminDash_upblock />
        <form onSubmit={onSubmit}>
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
                  <Typography variant="h5" sx={{ textAlign: 'left', textTransform: 'none' }}>Update Ticket Details</Typography>
                </Button>
                </Grid>
       
       {/* Row 1 */}
       <FormField label="Description" name="shortDescription" value={formData.shortDescription} onChange={handleInputChange} />
       <FormField  label="Battery Id" name="batteryId"  value={formData.batteryId} onChange={handleInputChange}  />

       {/* Row 2 */}
       <FormField label="Battery Make" name="batterymake" onChange={handleInputChange} value={formData.batterymake}/>
       <FormField label="Battery Model" name="batterymodel" onChange={handleInputChange}  value={formData.batterymodel}/>

       {/* Row 3 */}
       <FormField label="Date Opened" name="date" onChange={handleInputChange} value={formData.openDate}/>
       <FormField label="Service Location" name="serviceArea" onChange={handleInputChange}  value={parse_Ticket.customerDetails ? parse_Ticket.customerDetails.city : 'N/A'}/>

       {/*Row 4 */}
       <FormField label="Customer Name" name="username" onChange={handleInputChange} value={formData.username}/>
       <FormField label="Contact" name="contactNumber" onChange={handleInputChange}  value={parse_Ticket.customerDetails ? parse_Ticket.customerDetails.contactNumber : 'N/A'}/>

       <FormField label="Notes To ServiceEngineer" name="noteToServiceengineer" onChange={handleInputChange} value={formData.noteToServiceEngineer} />
       <DropDownField label="Status" name="status" onChange={handleStausChange}  options={statusOptions} value={status_def} />
              {all_serviceEngg.length>0?(
              <DropDownField 
              label="Service Engineer ID" 
              name="serviceEngineerId" 
              options={all_serviceEngg} 
              onChange={handleSEChange} 
              value={serviceEnggID} />
              ):(
              <EditFormField label="Service Engineer ID" name="serviceEngineerId"  value='SE Fetching...!' />
              )} 

          <EditFormField label="Admin Notes" name="adminNotes" onChange={handleInputChange} value={formData.adminNotes} />  

       {status_def === 2 && (

            <>
            

              
              <FormField label="SE Notes" name="serviceEnigineerNotes" onChange={handleInputChange} value={formData.serviceEngineerNotes}/>
              <FormField label="Visit Amount" name="visitAmount" onChange={handleInputChange} value={formData.visitAmount}/>

            </>
        )}

        {(status_def !== 2  &&  status_def!== 14) &&  (
            //If status is assigned the service Engineers is editable...
            <>
            {/* <FormField label="SE Notes" name="serviceEngineerNotes" onChange={handleInputChange} value={formData.serviceEngineerNotes}/> */}
            <FormField label="Visit Amount" name="visitAmount" onChange={handleInputChange} value={formData.visitAmount}/>
       
          </>
          )}


          {status_def === 14 && (
              // Code to execute when status_def is not 2
              <>
            <EditFormField label="Visit Amount" name="visitAmount" onChange={handleInputChange} value={formData.visitAmount}/>
            <EditFormField label="Visit Amount Paid" name="visitAmountPaid" onChange={handleInputChange} value={formData.visitAmountPaid}/>
            <EditFormField label="Service Amount" name="serviceAmount" onChange={handleInputChange} value={formData.serviceAmount}/>
            <EditFormField label="Service Amount Paid" name="serviceAmountPaid" onChange={handleInputChange} value={formData.serviceAmountPaid}/>
            
       
          </>
            )}
       
        {/* {
        //If status is assigned the service Engineers is editable...
        status_def===2?(
          <>
          <DropDownField label="Status" name="status" onChange={handleStausChange} options={statusOptions} value={status_def}/>
            {all_serviceEngg.length>0?(
             <DropDownField 
             label="Service Engineer ID" 
             name="serviceEngineerId" 
             options={all_serviceEngg} 
             onChange={handleSEChange} 
             value={serviceEnggID} />
            ):(
             <EditFormField label="Service Engineer ID" name="serviceEngineerId"  value='SE Fetching...!' />
            )}

            <EditFormField label="Notes To ServiceEngineer" name="noteToServiceengineer" onChange={handleInputChange} value={formData.noteToServiceEngineer} />
            <EditFormField label="SE Notes" name="serviceEnigineerNotes" onChange={handleInputChange} value={formData.serviceEngineerNotes}/>
            <EditFormField label="Admin Notes" name="adminNotes" onChange={handleInputChange} value={formData.adminNotes}/>
            <EditFormField label="Visit Amount" name="visitAmount" onChange={handleInputChange} value={formData.visitAmount}/>

          </>
             
        ):(
          //If status is other than  2 ,we can  Not Editable the fields
          <>
            <FormField label="Status" name="status" onChange={handleStausChange} value={status_def} />
            <FormField label="Service Engineer ID" name="serviceEngineerId"  value={formData.serviceEngineerId} />
            <FormField label="Notes To ServiceEngineer" name="noteToServiceengineer" onChange={handleInputChange} value={formData.noteToServiceEngineer} />
            <FormField label="SE Notes" name="serviceEngineerNotes" onChange={handleInputChange} value={formData.serviceEngineerNotes}/>
            <EditFormField label="Admin Notes" name="adminNotes" onChange={handleInputChange} value={formData.adminNotes} />
            <FormField label="Visit Amount" name="visitAmount" onChange={handleInputChange} value={formData.visitAmount}/>
       
          </>
          
        )

       } */}
  
       <Grid  container item xs={12} spacing={2}>
              <Grid item xs={2}>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{ml:40,mt:5,mb:3}}
                      onClick={handleCancle}
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
                      sx={{ml:50, mb:3,mt:5  }}
                    >
                      Save Changes
                    </Button>

                    <ConfirmationModal
              open={isConfirmationOpen}
              onClose={handleCloseConfirmation}
              onConfirm={handleConfirm}
            />

            {/* Toast Success Notification */}
            <ToastContainer/>

              </Grid>
           </Grid>
       </Grid>
          </Table>
        </form>
      </main>
    </div>
  );
}

export default UpdateNewTickets;
