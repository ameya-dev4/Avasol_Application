
import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Row, Col, Card } from 'react-bootstrap';
import Popup from './Popup';
import { useNavigate } from 'react-router-dom';
import { GetToken } from './Api/auth';

const apiUrl = 'http://100.20.33.222:5000/admin/get-new-tickets';
const access_token = GetToken();
console.log(access_token)

function NewTickets_Table() {
  const navigate = useNavigate();
  const [latestBattery, setLatestBattery] = useState([]);
  const [selectedBattery, setSelectedBattery] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('new_tickets');
    if (storedData) {
      setLatestBattery(JSON.parse(storedData));
    }
  }, []);

  // Save the latestBattery data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('new_tickets', JSON.stringify(latestBattery));
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
   
    fetch('http://100.20.33.222:5000/admin/detele-ticket', {
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

    fetch(`http://100.20.33.222:5000/admin/update-ticket`, {
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
      <Container>
        <table className="table caption-top table-hover rounded mt-3 px-3" style={{ backgroundColor: '#FAFAFA' }}>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Ticket Description</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Contact Number</th>
              <th scope="col">Open Date</th>
              <th scope="col">Service Location</th>
              <th scope="col">Target Service Date</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {latestBattery.map((record) => (
              <tr key={record.batteryId}>
                <td>
                  <a href='#'
                    style={{ color: 'lightseagreen',fontWeight:'bold' ,textDecoration:'none'}}
                    className="btn-sm"
                    onClick={() => handleEdit(record)}
                  >
                    {record.shortDescription}
                  </a>
                </td>
                <td>{record.username}</td>
                <td>{record.customerDetails.contactNumber}</td>
                <td>{FormatDate(record.openDate)}</td>
                <td>{record.address}</td>
                <td>{record.serviceEngineerNotes}</td>
                <td>
                  <a
                    href="#"
                    className="text-decoration-none"
                    onClick={() => handleDelete(record.batteryId)}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>         
      {selectedBattery && isOpen?(
        <Popup
          content={
            <Container>
              <div className="bg-primary rounded mb-3 text-white m-2 p-2 px-3">
                <header>Edit Ticket Details</header>
              </div>
              <Card className="shadow p-3 mb-5 bg-body-tertiary rounded">
                <Col className="m-3 mt-2 col">
                  <Row className="mb-2">
                    <Col>
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="text" value={selectedBattery.username} readOnly />
                    </Col>
                    <Col>
                      <Form.Label>Battery ID</Form.Label>
                      <Form.Control type="text" value={selectedBattery.batteryId} readOnly />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label>Assigned By</Form.Label>
                      <Form.Control
                        type="text"
                        value={assignedBy}
                        onChange={(e) => setAssignBy(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Assigned Date</Form.Label>
                      <Form.Control
                        type="text"
                        value={assignedDate}
                        onChange={(e) => setAssignDate(e.target.value)}
                      />
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
                      <Form.Label>Service_Engg ID</Form.Label>
                      <Form.Control type="text" value={serviceEngineerId} readOnly />
                    </Col>
                    <Col>
                      <Form.Label>Short Description</Form.Label>
                      <Form.Control
                        type="text"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label>Transaction_Id</Form.Label>
                      <Form.Control type="text" value={transactionId} readOnly />
                    </Col>
                    <Col>
                      <Form.Label>Attended Date</Form.Label>
                      <Form.Control type="text" value={attendedDate} readOnly />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label>Assigned Date</Form.Label>
                      <Form.Control type="text" value={FormatDate(assignedDate)} readOnly />
                    </Col>
                    <Col>
                      <Form.Label>Status</Form.Label>
                      <Form.Control type="text" value={status} readOnly />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col md={6} className="d-flex mt-4">
                      <Col>
                        <Button variant="success" type="submit" onClick={handleUpdateBattery}>
                          Update
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="danger"
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

export default NewTickets_Table;
