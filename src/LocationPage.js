import React from 'react'
import { Row, Col,Form, Button} from 'react-bootstrap';



const LocationPage = () => {
  return (
        <Row>
            <Col>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select State</Form.Label>
                    <Form.Control as="select">
                        <option>Telangana</option>
                        <option>Krishna</option>
                        <option>Tamilnadu</option>
                        <option>Karnataka</option>                                             
                        <option>Odissa</option>
                    </Form.Control><br/>
                    <Form.Label>Select District</Form.Label>
                    <Form.Control as="select">
                        <option>Khammam</option>
                        <option>warangal</option>
                        <option>secunderabad</option>
                        <option>karimnagar</option>                                             
                        <option>adilabad</option>
                    </Form.Control><br/>
                    <Form.Label>Select Mandal</Form.Label>
                    <Form.Control as="select">
                        <option>Vemsoor</option>
                        <option>wyra</option>
                        <option>ellor</option>
                        <option>krishna</option>                                             
                        <option>bengal</option>
                    </Form.Control><br/><br/>
                    <Form.Label>Enter Village</Form.Label>
                    <Form.Control type="text" placeholder="Enter Village/City" />
                </Form.Group><br/>
                <Col  style={{width:'50%'}}>
                    <Form.Control type="date" placeholder="Enter Date" /><br/>
                    <Form.Control type="time" placeholder="Enter time" />
                </Col><br/>
                <Form.Label>Enter Battery Problem</Form.Label>
                <Form.Control as="select" >
                        <option>Select the Battery Problem </option>
                        <option>problem 1</option>
                        <option>problem 2</option>
                        <option>problem 3</option>                                             
                        <option>problem 4</option>
                </Form.Control><br/>
                <Form.Control type="text" placeholder="Note to Service Engineer" /><br/>
                <Button variant='success' style={{textAlign:'center'}}>Next</Button>   
            </Col>
        </Row>
  )
}

export default LocationPage
