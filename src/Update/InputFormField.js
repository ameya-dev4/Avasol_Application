import {Grid , Box,Typography,TextField} from '@mui/material';

function FormField({ label, name, value, onChange,type='text',para_label}) {
    return (
      <>
        <Grid item xs={12} sm={6}>
          <Box>
          <Typography variant='h6' sx={{color:'black' , mb:2,ml:3}}>{label}</Typography>
          <TextField
          type={type}
          variant='outlined'
          name={name}
          value={value}
          onChange={onChange}
          fullWidth
          InputProps={{
            readOnly:true
          }}  
          sx={{width:'80%',ml:3,fontSize:'14',fontWeight:'500',backgroundColor:'#EFEFEF'}}
          // Add any additional attributes or styling here
        />
        <Typography sx={{color:'black' , mb:2,ml:3,fontSize:14}}>{para_label}</Typography>
        </Box>
        </Grid>
     
      </>
  
      
    );
  }

  export default FormField;