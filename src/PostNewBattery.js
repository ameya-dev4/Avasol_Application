// import React, { useEffect, useState } from "react";
// import {useForm} from 'react-hook-form'
// import {Row,Col,Card,Form, Button} from 'react-bootstrap';
// import { GetToken } from "../src/Api/auth";
// import { Navigate, useNavigate } from "react-router-dom";
// import SERVER_URL from "./Server/Server";

// const PostNewBattery = () => { 


//     const [battery,setBattery]=useState('');
//     const user_name=localStorage.getItem('username')
//     const parse_username=JSON.parse(user_name)

//     const [warranty,setWarranty]=useState(false);
    
//     const form=useForm({
//             defaultValues:{
//             amount:"",
//         assignedBy:"",
//         assignedDate:"2023-08-25",
//         batteryId:"",
//         noteToServiceEngineer:"",
//         openDate:"",
//         otpId:5,
//         payerId:"",
//         requestId:0,
//         serviceEngineerId:"",
//         serviceEngineerNote:"",
//         shortDescription:"",
//         status:6,
//         trasactionId:1,
//         username:parse_username,
//         warranty:"",
//         selfDeclaration:true
        
//             }
//           });

    

//     const [details,setDetails]=useState('')
//     const {register,handleSubmit,formState} =form;
//     const {errors }=formState
//     const navigate=useNavigate()
   
//     const [batteries,setBatteries]=useState([]);
//     const [name,setName]=useState(parse_username)
//     const [otherProblem,isOtherProblem]=useState('')
//     const [eachMake,setEachMake]=useState('')
//     const [purchaseDate,serPurchaseDate]=useState('')
    
//     const access_token=GetToken();

//     // console.log(warranty)
//     // console.log(battery)
//     const dealer=['dealer1','dealer2','dealer3']
//     const sub_dealer={

//         'dealer1':['Telangana','AP','Tamilnadu'],
//         'dealer2':['kerala','UP','odissa'],
//         'dealer3':['delhi','goa','karnataka']

//     }
//     const battery_problem=['Battery Damage','warrenty expires','physicaldamage related','others']

//     useEffect(() => {
//         // Function to make the GET request
//         async function getLatestRequests() {
//           try {
//             const response = await fetch(`${SERVER_URL}user/get-battery-list`,{
//                 method:"GET",
//                 headers:{
//                     'Content-Type':"application/json",
//                     "Authorization": "Bearer " + access_token,
//                 },
//             });
//             const data = await response.json();
//             setBatteries(data);
//             // console.log(data)
//           } catch (error) {
//             console.error('Error fetching latest requests:', error);
//           }
//         }
    
//         // Call the function to get and display the latest service requests on page load
//         getLatestRequests();
//       }, []);

    
//     const SubmitHandler= async (event)=>{
//         event.warranty=warranty?"yes":"no"
//         console.log(event)
//         try {
//           const response = await fetch(`${SERVER_URL}user/add-service-request`, {
//             method:'POST',
//             mode:'cors',
//             headers: {
//             // 'Access-Control-Allow-Headers' : "Content-Type",
//             // 'Access-Control-Allow-Origin': "*",
//             // 'Content-Type': 'application/json',
//             // 'Access-Control-Allow-Methods': "OPTIONS,POST,GET,PATCH",
//             // 'Authorization':`Bearer ${access_token}`,
//             'Accept':'application/json',
//                 'Content-type':'application/json',
//                 'Authorization':`Bearer ${access_token}`
//             },
//             body: JSON.stringify(event),
//           });
    
//           if (response.ok) {
//             // setSuccess(true)
//             const data = await response.json();
//             console.log("hello",data)
//             alert('Request Successfully POST')
//             navigate('/latest_serv_request')

//             // Redirect to the dashboard or home page after successful signup
//             // window.location.href = '/LoginPage'; // Replace with your desired route
    
//           } else {
//             // Handle signup error here
//             console.error('Signup failed:', response.statusText);
//           }
//         } catch (error) {
//           // Handle any network errors
//           console.error('Network error:', error);
//         }
//       };
             
//   return (
    
