import { Table,TableRow,TableBody, TableCell,TableHead, TextField,Link,FormControl,Select,InputLabel, MenuItem,FormHelperText, Button ,Box, RadioGroup} from "@mui/material";
import {Input,Typography} from '@mui/joy';
import { GetToken } from "./Api/auth";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';



const authToken = GetToken();

const url = "http://avasol.ameyalabs.com:5000/get-se-details";
const userName = localStorage.getItem('username');




function SE_MyProfile(){
  const [user_Details,setUserDetails] = useState([]);
  const navigate = useNavigate();
  const data = {
    username : 'setest'
  }
  useEffect (() =>{ async function fetchDetails(){
    const response = await fetch(url,{
        method : 'POST',
        headers : {
            'Authorization' : `Bearer ${authToken}`,
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        },
        body : JSON.stringify(data)
    }).then((response) => response.json())
    .then((user_Details) =>{
      setUserDetails(user_Details);
      console.log(user_Details);
        
    })
  }
  fetchDetails();
},[])


  return ( 
    <>
    { user_Details.length < 1 ?"NO user Found": 
    <Table sx={{ bgcolor: '#ffff', borderCollapse: 'separate', borderSpacing: '0 5px' }}>
      <TableHead sx={{bgcolor:'#0275d8 '}}>
        <TableCell colSpan={4}sx={{fontSize:'24px',alignContent:'center'}}><ModeEditIcon /> My Profile</TableCell>
      </TableHead>
      <TableBody >
        <TableRow>
            <TableCell colSpan={4} sx={{fontSize : '22px' , fontWeight:'600'}}>Personal Info </TableCell>
        </TableRow>
        <TableRow>
            <TableCell colSpan={4} sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%',border:'none'}}>Profile Photo</Typography> 
                <Box sx={{width:120,height:120,border:'1px solid black',ml:'120px'}}>
            <Box
      sx={{
        width: 100,
        height: 100,
        ml:'10px',
        mt:'10px',
        backgroundColor: '#D3D3D3',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    ><Typography sx={{textAlign:'center'}}>No+image</Typography></Box>
    </Box>
            </TableCell>
     </TableRow>
        <TableRow >
          
          <TableCell sx={{ border: 'none', '& > *': { margin: '0' } }}><Typography sx={{fontSize:'22px', fontWeight:'400',width:'50%'}}>First Name </Typography></TableCell>
          <TableCell sx={{ border: 'none', '& > *': { margin: '0' } }}> <Input placeholder="Type in here…" value={user_Details.firstName} size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{ border: 'none', '& > *': { margin: '0' } }}><Typography sx={{fontSize:'22px', fontWeight:'400',width:'50%'}}>Last Name</Typography></TableCell>
          <TableCell sx={{ border: 'none', '& > *': { margin: '0' } }}><Input placeholder="Type in here…"  value={user_Details.lastName} variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'400',width:'50%'}}>Contact Number </Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input placeholder="Type in here…" value={user_Details.contactNumber} variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'400',width:'50%'}}>Email Id </Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input placeholder="Type in here…" value={user_Details.emailId} variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
        
        </TableRow>

        <TableRow >
          
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'400',width:'50%'}}>Service Area </Typography></TableCell>
          <TableCell sx={{border : 'none'}} > <Input placeholder="Type in here…" value={user_Details.serviceArea} size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'400',width:'50%'}}>Training Completed</Typography></TableCell>
          <TableCell sx={{border : 'none'}}>
            <FormControl>
              <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              >
                <FormControlLabel value="yes" defaultValue ="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
            </FormControl>
          </TableCell>

        </TableRow>

        <TableRow>
            <TableCell colSpan={4} sx={{fontSize : '28px' , fontWeight:'600'}}>Address </TableCell>
        </TableRow>

        

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Address 1 </Typography></TableCell>
          <TableCell sx={{border : 'none'}}> 
          <TextField
          multiline
          rows={3}
          sx={{width : '80%',bgcolor:'ecf9fe'}}
          placeholder="Enter your address here"/></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Address 2</Typography></TableCell>
          <TableCell sx={{border : 'none'}}>
          <TextField
          multiline
          rows={3}
          sx={{width : '80%',bgcolor:'ecf9fe'}}
          placeholder="Enter your address here"/>
          </TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>State</Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input placeholder="Type in here…" size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>District</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input placeholder="Type in here…" variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
        </TableRow>
        
        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Area </Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input placeholder="Type in here…" size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Postal Code </Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input placeholder="Type in here…" variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
        </TableRow>

        <TableRow>
            <TableCell colSpan={4} sx={{fontSize : '28px' , fontWeight:'600'}}>Bank Details</TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Account Holder Name </Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input placeholder="Type in here…" size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Account # </Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input placeholder="Type in here…" value={user_Details.bankAccountNo} variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Bank Name </Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input placeholder="Type in here…" value={user_Details.bankName} size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>IFSC Code </Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input placeholder="Type in here…" value={user_Details.ifsc} variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
        </TableRow>
      <Box display='flex' justifyContent='space-between' size='large' sx={{mb:'100px',mt:'50px'}}>
        <Button variant="contained" sx={{ml:'190%',fontSize:'22px',minWidth:'100px'}} onClick={() => navigate(-1)} >
          Cancel
        </Button>
        <Button variant="contained" color="success" sx={{ml:'30px',fontSize:'22px',minWidth:'100px'}}>
             Submit
        </Button>
        </Box>

      </TableBody>
    </Table>
}
    </>)
}

export default SE_MyProfile;