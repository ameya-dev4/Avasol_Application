// import React, { useState, useEffect } from 'react';
// import { Container, Form, Row, Col, Card } from 'react-bootstrap';
// import Popup from './Popup';
// import { useNavigate } from 'react-router-dom';
// import { GetToken } from './Api/auth';
// import {Grid,Box,Typography} from '@mui/material';

// import {Link, TableHead } from "@mui/material";
// import {
//   TableContainer,
//   Table,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   Button
// } from '@mui/material';
// import FormField from './Update/InputFormField';
// import DropDownField from './Update/DropDownField';
// import styled from '@emotion/styled';

// const apiUrl = 'http://100.20.33.222:5000/user/get-battery-list';
// const access_token = GetToken();

// const Rating = [{label:'Average',value:'average'},{label:'Good',value:'good'},{label:'Excellent',value:'excellent'},{label:'Needs Improvement',value:'needs Improvement'}];
// const warrantyType=[{label:'Yes',value:'yes'},{label:'No',value:'no'}]

// function DisplayBattery() {
//   const navigate = useNavigate();
//   const [latestBattery, setLatestBattery] = useState([]);
//   const [selectedBattery, setSelectedBattery] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const storedData = localStorage.getItem('batteryData');
//     if (storedData) {
//       setLatestBattery(JSON.parse(storedData));
//     }
//   }, []);

//   // Save the latestBattery data to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('batteryData', JSON.stringify(latestBattery));
//   }, [latestBattery]);

//   const [batteryCapacity, setBatteryCapacity] = useState('');
//   const [batteryVoltage, setBatteryVoltage] = useState('');
//   const [batteryCurrent, setBatteryCurrent] = useState('');
//   const [make, setMake] = useState('');
//   const [model, setModel] = useState('');
//   const [dealerId, setDealerId] = useState('');
//   const [invoice,setInvoice] = useState('');
//   const [invoiceNumber, setInvoiceNumber] = useState('');
//   const [invoiceUploaded, setInvoiceUploaded] = useState('');
//   const [principalId, setPrincipalId] = useState('');
//   const [purchaseDate, setPurchaseDate] = useState('');
//   const [warranty, setwarranty] = useState('');
//   const [status, setStatus]=useState('')
//   const [BatteryName, setBatteryName]=useState('')
//   const [warrantyYears, setWarrentyYears]=useState('')
//   const [delearAddress, setDealerAddress]=useState('')
//   const [subDealerAddress, setsubDealerAddress]=useState('')
//   const [BatteryNumber, setBatteryNumber]=useState('')
//   const [vechicleType, setVehicleType]=useState('')
//   const [DealerContact, setDealerContact]=useState('')
//   const [subDealerContact, setSubDealerContact]=useState('')


