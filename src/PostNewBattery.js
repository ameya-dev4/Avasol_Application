import React, { useEffect, useState } from "react";
import {useForm} from 'react-hook-form'
import {Row,Col,Card,Form, Button} from 'react-bootstrap';
import { GetToken } from "../src/Api/auth";
import { Navigate, useNavigate } from "react-router-dom";

const PostNewBattery = () => { 
    const user_batteries=localStorage.getItem('batteryTables')
    const parse_batteries=JSON.parse(user_batteries)
    const [battery,setBattery]=useState('');
    const user_name=localStorage.getItem('username')
    const parse_username=JSON.parse(user_name)
    console.log("parse",parse_username)
    const [warranty,setWarranty]=useState(false);
    
    const form=useForm({
            defaultValues:{
            amount:"",
        assignedBy:"",
        assignedDate:"2023-08-25",
        batteryId:"",
        noteToServiceEngineer:"",
        openDate:"",
        otpId:5,
        payerId:"",
        requestId:0,
        serviceEngineerId:"",
        serviceEngineerNote:"",
        shortDescription:"",
        status:6,
        trasactionId:1,
        username:parse_username,
        warranty:"",
        selfDeclaration:true
        
            }
          });

    
    const [details,setDetails]=useState('')
    const {register,handleSubmit,formState} =form;
    const {errors }=formState
    const navigate=useNavigate()
   
    const [selected,setSelected]=useState('');
    const [name,setName]=useState(parse_username)
    const [otherProblem,isOtherProblem]=useState('')
    const [eachMake,setEachMake]=useState('')
    const [purchaseDate,serPurchaseDate]=useState('')
    
    const access_token=GetToken();

    // console.log(warranty)
    // console.log(battery)
    const dealer=['dealer1','dealer2','dealer3']
    const sub_dealer={

        'dealer1':['Telangana','AP','Tamilnadu'],
        'dealer2':['kerala','UP','odissa'],
        'dealer3':['delhi','goa','karnataka']

    }
    const battery_problem=['Battery Damage','warrenty expires','physicaldamage related','others']

    
    const SubmitHandler= async (event)=>{
        event.warranty=warranty?"yes":"no"
        console.log(event)
        try {
          const response = await fetch('http://100.20.33.222:5000/user/add-service-request', {
            method:'POST',
            mode:'cors',
            headers: {
            // 'Access-Control-Allow-Headers' : "Content-Type",
            // 'Access-Control-Allow-Origin': "*",
            // 'Content-Type': 'application/json',
            // 'Access-Control-Allow-Methods': "OPTIONS,POST,GET,PATCH",
            // 'Authorization':`Bearer ${access_token}`,
            'Accept':'application/json',
                'Content-type':'application/json',
                'Authorization':`Bearer ${access_token}`
            },
            body: JSON.stringify(event),
          });
    
          if (response.ok) {
            // setSuccess(true)
            const data = await response.json();
            console.log("hello",data)
            alert('Request Successfully POST')
            navigate('/latest_serv_request')

            // const accessToken = data.access_token;
            // const refreshToken=data.refresh_token;
            // // console.log("Access Token",accessToken)
              
            // // Store the access token in local storage
            // document.cookie = `access_token=${accessToken}; path=/;`;
            // document.cookie = `refresh_token=${refreshToken}; path=/;`;
            
            // localStorage.setItem('access_token', data.access_token);
            // localStorage.setItem('refresh_token', data.refresh_token);
            // const access_token=localStorage.getItem('access_token')
            // // console.log(access_token)
            // const refresh_token=localStorage.getItem('refresh_token')
  
            // console.log(refresh_token)
            
            // localStorage.setItem('access_token', accessToken);
    
            // Redirect to the dashboard or home page after successful signup
            // window.location.href = '/LoginPage'; // Replace with your desired route
    
          } else {
            // Handle signup error here
            console.error('Signup failed:', response.statusText);
          }
        } catch (error) {
          // Handle any network errors
          console.error('Network error:', error);
        }
      };
             
  return (
    
        <Row className="m-3">
            <h3 >Post Service Request</h3>
            <Card style={{backgroundColor:'Scrollbar'}}>
                <form   noValidate>
                <Col style={{margin:'30px 50px',width:'70%',alignContent:'center'}}>
                    <Row>
                        <Col>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"  value={name} style={{cursor:'not-allowed'}} readOnly></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>BatteryId</Form.Label>
                            {/* <Form.Control type="number" {...register('batteryId')}></Form.Control> */}
                            <Form.Control as='select' onChange={(e)=>setDetails(e.target.value)} {...register('batteryId')}>
                                {user_batteries && parse_batteries.map(uniqueId=>{
                                    return <option value={uniqueId.batteryId}>{uniqueId.batteryId}</option>
                                })}
                            </Form.Control>
                        </Col>

                    </Row><br/>
                    <div>
                        <Form.Label>Select the battery</Form.Label>
                        <Form.Control as='select'   onChange={(e)=>setBattery(e.target.value)} >
                            <option value='Radan'>Radan</option>
                            <option value='avasol'>avasol</option>
                            <option value='zerok'>zerok</option>
                        </Form.Control><br/>
                        <p className="error">{errors.selectBattery?.message}</p>
                    </div>
                    <Form.Check
                      type="checkbox"
                      label="warranty"
                      checked={warranty} 
                      onChange={(e) => setWarranty(e.target.checked)}
                    /><br/>
                        <div>
                            <Form.Control type="text" {...register('batteryNumber',{
                                required:'enter battery number'
                            })} placeholder="Battery Number"></Form.Control>
                            <p className="error">{errors.batteryNumber?.message}</p>
                        </div><br/>
                        <div>
                            <Form.Control type="text"  placeholder="Enter Make"></Form.Control>
                            <p className="error">{errors.make?.message}</p>
                        </div><br/>

                        <div>
                            <Form.Label>Purchase Date</Form.Label>
                            <Form.Control type="text"  placeholder="Purchase Date" {...register('purchaseDate',
                            )} ></Form.Control>
                        </div><br/>

                        <div>
                            <Form.Control type="text" placeholder="invoice Upload" {...register('invoiceUploaded',{
                                required:"missing or invalid"
                            })}></Form.Control>
                        </div><br/>
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
                                        <Form.Control type="date" placeholder="Enter Date" {...register('openDate')} /><br/>
                                        <Form.Control type="time" placeholder="Enter time" />
                                    </Col><br/>
                                    <Form.Label>Enter Battery Problem</Form.Label>
                                    <Form.Control as="select" onChange={(e)=>isOtherProblem(e.target.value)} {...register('shortDescription')}>
                                        
                                            {battery_problem.map(eachProblem=>{
                                                return <option>{eachProblem}</option>
                                            })}
                                    </Form.Control><br/>
                                    <div>
                                    <Form.Control type="text" placeholder="Note to Service Engineer" {...register('noteToServiceEngineer',{
                                        required:'missing note'
                                    })} />
                                    <p className="error">{errors.noteToServiceEngineer?.message}</p>
                                    </div>
                                    <Row md={6}>
                                        <Col >
                                        <Button variant='danger' style={{textAlign:'center'}} onClick={()=>navigate('/latest_serv_request')}>Cancle</Button>   
                                        </Col>
                                        <Col>
                                        <Button variant="primary"  onClick={handleSubmit(SubmitHandler)}>Submit</Button>
                                        </Col>
                                    </Row>
                                   
                                </Col>
                            </Row>
                    
                    {/* </Form.Group> */}
                    {/* <button className="btn btn-primary" >Submit</button> */}
                </Col>
                </form>
            </Card>
        </Row>
  )
 
}


