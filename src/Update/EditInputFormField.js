import {Grid , Box,Typography,TextField} from '@mui/material';

function FormField({ label, name, value, onChange,type='text',placeholder}) {
    return (
      <>
        <Grid item xs={12} sm={6}>
          <Box>
          <Typography variant='h5' sx={{color:'black' , mb:2,ml:3}}>{label}</Typography>
          <TextField
          type={type}
          variant='outlined'
          name={name}
          value={value}
          onChange={onChange}
          fullWidth
          placeholder={placeholder}
          sx={{width:'80%',ml:3,fontSize:'14',fontWeight:'500'}}
          // Add any additional attributes or styling here
        />
        </Box>
        </Grid>
     
      </>
  
      
    );
  }

  export default FormField;