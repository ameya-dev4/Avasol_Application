import {Grid , Box,Typography,TextField} from '@mui/material';

function FormField({ label, name, value, onChange ,changeType=true}) {
    return (
      <>
        <Grid item xs={12} sm={6}>
          <Box>
          <Typography variant='h6' sx={{color:'black' , mb:2,ml:3}}>{label}</Typography>
          <TextField
          type="text"
          variant='outlined'
          name={name}
          value={value}
          onChange={onChange}
          fullWidth
          sx={{width:'80%',ml:3,fontSize:'12',fontWeight:'500',}}
          InputProps={{
            readOnly:{changeType}, // Set this to true to make the TextField read-only
          }}
          // disabled={disabled}
          // Add any additional attributes or styling here
        />
        </Box>
        </Grid>
     
      </>
  
      
    );
  }

  export default FormField;