import { Table,TableRow,TableBody, TableCell,TableHead, TextField,Link,FormControl,Select,InputLabel, MenuItem,FormHelperText, Button ,Box} from "@mui/material";
import {Input,Typography} from '@mui/joy';
import { GetToken } from "./Api/auth";
import { useEffect,useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SERVER_URL from "./Server/Server";
const authToken = GetToken();

const userName = localStorage.getItem('username');

//const locationUrl = `https://google.com/maps?q=${lat},${long}`
const display_details = localStorage.getItem('display_details');
console.log(display_details);




function SE_TicketPage(){
  const [status, setStatus] = useState('');
  const [payinfo , setPayinfo] = useState('');
  const [value,setValue] = useState('');
  const [amount,setAmount] = useState('');
  const [attendedDate, setAttendedDate] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const details = location.state.updateArray
  console.log(location.state.updateArray);
  const batteryDetails = details.batteryId

  const lat = details.customerDetails.latitude;
  const long = details.customerDetails.longitude;

  const locationUrl = `https://google.com/maps?q=${lat},${long}`

  const data = {
    username : userName
  }
  /*
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
    .then((array_Details) =>{
        TicketDetails = array_Details;
    })
  }
  fetchDetails();
},[])
console.log(TicketDetails);
*/
function handleDate(e){
  setAttendedDate(e.target.value)
}

function handleStatus(e){
  setStatus(e.target.value)
}

function handlePayment(e){
  setPayinfo(e.target.value);
}

function handleChange(e){
  setValue(e.target.value);
}

function handleAmount(e){
  setAmount(e.target.amount);
}

const requestData = {
  ticketId:details.requestId,
  //serviceDate:attendedDate,
  batteryId : details.batteryId,
  status:status,
  serviceEngineerId:userName,
  serviceEngineerNotes : details.serviceEngineerNotes,
  paymentRequest:payinfo,
 // serviceAmount : amount,
  username : details.customerDetails.username,
  

}

function handleSubmit(){
  fetch(`${SERVER_URL}update-service-request`,{
    method:'PUT',
    headers : {
      'Authorization':`Bearer ${authToken}`,
      'Content-Type' : 'application/json'
    }
  })
}
  return (
    <>
    <Table sx={{bgcolor:'#ffff',borderCollapse: 'separate',borderSpacing : '0 0 50px 200px'}}>
      <TableHead sx={{bgcolor:'#0275d8 '}}>
        <TableCell colSpan={4} rowSpan={5} sx={{fontSize:'24px',alignContent:'center'}}>Update Ticket Details</TableCell>
      </TableHead>
      <TableBody >
        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}} >Ticket Id</Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input  value={details.requestId} size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Battery Number</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input value={details.batteryId} variant="soft" size="lg" placeholder="Battery Number"style={{padding:'10', width: '80%'}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Battery Make</Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input placeholder="Type in here…" size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" onChange={handleChange}/></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Battery Model</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input placeholder="Type in here…" variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Battery Voltage</Typography></TableCell>
          <TableCell sx={{border : 'none'}} > <Input placeholder="Type in here…" size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Battery Current</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input placeholder="Type in here…" variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Assigned By </Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input value={details.assignedBy} size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Assigned Date</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input value={details.assignedDate } variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Ticket Description</Typography></TableCell>
          <TableCell sx={{border : 'none'}}> 
          <TextField
          multiline
          rows={3}
          sx={{width : '80%',bgcolor:'ecf9fe'}}
          value={details.shortDescription}/></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Note to Service Engineer</Typography></TableCell>
          <TableCell sx={{border : 'none'}}>
          <TextField
          multiline
          rows={3}
          sx={{width : '80%',bgcolor:'ecf9fe'}}
          value={details.noteToServiceEngineer}/>
          </TableCell>
        </TableRow>
        
        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Customer Name </Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input value={details.customerDetails.username} size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Customer Contact Number</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input value={details.customerDetails.contactNumber} variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Service Location </Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input value={details.customerDetails.city} size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}><LocationOnIcon  style={{ fontSize: 60 }}/> Details</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Link sx={{fontSize : '24px' , cursor:'pointer'}}  href={`${locationUrl}`} target='_blank'>{details.customerDetails.address}</Link></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Attended Date</Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input value={attendedDate} type="date" size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" onChange={handleDate}/></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}} >Service Engineer Notes</Typography></TableCell>
          <TableCell sx={{border : 'none'}}>
          <TextField
          multiline
          rows={3}
          sx={{width : '80%',bgcolor:'ecf9fe'}}
          value={value}
          placeholder="Enter Notes"
          onChange={handleChange}/>
          </TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}> Status </Typography></TableCell>
          <TableCell sx={{border : 'none'}}> 
          <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Status </InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={status}
          label="Status *"
          onChange={handleStatus}
          sx={{width:'200%'}}
        >
          <MenuItem value={'InProgress'}>InProgress</MenuItem>
          <MenuItem value={'Re Open'}>Re Open</MenuItem>
          <MenuItem value={'Completed'}>Completed</MenuItem>
          <MenuItem value={'Closed'}>Closed</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
          </TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Service Amount </Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input onChange={handleAmount}  value={amount} placeholder="Enter amount" variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}> Payment </Typography></TableCell>
          <TableCell sx={{border : 'none'}}> 
          <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Payment</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={payinfo}
          label="Payment *"
          onChange={handlePayment}
          sx={{width:'200%'}}
        >
          <MenuItem value={'Raised'}>Raised</MenuItem>
          <MenuItem value={'Yet to be Paid'}>Yet to be Paid</MenuItem>
          <MenuItem value={'Paid'}>Paid</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
          </TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%'}}>Perf Otp</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input placeholder="Type in here…" variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
        </TableRow>
        <Box display='flex' justifyContent='space-between' size='large' sx={{mb:'100px',mt:'50px'}}>
        <Button variant="contained" sx={{ml:'190%',fontSize:'22px',minWidth:'100px'}} onClick={() => navigate(-1)} >
          Cancel
        </Button>
        <Button type="submit"  onClick={handleSubmit} variant="contained" color="success" sx={{ml:'30px',fontSize:'22px',minWidth:'100px'}}>
             Submit
        </Button>

        </Box>
        
      
      </TableBody>
    </Table>
    
    </>
  )
}

export default SE_TicketPage;