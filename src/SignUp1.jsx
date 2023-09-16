import React, { useState } from 'react';
import {useForm} from 'react-hook-form'
import {NavLink,Link,use, Navigate, useNavigate} from 'react-router-dom';
import {Row,Col,Card,Button,Form,Container} from 'react-bootstrap'




const SignUp1=()=>{
    const navigate=useNavigate()
    const form=useForm({
        defaultValues:{
          firstName:"",
          lastName:"",
          username:"",
          emailId:"",
          password:"",
          contactNumber:"",
          district:"",
          address:"",
          latitude:"",
          longitude:"",
          city:"",
          mandal:"",
          areaName:"",
          pincode:"",
          status:0,
          state:"",
          photo:"",
          tos:true
          
        }
    });

  

    const [success,setSuccess]=useState(false)
    const {register,formState,handleSubmit}=form
    const {errors}=formState
    
    const SubmitHandler= async (event)=>{
     

      try {
        const response = await fetch('http://100.20.33.222:5000/user/signup', {
          method: 'POST',
          mode:'cors',
          headers: {
            'Content-Type':'application/json',
          },
          body: JSON.stringify(event),
        });
  
        if (response.ok) {
          setSuccess(true)
          const data = await response.json();
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
    //   const response=await axios.post(register_url,JSON.stringify(event),{
    //     method:'POST',
    //     mode:'cors',
    //     headers:{
    //       "Content-Type":'application/json',
    //     },
    //     withCredentials:true,
        
    //   });
    //   console.log(response.data)
    //   console.log(response.accessToken);
    //   console.log(JSON.stringify(response))
    // }
    

    //   const jsonData = JSON.stringify(event);
  
    //   // Send the JSON data to another URL (replace 'url' with the actual URL)
    //   fetch('http://avasol.ameyalabs.com:5000/signup',{
    //     method: 'POST',
    //     mode:'cors', 
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: jsonData,
    //   })
    //     .then((response) => {
    //       if (response.ok) {
    //         const data =response.json();
    //         const accessToken = data.access_token;
    
    //         // Store the access token in local storage
    //         localStorage.setItem('access_token', accessToken);
    
    //         // Redirect to the dashboard or home page after successful signup
    //         window.location.href = '/dashboard'; // Replace with your desired route
    //       }
    //     })
    //     .then((data) => {
    //       // Handle the response data here
    //       console.log(data);

    //     }) 
    //     .catch((error) => {
    //       // Handle any errors here
    //       console.error(error);
    //     });

    //     // Function to handle token retrieval from the server response

    // }
    const [agree,setAgree]=useState(false)
    const checkboxHandler=()=>{
        setAgree(!agree)
    }

        return(
          <>
            {success?(
            <div>
              {alert("Register Successful")}
            <h2>Success</h2>
            <Link to='/signin'> Click here to login</Link>
            </div> 

            ):(
                <div className='m-2'>
                    <form  onClick={handleSubmit(SubmitHandler)} noValidate >
                        <Container >
                <div className="bg-primary rounded mb-3 m-2 p-2 px-3">
                    <header className='text-white'>User Signup</header>
                </div>
                <Card className="shadow p-3 mb-5 bg-body-tertiary rounded text-dark " style={{backgroundColor:'white'}}>
                    <Col className="m-3 mt-3 col" >
                        <Row className="mb-2" >
                            <Col>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" {...register('firstName',{
                                  required:'missing first name'
                                })} ></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" {...register('lastName',{
                                  required:'missing last name'
                                })} ></Form.Control>
                            </Col>
                        </Row>
                        <Row className="mb-2" >
                            <Col>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" {...register('username',{
                                  required:'missing username'
                                })} ></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Email ID</Form.Label>
                                <Form.Control type="email" {...register('emailId',{
                                  pattern:{
                                    value:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    message:"Invalid Email"
                                  }
                                })} ></Form.Control>
                            </Col>
                        </Row>
                        <Row className="mb-2" >
                            <Col>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" {...register('password',{
                        required:"missing password or Invalid"
                      })}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Re-Enter Password</Form.Label>
                                <Form.Control type="password" ></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control type="text" {...register('contactNumber',{
                                  maxLength:10,
                                  required:"missing Phonenumber or invalid"
                        })} ></Form.Control>
                            </Col>
                        </Row>
                        <Row className="mb-2" >
                        <Col>
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" {...register('state',{
                          required:'missing state or invalid'
                        })} ></Form.Control>
                            </Col>
                            
                            <Col>
                                <Form.Label>Mandal</Form.Label>
                                <Form.Control type="text" {...register('mandal',{
                          required:'missing mandal or invalid'
                        })} ></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" {...register('city',{
                          required:'missing city or invalid'
                        })}></Form.Control>
                            </Col>

                        </Row>
                        <Row className="mb-2" >
                            <Col>
                                <Form.Label>AreaName</Form.Label>
                                <Form.Control type="text" {...register('areaName',{
                          required:"missing AreaName or invalid"
                        })}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" {...register('address',{
                                  maxLength:10,
                                  required:"missing address or invalid"
                        })} ></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control type="text" {...register('pincode',{
                                required:"missing or invalid postalcode"
                        })} ></Form.Control>
                            </Col>

                        </Row>
                        <Row className="mb-2" >
                            <Col>
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control type="text" {...register('latitude',{
                        required:"Invalid number"
                      })} ></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Longitude</Form.Label>
                                <Form.Control type="text" {...register('longitude',{
                        required:"Invalid number"
                      })} ></Form.Control>
                            </Col>
                        </Row><br/>
                        <div style={{textAlign:'center'}}>
                            <input type="checkbox" id="agree" onChange={checkboxHandler} />
                            <label htmlFor="agree" > I agree to <a  href='#' style={{fontWeight:'bold',color:'blue',textDecoration:'none'}} className='text-primary'>terms and conditions</a></label>
                        </div>
                        <Row className="mb-2" >
                            <Col md={3}>
                                
                            </Col>
                            <Col md={6}>
                            </Col>
                            <Col md={3} className="d-flex flex-row-reverse mt-4">
                                <Col>
                                    <Button  variant='danger'onClick={()=>navigate('/userMyBatteries')} className="feather icon-x"> Cancle</Button>
                                </Col>
                                <Col>
                                    <Button variant='primary' disabled={!agree} ><i className="fa fa-edit"> Submit</i> </Button>
                                </Col>    
                            
                            </Col>
                        </Row>
                    </Col>
                </Card>
            </Container> 
        </form>
        </div> 
            
            
            )} 
            </>
        )
    }
           {/* <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-user-plus auth-icon"/>
                                </div>
                                <h3 className="mb-4">Sign up</h3>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Username"/>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Email"/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="password"/>
                                </div>
                                <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2"/>
                                            <label htmlFor="checkbox-fill-2" className="cr">Send me the <a href={DEMO.BLANK_LINK}> Newsletter</a> weekly.</label>
                                    </div>
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4">Sign up</button>
                                <p className="mb-0 text-muted">Allready have an account? <NavLink to="/auth/signin-1">Login</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
             </Aux> */}

            
export default SignUp1;