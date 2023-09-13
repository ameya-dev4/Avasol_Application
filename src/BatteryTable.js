import React, { useState ,useEffect} from 'react';
// import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import Popup from './Popup';
import './popup.css'

import {Row,Col,Card,Form, Button, Container} from 'react-bootstrap'
import { Typography, TableHead,   } from "@mui/material";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom'
import { GetToken } from '../src/Api/auth';

const apiUrl = 'http://100.20.33.222:5000/user/get-battery-list'; 
const access_token = GetToken();

let batteryId;
function DisplayBattery(){
  const navigate=useNavigate()
  const [latestBattery, setLatestBattery] = useState([]);
  useEffect(() => {
    // Function to make the GET request
    async function getLatestBattery() {
      try {
        const response = await fetch(apiUrl,{
            method:"GET",
            headers:{
                'Content-Type':"application/json",
                "Authorization": "Bearer " + access_token,
            },
        });
        const data = await response.json();
        setLatestBattery(data);
        console.log("helo",data)
        localStorage.setItem('batteryTables',JSON.stringify(data))
      } catch (error) {
        console.error('Error fetching latest Battery:', error);
      }
    }
    getLatestBattery();
  }, []);

  console.log(latestBattery);
  
  const handleDelete = (input_value) =>{
    let batteryInfo;
    batteryId = input_value;
    for(let i=0; i<latestBattery.length ; i++){
      if(batteryId === latestBattery[i].batteryId){
         batteryInfo = latestBattery[i]
        latestBattery.pop(batteryInfo);
      }

    }
    
    fetch("http://100.20.33.222:5000/user/delete-battery",{
      method : "DELETE",
      headers : {
        'Authorization':`Bearer ${access_token}`,
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(batteryInfo),
    }).then(response => {
      if (response.ok) {
        console.log('DELETE request successful.');
        alert("Deleted Succesfully")
        navigate('/userMyBatteries')
        // Handle success or update the UI accordingly
      } else {
        console.error('DELETE request failed.');
        // Handle error or update the UI accordingly
      }
    })
    .catch(error => {
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
      timeZoneName: "short",
    });
    return formattedDate;

  }

  
  const [showDetails, setShowDetails] = useState(false);
      const [isOpen, setIsOpen] = useState(false);
   const TableRow = ({ record }) => {
        const togglePopup = () => {
          setIsOpen(!isOpen);
        }
        if (!record) {
          return null; // Return null or handle the case where record is undefined
        }
        
        return (
          <>

            <tr>
                <th scope="row"><a href='#' className='text-decoration-none'></a>{record.BatteryNumber}</th>
                <td>
                  <Button  variant="success" className='btn-sm'
                    onClick={togglePopup}
                  >{record.batteryId}</Button>
                    {

                      isOpen && <Popup
                      content={<>
                        <Container>
                        <h3>Battery Details</h3>
                        <Card className="shadow p-3 mb-5 bg-body-tertiary rounded">
                      <Col className="m-3 mt-2 col" >
                      <Row className="mb-2" >
                            <Col>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" value={record.username} readOnly  ></Form.Control>
                            </Col>
                            <Col>
                              <Form.Label>Battery ID</Form.Label>
                              <Form.Control type="text" value={record.batteryId} readOnly ></Form.Control>
                            </Col>
                          
                      </Row>
                      <Row className="mb-2" >
                          <Col>
                              <Form.Label>Battery Capacity</Form.Label>
                              <Form.Control type="text" value={record.batteryCapacity} readOnly  ></Form.Control>
                          </Col>
                          <Col>
                              <Form.Label>Battery Voltage</Form.Label>
                              <Form.Control type="text" value={record.batteryVoltage} readOnly  ></Form.Control>
                          </Col>
                          <Col>
                              <Form.Label>Battery Current</Form.Label>
                              <Form.Control type="text" value={record.batteryCurrent} readOnly  ></Form.Control>
                          </Col>
                      </Row>
                      <Row className="mb-2" >
                          <Col>
                              <Form.Label>Dealer ID</Form.Label>
                              <Form.Control type="text" value={record.dealerId} readOnly ></Form.Control>
                          </Col>
                          <Col>
                              <Form.Label>Principal ID</Form.Label>
                              <Form.Control type="text" value={record.principalId} readOnly  ></Form.Control>
                          </Col>
                      </Row>
                      <Row className="mb-2" >
                          <Col>
                              <Form.Label>Invoice Number</Form.Label>
                              <Form.Control type="text" value={record.invoiceNumber} readOnly  ></Form.Control>
                          </Col>
                          <Col>
                              <Form.Label>Invoice Uploaded</Form.Label>
                              <Form.Control type="text" value={record.invoiceUploaded} readOnly ></Form.Control>
                          </Col>
                      </Row>
                      <Row className="mb-2" >
                          <Col>
                              <Form.Label>Make</Form.Label>
                              <Form.Control type="text"value={record.make} readOnly   ></Form.Control>
                          </Col>
                          <Col>
                              <Form.Label>Model</Form.Label>
                              <Form.Control type="text" value={record.model} readOnly  ></Form.Control>
                          </Col>
                      </Row>
                      <Row className="mb-2" >
                          <Col>
                              <Form.Label>PurchaseDate</Form.Label>
                              <Form.Control type="text" value={record.purchaseDate} readOnly ></Form.Control>
                          </Col>
                          <Col>
                              <Form.Label>Warrenty</Form.Label>
                              <Form.Control type="text" value={record.warranty} readOnly ></Form.Control>
                          </Col>
                      </Row>
                      <Row>
                      <Col md={9}>
                          </Col>
                          <Col md={6} className="d-flex mt-4">
                              <Col>
                              <Button  variant='success' onClick={()=>navigate('/battery_update')}>Update</Button>
                              </Col> 
                              <Col>
                              <Button variant='danger' onClick={() => handleDelete(record.batteryId)}>Delete Battery </Button>
                              </Col>    
                          
                          </Col>
                      </Row>
                      </Col>
                      </Card>

                      </Container>
                      </>}
                      handleClose={togglePopup}
                      /> 
                                }
                  
                    
   </td>
   
                <td>{record.make}</td>
                <td>{record.model}</td>
                <td>{record.warrenty}</td>
                <td>{record.status}</td>
                <td><a href='#' className='text-decoration-none'>Delete</a></td>
                </tr>
        
          
        </>);
    };
      
    return (
      <>
      <Container>
            <table class="table caption-top  table-hover rounded mt-3 px-3" style={{backgroundColor:'#BFCAD1'}}>
            <thead>
                <tr>
                <th scope="col">Battery Name</th>
                <th scope="col">Battery Number</th>
                <th scope="col">Battery Make</th>
                <th scope="col">Battery Model</th>
                <th scope="col">Warrenty</th>
                <th scope="col">Status</th>
                <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
              {latestBattery.map((record) => (

              <TableRow key={record.id} record={record} />))}
            </tbody>
            </table>
        </Container>  
      </>
    );  

}
export default DisplayBattery;