//         <Row className="m-3">
//             <h3 >Post Service Request</h3>
//             <Card style={{backgroundColor:'Scrollbar'}}>
//                 <form   noValidate>
//                 <Col style={{margin:'30px 50px',width:'70%',alignContent:'center'}}>
//                     <Row>
//                         <Col>
//                             <Form.Label>Username</Form.Label>
//                             <Form.Control type="text"  value={name} style={{cursor:'not-allowed'}} readOnly></Form.Control>
//                         </Col>
//                         <Col>
//                             <Form.Label>BatteryId</Form.Label>
//                             {/* <Form.Control type="number" {...register('batteryId')}></Form.Control> */}
//                             <Form.Control as='select' onChange={(e)=>setDetails(e.target.value)} {...register('batteryId')}>
//                                 {batteries.length> 0 && batteries.map(uniqueId=>{
//                                     return <option value={uniqueId.batteryId}>{uniqueId.batteryId}</option>
//                                 })}
//                             </Form.Control>
//                         </Col>

//                     </Row><br/>
//                     <div>
//                         <Form.Label>Select the battery</Form.Label>
//                         <Form.Control as='select'   onChange={(e)=>setBattery(e.target.value)} >
//                             <option value='Radan'>Radan</option>
//                             <option value='avasol'>avasol</option>
//                             <option value='zerok'>zerok</option>
//                         </Form.Control><br/>
//                         <p className="error">{errors.selectBattery?.message}</p>
//                     </div>
//                     <Form.Check
//                       type="checkbox"
//                       label="warranty"
//                       checked={warranty} 
//                       onChange={(e) => setWarranty(e.target.checked)}
//                     /><br/>
//                         <div>
//                             <Form.Control type="text" {...register('batteryNumber',{
//                                 required:'enter battery number'
//                             })} placeholder="Battery Number"></Form.Control>
//                             <p className="error">{errors.batteryNumber?.message}</p>
//                         </div><br/>
//                         <div>
//                             <Form.Control type="text"  placeholder="Enter Make"></Form.Control>
//                             <p className="error">{errors.make?.message}</p>
//                         </div><br/>

//                         <div>
//                             <Form.Label>Purchase Date</Form.Label>
//                             <Form.Control type="text"  placeholder="Purchase Date" {...register('purchaseDate',
//                             )} ></Form.Control>
//                         </div><br/>

//                         <div>
//                             <Form.Control type="text" placeholder="invoice Upload" {...register('invoiceUploaded',{
//                                 required:"missing or invalid"
//                             })}></Form.Control>
//                         </div><br/>
//                         <Row>
//                                 <Col>
//                                     <Form.Group controlId="exampleForm.ControlSelect1">
//                                         <Form.Label>Select State</Form.Label>
//                                         <Form.Control as="select">
//                                             <option>Telangana</option>
//                                             <option>Krishna</option>
//                                             <option>Tamilnadu</option>
//                                             <option>Karnataka</option>                                             
//                                             <option>Odissa</option>
//                                         </Form.Control><br/>
//                                         <Form.Label>Select District</Form.Label>
//                                         <Form.Control as="select">
//                                             <option>Khammam</option>
//                                             <option>warangal</option>
//                                             <option>secunderabad</option>
//                                             <option>karimnagar</option>                                             
//                                             <option>adilabad</option>
//                                         </Form.Control><br/>
//                                         <Form.Label>Select Mandal</Form.Label>
//                                         <Form.Control as="select">
//                                             <option>Vemsoor</option>
//                                             <option>wyra</option>
//                                             <option>ellor</option>
//                                             <option>krishna</option>                                             
//                                             <option>bengal</option>
//                                         </Form.Control><br/><br/>
//                                         <Form.Label>Enter Village</Form.Label>
//                                         <Form.Control type="text" placeholder="Enter Village/City" />
//                                     </Form.Group><br/>
//                                     <Col  style={{width:'50%'}}>
//                                         <Form.Control type="date" placeholder="Enter Date" {...register('openDate')} /><br/>
//                                         <Form.Control type="time" placeholder="Enter time" />
//                                     </Col><br/>
//                                     <Form.Label>Enter Battery Problem</Form.Label>
//                                     <Form.Control as="select" onChange={(e)=>isOtherProblem(e.target.value)} {...register('shortDescription')}>
                                        
