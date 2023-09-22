import { Grid,Box,Typography,Select,MenuItem} from '@mui/material';

function DropDownField({ label,name, value ,options,onChange}) {
    return (
      <Grid item xs={12} sm={6} >
        <Box >
          <Typography variant="h6" sx={{color:'black',mb:2,ml:3}}>{label}</Typography>
              <Select
              variant="outlined"
              fullWidth
              name={name}
              onChange={onChange}
              margin="normal"
              sx={{width:'80%',ml:3}}
              value={value}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
                </Select>
        </Box>
      </Grid>
    );
  }

  export default DropDownField;