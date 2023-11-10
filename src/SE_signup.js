import React,{useState} from 'react';
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
import { useForm } from 'react-hook-form';
import SERVER_URL from './Server/Server';
import { useNavigate } from 'react-router-dom';
import { Label } from 'recharts';





function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SE_signUp() {
    const navigate=useNavigate()
    const {
        register,
        handleSubmit,
        formState : {errors},
    } = useForm(
      {
        defaultValues:{
          address1:"",
          address2:"",
          approvedBy: "",
            approvedDate: "",
            bankAccountNo: "",
            bankName: "",
            branchName: "",
            contactNumber:"",
            district:"",
            emailId: "",
            firstName: "",
            govtPhotoId:"",
            ifsc: "",
            lastName: "",
            password: "",
            performance: "",
            photoFile:"",
            postalCode:"",
            serviceArea: "",
            state:"",
            status:"",
            trainingDetails: "",
            username:"",
        }
      }
    );

  const Submit = async(RegisterData) => {
    console.log(RegisterData);
    const response=await fetch(`${SERVER_URL}se/signup`,{
        method:'POST',
        headers:{ 
            'Content-Type':'application/json',
        },
        body : JSON.stringify(RegisterData),

    })
    if(response.ok){
      const result=response.json()
      alert('Service Engineer registered successful..!')
      navigate('/signin')
    }

    
    /*event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    */
  };

  const [agree,setAgree]=useState(false)
  const checkboxHandler=()=>{
      setAgree(!agree)
  }

  return (
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(Submit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
              <Grid item xs={12} sm={6} >
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


              <Grid item xs={12} sm={6} >
                <TextField
                 {...register('postalCode', {
                    required: 'pincode Name is required',
                  })}
                  required
                  fullWidth
                  name="postalCode"
                  label="Pincode"
                  type="text"
                  id="postalCode"
                  autoComplete="postalCode"
                  error = {!!errors.postalCode}
                  helperText = {errors.postalCode?.message}
                />
              </Grid>
              
              <Grid item xs={12} sm={6} >
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

              <Grid item xs={12} sm={6} >
                <TextField
                 {...register('emailId', {
                    required: 'Email Id is required',
                  })}
                  required
                  fullWidth
                  id="emailId"
                  type='email'
                  label="Email Address"
                  name="emailId"
                  autoComplete="emailId"
                  error={!!errors.emailId}
                  helperText = {errors.emailId?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                 {...register('password', {
                    required: 'password is required',
                  })}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error = {!!errors.password}
                  helperText = {errors.password?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                 {...register('state', {
                    required: 'password is required',
                  })}
                  required
                  fullWidth
                  name="state"
                  label="State"
                  type="text"
                  id="state"
                  autoComplete="state"
                  error = {!!errors.state}
                  helperText = {errors.state?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                 {...register('district', {
                    required: 'district is required',
                  })}
                  required
                  fullWidth
                  name="district"
                  label="District"
                  type="text"
                  id="district"
                  autoComplete="district"
                  error = {!!errors.district}
                  helperText = {errors.district?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                 {...register('address1', {
                    required: 'address1 is required',
                  })}
                  required
                  fullWidth
                  name="address1"
                  label="Address1"
                  type="text"
                  id="address1"
                  autoComplete="address1"
                  error = {!!errors.address1}
                  helperText = {errors.address1?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                 {...register('address2', {
                    required: 'address2 is required',
                  })}
                  required
                  fullWidth
                  name="address2"
                  label="Address2"
                  type="text"
                  id="address2"
                  autoComplete="address2"
                  error = {!!errors.address2}
                  helperText = {errors.address2?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                 {...register('serviceArea', {
                    required: 'serviceArea is required',
                  })}
                  required
                  fullWidth
                  name="serviceArea"
                  label="Service Area"
                  type="text"
                  id="serviceArea"
                  autoComplete="serviceArea"
                  error = {!!errors.serviceArea}
                  helperText = {errors.serviceArea?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <label className='mb-3'>Upload Photo</label>
                <TextField
                 {...register('photoFile', {
                    required: 'photoFile is required',
                  })}
                  required
                  fullWidth
                  name="photoFile"
                  // label="Upload Photo"
                  type="file"
                  id="photoFile"
                  autoComplete="photoFile"
                  error = {!!errors.photoFile}
                  helperText = {errors.photoFile?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label className='mb-3'>Govt Photo ID</label>
                <TextField
                 {...register('govtPhotoId', {
                    required: 'govtPhotoId is required',
                  })}
                  required
                  fullWidth
                  name="govtPhotoId"
                  // label="GovtPhoto ID"
                  type="file"
                  id="govtPhotoId"
                  autoComplete="govtPhotoId"
                  error = {!!errors.govtPhotoId}
                  helperText = {errors.govtPhotoId?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                 {...register('bankName', {
                    required: 'bankName is required',
                  })}
                  required
                  fullWidth
                  name="Bank Name"
                  label="bankName"
                  type="text"
                  id="bankName"
                  autoComplete="bankName"
                  error = {!!errors.bankName}
                  helperText = {errors.bankName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                 {...register('branchName', {
                    required: 'branchName is required',
                  })}
                  required
                  fullWidth
                  name="branchName"
                  label="Branch Name"
                  type="text"
                  id="branchName"
                  autoComplete="branchName"
                  error = {!!errors.branchName}
                  helperText = {errors.branchName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                 {...register('ifsc', {
                    required: 'ifsc is required',
                  })}
                  required
                  fullWidth
                  name="ifsc"
                  label="IFSC Code "
                  type="text"
                  id="ifsc"
                  autoComplete="ifsc"
                  error = {!!errors.ifsc}
                  helperText = {errors.ifsc?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                 {...register('bankAccountNo', {
                    required: 'bankAccountNo is required',
                  })}
                  required
                  fullWidth
                  name="bankAccountNo"
                  label="Bank AccountNo"
                  type="text"
                  id="bankAccountNo"
                  autoComplete="bankAccountNo"
                  error = {!!errors.bankAccountNo}
                  helperText = {errors.bankAccountNo?.message}
                />
              </Grid>

              
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary"  onChange={checkboxHandler} />}
                  label="I Agree to the terms and conditions."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}