//   useEffect(() => {
//     async function getLatestBattery() {
//       try {
//         const response = await fetch(apiUrl, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + access_token,
//           },
//         });
//         const data = await response.json(); 
//         console.log("view_batteries",data)
//         setLatestBattery(data);
//         localStorage.setItem('batteryTables', JSON.stringify(data));
//       } catch (error) {
//         console.error('Error fetching latest Battery:', error);
//       }
//     }
//     getLatestBattery();
//   }, []);
//   console.log("battery",selectedBattery)


  // const handleDelete = (input_value) =>{
  //   let batteryInfo;
  //   let batteryId = input_value;
  //   for(let i=0; i<latestBattery.length ; i++){
  //     if(batteryId === latestBattery[i].batteryId){
  //        batteryInfo = latestBattery[i]
  //       latestBattery.pop(batteryInfo);
  //     }

  //   }
    

  //   fetch("http://100.20.33.222:5000/user/delete-battery",{
  //     method : "DELETE",
  //     headers : {
  //       'Authorization':`Bearer ${access_token}`,
  //       'Content-Type' : 'application/json',
  //     },
  //     body: JSON.stringify(batteryInfo),
  //   }).then(response => {
  //     if (response.ok) {
  //       console.log('DELETE request successful.');
  //       alert("Deleted Succesfully")
  //       navigate('/userMyBatteries')
  //       // Handle success or update the UI accordingly
  //     } else {
  //       console.error('DELETE request failed.');
  //       // Handle error or update the UI accordingly
  //     }
  //   })
  //   .catch(error => {
  //     console.error('Error occurred during DELETE request:', error);
  //     // Handle error or update the UI accordingly
  //   });
  // }

  // const FormatDate = (dateString)=>{
  //   const dateObject = new Date(dateString);
  //   const formattedDate = dateObject.toLocaleString("en-US",{
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //     hour: "numeric",
  //     minute: "numeric",
  //     second: "numeric",
  //     // timeZoneName: "short",
  //   });
  //   return formattedDate;

  // }


  // const handleEdit = (battery) => {
  //   setSelectedBattery(battery);
  //   setIsOpen(true);
  //   // Set the state values for editing
  //   setBatteryCapacity(battery.batteryCapacity);
  //   setBatteryVoltage(battery.batteryVoltage);
  //   setBatteryCurrent(battery.batteryCurrent);
  //   setMake(battery.make);
  //   setModel(battery.model);
  //   setDealerId(battery.dealerId)
  //   setInvoice(battery.invoice)
  //   setInvoiceNumber(battery.invoiceNumber)
  //   setInvoiceUploaded(battery.invoiceUploaded)
  //   setPrincipalId(battery.principalId)
  //   setwarranty(battery.warranty)
  //   setPurchaseDate(battery.purchaseDate)
  //   setStatus(battery.status)
  //   setBatteryName(battery.batteryName)
  //   setWarrentyYears(battery.warrantyYears)
  //   setDealerAddress(battery.delearAddress)
  //   setsubDealerAddress(battery.subDealerAddress)
  //   setBatteryNumber(battery.BatteryNumber)
  //   setVehicleType(battery.vechicleType)
  //   setDealerContact(battery.dealerContact)
  //   setSubDealerContact(battery.subDealerContact)



  // };

  

//   const handleUpdateBattery = () => {
//     const updatedBatteryData = {
//       batteryId: selectedBattery.batteryId,
//       batteryCapacity: batteryCapacity,
//       batteryVoltage: batteryVoltage,
//       batteryCurrent: batteryCurrent,
//       make: make,
//       model: model,
//       dealerId: dealerId,
//       invoice: invoice,
//       invoiceNumber: invoiceNumber,
//       invoiceUploaded: invoiceUploaded,
//       principalId: principalId,
//       purchaseDate: purchaseDate,
//       warranty: warranty,
//       status: status,
//       username: selectedBattery.username,
//     };
  
