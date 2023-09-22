import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Link, TableHead,   } from "@mui/material";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';
import { GetToken } from './Api/auth';
import TicketPage from './TicketPage';


const authToken = GetToken();

async function fetchDataAndEnhanceArray({array_Details}){
  const enhancedArray = await Promise.all(
    array_Details.map(async (item) => {
      const data = {
        username : item.username,
      }
      const response = await fetch('http://avasol.ameyalabs.com:5000/admin/get-user',{
        method : 'POST',
        headers : {
          'Authorization' : `Bearer ${authToken}`,
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(data)
      })
      const outPut_value = await response.json();
      
      return { ...item, customerDetails: outPut_value };
    })
  )
  return enhancedArray ; 
}

function Table_comp({array_Details}){  
  const navigate = useNavigate();
  const [enhancedArray, setEnhancedArray ] = useState([]);

  useEffect(() => {fetchDataAndEnhanceArray({array_Details : array_Details }).then((result) => {
    setEnhancedArray(result);
  });
  },[])
  console.log(enhancedArray);
   const Row = ({ record }) => {
        const [showDetails, setShowDetails] = useState(false);
      
        const toggleDetails = () => {

          setShowDetails(!showDetails);
        };
        const handleTicketClick = ({record}) => {
          console.log(record)
          localStorage.setItem('display_details',record);
          navigate('/update_ticket_details',{state:{updateArray:record}});
        };
        

        
      
        return (
          <>
           <TableRow >
            <TableCell style={{fontSize:'12px'}}>{record.requestId}</TableCell>
            <TableCell style={{fontSize:'12px'}}><Link style={{textDecoration : 'None',cursor:'pointer'}} onClick={() => handleTicketClick({record})} >{record.shortDescription}</Link></TableCell>
            <TableCell style={{fontSize:'12px'}}>{record.username}</TableCell>
            <TableCell style={{fontSize:'12px'}}>{record.customerDetails.contactNumber}</TableCell>
            <TableCell style={{fontSize:'12px'}}>{record.customerDetails.city}</TableCell>
            <TableCell style={{fontSize:'12px'}}>{record.serviceEngineerNotes}</TableCell>
            <TableCell style={{fontSize:'12px'}}>{record.status}</TableCell>

            </TableRow>
                    
        </>);
    };
      
    return (
      <>
      
        <TableContainer component={Paper} sx={{m:3,bgcolor:'white',maxWidth:'97%'}}>
          <Table>
            <>
              <TableRow>
                <TableCell><h2>Ticket</h2></TableCell>
                <TableCell><h2>Description</h2></TableCell>
                <TableCell><h2>Customer Name </h2></TableCell>
                <TableCell><h2>Mobile Number</h2></TableCell>
                <TableCell><h2>Location</h2></TableCell>
                <TableCell><h2>SE Notes </h2></TableCell>
                <TableCell><h2>Status</h2></TableCell>
              </TableRow>
            </>
            <TableBody>
              {enhancedArray.map((record) => (
              <Row key={record.id} record={record} />))}
            </TableBody>  
           </Table>
        </TableContainer>
      </>
    );  

}
export default Table_comp;
