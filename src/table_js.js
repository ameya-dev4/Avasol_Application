// import React, { useState, useEffect } from 'react';
// import { Container, Form, Row, Col, Card } from 'react-bootstrap';
// import Popup from './Popup';
// import { useNavigate } from 'react-router-dom';
// import { GetToken } from './Api/auth';
// import {Link, TableHead } from "@mui/material";
// import {Grid,Box,Typography} from '@mui/material';
// import FormField from './Update/InputFormField';

// import {
//   TableContainer,
//   Table,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   Button
// } from '@mui/material';
// import DropDownField from './Update/DropDownField';
// import { red } from '@mui/material/colors';

// const apiUrl = 'http://100.20.33.222:5000/user/latest-service-requests';
// const access_token = GetToken();
// console.log(access_token)

// const Rating = [{label:'Average',value:'average'},{label:'Good',value:'good'},{label:'Excellent',value:'excellent'},{label:'Needs Improvement',value:'needs Improvement'}];

// function DisplayBattery() {
//   const navigate = useNavigate();
//   const [latestBattery, setLatestBattery] = useState([]);
//   const [selectedBattery, setSelectedBattery] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const storedData = localStorage.getItem('ServicesList');
//     if (storedData) {
//       setLatestBattery(JSON.parse(storedData));
//     }
//   }, []);

//   // Save the latestBattery data to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('ServicesList', JSON.stringify(latestBattery));
//   }, [latestBattery]);

//   const [assignedBy, setAssignBy] = useState('');
//   const [assignedDate, setAssignDate] = useState('');
//   const [noteToServiceEngineer, setNoteToServiceEngineer] = useState('');
//   const [payerId, setPayerId] = useState('');
//   const [openDate, setOpenDate] = useState('');
//   const [serviceEngineerId, setServiceEngineerId] = useState('');
//   const [serviceEngineerNotes, setServiceEngineerNotes] = useState('');
//   const [shortDescription, setShortDescription] = useState('');
//   const [transactionId, setTransactionId] = useState('');
//   const [purchaseDate, setPurchaseDate] = useState('');
//   const [warranty, setWarranty] = useState('');
//   const [status, setStatus] = useState('');
//   const [attendedDate, setAttendedDate] = useState('');
//   const [amount, setAmount] = useState('');
//   const [otpId, setOtpId] = useState('');
//   const [requestId, setRequestId] = useState('');
//   const [vehicleType, setVehicleType] = useState('');
//   const [visitAmount, setVisitAmount] = useState('');
//   const [visitAmountPaid, setVisitAmountPaid] = useState('');
//   const [serviceDate, setServiceDate] = useState('');
//   const [ServiceAmount, setServiceAmount] = useState('');
//   const [serviceAmountPaid, setServiceAmountPaid] = useState('');
//   const [rating, setRating] = useState('');
//   const [make,setMake] = useState('');
//   const [model, setModel] = useState('');
//   const [current, setCurrent] = useState('');
//   const [voltage, setVoltage] = useState('');
//   const [service_location, setServiceLocation] = useState('');
//   const [laststatusUpdated, setLastUpdated] = useState('');




//   useEffect(() => {
//     async function getLatestBattery() {
//       try {
//         const response = await fetch(apiUrl, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Bearer ' + access_token,
//           },
//         });
//         const data = await response.json();
//         console.log('latest_requests', data);
//         setLatestBattery(data);
//       } catch (error) {
//         console.error('Error fetching latest Battery:', error);
//       }
//     }
//     getLatestBattery();
//   }, []);

//   const handleDelete = (input_value) => {
//     let batteryInfo;
//     let batteryId = input_value;
//     for(let i=0; i<latestBattery.length ; i++){
//       if(batteryId === latestBattery[i].batteryId){
//          batteryInfo = latestBattery[i]
//         latestBattery.pop(batteryInfo);
//       }
//     }
   
//     fetch('http://100.20.33.222:5000/user/delete-service-request', {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//         'Content-Type': 'application/json',
//       },
//       body:JSON.stringify(selectedBattery)
//     })
//       .then((response) => {
//         if (response.ok) {
//           console.log('DELETE request successful.');
//           setIsOpen(!isOpen)
//           alert('Deleted Successfully');
          
//           navigate('/latest_serv_request');
//         } else {
//           console.error('DELETE request failed.');
//         }
//       })
//       .catch((error) => {
//         console.error('Error occurred during DELETE request:', error);
//       });
//   };

//   const FormatDate = (dateString) => {
//     const dateObject = new Date(dateString);
//     const formattedDate = dateObject.toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//     });
//     return formattedDate;
//   };

