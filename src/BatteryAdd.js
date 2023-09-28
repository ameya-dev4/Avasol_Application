import React, { useState,} from 'react';
import {useForm} from 'react-hook-form';
import { Row, Col, Tabs, Tab,Form,Button,Card,Container } from 'react-bootstrap';
import { GetToken } from '../src/Api/auth';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import SERVER_URL from './Server/Server';

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
        data.warranty=warranty?"yes":"no"
        const jsonData=JSON.stringify(data)
        
        console.log("data",data.warranty)
        
        fetch(`${SERVER_URL}user/add-new-battery`,{
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
        navigate('/userMyBatteries')
        
      }


      const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
      const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
      }
    
    const [warranty,serwarranty]=useState(false)
    const checkboxHandler=()=>{
        serwarranty(!warranty)
        
    }
console.log(warranty)
      return (
        <>
        <div className='grid-container'>
       <Header OpenSidebar={OpenSidebar}/>
       <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
       <main className="main-container">
       <Container className=" col ">
            <div className="bg-primary rounded mb-3 text-white m-2 p-2 px-3">
                <header>New Battery</header>
            </div>
            <Card className="shadow p-3 mb-5 bg-body-tertiary rounded text-dark">
                <Col className="m-3 mt-5 col" >
                    <Row className="mb-2" >
                        <Col>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"  {...register('username')} style={{cursor:'not-allowed'}} readOnly></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Battery ID</Form.Label>
                            <Form.Control type="text"  placeholder='Enter BatteryId' {...register('batteryId',{
                                required:'misssing battery Id'
                            })}/>
                            <p className='error'>{errors.batteryId?.message}</p>
                        </Col>
                        <Col>
                        <Form.Label>Battery Number</Form.Label>
                            <Form.Control type="text"  placeholder='Enter Battery Number' {...register('batteryNumber',{
                                required:'misssing battery number'
                            })}/>
                            <p className='error'>{errors.batteryNumber?.message}</p>
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                        <Col>
                            <Form.Label> Battery Capacity</Form.Label>
                            <Form.Control type="text" {...register('batteryCapacity')} placeholder='Enter Battery capacity'></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Battery Current</Form.Label>
                            <Form.Control type="text"  placeholder='Enter Battery Current' {...register('batteryCurrent',{
                                required:'misssing battery number'
                            })}/>
                            <p className='error'>{errors.batteryCurrent?.message}</p>
                        </Col>
                        <Col>
                            <Form.Label>Battery Voltage</Form.Label>
                            <Form.Control type="text"  placeholder='Enter Battery Voltage' {...register('batteryVoltage',{
                                required:'misssing battery voltage'
                            })}/>
                            <p className='error'>{errors.batteryVoltage?.message}</p>
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                        <Col>
                        <Form.Control type="text" {...register('make',{required:'missing make'})} placeholder="Enter Make" />
                        </Col>
                        <Col>
                        <Form.Control type="text" {...register('model',{required:'missing model' })} placeholder="Enter Model" /><br/>
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                        <Col>
                            <Form.Label>Enter Purchase Date</Form.Label>
                            <Form.Control type='text'  {...register('purchaseDate',{
                                required:'missing Date'
                            })} placeholder='Enter Date'/>
                            <p className='error'>{errors.purchaseDate?.message}</p>
                        </Col>
                        <Col>
                            <Form.Label>invoice upload</Form.Label>
                            <Form.Control type='text'  {...register('invoiceUploaded')} placeholder='invoice upload'/>
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                        <Col>
                            <Form.Label>Principal Company</Form.Label>
                            <Form.Control as="select">
                                <option>principal Company</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>                                             
                                <option>4</option>
                            </Form.Control>
                        </Col>
                        <Col>
                                <Form.Label>Area Dealer</Form.Label>
                                <Form.Control as="select" onChange={(e)=>setSelected(e.target.value)}>
                                {dealer.map(eachDealer=>{
                                    return <option>{eachDealer}</option>
                                })}
                                </Form.Control>
                        </Col>
                        <Col>
                        
                            {
                            select && 
                            <>
                            <Form.Label>Area  SubDealer</Form.Label>
                                <Form.Control as="select">
                                { sub_dealer[select].map(eachDealer=>{
                                    return <option>{eachDealer}</option>
                                })
                            }
                                    </Form.Control>
                            </>
                            
                            }
                        </Col>

                    </Row><br/>
                    <Row>
                    <Col md={3}>
                            <Form.Control type="text"  {...register('name')} placeholder="Enter Name" />
                    </Col>
                    <Col md={3}>
                    <div style={{textAlign:'center',marginTop:'10px'}}>
                            <input type="checkbox" checked={warranty} id="agree" onChange={checkboxHandler}/>
                            <label htmlFor="agree" ><b>  warranty</b> </label>
                        </div>
                    </Col>

                                
                    </Row>
                    
                    <Row className="mb-2"  >
                        
                        {/* <Col  className="d-flex flex-row-reverse mt-4" > */}
                            <Col md={8}>
                            </Col>
                            <Col md={2}>
                                <Button  variant='danger'onClick={()=>navigate('/userMyBatteries')} className="feather icon-x"> Cancle</Button>
                            </Col>
                            <Col md={2}>
                                <Button variant="success"  onClick={handleSubmit(submitHandler)}><i className="fa fa-edit"> Save</i> </Button>
                            </Col>    
                        
                        {/* </Col> */}
                    </Row>
                </Col>
            </Card>
        </Container> 
       </main> 
 
         
           </div>
           </>
      )

}

export default BatteryAdd
