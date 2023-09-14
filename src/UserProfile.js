import React ,{useState,useEffect} from "react";
import {Row,Col,Card,Form, Button, Container} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { GetToken } from "../src/Api/auth";
import Sidebar from './Sidebar'
import Header from "./Header";
import 'bootstrap/dist/css/bootstrap.min.css'

const UserProfile = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const [showdetails,setDetails]=useState([])
  const user_name=localStorage.getItem('username')
  const parse_username=JSON.parse(user_name)
//   console.log("parse_user",parse_username)
  const navigate=useNavigate()
  const access_token=GetToken()


    useEffect(()=>{
      const jsonData={
        username :parse_username,
      }
      console.log("jsondata",jsonData)
    fetch("http://100.20.33.222:5000/user/get-profile",{
      method:'GET',
      headers:{
        'Accept':'application/json',
        'Access-Control-Allow-Origin':'https://localhost:3000',
        'Authorization':`Bearer ${access_token}`,
        'Content-Type':'application/json'
      },
    //   body:JSON.stringify(jsonData),

    }) 
    .then(response=>response.json())
      .then(data=>{
        console.log(data)
        setDetails(data)
        localStorage.setItem('userdetails',JSON.stringify(data))
        
        
      }).catch(error =>{
        console.error(error)
      })
      
    },[])
      

//    const user_details=localStorage.getItem('userdetails')
   const password=localStorage.getItem('password')
   const parse_password=JSON.parse(password)
//    const parse_userDetails=JSON.parse(user_details)
//    console.log("parse",parse_userDetails)

   console.log("details",showdetails)

   
 
   return (
     <>
       
     <div className='grid-container'>
       <Header OpenSidebar={OpenSidebar}/>
       <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
       <main className="main-container">
       <Container className="m-3 mt-5 col ">
            <div className="bg-primary rounded mb-3 text-white m-2 p-2 px-3">
                <header>UserProfile</header>
            </div>
            <Card className="shadow p-3 mb-5 bg-body-tertiary rounded">
                <Col className="m-3 mt-5 col" >
                    <Row className="mb-2" >
                        <Col>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={showdetails.firstName} readOnly style={{cursor:'not-allowed'}}></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={showdetails.lastName} readOnly style={{cursor:'not-allowed'}}></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                        <Col>
                            <Form.Label>Email ID</Form.Label>
                            <Form.Control type="text" value={showdetails.emailId} readOnly style={{cursor:'not-allowed'}}></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="text" value={showdetails.contactNumber} readOnly style={{cursor:'not-allowed'}}></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                        <Col>
                            <Form.Label>House No</Form.Label>
                            <Form.Control type="text" value={showdetails.address} readOnly style={{cursor:'not-allowed'}}></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Area Name</Form.Label>
                            <Form.Control type="text" value={showdetails.city} readOnly style={{cursor:'not-allowed'}}></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                        <Col>
                            <Form.Label>District</Form.Label>
                            <Form.Control type="text" value={showdetails.district} readOnly style={{cursor:'not-allowed'}}></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Mandal</Form.Label>
                            <Form.Control type="text" value={showdetails.mandal} readOnly style={{cursor:'not-allowed'}}></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                        <Col>
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control type="text" value={showdetails.latitude} readOnly style={{cursor:'not-allowed'}}></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control type="text" value={showdetails.longitude} readOnly style={{cursor:'not-allowed'}} ></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                        <Col>
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control type="text" value={showdetails.pincode} readOnly style={{cursor:'not-allowed'}}></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                        <Col >
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control type="password" value={parse_password} readOnly style={{cursor:'not-allowed'}} ></Form.Control>
                        </Col>
                        <Col md={6}>
                        </Col>
                        <Col md={3} className="d-flex flex-row-reverse mt-4">
                            <Col>
                                <Button  variant='danger'onClick={()=>navigate('/latest_serv_request')} className="feather icon-x"> Cancle</Button>
                            </Col>
                            <Col>
                                <Button variant="success" onClick={()=>navigate('/edit_profile')}><i className="fa fa-edit"> Edit</i> </Button>
                            </Col>    
                        
                        </Col>
                    </Row>
                </Col>
            </Card>
        </Container> 
       </main> 
 
         
           </div>
 
             
     
     </>
     
   )

