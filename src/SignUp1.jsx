import React, { useState } from 'react';
import {useForm} from 'react-hook-form'
import {NavLink,use, Navigate, useNavigate} from 'react-router-dom';
// import {Row,Col,Card,Button,Form,Container} from 'react-bootstrap'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme=createTheme()

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
          navigate('/signin')
  
        } else {
          // Handle signup error here
          console.error('Signup failed:', response.statusText);
        }
      } catch (error) {
        // Handle any network errors
        console.error('Network error:', error);
      }
    };
   
    const [agree,setAgree]=useState(false)
    const checkboxHandler=()=>{
        setAgree(!agree)
    }

        return(

            <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            User Signup
          </Typography>

          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                {...register('firstName', {
                    required: 'First Name is required',
                  })}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error = {!!errors.firstName}
                  helperText = {errors.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                {...register('lastName', {
                    required: 'Last Name is required',
                  })}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  autoFocus
                  error = {!!errors.lastName}
                  helperText = {errors.lastName?.message}

                />
              </Grid>
              <Grid item xs={12}  sm={6}>
                <TextField
                 {...register('username', {
                    required: 'username is required',
                  })}
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  type="text"
                  id="username"
                  autoComplete="username"
                  error = {!!errors.username}
                  helperText = {errors.username?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                {...register('emailId', {
                    required: 'Email Id is required',
                  })}
                  required
                  fullWidth
                  id="emailId"
                  label="Email Id"
                  name="emailId"
                  autoComplete="family-name"
                  autoFocus
                  error = {!!errors.emailId}
                  helperText = {errors.emailId?.message}
                  />
                </Grid> 

                <Grid item xs={12} sm={6}>
                <TextField
                {...register('password', {
                    required: 'Password is required',
                  })}
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="family-name"
                  autoFocus
                  error = {!!errors.password}
                  helperText = {errors.password?.message}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                <TextField
                {...register('state', {
                    required: 'State is required',
                  })}
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  autoComplete="family-name"
                  autoFocus
                  error = {!!errors.state}
                  helperText = {errors.state?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                <TextField
                {...register('mandal', {
                    required: 'Mandal is required',
                  })}
                  required
                  fullWidth
                  id="mandal"
                  label="Mandal"
                  name="mandal"
                  autoComplete="family-name"
                  autoFocus
                  error = {!!errors.mandal}
                  helperText = {errors.mandal?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                <TextField
                {...register('city', {
                    required: 'City is required',
                  })}
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="family-name"
                  autoFocus
                  error = {!!errors.city}
                  helperText = {errors.city?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                <TextField
                 {...register('contactNumber', {
                    required: 'Contact Number is required',
                  })}
                  required
                  fullWidth
                  name="contactNumber"
                  label="ContactNumber"
                  type="text"
                  id="contactNumber"
                  autoComplete="contactNumber"
                  error = {!!errors.contactNumber}
                  helperText = {errors.contactNumber?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                 {...register('areaName', {
                    required: 'Area Name is required',
                  })}
                  required
                  fullWidth
                  name="areaName"
                  label="Area Name"
                  type="text"
                  id="areaName"
                  autoComplete="areaName"
                  error = {!!errors.areaName}
                  helperText = {errors.areaName?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                 {...register('latitude', {
                    required: 'Latitude is required',
                  })}
                  required
                  fullWidth
                  name="latitude"
                  label="Latitude"
                  type="text"
                  id="latitude"
                  autoComplete="latitude"
                  error = {!!errors.latitude}
                  helperText = {errors.latitude?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                 {...register('longitude', {
                    required: 'Longitude is required',
                  })}
                  required
                  fullWidth
                  name="longitude"
                  label="Longitude"
                  type="text"
                  id="longitude"
                  autoComplete="longitude"
                  error = {!!errors.longitude}
                  helperText = {errors.longitude?.message}
                />
              </Grid>

              <Grid item xs={12}  sm={6}>
                <TextField
                 {...register('pincode', {
                    required: 'pincode Name is required',
                  })}
                  required
                  fullWidth
                  name="pincode"
                  label="Pincode"
                  type="text"
                  id="pincode"
                  autoComplete="pincode"
                  error = {!!errors.pincode}
                  helperText = {errors.pincode?.message}
                />
              </Grid>
              
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary"  onChange={checkboxHandler}/>}
                  label="I Agree to the terms and conditions."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(SubmitHandler)}
              disabled={!agree}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
        //   <>
        //     {success?(
        //     <div>
        //       {alert("Register Successful")}
        //     <h2>Success</h2>
        //     <Link to='/signin'> Click here to login</Link>
        //     </div> 

        //     ):(
        //         <div className='m-2'>
        //             <form   noValidate >
        //         <Container style={{width:'60%'}}>
        //         <div className="bg-primary rounded mb-3 m-2 p-2 px-3">
        //             <header className='text-white'>User Signup</header>
        //         </div>
        //         <Card className="shadow p-3 mb-5 bg-body-tertiary rounded text-dark " style={{backgroundColor:'white'}}>
        //             <Col className="m-3 mt-3 col" >
        //                 <Row className="mb-2" >
        //                     <Col>
        //                         <Form.Label>First Name</Form.Label>
        //                         <Form.Control type="text" {...register('firstName',{
        //                           required:'missing first name'
        //                         })} ></Form.Control>
        //                     </Col>
        //                     <Col>
        //                         <Form.Label>Last Name</Form.Label>
        //                         <Form.Control type="text" {...register('lastName',{
        //                           required:'missing last name'
        //                         })} ></Form.Control>
        //                     </Col>
        //                 </Row>
        //                 <Row className="mb-2" >
        //                     <Col>
        //                         <Form.Label>Username</Form.Label>
        //                         <Form.Control type="text" {...register('username',{
        //                           required:'missing username'
        //                         })} ></Form.Control>
        //                     </Col>
        //                     <Col>
        //                         <Form.Label>Email ID</Form.Label>
        //                         <Form.Control type="email" {...register('emailId',{
        //                           pattern:{
        //                             value:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        //                             message:"Invalid Email"
        //                           }
        //                         })} ></Form.Control>
        //                     </Col>
        //                 </Row>
        //                 <Row className="mb-2" >
        //                     <Col>
        //                         <Form.Label>Password</Form.Label>
        //                         <Form.Control type="password" {...register('password',{
        //                 required:"missing password or Invalid"
        //               })}></Form.Control>
        //                     </Col>
        //                     <Col>
        //                         <Form.Label>Re-Enter Password</Form.Label>
        //                         <Form.Control type="password" ></Form.Control>
        //                     </Col>
                            
        //                 </Row>
        //                 <Row className="mb-2" >
        //                 <Col>
        //                         <Form.Label>State</Form.Label>
        //                         <Form.Control type="text" {...register('state',{
        //                   required:'missing state or invalid'
        //                 })} ></Form.Control>
        //                     </Col>
                            
        //                     <Col>
        //                         <Form.Label>Mandal</Form.Label>
        //                         <Form.Control type="text" {...register('mandal',{
        //                   required:'missing mandal or invalid'
        //                 })} ></Form.Control>
        //                     </Col>
        //                 <Row className='mb-2'>
        //                 <Col>
        //                         <Form.Label>City</Form.Label>
        //                         <Form.Control type="text" {...register('city',{
        //                   required:'missing city or invalid'
        //                 })}></Form.Control>
        //                     </Col>

        //                     <Col>
        //                         <Form.Label>Contact Number</Form.Label>
        //                         <Form.Control type="text" {...register('contactNumber',{
        //                           maxLength:10,
        //                           required:"missing Phonenumber or invalid"
        //                     })} ></Form.Control>
        //                     </Col>

        //                 </Row>

                            

        //                 </Row>
        //                 <Row className="mb-2" >
        //                     <Col>
        //                         <Form.Label>AreaName</Form.Label>
        //                         <Form.Control type="text" {...register('areaName',{
        //                   required:"missing AreaName or invalid"
        //                 })}></Form.Control>
        //                     </Col><Col>
        //                         <Form.Label>Address</Form.Label>
        //                         <Form.Control type="text" {...register('address',{
        //                           maxLength:10,
        //                           required:"missing address or invalid"
        //                 })} ></Form.Control>
        //                     </Col>

        //                 </Row>
        //                 <Row className="mb-2" >
        //                     <Col>
        //                         <Form.Label>Latitude</Form.Label>
        //                         <Form.Control type="text" {...register('latitude',{
        //                 required:"Invalid number"
        //               })} ></Form.Control>
        //                     </Col>
        //                     <Col>
        //                         <Form.Label>Longitude</Form.Label>
        //                         <Form.Control type="text" {...register('longitude',{
        //                                 required:"Invalid number"
        //                             })} ></Form.Control>
        //                     </Col>

        //                 </Row>
        //                 <Row className='mb-2'>
        //                     <Col md={6}>
        //                             <Form.Label>Pincode</Form.Label>
        //                             <Form.Control type="text" {...register('pincode',{
        //                             required:"missing or invalid postalcode"
        //                     })} ></Form.Control>
        //                         </Col>
        //                 </Row><br/>

        //                 <div style={{textAlign:'center'}}>
        //                     <input type="checkbox" id="agree" onChange={checkboxHandler} />
        //                     <label htmlFor="agree" > I agree to <a  href='#' style={{fontWeight:'bold',color:'blue',textDecoration:'none'}} className='text-primary'>terms and conditions</a></label>
        //                 </div>
        //                 <Row className="mb-2" >
        //                     <Col md={4}>
                                
        //                     </Col>
        //                     <Col md={4}>
        //                     </Col>
        //                     <Col md={4} className="d-flex flex-row-reverse mt-4">
        //                         <Col>
        //                             <Button  variant='danger'onClick={()=>navigate('/userMyBatteries')} className="feather icon-x"> Cancle</Button>
        //                         </Col>
        //                         <Col>
        //                             <Button variant='primary' disabled={!agree} onClick={handleSubmit(SubmitHandler)} ><i className="fa fa-edit"> Submit</i> </Button>
        //                         </Col>    
                            
        //                     </Col>
        //                 </Row>
        //             </Col>
        //         </Card>
        //     </Container> 
        // </form>
        // </div> 
            
            
        //     )} 
        //     </>
        )
    }   

            
export default SignUp1;