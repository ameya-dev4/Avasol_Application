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
import SERVER_URL from './Server/Server';
import { Card } from 'react-bootstrap';

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
        const response = await fetch(`${SERVER_URL}user/signup`, {
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
      <Card className='shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
        <CssBaseline />
        <Box
          sx={{
            marginTop:2,
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
        </Card>
      </Container>
      
    </ThemeProvider>
        )
    }   

            
export default SignUp1;