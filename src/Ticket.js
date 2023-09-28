import { Table,TableRow,TableBody, TableCell,TableHead, TextField,Link,FormControl,Select,InputLabel, MenuItem,FormHelperText, Button ,Box} from "@mui/material";
import {Input,Typography} from '@mui/joy';
import { GetToken } from "./Api/auth";
import { useEffect,useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminDash_upblock from "./AdminDash_upblock";
import Header from "./Header";
import Admin_sidebar from "./Admin_sidebar";
import { Container } from "react-bootstrap";
import SERVER_URL from "./Server/Server";


const authToken = GetToken();

const userName = localStorage.getItem('username');

//const locationUrl = `https://google.com/maps?q=${lat},${long}`





function Ticket(){
  const [status, setStatus] = useState('');
  const [payinfo , setPayinfo] = useState('');
  const [value,setValue] = useState('');
  const [amount,setAmount] = useState('');
  const [attendedDate, setAttendedDate] = useState('');
  const [otp, setOtp] = useState(0);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  

  const navigate = useNavigate();
  const location = useLocation();
  const details = location.state.updateArray
  console.log(location.state.updateArray);
  const batteryDetails = details.batteryId

  const lat = details.customerDetails.latitude;
  const long = details.customerDetails.longitude;

  const locationUrl = `https://google.com/maps?q=${lat},${long}`;
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const data = {
    username : userName
  }

  

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

function hanldeOtp(e){
  setOtp(e.target.value);
}

const requestData = {
  requestId:details.requestId,
  //serviceDate:attendedDate,
  batteryId : details.batteryId,
  status:status,
  serviceEngineerId:userName,
  serviceEngineerNotes : details.serviceEngineerNotes,
  paymentRequest:payinfo,
  amount  : amount,
  username : details.customerDetails.username,
  transactionId:payinfo,
  shortDescription:details.shortDescription,
  serviceEngineerId : details.serviceEngineerId,
  selfDeclaration: true,
  assignedBy:"assignedBy",
  assignedDate : details.assignedDate,
  attendedDate : attendedDate,
  noteToServiceEngineer : details.noteToServiceEngineer,
  openDate: details.openDate,
  otpId : Number(otp),
  payerId: "payerId",

}

function handleSubmit(){
  fetch(`${SERVER_URL}admin/update-ticket`,{
    method:'PUT',
    headers : {
      'Authorization':`Bearer ${authToken}`,
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(requestData),
  }).then((response) => response.json())
  .then((data)=> {
    console.log(data);
    navigate(-1)
  })
  .catch((error) => {
    console.log(error);
  })
}
  return (
    <>
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className="main-container">
      <AdminDash_upblock />
    <Table sx={{bgcolor:'#ffff',borderCollapse: 'separate',borderSpacing : '0 0 50px 200px',mt:10 , border:'solid black 1px'}}>
    <Table sx={{bgcolor:'#ffff',borderCollapse: 'separate',borderSpacing : '0 0 50px 200px'}}>
      <TableHead sx={{bgcolor:'#0275d8 '}}>
        <TableCell colSpan={4} rowSpan={4} sx={{fontSize:'24px',alignContent:'center'}}>Update Ticket Details</TableCell>
      </TableHead>
      </Table >
      <Table sx={{bgcolor:'#ffff',width:'90%'}}>
      <TableBody  sx={{mt:10}}>
        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%'}} >Ticket Id</Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input  value={details.requestId} size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%'}}>Battery Number</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input value={details.batteryId} variant="soft" size="lg" placeholder="Battery Number"style={{padding:'10', width: '80%'}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%'}}>Battery Make</Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input placeholder="Type in here…" size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" onChange={handleChange}/></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%'}}>Battery Model</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input placeholder="Type in here…" variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%'}}>Battery Voltage</Typography></TableCell>
          <TableCell sx={{border : 'none'}} > <Input placeholder="Type in here…" size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%'}}>Battery Current</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input placeholder="Type in here…" variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%'}}>Assigned By </Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input value={details.assignedBy} size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%'}}>Assigned Date</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input value={details.assignedDate.slice(0,10) } variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%'}}>Ticket Description</Typography></TableCell>
          <TableCell sx={{border : 'none'}}> 
          <TextField
          multiline
          rows={3}
          sx={{width : '80%',bgcolor:'ecf9fe'}}
          value={details.shortDescription}/></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%'}}>Note to Service Engineer</Typography></TableCell>
          <TableCell sx={{border : 'none'}}>
          <TextField
          multiline
          rows={3}
          sx={{width : '80%',bgcolor:'ecf9fe'}}
          value={details.noteToServiceEngineer}/>
          </TableCell>
        </TableRow>
        
        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%'}}>Customer Name </Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input value={details.customerDetails.username} size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%'}}>Customer Contact Number</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input value={details.customerDetails.contactNumber} variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%'}}>Service Location </Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input value={details.customerDetails.city} size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%'}}><LocationOnIcon  style={{ fontSize: 60 }}/> Details</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Link sx={{fontSize : '24px' , cursor:'pointer'}}  href={`${locationUrl}`} target='_blank'>{details.customerDetails.address}</Link></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%'}}>Attended Date</Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input value={attendedDate} type="date" size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" onChange={handleDate}/></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%'}} >Service Engineer Notes</Typography></TableCell>
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
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%'}}> Status </Typography></TableCell>
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
          <MenuItem value={1}>InProgress</MenuItem>
          <MenuItem value={5}>Re Open</MenuItem>
          <MenuItem value={9}>Completed</MenuItem>
          <MenuItem value={14}>Closed</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
          </TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%'}}>Service Amount </Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input onChange={handleAmount}  value={amount} placeholder="Enter amount" variant="soft" size="lg" style={{padding:'10', width: '80%'}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%'}}> Payment </Typography></TableCell>
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
          <MenuItem value={1}>Raised</MenuItem>
          <MenuItem value={2}>Yet to be Paid</MenuItem>
          <MenuItem value={3}>Paid</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
          </TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'18px', fontWeight:'500',width:'50%'}}>Perf Otp</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input placeholder="Type in here…" variant="soft" size="lg" style={{padding:'10', width: '80%'}} onChange={hanldeOtp} value={otp}/></TableCell>
        </TableRow>
        <Box display='flex' justifyContent='space-between' size='large' sx={{mb:'100px',mt:'50px'}}>
        <Button variant="contained" sx={{ml:'190%',fontSize:'18px',minWidth:'100px'}} onClick={() => navigate(-1)} >
          Cancel
        </Button>
        <Button type="submit"  onClick={handleSubmit} variant="contained" color="success" sx={{ml:'30px',fontSize:'18px',minWidth:'100px'}}>
             Submit
        </Button>

        </Box>
        
      
      </TableBody>
    </Table>
    </Table>
    
    </main>
    </div>
    
    </>
  )
}

export default Ticket;