//   return (
//         <>
    //   <Container className="m-3 mt-5 col ">
    //         <div className="bg-primary rounded mb-3 text-white m-2 p-2 px-3">
    //             <header>UserProfile</header>
    //         </div>
    //         <Card className="shadow p-3 mb-5 bg-body-tertiary rounded">
    //             <Col className="m-3 mt-5 col" >
    //                 <Row className="mb-2" >
    //                     <Col>
    //                         <Form.Label>First Name</Form.Label>
    //                         <Form.Control type="text" value={showdetails.firstName} readOnly style={{cursor:'not-allowed'}}></Form.Control>
    //                     </Col>
    //                     <Col>
    //                         <Form.Label>Last Name</Form.Label>
    //                         <Form.Control type="text" value={showdetails.lastName} readOnly style={{cursor:'not-allowed'}}></Form.Control>
    //                     </Col>
    //                 </Row>
    //                 <Row className="mb-2" >
    //                     <Col>
    //                         <Form.Label>Email ID</Form.Label>
    //                         <Form.Control type="text" value={showdetails.emailId} readOnly style={{cursor:'not-allowed'}}></Form.Control>
    //                     </Col>
    //                     <Col>
    //                         <Form.Label>Mobile Number</Form.Label>
    //                         <Form.Control type="text" value={showdetails.contactNumber} readOnly style={{cursor:'not-allowed'}}></Form.Control>
    //                     </Col>
    //                 </Row>
    //                 <Row className="mb-2" >
    //                     <Col>
    //                         <Form.Label>House No</Form.Label>
    //                         <Form.Control type="text" value={showdetails.address} readOnly style={{cursor:'not-allowed'}}></Form.Control>
    //                     </Col>
    //                     <Col>
    //                         <Form.Label>Area Name</Form.Label>
    //                         <Form.Control type="text" value={showdetails.city} readOnly style={{cursor:'not-allowed'}}></Form.Control>
    //                     </Col>
    //                 </Row>
    //                 <Row className="mb-2" >
    //                     <Col>
    //                         <Form.Label>District</Form.Label>
    //                         <Form.Control type="text" value={showdetails.district} readOnly style={{cursor:'not-allowed'}}></Form.Control>
    //                     </Col>
    //                     <Col>
    //                         <Form.Label>Mandal</Form.Label>
    //                         <Form.Control type="text" value={showdetails.mandal} readOnly style={{cursor:'not-allowed'}}></Form.Control>
    //                     </Col>
    //                 </Row>
    //                 <Row className="mb-2" >
    //                     <Col>
    //                         <Form.Label>Latitude</Form.Label>
    //                         <Form.Control type="text" value={showdetails.latitude} readOnly style={{cursor:'not-allowed'}}></Form.Control>
    //                     </Col>
    //                     <Col>
    //                         <Form.Label>Longitude</Form.Label>
    //                         <Form.Control type="text" value={showdetails.longitude} readOnly style={{cursor:'not-allowed'}} ></Form.Control>
    //                     </Col>
    //                 </Row>
    //                 <Row className="mb-2" >
    //                     <Col>
    //                         <Form.Label>Pincode</Form.Label>
    //                         <Form.Control type="text" value={showdetails.pincode} readOnly style={{cursor:'not-allowed'}}></Form.Control>
    //                     </Col>
    //                 </Row>
    //                 <Row className="mb-2" >
    //                     <Col >
    //                         <Form.Label>Current Password</Form.Label>
    //                         <Form.Control type="password" value={parse_password} readOnly style={{cursor:'not-allowed'}} ></Form.Control>
    //                     </Col>
    //                     <Col md={6}>
    //                     </Col>
    //                     <Col md={3} className="d-flex flex-row-reverse mt-4">
    //                         <Col>
    //                             <Button  variant='danger'onClick={()=>navigate('/')} className="feather icon-x"> Cancle</Button>
    //                         </Col>
    //                         <Col>
    //                             <Button variant="success" onClick={()=>navigate('/edit_profile')}><i className="fa fa-edit"> Edit</i> </Button>
    //                         </Col>    
                        
    //                     </Col>
    //                 </Row>
    //             </Col>
    //         </Card>
    //     </Container> 
    

            
    
//     </>
// )
   
    // <Aux>
    //     <div className='container-fluid bg-white min-vh-100' >
    //     <div className='row'>
    //      {toggle && <div className='col-3 col-md-2 bg-white vh-100 position-absolute'>
    //         <Sidebar/>
    //       </div>}
    //       {toggle && <div className='col-3 col-md-2'></div>}
    //       <div className='col'>
    //         {/* <UserDashHome Toggle={Toggle}/> */}
    //         <UserNav Toggle={Toggle}/>
    //         
             

    //       </div>
    //     </div>
    //   </div>

          
        
    // </Aux>
}

export default UserProfile
