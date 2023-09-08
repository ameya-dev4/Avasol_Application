import React,{useState,useEffect} from 'react';
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
import { MenuItem ,FormControl,InputLabel} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useForm} from 'react-hook-form'
import {GetToken} from '../src/Api/auth'
import { useNavigate } from 'react-router-dom';
import UserGetDetails from './UserGetDetals';

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

export default function SignIn() {
  const form=useForm({
    defaultValues:{
        username:"",
        password:""
    }
});



const navigate=useNavigate();
// const [token,setToken]=useState(false);
const [err,setErr]=useState(false)
const access_token=GetToken();
const {register,handleSubmit,formState}=form;
const {errors}=formState;
const [showdetails,setDetails]=useState([])

const [loginType,setLoginType]=React.useState('user')
const handleChange = (event) => {
  setLoginType(event.target.value);
};
  
  
  const submitHandler = async(event) => {
    try {
      const response = await fetch('http://avasol.ameyalabs.com:5000/login', {
        method: 'POST',
        mode:'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
      if (response.ok) {
      //   setSuccess(true)
        const data = await response.json();
        const accessToken = data.access_token;
        const refreshToken=data.refresh_token;
        // console.log("Access Token",accessToken)
          
        // Store the access token in local storage
        document.cookie = `access_token=${accessToken}; path=/;`;
        document.cookie = `refresh_token=${refreshToken}; path=/;`;

        localStorage.setItem("username",JSON.stringify(event.username))
        localStorage.setItem('password',JSON.stringify(event.password))
        
      // alert("Register Successfull!...Welocome user")
            if(loginType==='user'){
              navigate('/latest_serv_request')
            }
            else if (loginType==='admin'){
              window.open('/admin_home','_blank')
            } 
            else{
              navigate('/service_engg')
            }
      
      } else {
        // Handle signup error here
        setErr(true)
       console.error('Signup failed:', response.statusText);
      }
    } catch (error) {
      // Handle any network errors
      console.error('Network error:', error);
    }
  //     const user_name=localStorage.getItem('username')
  //     const parse_username=JSON.parse(user_name)
  //     console.log("user",parse_username)
  //   const jsonData={
  //     username :parse_username,
  //   }

  // fetch("http://avasol.ameyalabs.com:5000/get-user-details",{
  //   method:'POST',
  //   mode:'no-cors',
  //   headers:{
  //     // 'Accept':'application/json',
  //     // 'Access-Control-Allow-Origin': '*',
  //     'Authorization':`Bearer ${access_token}`,
  //     'Content-Type':'application/json'
  //   },
  //   body:JSON.stringify(jsonData),

  // }) 
  // .then(response=>response.json())
  //   .then(data=>{
  //     console.log(data)
  //     localStorage.setItem('userdetails',JSON.stringify(data))
  //     setDetails(data)
      
  //   }).catch(error =>{
  //     console.error(error)
  //   })


  };

  
  return (

    <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs" style={{backgroundColor:'white',borderRadius:'5px'}}>
        <p style={{color:'red'}}>{ err?"signin  failed":"" }</p>
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
            <Typography component="h1" variant="h5" style={{color:'black'}}>
              {loginType==='admin'?'Admin':loginType==='user'?'User':'Service Engineer'}
            </Typography>
            <Box component="form" onSubmit={access_token===null?handleSubmit(submitHandler):()=>alert(`you are aleady logged in as ${loginType}`)} noValidate sx={{ mt: 1 }}>
                  <FormControl sx={{ width:'100%' }}>
              <InputLabel id="demo-simple-select-autowidth-label">Login As</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={loginType}
                onChange={handleChange}
                autoWidth
                label="LoginType"
              >
  
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="serviceEngg">Service Engineer</MenuItem>

              </Select >
            </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register('username',{
                  required:"missing username or invalid"
              })}
              />
              <p className='error'>{errors.username?.message}</p>

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password',{
                  required:"missing password or invalid"
              })}
              />
              <p className='error'>{errors.password?.message}</p>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me" className='text-dark'
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
  );
}