//   const handleEdit = (battery) => {
//     setSelectedBattery(battery);
//     setIsOpen(true);
//     // Set the state values for editing
//     setAssignBy(battery.assignedBy);
//     setAssignDate(battery.assignedDate);
//     setNoteToServiceEngineer(battery.noteToServiceEngineer);
//     setPayerId(battery.payerId);
//     setOpenDate(battery.openDate);
//     setServiceEngineerId(battery.serviceEngineerId);
//     setServiceEngineerNotes(battery.serviceEngineerNotes);
//     setShortDescription(battery.shortDescription);
//     setTransactionId(battery.transactionId);
//     setWarranty(battery.warranty);
//     setPurchaseDate(battery.purchaseDate);
//     setStatus(battery.status);
//     setAttendedDate(battery.attendedDate);
//     setAmount(battery.amount);
//     setOtpId(battery.otpId);
//     setRequestId(battery.requestId);
//     setMake(battery.make)
//     setVoltage(battery.batteryVoltage)
//     setVehicleType(battery.vechicleType)
//     setVisitAmount(battery.visitAmount)
//     setServiceDate(battery.serviceDate)
//     setServiceAmount(battery.serviceAmount)
//     setRating(battery.rating)
//     setModel(battery.model)
//     setLastUpdated(battery.lastStatusUpdated)
//     setVisitAmountPaid(battery.visitAmountPaid)
//     setServiceAmountPaid(battery.serviceAmountPaid)
//   };

//   const handleUpdateBattery = () => {
//     const updatedBatteryData = {
//       batteryId: selectedBattery.batteryId,
//       assignedBy,
//       assignedDate,
//       attendedDate,
//       noteToServiceEngineer,
//       payerId,
//       openDate,
//       serviceEngineerId,
//       serviceEngineerNotes,
//       shortDescription,
//       transactionId,
//       status,
//       otpId,
//       purchaseDate,
//       warranty,
//       requestId,
//       username: selectedBattery.username,
//       amount,

//     };

//     fetch(`http://100.20.33.222:5000/user/update-service-request`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${access_token}`,
//       },
//       body: JSON.stringify(updatedBatteryData),
//     })
//       .then(async (response) => {
//         if (response.ok) {
//           console.log('PUT request successful.');
//           alert('Updated Successfully');
//           setSelectedBattery(null);
//           setIsOpen(false);

//           // Update the latestBattery array with the updated data
//           setLatestBattery((prevLatestBattery) =>
//             prevLatestBattery.map((battery) =>
//               battery.batteryId === selectedBattery.batteryId
//                 ? { ...battery, ...updatedBatteryData }
//                 : battery
//             )
//           );

//           navigate('/latest_serv_request');
//         } else {
//           const errorResponse = await response.json();
//           console.error('PUT request failed:', errorResponse);
//           alert('Update failed. Please check the console for details.');
//         }
//       })
//       .catch((error) => {
//         console.error('Error occurred during PUT request:', error);
//         alert('Update failed. Please check the console for details.');
//       });
//   };

//   const togglePopup = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div>
//       <TableContainer component={Paper} sx={{bgcolor:'white',maxWidth:'97%' , mt:10}}>
//         <Table >
//           <TableHead>
            
