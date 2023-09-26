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



const authToken = GetToken();


function SE_Table_comp({array_Details}){  
  const navigate = useNavigate();

   const Row = ({ record }) => {
        const [showDetails, setShowDetails] = useState(false);
      
        const toggleDetails = () => {

          setShowDetails(!showDetails);
        };
        const handleTicketClick = ({record}) => {
          console.log(record)
          localStorage.setItem('display_details',record);
          navigate('se/update-ticket-details',{state:{updateArray:record}});
        };
        

        
      
        return (
          <>
           <TableRow >
            <TableCell style={{fontSize:'18px'}}>{record.requestId}</TableCell>
            <TableCell style={{fontSize:'18px'}}><Link style={{textDecoration : 'None',cursor:'pointer'}} onClick={() => handleTicketClick({record})} >{record.shortDescription}</Link></TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.username}</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record}</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record}</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.serviceEngineerNotes}</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.status}</TableCell>

            </TableRow>
                    
        </>);
    };
      
    return (
      <>
      
        <TableContainer component={Paper} sx={{m:3,bgcolor:'white',maxWidth:'97%'}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><h2>Ticket</h2></TableCell>
                <TableCell><h2>Description</h2></TableCell>
                <TableCell><h2>Customer Name </h2></TableCell>
                <TableCell><h2>Mobile Number</h2></TableCell>
                <TableCell><h2>Location</h2></TableCell>
                <TableCell><h2>SE Notes </h2></TableCell>
                <TableCell><h2>Status</h2></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {array_Details.map((record) => (
              <Row key={record.id} record={record} />))}
            </TableBody>  
           </Table>
        </TableContainer>
      </>
    );  

}
export default SE_Table_comp;