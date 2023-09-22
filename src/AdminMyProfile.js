import React,{useState} from "react";
import {Container,Col,Row,Card,Form,Button} from 'react-bootstrap'
import Header from "./Header";
import Admin_sidebar from "./Admin_sidebar";
import { json, useNavigate } from "react-router-dom";
import { GetToken } from "./Api/auth";

const AdminMyProfile = () => {
    const access_token=GetToken()
    const navigate=useNavigate()
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
    }

    try{
        fetch('http://100.20.33.222:5000/admin/get-profile',{
            method:'GET',
            mode:'cors',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${access_token}`
            }

        })
        .then(resp=> resp.json())
        .then(data=>{
            console.log("data",data)
            localStorage.setItem('admin_details',JSON.stringify(data))
        })

    }
    catch(err){
        console.error("fetching admin details error:",err)
    }

    const admin_details=localStorage.getItem('admin_details')
    const parse_admin=JSON.parse(admin_details)
    console.log(parse_admin.firstName)


    return (
      <>
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className="main-container">
      <div className="col">
        <Container className="m-3 mt-3 col ">
            <div className="bg-primary rounded mb-3 text-white m-2 p-2 px-3">
                <header>My Profile</header>
            </div>
            <Card className="shadow p-2 mb-5 bg-body-tertiary rounded">
                <h4> Personal Info</h4>
                <hr></hr>
                <Col className="m-3 mt-3 col" >
                    <Row className="mb-2" >
                        <Col>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={parse_admin.firstName} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={parse_admin.lastName} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                        <Col>
                            <Form.Label>Email ID</Form.Label>
                            <Form.Control type="text" placeholder="Example@gmail.com" value={parse_admin.emailId} style={{cursor:'not-allowed'}}  readOnly ></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="text"  value={parse_admin.contactNumber} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                        <Col>
                            <Form.Label>Service State</Form.Label>
                            <Form.Control type="text" placeholder="Delhi" value={parse_admin.firstName} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                        </Col>
                        <Col>
                            <Row  className="mt-5">
                                <Col >
                                    <Form.Label>Training Completed</Form.Label>
                                </Col>
                                <Col style={{cursor:'not-allowed'}}  readOnly>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                        <label className="form-check-label" for="flexRadioDefault1">
                                            Yes
                                        </label>
                                    </div>
                                </Col>
                                <Col style={{cursor:'not-allowed'}}  readOnly>
                                    <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                                            <label className="form-check-label" for="flexRadioDefault2">
                                                No
                                            </label>
                                    </div>         
                                </Col>
                            </Row>
                        </Col>
                    </Row><br/>
                    <h4> Address</h4>
                    <hr></hr>
                    <Row className="mb-2" >
                        <Col>
                            <Form.Label>Address 1</Form.Label>
                            <Form.Control type="text" value={parse_admin.address} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control type="text" style={{cursor:'not-allowed'}}  readOnly ></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                        <Col>
                            <Form.Label>District</Form.Label>
                            <Form.Control type="text" value={parse_admin.district} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                            {/* <select className="form-select" aria-label="Default select example" >
                                <option selected>Select State</option>
                                <option value="1">Telangana</option>
                                <option value="2">Krishna</option>
                                <option value="3">Guntur</option>
                            </select> */}
                        </Col>
                        <Col>
                            <Form.Label>Mandal</Form.Label>
                            <Form.Control type="text" value={parse_admin.mandal} style={{cursor:'not-allowed'}}  readOnly ></Form.Control>
                            {/* <select className="form-select" aria-label="Default select example">
                                <option selected>Select District</option>
                                <option value="1">khammam</option>
                                <option value="2">Hyderabad</option>
                                <option value="3">Warangal</option>
                            </select> */}
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                        <Col >
                            <Form.Label>Area 1</Form.Label>
                            <Form.Control type="text" value={parse_admin.city} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                        </Col>
                        <Col >
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control type="text" value={parse_admin.pincode} style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                        </Col>
                        
                    </Row><br/>
                    <h4>Bank Details</h4>
                    <hr></hr>
                    <Row>
                        <Col>
                            <Form.Label>Account Holder Name</Form.Label>
                            <Form.Control type="text" style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Account</Form.Label>
                            <Form.Control type="text" style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Bank Name</Form.Label>
                            <Form.Control type="text" style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>IFSC Code</Form.Label>
                            <Form.Control type="text" style={{cursor:'not-allowed'}}  readOnly></Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={9}></Col>   
                        <Col md={3} className="d-flex flex-row-reverse mt-4">
                                <Col>
                                    <Button  variant='danger'onClick={()=>navigate('/admin_home')} className="feather icon-x"> Cancle</Button>
                                </Col>
                                <Col>
                                    <Button variant="success" onClick={()=>navigate('/admin_profile_update')}><i className="fa fa-check">Update</i> </Button>
                                </Col>    
                            
                        </Col>
                    </Row>
                </Col>
            </Card>
        </Container>

            </div>
        
        
  
      </main> 
          </div>
  
            
    
    </>

  )
}

export default AdminMyProfile