export default PostNewBattery


// import React from 'react'
// import { useForm } from "react-hook-form";
// import '../Basic/latestServRequest.css'
// import { useHistory } from 'react-router-dom';
// const PostNewBattery = () => {
//     const form=useForm({
//     defaultValues:{
//       batteryCapacity: "",
//       batteryCurrent: "",
//       batteryId: "",
//       batteryVoltage: "",
//       dealerId:0,
//       invoice: "",
//       invoiceNumber: "",
//       invoiceUploaded: "",
//       make: "",
//       model: "",
//       principalId:0,
//       purchaseDate: "",
//       status: "",
//       username: "",
//       warranty: ""

//     }
//   });
//   const navigate=useHistory()
//   const {register,handleSubmit,formState} =form;
//   const {errors}=formState;
//     //passing the access_token of user
//   const access_token= "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJGZkF2N1JqT0dYdEh5YTdkS1ZEa0NRTmhWVlRfTUFZa3pEbXdwc0VkRUR3In0.eyJleHAiOjE2OTAzNTYxMjQsImlhdCI6MTY5MDM1NTgyNCwianRpIjoiYzJhNWYyNzgtZWVmMS00YjVmLWIwOGQtMWY5YmJiZDhmOTBiIiwiaXNzIjoiaHR0cDovLzUyLjM0Ljk2LjQ3OjgwODAvcmVhbG1zL2V2Y3JtLXVzZXJzIiwiYXVkIjpbInJlYWxtLW1hbmFnZW1lbnQiLCJhY2NvdW50Il0sInN1YiI6IjA4ZTQ2Yzg3LTBjMDItNDk1OS1iMDc3LTAyY2JlNjVjMTUzMiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImV2Y3JtLXVzZXJzIiwic2Vzc2lvbl9zdGF0ZSI6IjgwMGU4MWRlLWIxYzMtNGVkZi05NDQ3LTNkZjEyZDNjMDljZSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo1MDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWF2YXNvbC11c2VycyIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbIm1hbmFnZS11c2VycyIsInZpZXctdXNlcnMiLCJxdWVyeS1ncm91cHMiLCJxdWVyeS11c2VycyJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsInNpZCI6IjgwMGU4MWRlLWIxYzMtNGVkZi05NDQ3LTNkZjEyZDNjMDljZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6InRlc3QyIHRlc3QyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidGVzdDIiLCJnaXZlbl9uYW1lIjoidGVzdDIiLCJmYW1pbHlfbmFtZSI6InRlc3QyIiwiZW1haWwiOiJ0ZXN0MkBnbWFpbC5jb20ifQ.ZxDrMuUATqn40wCHsYHg34NEAqKXo8dCEUgUf5zmYmFxj6zH0hMveghGTE7P4FAY0oxnGH0AwrYXKRaLAOZtF2BUIiYeMilcuz6qaiXCbMk51-X26YFuxde7OR_C2_JsIir0jbxY-TdpGQQg-Wa86Rz7AQQfF46o-ics9GHr9zTu3iXw-nwEeqrJ0jG9pUJ5DpXHcWD1opo_TddtlxbsTXqP5mB4bMeyy-fAyA3SPokRHtK3oW39sIbUlEMnBKn-31mw5H6Bj3UR2H0V7cv3H2AGo61KuvXk6ZWctEuVQlmk0irTJE8fCTB8LJuQzeKvnHeJMPw5R3HBMHIdpXPZFQ"

