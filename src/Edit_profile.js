import React,{useEffect, useState} from "react";
import {Row,Col,Card,Form, Button, Container} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { GetToken } from "../src/Api/auth";
import Sidebar from './Sidebar'
import Header from "./Header";
import 'bootstrap/dist/css/bootstrap.min.css'


function EditProfile(){
    const [username,setUsername]=useState('')
    const [user,setUser]=useState([])
    const [city, setCity]=useState('')
    const [contactNumber, setcontactNumber]=useState('')
    const [district, setDistrict]=useState('')
    const [emailId, setEmailId]=useState('')
    const [firstName, setFirstName]=useState('')
    const [lastName, setLastName]=useState('')
    const [latitude, setLatitude]=useState('')
    const [longitude, setLongitude]=useState('')
    const [mandal, setMandal]=useState('')
    const [pincode, setPincode]=useState('')
    const [address,setAddress]=useState('')
    const [toggle,setToggle]=useState(true )
    const [Password,setPassword]=useState('')

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

    const navigate=useNavigate();
    const access_token=GetToken();
    const user_name=localStorage.getItem('username')
   const user_details=localStorage.getItem('userdetails')
   const parse_username=JSON.parse(user_name)
   const parse_userDetails=JSON.parse(user_details)
   const password=localStorage.getItem('password')
   const parse_password=JSON.parse(password)
   
console.log("parse",parse_username)

   const detailName={
    username:parse_username
  }
    useEffect(()=>{
      getUser();
    },[])
  
    function getUser(){
      fetch('http://100.20.33.222:5000/user/get-profile',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${access_token}`
      },
      // body:JSON.stringify(detailName)
  
    }).then(response=>response.json())
    .then(data=>{
      console.log("home",data)
      setUser(data)
      setFirstName(data.firstName)
      setLastName(data.lastName)
      setCity(data.city)
      setcontactNumber(data.contactNumber)
      setDistrict(data.district)
      setLatitude(data.latitude)
      setLongitude(data.longitude)
      setAddress(data.address)
      setEmailId(data.emailId)
      setMandal(data.mandal)
      setPincode(data.pincode)
      setUsername(parse_username)
    }).catch(error=>{
      console.error(error)
    })
  }
  
  

  function updateUser()
  {
    let item={firstName,lastName,emailId,city,contactNumber,district,latitude,longitude,address,mandal,pincode,username}
    console.warn("item",item)
    fetch('http://100.20.33.222:5000/user/profile-update', {
      method:'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization': "Bearer "+access_token 
      },
      body:JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn("updated value:",resp)
        getUser()
        navigate('/user_profile')
      })
    })
  }
  
  return (
    <>
      
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className="main-container">
      <Container className="m-3 mt-5 col " >
            <div className="bg-primary rounded mb-3 text-white m-2 p-2 px-3">
                <header> <i className="fa fa-edit"> UserProfile</i></header>
            </div>
            <Card className="shadow p-3 mb-5 bg-body-tertiary rounded">
                <Col className="m-3 mt-5 col" >
                    <Row className="mb-2" >
                    <Col>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={username}  onChange={(e)=>setUsername(e.target.value)} ></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} ></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                        <Col>
                            <Form.Label>Email ID</Form.Label>
                            <Form.Control type="text"value={emailId} onChange={(e)=>setEmailId(e.target.value)}></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="text" value={contactNumber} onChange={(e)=>setcontactNumber(e.target.value)}></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                        <Col>
                            <Form.Label>House No</Form.Label>
                            <Form.Control type="text" value={address} onChange={(e)=>setAddress(e.target.value)} ></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Area Name</Form.Label>
                            <Form.Control type="text" value={city} onChange={(e)=>setCity(e.target.value)}></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                        <Col>
                            <Form.Label>District</Form.Label>
                            <Form.Control type="text" value={district} onChange={(e)=>setDistrict(e.target.value)} ></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Mandal</Form.Label>
                            <Form.Control type="text" value={mandal} onChange={(e)=>setMandal(e.target.value)}></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                        <Col>
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control type="text" value={latitude} onChange={(e)=>setLatitude(e.target.value)}></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control type="text" value={longitude} onChange={(e)=>setLongitude(e.target.value)}></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                        <Col>
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control type="text" value={pincode} onChange={(e)=>setPincode(e.target.value)}></Form.Control>
                        </Col>
                        
                    </Row>
                    <Row className="mb-2" >
                        <Col >
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control type="password" value={parse_password}></Form.Control>
                        </Col>
                        <Col >
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password"  onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                        </Col>
                        <Col >
                            <Form.Label>Re-Enter Password</Form.Label>
                            <Form.Control type="password" ></Form.Control>
                        </Col>
                    </Row>
                    <Row>
                    <Col md={9}>
                        </Col>
                        <Col md={3} className="d-flex flex-row-reverse mt-4">
                            <Col>
                                <Button  variant='danger' onClick={()=>navigate('/user_profile')}> <i className="feather icon-x"> Cancle</i></Button>
                            </Col>
                            <Col>
                                <Button variant="success"onClick={updateUser}><i className="fa fa-check"> save</i> </Button>
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

//     <>
    
        //   <Container className="m-3 mt-5 col " >
        //     <div className="bg-primary rounded mb-3 text-white m-2 p-2 px-3">
        //         <header> <i className="fa fa-edit"> UserProfile</i></header>
        //     </div>
        //     <Card className="shadow p-3 mb-5 bg-body-tertiary rounded">
        //         <Col className="m-3 mt-5 col" >
        //             <Row className="mb-2" >
        //             <Col>
        //                     <Form.Label>Username</Form.Label>
        //                     <Form.Control type="text" value={username}  onChange={(e)=>setUsername(e.target.value)} ></Form.Control>
        //                 </Col>
        //                 <Col>
        //                     <Form.Label>First Name</Form.Label>
        //                     <Form.Control type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} ></Form.Control>
        //                 </Col>
        //                 <Col>
        //                     <Form.Label>Last Name</Form.Label>
        //                     <Form.Control type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}></Form.Control>
        //                 </Col>
        //             </Row>
        //             <Row className="mb-2" >
        //                 <Col>
        //                     <Form.Label>Email ID</Form.Label>
        //                     <Form.Control type="text"value={emailId} onChange={(e)=>setEmailId(e.target.value)}></Form.Control>
        //                 </Col>
        //                 <Col>
        //                     <Form.Label>Mobile Number</Form.Label>
        //                     <Form.Control type="text" value={contactNumber} onChange={(e)=>setcontactNumber(e.target.value)}></Form.Control>
        //                 </Col>
        //             </Row>
        //             <Row className="mb-2" >
        //                 <Col>
        //                     <Form.Label>House No</Form.Label>
        //                     <Form.Control type="text" value={address} onChange={(e)=>setAddress(e.target.value)} ></Form.Control>
        //                 </Col>
        //                 <Col>
        //                     <Form.Label>Area Name</Form.Label>
        //                     <Form.Control type="text" value={city} onChange={(e)=>setCity(e.target.value)}></Form.Control>
        //                 </Col>
        //             </Row>
        //             <Row className="mb-2" >
        //                 <Col>
        //                     <Form.Label>District</Form.Label>
        //                     <Form.Control type="text" value={district} onChange={(e)=>setDistrict(e.target.value)} ></Form.Control>
        //                 </Col>
        //                 <Col>
        //                     <Form.Label>Mandal</Form.Label>
        //                     <Form.Control type="text" value={mandal} onChange={(e)=>setMandal(e.target.value)}></Form.Control>
        //                 </Col>
        //             </Row>
        //             <Row className="mb-2" >
        //                 <Col>
        //                     <Form.Label>Latitude</Form.Label>
        //                     <Form.Control type="text" value={latitude} onChange={(e)=>setLatitude(e.target.value)}></Form.Control>
        //                 </Col>
        //                 <Col>
        //                     <Form.Label>Longitude</Form.Label>
        //                     <Form.Control type="text" value={longitude} onChange={(e)=>setLongitude(e.target.value)}></Form.Control>
        //                 </Col>
        //             </Row>
        //             <Row className="mb-2" >
        //                 <Col>
        //                     <Form.Label>Pincode</Form.Label>
        //                     <Form.Control type="text" value={pincode} onChange={(e)=>setPincode(e.target.value)}></Form.Control>
        //                 </Col>
                        
        //             </Row>
        //             <Row className="mb-2" >
        //                 <Col >
        //                     <Form.Label>Current Password</Form.Label>
        //                     <Form.Control type="password" value={parse_password}></Form.Control>
        //                 </Col>
        //                 <Col >
        //                     <Form.Label>New Password</Form.Label>
        //                     <Form.Control type="password"  onChange={(e)=>setPassword(e.target.value)}></Form.Control>
        //                 </Col>
        //                 <Col >
        //                     <Form.Label>Re-Enter Password</Form.Label>
        //                     <Form.Control type="password" ></Form.Control>
        //                 </Col>
        //             </Row>
        //             <Row>
        //             <Col md={9}>
        //                 </Col>
        //                 <Col md={3} className="d-flex flex-row-reverse mt-4">
        //                     <Col>
        //                         <Button  variant='danger' onClick={()=>navigate('/')}> <i className="feather icon-x"> Cancle</i></Button>
        //                     </Col>
        //                     <Col>
        //                         <Button variant="success"onClick={updateUser}><i className="fa fa-check"> save</i> </Button>
        //                     </Col>    
                        
        //                 </Col>
        //             </Row>
        //         </Col>
        //     </Card>
        // </Container> 
//       </>
//     )

}
export default EditProfile