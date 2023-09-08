import React from 'react'
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
import PaymentSuccess from './PaymentSuccess';
import {Navigate, useHistory, useNavigate} from 'react-router-dom'
const Payment = () => {
  const navigate=useNavigate();
 
  return (
    // <Aux>
        <Row>
            <Col>
                <Card>
                    <Form.Group controlId="formBasicEmail">
                    {/* <Form.Label>Enter Amout</Form.Label> */}
                    <Form.Control type="text" placeholder="Enter Amount" />
                    <Form.Text className="text-muted">         
                    payment money display here
                    </Form.Text>
                    </Form.Group>
                    <Col style={{textAlign:'center'}}>
                    <Button variant="primary">Gpay</Button>
                    <Button variant='success'>UPI</Button>
                    </Col><br/>
                    <Form.Control type="text" placeholder="Credit/Debit Card Number" /><br/>
                    <Form.Control type="text" placeholder="Enter CVV" /><br/>
                    <Form.Control type="text" placeholder="Enter Name" /><br/><br/>
                    <Button variant='success'onClick={()=>navigate('/paysuccess')} >Make the Payment</Button>
                    {/* <button onClick={()=>navigate.push('basic/PaymentSuccess')}> navigate</button> */}

                </Card>
            </Col>
        </Row>
    // </Aux>    


  )
}

export default Payment