//   const submitHandler = (data)=>{
//       console.log(data);
//       const jsonData = JSON.stringify(data)
//       console.log(jsonData);

//       fetch("http://avasol.ameyalabs.com:5000/post-new-battery",{
         
//         method :'POST',
//         mode:'cors', 
//         headers : {
//             'Accept':'application/json',
//             'Authorization':`Bearer ${access_token}`,
//             'Content-type' : 'application/json',
//           },

//           body : jsonData,

//       }).then(response => response.json())
//       .then(data =>{
//           console.log(data);

//       })
//       .catch(error =>{
//           console.log(error)
//       })
//   }


//   return(
//     <>
//     <div className='outer'>
//     {/* <div className='image'>
//         <img src={postServpic} ></img>
//     </div> */}
//     <div className='back'>
//     <div className='container1'>
//         {/* <header>Post</header> */}
//         <form action='#' noValidate onSubmit={handleSubmit(submitHandler)}>
//             <div className='form-first'>
//                 <div className='details Personal'>
//                     <span class='title'>Battery Details</span>
    
//                     <div className='fields'>
//                         <div className='input-fields'>
//                             <label>UserName</label>
//                             <input type='text' {...register('username',{
//                                 required:"Invalid username"
//                             })} placeholder='Enter the UserName'></input>
//                             <p className='error'>{errors.username?.message}</p>
//                         </div>
    
//                         <div className='input-fields'>
//                             <label>BatteryId</label>
//                             <input type='text' {...register('bateryId',{
//                                 required:"missing BatteryId"
//                             })} placeholder='Enter the BatteryId'></input>
//                             <p className='error'>{errors.batteryId?.message}</p>
//                         </div>
    
