import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Card } from 'react-bootstrap';
import Popup from './Popup';
import { useNavigate } from 'react-router-dom';
import { GetToken } from './Api/auth';
import {Link, TableHead } from "@mui/material";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button
} from '@mui/material';

const apiUrl = 'http://100.20.33.222:5000/user/latest-service-requests';
const access_token = GetToken();
console.log(access_token)

function DisplayBattery() {
  const navigate = useNavigate();
  const [latestBattery, setLatestBattery] = useState([]);
  const [selectedBattery, setSelectedBattery] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('ServicesList');
    if (storedData) {
      setLatestBattery(JSON.parse(storedData));
    }
  }, []);

  // Save the latestBattery data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ServicesList', JSON.stringify(latestBattery));
  }, [latestBattery]);

  const [assignedBy, setAssignBy] = useState('');
  const [assignedDate, setAssignDate] = useState('');
  const [noteToServiceEngineer, setNoteToServiceEngineer] = useState('');
  const [payerId, setPayerId] = useState('');
  const [openDate, setOpenDate] = useState('');
  const [serviceEngineerId, setServiceEngineerId] = useState('');
  const [serviceEngineerNotes, setServiceEngineerNotes] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [warranty, setWarranty] = useState('');
  const [status, setStatus] = useState('');
  const [attendedDate, setAttendedDate] = useState('');
  const [amount, setAmount] = useState('');
  const [otpId, setOtpId] = useState('');
  const [requestId, setRequestId] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [visitAmount, setVisitAmount] = useState('');
  const [visitAmountPaid, setVisitAmountPaid] = useState('');
  const [serviceDate, setServiceDate] = useState('');
  const [ServiceAmount, setServiceAmount] = useState('');
  const [serviceAmountPaid, setServiceAmountPaid] = useState('');
  const [rating, setRating] = useState('');
  const [make,setMake] = useState('');
  const [model, setModel] = useState('');
  const [current, setCurrent] = useState('');
  const [voltage, setVoltage] = useState('');
  const [service_location, setServiceLocation] = useState('');
  const [laststatusUpdated, setLastUpdated] = useState('');




  useEffect(() => {
    async function getLatestBattery() {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + access_token,
          },
        });
        const data = await response.json();
        console.log('latest_requests', data);
        setLatestBattery(data);
      } catch (error) {
        console.error('Error fetching latest Battery:', error);
      }
    }
    getLatestBattery();
  }, []);

  const handleDelete = (input_value) => {
    let batteryInfo;
    let batteryId = input_value;
    for(let i=0; i<latestBattery.length ; i++){
      if(batteryId === latestBattery[i].batteryId){
         batteryInfo = latestBattery[i]
        latestBattery.pop(batteryInfo);
      }
    }
   
    fetch('http://100.20.33.222:5000/user/delete-service-request', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(selectedBattery)
    })
      .then((response) => {
        if (response.ok) {
          console.log('DELETE request successful.');
          setIsOpen(!isOpen)
          alert('Deleted Successfully');
          
          navigate('/latest_serv_request');
        } else {
          console.error('DELETE request failed.');
        }
      })
      .catch((error) => {
        console.error('Error occurred during DELETE request:', error);
      });
  };

  const FormatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    return formattedDate;
  };

  const handleEdit = (battery) => {
    setSelectedBattery(battery);
    setIsOpen(true);
    // Set the state values for editing
    setAssignBy(battery.assignedBy);
    setAssignDate(battery.assignedDate);
    setNoteToServiceEngineer(battery.noteToServiceEngineer);
    setPayerId(battery.payerId);
    setOpenDate(battery.openDate);
    setServiceEngineerId(battery.serviceEngineerId);
    setServiceEngineerNotes(battery.serviceEngineerNotes);
    setShortDescription(battery.shortDescription);
    setTransactionId(battery.transactionId);
    setWarranty(battery.warranty);
    setPurchaseDate(battery.purchaseDate);
    setStatus(battery.status);
    setAttendedDate(battery.attendedDate);
    setAmount(battery.amount);
    setOtpId(battery.otpId);
    setRequestId(battery.requestId);
    setMake(battery.make)
    setVoltage(battery.batteryVoltage)
    setVehicleType(battery.vechicleType)
    setVisitAmount(battery.visitAmount)
    setServiceDate(battery.serviceDate)
    setServiceAmount(battery.serviceAmount)
    setRating(battery.rating)
    setModel(battery.model)
    setLastUpdated(battery.lastStatusUpdated)
    setVisitAmountPaid(battery.visitAmountPaid)
    setServiceAmountPaid(battery.serviceAmountPaid)
  };

  const handleUpdateBattery = () => {
    const updatedBatteryData = {
      batteryId: selectedBattery.batteryId,
      assignedBy,
      assignedDate,
      attendedDate,
      noteToServiceEngineer,
      payerId,
      openDate,
      serviceEngineerId,
      serviceEngineerNotes,
      shortDescription,
      transactionId,
      status,
      otpId,
      purchaseDate,
      warranty,
      requestId,
      username: selectedBattery.username,
      amount,

    };

    fetch(`http://100.20.33.222:5000/user/update-service-request`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(updatedBatteryData),
    })
      .then(async (response) => {
        if (response.ok) {
          console.log('PUT request successful.');
          alert('Updated Successfully');
          setSelectedBattery(null);
          setIsOpen(false);

          // Update the latestBattery array with the updated data
          setLatestBattery((prevLatestBattery) =>
            prevLatestBattery.map((battery) =>
              battery.batteryId === selectedBattery.batteryId
                ? { ...battery, ...updatedBatteryData }
                : battery
            )
          );

          navigate('/latest_serv_request');
        } else {
          const errorResponse = await response.json();
          console.error('PUT request failed:', errorResponse);
          alert('Update failed. Please check the console for details.');
        }
      })
      .catch((error) => {
        console.error('Error occurred during PUT request:', error);
        alert('Update failed. Please check the console for details.');
      });
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{bgcolor:'white',maxWidth:'97%' , mt:10}}>
        <Table >
          <TableHead>
            
              <TableCell style={{fontSize:'18px'}} >Description</TableCell>
              <TableCell style={{fontSize:'18px'}}>Open Date</TableCell>
              <TableCell style={{fontSize:'18px'}}>Service Location</TableCell>
              <TableCell style={{fontSize:'18px'}}>SE Name</TableCell>
              <TableCell style={{fontSize:'18px'}}>SE Contact</TableCell>
              <TableCell style={{fontSize:'18px'}}>SE Notes</TableCell>
              <TableCell style={{fontSize:'18px'}}>Target Service Date</TableCell>
              <TableCell style={{fontSize:'18px'}}>Status</TableCell>
              <TableCell style={{fontSize:'18px'}}>Delete</TableCell>
          </TableHead>
          <TableBody>
            {latestBattery.map((record) => (
              <TableRow key={record.batteryId}>
                <TableCell>
                  <a href='#'
                    style={{ color: 'blue',fontWeight:'bold' ,textDecoration:'none'}}
                    className="btn-sm"
                    onClick={() => handleEdit(record)}
                  >
                    {record.shortDescription}
                  </a>
                </TableCell>
                <TableCell>{FormatDate(record.openDate)}</TableCell>
                <TableCell>{FormatDate(record.assignedDate)}</TableCell>
                <TableCell>Service location</TableCell>
                <TableCell>SE Name</TableCell>
                <TableCell>{record.serviceEngineerNotes}</TableCell>
                <TableCell>target ServiceDate</TableCell>
                <TableCell>{record.status}</TableCell>
                <TableCell>
                  <a
                    href="#"
                    className="text-decoration-none"
                    onClick={() => handleDelete(record.batteryId)}
                  >
                    Delete
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>         
      {selectedBattery && isOpen?(
        <Popup
          content={
            <Container>
              <div className="bg-primary rounded mb-3 text-white m-2 p-2 px-3">
                <header>Edit Service Details</header>
              </div>
              <Card className="shadow p-3 mb-5 bg-body-tertiary rounded">
                <Col className="m-3 mt-2 col">
                  <Row className="mb-2">
                    
                    <Col>
                      <Form.Label>Battery ID</Form.Label>
                      <Form.Control value={selectedBattery.batteryId} readOnly />
                    </Col>
                    <Col>
                      <Form.Label>Description</Form.Label>
                      <Form.Control type="text" value={shortDescription}  onChange={(e)=>setShortDescription(e.target.value)}/>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label>Battery Make</Form.Label>
                      <Form.Control
                        type="text"
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Battery Model</Form.Label>
                      <Form.Control
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                      />
                    </Col>
                    
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label>Battery Current</Form.Label>
                      <Form.Control type="text" value={current} onChange={(e)=>setCurrent(e.target.value)}/>
                    </Col>
                    <Col>
                      <Form.Label>Battery Voltage</Form.Label>
                      <Form.Control
                        type="text"
                        value={voltage}
                        onChange={(e) => setVoltage(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label>Vehicle Type</Form.Label>
                      <Form.Control type="text" value={vehicleType}  onChange={(e)=>setVehicleType(e.target.value)}/>
                    </Col>
                    <Col>
                      <Form.Label>Service Location</Form.Label>
                      <Form.Control
                        type="text"
                        value={service_location}
                        onChange={(e) => setServiceLocation(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label>Date Opened</Form.Label>
                      <Form.Control type="text" value={openDate} onChange={(e)=>setOpenDate(e.target.value)} />
                    </Col>
                    <Col>
                      <Form.Label>NoteToServiceEngineer</Form.Label>
                      <Form.Control type="text" value={noteToServiceEngineer} onChange={(e)=>setNoteToServiceEngineer(e.target.value)} />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label>Under Warrenty</Form.Label>
                      {/* <Form.Control type="text" value={FormatDate(purchaseDate)} readOnly /> */}
                      <Form.Control as='select' >
                        <option value='yes'>Yes</option>
                        <option value='No'>No</option>
                      </Form.Control>
                    </Col>
                    <Col>
                      <Form.Label>Self Declaration</Form.Label>
                      <Form.Control type="text"  placeholder='I agree terms & conditions'/>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label>Status</Form.Label>
                      <Form.Control type="text" value={status} onChange={(e)=>setStatus(e.target.value)} />
                    </Col>
                    <Col>
                      <Form.Label>Last Status Updated</Form.Label>
                      <Form.Control type="text" value={laststatusUpdated} onChange={(e)=>setLastUpdated(e.target.value)} />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label>Visit Amount</Form.Label>
                      <Form.Control type="text" value={visitAmount} onChange={(e)=>setVisitAmount(e.target.value)}  />
                    </Col>
                    <Col>
                      <Form.Label>Visit Amount Paid</Form.Label>
                      <Form.Control type="text" value={visitAmountPaid} onChange={(e)=>setVisitAmountPaid(e.target.value)}/>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label>Service Date</Form.Label>
                      <Form.Control type="text" value={serviceDate} onChange={(e)=>setServiceDate(e.target.value)}  />
                    </Col>
                    <Col>
                      <Form.Label>ServiceEngineer Notes</Form.Label>
                      <Form.Control
                        type="text"
                        value={serviceEngineerNotes}
                        onChange={(e) => setNoteToServiceEngineer(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label>Service Amount</Form.Label>
                      <Form.Control type="text" value={ServiceAmount} onChange={(e)=>setServiceAmount(e.target.value)} />
                    </Col>
                    <Col>
                      <Form.Label>Service Amount Paid</Form.Label>
                      <Form.Control type="text" value={serviceAmountPaid}  onChange={(e)=>setServiceAmountPaid(e.target.value)}/>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col md={6}>
                      <Form.Label>Customer Rating</Form.Label>
                      <Form.Control as='select' onChange={(e)=>setRating(e.target.value)}>
                        <option value='Bad'>Bad</option>
                        <option value='Satisfactory'>Satisfactory</option>
                        <option value='Good'>Good</option>
                        <option value='Excellent'>Excellent</option>
                      </Form.Control>
                    </Col>
                    <Col md={6}>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col md={6} className="d-flex mt-4">
                      <Col>
                        <Button variant="contained" style={{color:'white',backgroundColor:"darkgreen"}} type="submit" onClick={handleUpdateBattery}>
                          Update
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="contained"
                          style={{color:'white',backgroundColor:"red"}} 
                          onClick={() => handleDelete(selectedBattery.batteryId)}
                        >
                          Delete Battery
                        </Button>
                      </Col>
                    </Col>
                  </Row>
                </Col>
              </Card>
            </Container>
          }
          handleClose={togglePopup}
        />
      ):("")}
    </div>
  );
}

export default DisplayBattery;