//                                             {battery_problem.map(eachProblem=>{
//                                                 return <option>{eachProblem}</option>
//                                             })}
//                                     </Form.Control><br/>
//                                     <div>
//                                     <Form.Control type="text" placeholder="Note to Service Engineer" {...register('noteToServiceEngineer',{
//                                         required:'missing note'
//                                     })} />
//                                     <p className="error">{errors.noteToServiceEngineer?.message}</p>
//                                     </div>
//                                     <Row md={6}>
//                                         <Col >
//                                         <Button variant='danger' style={{textAlign:'center'}} onClick={()=>navigate('/latest_serv_request')}>Cancle</Button>   
//                                         </Col>
//                                         <Col>
//                                         <Button variant="primary"  onClick={handleSubmit(SubmitHandler)}>Submit</Button>
//                                         </Col>
//                                     </Row>
                                   
//                                 </Col>
//                             </Row>
                    
//                     {/* </Form.Group> */}
//                     {/* <button className="btn btn-primary" >Submit</button> */}
//                 </Col>
//                 </form>
//             </Card>
//         </Row>
//   )
 
// }


// export default PostNewBattery

import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import {  useLocation, useNavigate } from 'react-router-dom';
import {Grid,Box,Typography,Button,Select,MenuItem,Table,Container} from '@mui/material';
import AdminDash_upblock from './AdminDash_upblock';
import Header from "./Header";
import Admin_sidebar from './Admin_sidebar';
import FormField from './Update/EditInputFormField';
import DropDownField from './Update/DropDownField';
import Dashboard_upBlocks from './Dashboard_upBlocks';
import Sidebar from './Sidebar';
import SERVER_URL from './Server/Server';

const authToken = GetToken();