//                         <div className='input-fields'>
//                             <label>Battery Voltage</label>
//                             <input type='text' {...register('batteryVoltage',{
//                                 required:"misssing voltage"
    
//                             })} placeholder='Enter the Battery Voltage'></input>
//                             <p className='error'>{errors.batteryVoltage?.message}</p>
//                         </div>
    
//                         <div className='input-fields'>
//                             <label>Battery Capacity</label>
//                             <input type='text' {...register('batteryCapcity',{
//                                 required:"missing or invalid capacity"
//                             })} placeholder='Enter the Batery Capacity'></input>
//                             <p className='error'>{errors.batteryCapacity?.message}</p>
//                         </div>
                        
//                         <div className='input-fields'>
//                             <label>Battery Current</label>
//                             <input type='text' {...register('batteryCurrent',{
//                                 required:"missing current"
//                             })} placeholder='Enter the Battery Current'></input>
//                             <p className='error'>{errors.batteryCurrent?.message}</p>
//                         </div>
    
//                         <div className='input-fields'>
//                             <label>Model</label>
//                             <input type='text' {...register('model',{
//                                 required:"missing model"
//                             })} placeholder='Enter the Model'></input>
//                             <p className='error'>{errors.model?.message}</p>
//                         </div>
//                     </div>
//                 </div>
    
//                 <div className='details Id'>
//                     <span class='title'>Additional Information</span>
    
//                     <div className='fields'>
//                         <div className='input-fields'>
//                             <label>Make</label>
//                             <input type='text' {...register('make',{
//                                 required:"enter correctly or missing"
//                             })} placeholder='Enter the  Make'></input>
//                         </div>
    
//                         <div className='input-fields'>
//                             <label>Dealer Id</label>
//                             <input type='number' {...register('dealerId',{
//                                 required:"missing DealerId"
//                             })} placeholder='Enter the Dealer Id'></input>
//                             <p className='error'>{errors.dealerId?.message}</p>
//                         </div>
    
//                         <div className='input-fields'>
//                             <label>Invoice </label>
//                             <input type='number' {...register('invoice',{
//                                 required:"missing or invalid invoice"
//                             })} placeholder='Enter the Invoice'></input>
//                             <p className='error'>{errors.invoice?.message}</p>
//                         </div>
    
//                         <div className='input-fields'>
//                             <label>Invoice  Number</label>
//                             <input type='number' {...register('invoiceNumber',{
//                                 required:"missing or invalid id"
//                             })} placeholder='Enter the Invoice Number'></input>
//                             <p className='error'>{errors.invoiceNumber?.message}</p>
//                         </div>
                        
//                         <div className='input-fields'>
//                             <label>Invoice Upload</label>
//                             <input type='text' {...register('invoiceUploaded',{
//                                 required:"missing invoivce upload"
//                             })} placeholder='Enter the Invoice Upload'></input>
//                             <p className='error'>{errors.invoiceUploaded?.message}</p>
//                         </div>
    
//                         <div className='input-fields'>
//                             <label>Principal Id</label>
//                             <input type='number' {...register('principalId',{
//                                 required:"missing principal id"
//                             })} placeholder='Enter the Principal Id'></input>
//                             <p className='error'>{errors.principalId?.message}</p>
//                         </div>
    
//                         <div className='input-fields'>
//                             <label>Purchase Date</label>
//                             <input type='date' {...register('purchaseDate',{
//                                 required:"missing purchase type"
//                             })} placeholder='Enter the status'></input>
//                             <p className='error'>{errors.purchaseDate?.message}</p>
//                         </div>
//                         <div className='input-fields'>
//                             <label>Status</label>
//                             <input type='text' {...register('status',{
//                                 required:"missing status or invalid"
//                             })} placeholder='Enter the status'></input>
//                             <p className='error'>{errors.status?.message}</p>
//                         </div>
    
//                         <div className='input-fields'>
//                             <label>warranty</label>
//                             <input type='text' {...register('warranty',{
//                                 required:" missing warranty"
//                             })} placeholder='Enter the Warranty'></input>
//                             <p className='error'>{errors.warranty?.message}</p>
//                         </div>
//                     </div>
    
//                     <button className='nextbtn' >
//                         <span>Submit</span></button>
    
//                 </div>
//             </div>
    
            
//         </form>
//     </div>
//     </div>
//     </div>
//     </>
//   )
// }

// export default PostNewBattery;
