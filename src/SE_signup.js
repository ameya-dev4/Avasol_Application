import  React,{useState} from 'react';
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
import { Card } from 'react-bootstrap';





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
  const [ data, setData] =useState(null)
  const [ error, setError] =useState(null)

    const {
        register,
        handleSubmit,
        formState : {errors},
    } = useForm(
      {
        defaultValues:{
          approvedBy: "",
            approvedDate: "",
            bankAccountNo: "",
            bankName: "",
            branchName: "",
            emailId: "",
            firstName: "",
            ifsc: "",
            lastName: "",
            password: "",
            performance: "",
            serviceArea: "",
            trainingDetails: "",
            username:"",
            contactNumber:"",
        }
      }
    );

  
    const Submit = async (RegisterData) => {
      try {
        const response = await fetch(`${SERVER_URL}se/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(RegisterData),
        });
  
        if (response.ok) {
          const results = await response.json();
          setData(results);
          console.log('fetching successful...!');
        } else {
          throw new Error('Failed to signup...!');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const [agree,setAgree]=useState(false)
    const checkboxHandler=()=>{
        setAgree(!agree)
    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Card className='shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
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
              <Grid item xs={12} >
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


              <Grid item xs={12} >
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
              
              <Grid item xs={12} >
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

              <Grid item xs={12} >
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
              <Grid item xs={12}>
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
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" onChange={checkboxHandler} />}
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
        </Card>
      </Container>
    </ThemeProvider>
  );
}