function PostNewBattery() {
const [warranty_def, setWarranty_def]=useState('no')
const [vechicel_def, setVechicle_def]=useState('None')
const [status_def, setStatus_def]=useState('None')
const [rating_def, setRating_def]=useState('None')

const vechicleType = [{value:vechicel_def, label :'Select Vechicle Type  '},{value:'2', label:'Two'},{label:'Three',value:'3'}]
const selfDeclaration = [{value:true, label :'Yes'},{label:'No',value:false}]
const statusOptions = [{value:status_def, label :'Select Status'},{label:'New',value:1},{label:'Assigned',value:2},{label:'Rejected',value:5},{label:'Closed',value:14}];
const performanceOptions = [{value:rating_def, label :'Select Rating'},{label:'Average',value:'average'},{label:'Good',value:'good'},{label:'Excellent',value:'excellent'},{label:'Needs Improvement',value:'needs Improvement'}];

const Rating = [{label:'Average',value:'average'},{label:'Good',value:'good'},{label:'Excellent',value:'excellent'},{label:'Needs Improvement',value:'needs Improvement'}];
const navigate = useNavigate();
 
  const warrantyType = [{value:warranty_def, label :'select warranty '},{value:'Yes', label :'Yes'},{label:'No',value:'No'}]
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const location = useLocation();


  const username=localStorage.getItem('username')
  const parse_username=JSON.parse(username)
  const [formData, setFormData] = useState({
    amount: "",
    assignedBy: "",
    assignedDate: "2023-08-09", 
    attendedDate:"2023-07-12",
    batteryId: "",
    noteToServiceEngineer: "",
    openDate: "",
    otpId: 5,
    payerId: "",
    requestId: 0,
    selfDeclaration: true,
    serviceEngineerId: "",
    serviceEngineerNotes: "",
    shortDescription: "",
    status: 6,
    transactionId: 1,
    username: parse_username

  });


//   console.log("formdata",formData)
  const handleInputChange = (e) => {

    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVechicleChange = (e) => {
    setVechicle_def(e.target.value) 
    const {name , value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleWarrentyChange = (e) => {
    setWarranty_def(e.target.value)
    const {name , value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    setStatus_def(e.target.value)
    const {name , value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleRatingChange = (e) => {
    setRating_def(e.target.value)
    const {name , value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [latestRequests, setLatestRequests] = useState([]);
  const[displayDetails , setDisplayDetails] = useState(false);


  const onSubmit = (e) => {
    e.preventDefault();
    // formData contains the form values
    console.log(formData);
    fetch(`${SERVER_URL}user/add-service-request`,{
      method:'POST',
      headers:{
        'Authorization':`Bearer ${authToken}`,
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData)
    }).then((response) => response.json())
    .then((data) =>{
      console.log(data);
      alert('Details are Successfully Updated');
      navigate(-1);
    }).catch((error) => {
      console.log(error);
    })
    // Perform your form submission logic here
  };
   

  return (
    <div className="grid-container"  style={{borderBlock:'2px solid black'}}>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
      <Dashboard_upBlocks />
      <Container style={{margin:'50px 0px'}}>
              <form noValidate>
        <Table sx={{border:'1px solid black',p:1,mt:3,backgroundColor:'white'}}>
        <Grid container spacing={2} sx={{border:'1px black'}}>
        <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                color='primary'
                fullWidth
                sx={{ mb: 3  }}
                
              >
                <Typography variant="h5" sx={{textAlign :'left',textTransform:'none'}}>New Request Details</Typography>
              </Button>
            </Grid>
       
        <FormField label="Battery ID" name="batteryId" placeholder='eg:1234' value={formData.batteryId}  onChange={handleInputChange} />
        <FormField  label="Description" name="shortDescription"   placeholder='Enter Description' value={formData.shortDescription} onChange={handleInputChange}  />

        {/* Row 2 */}
        <FormField label="Make" name="make" placeholder='eg:Exide' onChange={handleInputChange} value={formData.make}/>
        <FormField label="Model" name="model" placeholder='eg:Exide_21V6' onChange={handleInputChange}  value={formData.model}/>

        {/* Row 3 */}
        <FormField label="Battery Voltage" name="batteryVoltage"  placeholder='Enter voltage'onChange={handleInputChange} value={formData.voltage}/>
        <FormField label="Battery Current" name="batteryCurrent" placeholder='Enter Current' onChange={handleInputChange}  value={formData.current}/>

        {/* Row 4 */}
        <DropDownField label="Vehicle Type" name="vehicleType" onChange={handleVechicleChange} value={vechicel_def} options={vechicleType}/>
        <FormField label="Service Location" name="service_location"  placeholder='eg:Hyderabad'onChange={handleInputChange}  value={formData.service_location}/>

        {/* Row 5 */}
        <FormField label="Date Opened" name="openDate"  placeholder='YYYY/MM/DD' onChange={handleInputChange} value={formData.openDate}/>
        <FormField label="NoteToServiceEngineer" name="noteToServiceEngineer" placeholder='Enter Note to Service Engineer' onChange={handleInputChange} value={formData.noteToServiceEngineer}/>

        {/* Row 6 */}
        
        <DropDownField label="Under Warranty" name="warranty"  value={warranty_def} options={warrantyType} onChange={handleWarrentyChange}/>
        <DropDownField label="self Declaration"  value={formData.selfDeclaration} options={selfDeclaration} onChange={handleInputChange}  />

        {/* Row 7 */}
        <DropDownField label="Status" name="status" onChange={handleStatusChange}  value={status_def} options={statusOptions}/>
        <FormField label="Last Status Updated" name="lastStatusUpdated" onChange={handleInputChange} value={formData.status}/>

        <FormField label="Visit Amount" name="visitAmount" onChange={handleInputChange} placeholder='Enter Visit Amount' value={formData.amount}/>
        <FormField label="Visit Amount Paid" name="visitAmountPaid" onChange={handleInputChange}  placeholder='Enter Amount Paid' value={formData.visitAmountPaid}/>
        
        <FormField label="Service Date" name="serviceDate" placeholder='YYYY/MM/DD' onChange={handleInputChange}  value={formData.serviceDate}/>
        <FormField label="ServiceEngineer Notes" name="serviceEngineerNotes"  placeholder='Enter Amount' onChange={handleInputChange} value={formData.serviceEngineerNotes}/>

        <FormField label="Service Amount" name="serviceAmount" placeholder='Enter Amount' onChange={handleInputChange}  value={formData.ServiceAmount}/>
        <FormField label="service Amount Paid" name="serviceAmountPaid" placeholder='Enter Amount Paid' onChange={handleInputChange} value={formData.serviceAmountPaid}/>
            
        <DropDownField label="Customer Rating" name="customerRating" onChange={handleRatingChange}  value={rating_def} options={performanceOptions} />
        
        </Grid>
        <Grid container spacing={3} sx={{p:3}}>
        <Grid item xs={3}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ mb:2}}
                onClick={() => navigate(-1)}
              >
               close
              </Button>
            </Grid>
        <Grid item xs={3}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                fullWidth
                sx={{mb:2  }}
                onClick={onSubmit}
              >
                Add Request
              </Button>
            </Grid>
           

        </Grid>
        
        
        </Table>
      </form>
            </Container>
      </main>
    </div>
  )
}


export default PostNewBattery;

