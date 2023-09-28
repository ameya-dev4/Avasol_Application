import { Table,TableRow,TableBody, TableCell,TableHead, Button ,Box} from "@mui/material";
import {Input,Typography} from '@mui/joy';
import { GetToken } from "./Api/auth";
import { useState } from "react";

import { useLocation, useNavigate} from "react-router-dom";
import AdminDash_upblock from "./AdminDash_upblock";
import Header from "./Header";
import Admin_sidebar from "./Admin_sidebar";




const authToken = GetToken();

const userName = localStorage.getItem('username');

//const locationUrl = `https://google.com/maps?q=${lat},${long}`
const display_details = localStorage.getItem('display_details');
console.log(display_details);




function SeUpdate(){
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
  console.log(details)
  console.log(location.state.updateArray);
  const batteryDetails = details.batteryId

  
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



function handleSubmit(event){
    
  fetch('http://100.20.33.222:5000/admin/update-service-engineer',{
    method:'PUT',
    headers : {
      'Authorization':`Bearer ${authToken}`,
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(""),
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
        <TableCell colSpan={4} rowSpan={4} sx={{fontSize:'24px',alignContent:'center'}}>Update Service Engineer Details</TableCell>
      </TableHead>
      </Table >
      <Table sx={{bgcolor:'#ffff',width:'90%'}}>
      <TableBody  sx={{mt:10}}>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%',mr:0}} >First Name</Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input  value={details.firstName} size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'80%'}}>Last Name</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input value={details.lastName} variant="soft" size="lg" style={{padding:'10', width: '80%',ml:0}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%',mr:0}} >Contact #</Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input  value={details.contactNumber} size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'80%'}}>Email Id</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input value={details.emailId} variant="soft" size="lg" style={{padding:'10', width: '80%',ml:0}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%',mr:0}} >Enrolled Date </Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input  value={details.approvedDate.slice(0,10)} size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'80%'}}> Training </Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input value={details.trainingDetails.value} variant="soft" size="lg" style={{padding:'10', width: '80%',ml:0}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%',mr:0}} >Service Area</Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input  value={details.serviceArea} size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'80%'}}>Status</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input  variant="soft" size="lg" style={{padding:'10', width: '80%',ml:0}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%',mr:0}} >Address 1</Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input   size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'80%'}}>Address 2</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input  variant="soft" size="lg" style={{padding:'10', width: '80%',ml:0}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%',mr:0}} >District </Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input  size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'80%'}}>State</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input  variant="soft" size="lg" style={{padding:'10', width: '80%',ml:0}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%',mr:0}} >Performance</Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input  value={details.performance} size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'80%'}}>Reference</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input variant="soft" size="lg" style={{padding:'10', width: '80%',ml:0}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%',mr:0}} >Bank Name</Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input  value={details.bankName} size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'80%'}}>Branch Name</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input value={details.branchName} variant="soft" size="lg" style={{padding:'10', width: '80%',ml:0}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%',mr:0}} >Account Holder Name</Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input   size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'80%'}}>Bank A/C #</Typography></TableCell>
          <TableCell sx={{border : 'none'}}><Input value={details.bankAccountNo} variant="soft" size="lg" style={{padding:'10', width: '80%',ml:0}}/></TableCell>
        </TableRow>

        <TableRow >
          <TableCell sx={{border : 'none'}}><Typography sx={{fontSize:'22px', fontWeight:'500',width:'50%',mr:0}} >IFSC Code</Typography></TableCell>
          <TableCell sx={{border : 'none'}}> <Input  value={details.ifsc} size="lg" style={{padding:'10', width: '80%', ml:0 }} variant="soft" /></TableCell>
        </TableRow>


       
        <Box display='flex' justifyContent='space-between' size='large' sx={{mb:'100px',mt:'50px'}}>
        <Button variant="contained" sx={{ml:'190%',fontSize:'22px',minWidth:'150px'}} onClick={() => navigate(-1)} >
          Close
        </Button>
        <Button type="submit"  onClick={handleSubmit} variant="contained" color="success" sx={{ml:'30px',fontSize:'22px',minWidth:'150px'}}>
             Save Changes
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

export default SeUpdate;