//     fetch('http://100.20.33.222:5000/user/update-battery', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${access_token}`,
//       },
//       body: JSON.stringify(updatedBatteryData),
//     })
//       .then(async (response) => {
//         if (response.ok) {
//           console.log('PUT request successful.');
//           alert('Updated Successfully');
//           setSelectedBattery(null);
//           setIsOpen(!isOpen);
//           navigate('/userMyBatteries');
//           // Update the latestBattery array with the updated data
//           setLatestBattery((prevLatestBattery) =>
//             prevLatestBattery.map((battery) =>
//               battery.batteryId === selectedBattery.batteryId
//                 ? { ...battery, ...updatedBatteryData }
//                 : battery
//             )
//           );
  
          
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
      // <TableContainer component={Paper} sx={{m:3,bgcolor:'white',maxWidth:'97%' , mt:10}}>
      // {/* backgroundColor: '#BFCAD1' */}
      //   <Table >
      //     <TableHead>
      //         <TableCell  style={{fontSize:'18px'}}>Battery Name</TableCell>
      //         <TableCell style={{fontSize:'18px'}}>Battery Number</TableCell>
      //         <TableCell style={{fontSize:'18px'}}>Battery Make</TableCell>
      //         <TableCell style={{fontSize:'18px'}}>Battery Model</TableCell>
      //         <TableCell style={{fontSize:'18px'}}>Warrenty</TableCell>
      //         <TableCell style={{fontSize:'18px'}}>Status</TableCell>
      //         <TableCell style={{fontSize:'18px'}}>Delete</TableCell>
      //     </TableHead>
      //     <TableBody>
      //       {latestBattery.map((record) => (
      //         <TableRow key={record.batteryId}>
      //           <TableCell style={{fontSize:'18px'}}>{record.batteryName}</TableCell>
      //           <TableCell style={{fontSize:'18px'}}>
      //             <Button
      //               variant='contained'
                    
      //               onClick={() => handleEdit(record)}
      //             >
      //               {record.batteryId}
      //             </Button>
      //           </TableCell >
      //           <TableCell style={{fontSize:'18px'}}>{record.make}</TableCell>
      //           <TableCell style={{fontSize:'18px'}}>{record.model}</TableCell>
      //           <TableCell style={{fontSize:'18px'}}>{record.warranty}</TableCell>
      //           <TableCell style={{fontSize:'18px'}}>{record.status}</TableCell>
      //           <TableCell style={{fontSize:'18px'}}>
      //             <a
      //               href="#"
      //               className="text-decoration-none"
      //               onClick={() => handleDelete(record.batteryId)}
      //             >
      //               Delete
      //             </a>
      //           </TableCell>
      //         </TableRow>
      //       ))}
      //     </TableBody>
      //   </Table>
      // </TableContainer>

//       {(selectedBattery && isOpen)?(
//         <div className='popup-container'>
//         <Popup
//           content={
      //       <Container style={{margin:'50px 0px',marginBottom:'60px'}}>
      //           <form noValidate>
      //   <Table sx={{border:'1px solid black',p:2,mt:3}}>
      //   <Grid container spacing={2} sx={{border:'1px black'}}>
      //   <Grid item xs={12}>
      //         <Button
      //           variant="contained"
      //           size="large"
      //           color='primary'
      //           fullWidth
      //           sx={{ mb: 3  }}
                
      //         >
      //           <Typography variant="h5" sx={{textAlign :'left',textTransform:'none'}}>Update Battery Details</Typography>
      //         </Button>
      //       </Grid>
       
      //   {/* Row 1 */}
      //   <FormField label="Battery Name" name="batteryName" value={BatteryName} onChange={(e)=>setBatteryName(e.target.value)} />
      //   <FormField  label="Battery Number" name="batteryNumber"  value={BatteryNumber} onChange={(e)=>setBatteryNumber(e.target.value)}  />

      //   {/* Row 2 */}
      //   <FormField label="Make" name="make" onChange={(e)=>setMake(e.target.value)} value={make}/>
      //   <FormField label="Model" name="model" onChange={(e)=>setModel(e.target.value)}  value={model}/>

      //   {/* Row 3 */}
      //   <FormField label="Battery Voltage" name="batteryVoltage" onChange={(e)=>setBatteryVoltage(e.target.value)} value={batteryVoltage}/>
      //   <FormField label="Battery Current" name="batteryCurrent" onChange={(e)=>setBatteryCurrent(e.target.value)}  value={batteryCurrent}/>

      //   {/* Row 4 */}
      //   <FormField label="Purchase Date" name="purchaseDate" onChange={(e)=>setPurchaseDate(e.target.value)} value={purchaseDate} disabled={false} />
      //   <DropDownField label="Warrenty" name="warrenty" onChange={(e)=>setwarranty(e.target.value)} options={warrantyType} value={warranty}/>

      //   {/* Row 5 */}
      //   <FormField label="Warranty Years" name="warrantyYears" onChange={(e)=>setWarrentyYears(e.target.value)} value={warrantyYears}/>
      //   <FormField label="Vechicle Type" name="vechicleType" onChange={(e)=>setVehicleType(e.target.value)} value={vechicleType}/>

      //   {/* Row 6 */}
      //   <FormField label="DealerName & Addrees" name="dealerName&address" onChange={(e)=>setDealerAddress(e.target.value)} value={delearAddress}/>
      //   <FormField label="Dealer Contact" name="Dealer Contact" onChange={(e)=>setDealerContact(e.target.value)} value={DealerContact}/>

      //   {/* Row 7 */}
      //   <FormField label="SubDealerName & Address" name="subDealerName&address" onChange={(e)=>setsubDealerAddress(e.target.value)}  value={subDealerAddress}/>
      //   <FormField label="SubDealer Contact" name="subDealer Contact" onChange={(e)=>setSubDealerContact(e.target.value)} value={subDealerContact}/>

      //   {/* Row 8 */}
      //   <DropDownField label="Status" name=""onChange={(e)=>setStatus(e.target.value)}  options={Rating} value={status}/>
    
      //   </Grid>
      //   <Grid container spacing={3} sx={{p:3}}>
      //   <Grid item xs={3}>
      //         <Button
      //           variant="contained"
      //           size="large"
      //           fullWidth
      //           sx={{ mt: 5,mb:2}}
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
      //           sx={{ mt: 5,mb:2  }}
      //           onClick={handleUpdateBattery}
      //         >
      //           Save Changes
      //         </Button>
      //       </Grid>
      //       <Grid item xs={3}>
      //         <Button
                
      //           variant="contained"
      //           size="large"
      //           fullWidth
      //           color='error'
      //           sx={{ mt: 5,mb:2  }}
      //           onClick={() => handleDelete(selectedBattery.batteryId)}
      //         >
      //           Delete Battery
      //         </Button>
      //       </Grid>
      //   </Grid>
      //   </Table>
      // </form>
              
      //       </Container>