//               <TableCell style={{fontSize:'18px'}} >Description</TableCell>
//               <TableCell style={{fontSize:'18px'}}>Open Date</TableCell>
//               <TableCell style={{fontSize:'18px'}}>Service Location</TableCell>
//               <TableCell style={{fontSize:'18px'}}>SE Name</TableCell>
//               <TableCell style={{fontSize:'18px'}}>SE Contact</TableCell>
//               <TableCell style={{fontSize:'18px'}}>SE Notes</TableCell>
//               <TableCell style={{fontSize:'18px'}}>Target Service Date</TableCell>
//               <TableCell style={{fontSize:'18px'}}>Status</TableCell>
//               <TableCell style={{fontSize:'18px'}}>Delete</TableCell>
//           </TableHead>
//           <TableBody>
//             {latestBattery.map((record) => (
//               <TableRow key={record.batteryId}>
//                 <TableCell>
//                   <a href='#'
//                     style={{ color: 'blue',fontWeight:'bold' ,textDecoration:'none'}}
//                     className="btn-sm"
//                     onClick={() => handleEdit(record)}
//                   >
//                     {record.shortDescription}
//                   </a>
//                 </TableCell>
//                 <TableCell>{FormatDate(record.openDate)}</TableCell>
//                 <TableCell>{FormatDate(record.assignedDate)}</TableCell>
//                 <TableCell>Service location</TableCell>
//                 <TableCell>SE Name</TableCell>
//                 <TableCell>{record.serviceEngineerNotes}</TableCell>
//                 <TableCell>target ServiceDate</TableCell>
//                 <TableCell>{record.status}</TableCell>
//                 <TableCell>
//                   <a
//                     href="#"
//                     className="text-decoration-none"
//                     onClick={() => handleDelete(record.batteryId)}
//                   >
//                     Delete
//                   </a>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>         
//       {selectedBattery && isOpen?(
//         <Popup
//           content={
      //       <Container style={{margin:'50px 0px'}}>
      //         <form noValidate>
      //   <Table sx={{border:'1px solid black',p:2,mt:3,backgroundColor:'white'}}>
      //   <Grid container spacing={2} sx={{border:'1px black'}}>
      //   <Grid item xs={12}>
      //         <Button
      //           variant="contained"
      //           size="large"
      //           color='primary'
      //           fullWidth
      //           sx={{ mb: 3  }}
                
      //         >
      //           <Typography variant="h5" sx={{textAlign :'left',textTransform:'none'}}>Update Service Details</Typography>
      //         </Button>
      //       </Grid>
       
      //   {/* Row 1 */}
      //   <FormField label="Battery ID" name="batteryId" value={selectedBattery.batteryId}  />
      //   <FormField  label="Description" name="description"  value={shortDescription} onChange={(e)=>setShortDescription(e.target.value)}  />

      //   {/* Row 2 */}
      //   <FormField label="Make" name="make" onChange={(e)=>setMake(e.target.value)} value={make}/>
      //   <FormField label="Model" name="model" onChange={(e)=>setModel(e.target.value)}  value={model}/>

      //   {/* Row 3 */}
      //   <FormField label="Battery Voltage" name="batteryVoltage" onChange={(e)=>setVoltage(e.target.value)} value={voltage}/>
      //   <FormField label="Battery Current" name="batteryCurrent" onChange={(e)=>setCurrent(e.target.value)}  value={current}/>

      //   {/* Row 4 */}
      //   <FormField label="Vehicle Type" name="vehicleType" onChange={(e)=>setVehicleType(e.target.value)} value={vehicleType}/>
      //   <FormField label="Service Location" name="serviceLocation" onChange={(e)=>setServiceLocation(e.target.value)}  value={service_location}/>

      //   {/* Row 5 */}
      //   <FormField label="Date Opened" name="openDate" onChange={(e)=>setOpenDate(e.target.value)} value={openDate}/>
      //   <FormField label="NoteToServiceEngineer" name="NoteToServiceEngineer" onChange={(e)=>setNoteToServiceEngineer(e.target.value)} value={noteToServiceEngineer}/>

      //   {/* Row 6 */}
      //   <FormField label="Under Warrenty" name="underWarrenty" />
      //   <FormField label="self Declaration" placeholder='I agree terms & conditions'/>

      //   {/* Row 7 */}
      //   <FormField label="Status" name="status" onChange={(e)=>setStatus(e.target.value)}  value={status}/>
      //   <FormField label="Last Status Updated" name="lastStatusUpdated" onChange={(e)=>setLastUpdated(e.target.value)} value={laststatusUpdated}/>

      //   <FormField label="Visit Amount" name="visitAmount" onChange={(e)=>setAmount(e.target.value)}  value={amount}/>
      //   <FormField label="Visit Amount Paid" name="visitAmountPaid" onChange={(e)=>setVisitAmountPaid(e.target.value)} value={visitAmountPaid}/>
        
      //   <FormField label="Service Date" name="serviceDate" onChange={(e)=>setServiceDate(e.target.value)}  value={serviceDate}/>
      //   <FormField label="ServiceEngineer Notes" name="serviceEnggNotes" onChange={(e)=>setServiceEngineerNotes(e.target.value)} value={serviceEngineerNotes}/>

      //   <FormField label="Service Amount" name="serviceAmount" onChange={(e)=>setServiceAmount(e.target.value)}  value={ServiceAmount}/>
      //   <FormField label="service Amount Paid" name="serviceAmountPaid" onChange={(e)=>setServiceAmountPaid(e.target.value)} value={serviceAmountPaid}/>
            
      //   <DropDownField label="Customer Rating" name="customerRating" onChange={(e)=>setRating(e.target.value)}  value={rating} options={Rating}/>
        
      //   </Grid>
      //   <Grid container spacing={3} sx={{p:3}}>
      //   <Grid item xs={3}>
      //         <Button
      //           variant="contained"
      //           size="large"
      //           fullWidth
      //           sx={{ mb:2}}
      //           onClick={() => navigate(-1)}
      //         >
      //          close
      //         </Button>
      //       </Grid>
      //   <Grid item xs={3}>
      //         <Button
      //           type="submit"
      //           variant="contained"
      //           color="success"
      //           size="large"
      //           fullWidth
      //           sx={{mb:2  }}
      //           onClick={handleUpdateBattery}
      //         >
      //           Update
      //         </Button>
      //       </Grid>
      //       <Grid item xs={3}>
      //         <Button
                
      //           variant="contained"
      //           size="large"
      //           fullWidth
      //           color='error'
      //           sx={{mb:2}}
      //           onClick={() => handleDelete(selectedBattery.batteryId)}
      //         >
      //           Delete Service
      //         </Button>
      //       </Grid>

      //   </Grid>
        
        
      //   </Table>
      // </form>
      //       </Container>
