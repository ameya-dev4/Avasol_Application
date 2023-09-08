import React, { useState,} from 'react';
import {useForm} from 'react-hook-form';
import { Row, Col, Tabs, Tab,Form,Button,Card } from 'react-bootstrap';
import { GetToken } from '../src/Api/auth';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const BatteryAdd = () => {
    const navigate=useNavigate()
    const user_name=localStorage.getItem('username')
    const parse_username=JSON.parse(user_name)
    const [check,setCheck]=useState(true);
    const access_token=GetToken()
    console.log(access_token)
    
    const form=useForm({
        defaultValues:{
            selectBattery:"",
          batteryCapacity: "",
          batteryCurrent: "",
          batteryId:"",
          batteryVoltage: "",
          dealerId:"dealerId",
          invoice: "",
          invoiceNumber: "invoice number",
          invoiceUploaded: "",
          make:"",
          model: "",
          principalId:"",
          purchaseDate: "",
          status:0,
          username:parse_username,
          warranty:"",
          batteryNumber:"",
          dealer:"",
          subDealer:""
    
        }
      });
      const {register,handleSubmit,formState}=form;
      const {errors}=formState;
      
      const dealer=['dealer1','dealer2','dealer3']
      const sub_dealer={
          'dealer1':['Telangana','AP','Tamilnadu'],
          'dealer2':['kerala','UP','odissa'],
          'dealer3':['delhi','goa','karnataka']
  
      }  
      const [select,setSelected]=useState('');
      
    const submitHandler=(data)=>{
        const jsonData=JSON.stringify(data)
        console.log(jsonData)
        fetch("http://avasol.ameyalabs.com:5000/post-new-battery",{
            mode:'cors',
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json',
                'Authorization':`Bearer ${access_token}`
            },
            body:jsonData,
        }).then(response=>response.json())
            .then(data=>{
                console.log(data)

            }).catch(err=>{
                console.log(err)
            })

        alert("Battery added successfully new")
        // navigate.push('/basic/view_battery')
        
      }


      const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
      const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
      }
    
      return (
        <>
          
        <div className='grid-container'>
          <Header OpenSidebar={OpenSidebar}/>
          <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
          <main className="main-container">
          <Row>
    <Col>
    <h3 className='text-white'> New Battery</h3>
        <Card color='grey' style={{backgroundColor:'white'}}>
            <form  onSubmit={handleSubmit(submitHandler)} noValidate>
            <Col style={{marginTop:'30px',width:'80%',marginLeft:'60px'}}>
            {/* <Form.Group controlId="formBasicEmail"> */}
            {/* <Form.Label>Enter Amout</Form.Label> */}
            <Row>
                <Col>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' {...register('username')} style={{cursor:'not-allowed'}} readOnly></Form.Control>
                </Col>
                <Col>
                    <div>
                    <Form.Label>Battery ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter Battery ID" {...register('batteryId',{
                        required:'missing battery ID'
                    })} />
                    <p className='error'>{errors.batteryId?.message}</p>
                    </div>
                </Col>
                <Col>
                    <Form.Label>Battery Number</Form.Label>
                    <Form.Control type="text" {...register('batteryNumber')} placeholder="Enter Battery Number" />
                </Col>
            </Row><br/>
            <Row>
                <Col>
                    <Form.Control type='text' {...register('batteryCapacity')} placeholder='Enter Battery capacity'></Form.Control>
                </Col><br/>
                <Col>
                    <div>
                    <Form.Control type="text" placeholder="Enter Battery Current" {...register('batteryCurrent',{
                        required:'missing battery ID'
                    })} />
                    <p className='error'>{errors.batteryCurrent?.message}</p>
                    </div>
                </Col><br/>
                <Col>
                    <Form.Control type="text" {...register('batteryVoltage',{
                        required:'missing battery voltage'
                    })}  placeholder="Enter Battery voltage" />
                </Col>
            </Row>

            <Form.Control type="text" {...register('make',{
                required:'missing make'
            })} placeholder="Enter Make" /><br/>
            <Form.Control type="text" {...register('model',{
                required:'missing model'
            })} placeholder="Enter Model" /><br/>
            <Col md={12}>
                {/* <h5 className="mt-5">Checkboxes</h5>
                    <hr/> */}
                    <Form.Group >
                        <Form.Check className='text-dark'
                            custom
                            type="checkbox"
                            id="checkbox1"
                            label="Warrenty"
                            value={check?'yes':'no'}
                            onClick={()=>{
                                if(check){
                                    setCheck(false)
                                }
                                if(!check){
                                    setCheck(true)
                                }
                            }}
                                />
                    </Form.Group><br/>
                </Col>
                {/* <Form.Group style={{display:check?'none':'block'}}> */}
                <Form.Label>Principal Company</Form.Label>
                <Form.Control as="select">
                        <option>principal Company</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>                                             
                        <option>4</option>
                </Form.Control>
                <Form.Label>Area Dealer</Form.Label>
                <Form.Control as="select" onChange={(e)=>setSelected(e.target.value)}>
                        {dealer.map(eachDealer=>{
                            return <option>{eachDealer}</option>
                        })}
                </Form.Control>
                <Form.Label>Area  SubDealer</Form.Label>
                {
                    select && 
                    <Form.Control as="select">
                    { sub_dealer[select].map(eachDealer=>{
                        return <option>{eachDealer}</option>
                    })
                }
            </Form.Control>
        }
         

            <Form.Label>Enter Date</Form.Label>
            <div>
                <Form.Control type='date'  {...register('purchaseDate',{
                    required:'missing Date'
                })} placeholder='Enter Date'/>
                <p className='error'>{errors.purchaseDate?.message}</p>
            </div>

            <Form.Label>invoice upload</Form.Label>
            <Form.Control type='text'  {...register('invoiceUploaded')} placeholder='invoice upload'/><br/>
            <Form.Control type="text"  {...register('name')} placeholder="Enter Name" /><br/>
        

            <button  className='btn btn-success' >Save</button>
            <button className='btn btn-primary' style={{width:'10%',marginLeft:'50px'}} onClick={()=>navigate('/userMyBatteries')}> Cancel</button>
            </Col>
            </form>
        </Card>
    </Col>