//            }
//           handleClose={togglePopup}
//         /> 
//         </div>
//       ):("")}
//     </div>
//   );
// }

// export default DisplayBattery;


import Table_Tickets from "./Table_Tickets";
import React ,{useState,useEffect}from 'react'
import AdminDash_upblock from './AdminDash_upblock'
import Admin_sidebar from './Admin_sidebar'
import Header from './Header'
import {Row,Col,Button,Card} from 'react-bootstrap'
import { GetToken } from "./Api/auth";
import NewTickets_Table from "./NewTickets_Table";
import Table_comp from "./Table_Componenet";
import UpdateNewTickets from "./UpdateNewTicket";
import Table_Batteries from "./Table_Batteries";

const authToken = GetToken();

function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
  const day = currentDate.getDate();

  return `${day}/${month}/${year}`;
}

const currentDate = getCurrentDate();
const url = 'http://100.20.33.222:5000/user/get-battery-list'

function DisplayBattery(){
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const [TicketDetails, setTicketDetails] = useState([]);

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

    useEffect (()=> {
      async function fetchDetails(){
          const response = await fetch(url,{
              method : 'GET',
              headers : {
                  'Authorization' : `Bearer ${authToken}`,
                  'Content-type': 'application/json',
              },
          }).then((response) => response.json())
          .then((array_Details) =>{
              setTicketDetails(array_Details);
          })
        }
        fetchDetails();
    },[])

    return <>
    {/* <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <main className="main-container " >
    <AdminDash_upblock /><br/><br/> */}
    <Row>
            <Col className='mx-3'>
                <Button variant='success'><i className='fa fa-plus '> Add New</i></Button>
            </Col>
            Records
            <Col md={3}>
            <select className="form-select " aria-label="Default select example">
                <option selected>5</option>
                <option value="15">15</option>
                <option value="50">50</option>
                <option value="All">All</option>
            </select>
            </Col>
        </Row>
        
        {/* <NewTickets_Table/>  */}
    {TicketDetails.length > 0 ?<Table_Batteries array_Details={TicketDetails} /> : 
      <h2 className="mx-3 mt-3">No New Batteries</h2>}
    {/* </main>
    </div> */}
    </>
}

export default DisplayBattery;