//           }
//           handleClose={togglePopup}
//         />
//       ):("")}
//     </div>
//   );
// }

// export default DisplayBattery;

import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Link,Typography} from "@mui/material";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';
import { GetToken } from './Api/auth';
import TicketPage from './TicketPage';
import SERVER_URL from './Server/Server';


const authToken = GetToken();

function DisplayBattery({array_Details}){  
  const navigate = useNavigate();
  const [enhancedArray, setEnhancedArray ] = useState([]);
  const [latestRequests, setLatestRequests]=useState([])

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

console.log("lates",latestRequests)

   const Row = ({ record }) => {
        const [showDetails, setShowDetails] = useState(false);
      
        const toggleDetails = () => {

          setShowDetails(!showDetails);
        };
        const handleTicketClick = ({record}) => {
          console.log(record)
          localStorage.setItem('display_details',record);
          navigate('/update_latestServRequest',{state:{shortDescription:record}});
        };
        

console.log("record",record)
        const handleDelete = (input_value) =>{
            let batteryInfo;
            let batteryId = input_value;
            for(let i=0; i<latestRequests.length ; i++){
              if(batteryId === latestRequests[i].batteryId){
                 batteryInfo = latestRequests[i]
                latestRequests.pop(batteryInfo);
              }
        
            }
            
        
            fetch(`${SERVER_URL}user/delete-service-request`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(batteryInfo),
            })
              .then((response) => {
                if (response.ok) {
                  console.log('DELETE request successful.');
                  alert('Deleted Successfully');

                  // Remove the deleted item from enhancedArray
                  setEnhancedArray((prevArray) =>
                    prevArray.filter((item) => item.batteryId !== batteryId)
                  );

                  // Navigate or update UI as needed
                } else {
                  console.error('DELETE request failed.');
                  // Handle error or update the UI accordingly
                }
              })
              .catch((error) => {
                console.error('Error occurred during DELETE request:', error);
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
      
      
        return (
          <>
          
           <TableRow >
            <TableCell style={{fontSize:'18px'}}><Link style={{textDecoration : 'None',cursor:'pointer'}} onClick={() => handleTicketClick({record})} >{record.shortDescription}</Link></TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.openDate.slice(0,10)}</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.assignedDate.slice(0,10)}</TableCell>
            <TableCell style={{fontSize:'18px'}}>service_location</TableCell>
            <TableCell style={{fontSize:'18px'}}>SE_Name</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.serviceEngineerNotes}</TableCell>
            <TableCell style={{fontSize:'18px'}}>target serviceDate</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.status}</TableCell>
            {/* <TableCell style={{fontSize:'18px'}}><Link style={{textDecoration : 'None',cursor:'pointer'}} onClick={() => handleDelete(record.batteryId)} > Delete</Link></TableCell> */}

            </TableRow>
                    
        </>);
    };
      
    return (
      <>
      <Typography variant='h4'> Latest Request Details</Typography>
        <TableContainer component={Paper} sx={{bgcolor:'white',maxWidth:'100%',mt:3}}>
          <Table>
              <TableRow>
              <TableCell><h5>Description</h5></TableCell>
                <TableCell><h5>Open Date</h5></TableCell>
                <TableCell><h5>Assigned Date</h5></TableCell>
                <TableCell><h5>Service Location </h5></TableCell>
                <TableCell><h5>SE Name</h5></TableCell>
                <TableCell><h5>SE Notes</h5></TableCell>
                <TableCell><h5>Target Service Date</h5></TableCell>
                <TableCell><h5>Status  </h5></TableCell>
                {/* <TableCell><h5>Delete  </h5></TableCell> */}
              </TableRow>
            <TableBody>
              {array_Details.map((record) => (
              <Row key={record.id} record={record} />))}
            </TableBody>  
           </Table>
        </TableContainer>
      </>
    );  

}
export default DisplayBattery;