</Row>
          </main> 
          
            
        </div>
    
                
        
        </>
        
      )

//   return (
    
//     <Row>
//     <Col>
//     <h3 className='text-dark'> New Battery</h3>
//         <Card color='grey' style={{backgroundColor:'white'}}>
//             <form  onSubmit={handleSubmit(submitHandler)} noValidate>
//             <Col style={{marginTop:'30px',width:'80%',marginLeft:'60px'}}>
//             {/* <Form.Group controlId="formBasicEmail"> */}
//             {/* <Form.Label>Enter Amout</Form.Label> */}
//             <Row>
//                 <Col>
//                     <Form.Label>Username</Form.Label>
//                     <Form.Control type='text' {...register('username')} style={{cursor:'not-allowed'}} readOnly></Form.Control>
//                 </Col>
//                 <Col>
//                     <div>
//                     <Form.Label>Battery ID</Form.Label>
//                     <Form.Control type="text" placeholder="Enter Battery ID" {...register('batteryId',{
//                         required:'missing battery ID'
//                     })} />
//                     <p className='error'>{errors.batteryId?.message}</p>
//                     </div>
//                 </Col>
//                 <Col>
//                     <Form.Label>Battery Number</Form.Label>
//                     <Form.Control type="text" {...register('batteryNumber')} placeholder="Enter Battery Number" />
//                 </Col>
//             </Row><br/>
//             <Row>
//                 <Col>
//                     <Form.Control type='text' {...register('batteryCapacity')} placeholder='Enter Battery capacity'></Form.Control>
//                 </Col><br/>
//                 <Col>
//                     <div>
//                     <Form.Control type="text" placeholder="Enter Battery Current" {...register('batteryCurrent',{
//                         required:'missing battery ID'
//                     })} />
//                     <p className='error'>{errors.batteryCurrent?.message}</p>
//                     </div>
//                 </Col><br/>
//                 <Col>
//                     <Form.Control type="text" {...register('batteryVoltage',{
//                         required:'missing battery voltage'
//                     })}  placeholder="Enter Battery voltage" />
//                 </Col>
//             </Row>

//             <Form.Control type="text" {...register('make',{
//                 required:'missing make'
//             })} placeholder="Enter Make" /><br/>
//             <Form.Control type="text" {...register('model',{
//                 required:'missing model'
//             })} placeholder="Enter Model" /><br/>
//             <Col md={12}>
//                 {/* <h5 className="mt-5">Checkboxes</h5>
//                     <hr/> */}
//                     <Form.Group >
//                         <Form.Check className='text-dark'
//                             custom
//                             type="checkbox"
//                             id="checkbox1"
//                             label="Warrenty"
//                             value={check?'yes':'no'}
//                             onClick={()=>{
//                                 if(check){
//                                     setCheck(false)
//                                 }
//                                 if(!check){
//                                     setCheck(true)
//                                 }
//                             }}
//                                 />
//                     </Form.Group><br/>
//                 </Col>
//                 {/* <Form.Group style={{display:check?'none':'block'}}> */}
//                 <Form.Label>Principal Company</Form.Label>
//                 <Form.Control as="select">
//                         <option>principal Company</option>
//                         <option>1</option>
//                         <option>2</option>
//                         <option>3</option>                                             
//                         <option>4</option>
//                 </Form.Control>
//                 <Form.Label>Area Dealer</Form.Label>
//                 <Form.Control as="select" onChange={(e)=>setSelected(e.target.value)}>
//                         {dealer.map(eachDealer=>{
//                             return <option>{eachDealer}</option>
//                         })}
//                 </Form.Control>
//                 <Form.Label>Area  SubDealer</Form.Label>
//                 {
//                     select && 
//                     <Form.Control as="select">
//                     { sub_dealer[select].map(eachDealer=>{
//                         return <option>{eachDealer}</option>
//                     })
//                 }
//             </Form.Control>
//         }
         

//             <Form.Label>Enter Date</Form.Label>
//             <div>
//                 <Form.Control type='date'  {...register('purchaseDate',{
//                     required:'missing Date'
//                 })} placeholder='Enter Date'/>
//                 <p className='error'>{errors.purchaseDate?.message}</p>
//             </div>

//             <Form.Label>invoice upload</Form.Label>
//             <Form.Control type='text'  {...register('invoiceUploaded')} placeholder='invoice upload'/><br/>
//             <Form.Control type="text"  {...register('name')} placeholder="Enter Name" /><br/>
        

//             <button  className='btn btn-success' >Save</button>
//             <button className='btn btn-primary' style={{width:'10%',marginLeft:'50px'}} onClick={()=>navigate('/userMyBatteries')}> Cancel</button>
//             </Col>
//             </form>
//         </Card>
//     </Col>
// </Row>

//   )
}

export default BatteryAdd
