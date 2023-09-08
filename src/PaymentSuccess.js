import React from 'react'
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown,Tab} from 'react-bootstrap';
import NewRequest from './NewRequestPage';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate=useNavigate();
  return (

        <Row>
            <Col>
            <h5>Servive Request</h5>
                <Card>
                    <Form.Group controlId="formBasicEmail">
                        <h3>Payment is successful </h3>
                        <p>Servive Req# 123473 <br/>
                        Date of Request:03/april/2023<br/>
                        Avasol executive will call you in 15 minutes<br/>
                        Assigns the service engineer
                        </p>
                        <p>Contact Number: 9951569178</p>
                        </Form.Group>
                    <Col>
                    <Button variant='success'>Done</Button>
                    <Button variant='primary' style={{textAlign:'right'}} onClick={()=>navigate('/newRequestPage')}>New Request</Button>
                    
                    </Col>
                    
                </Card> 
            </Col>
        </Row>
  )
}

export default PaymentSuccess
