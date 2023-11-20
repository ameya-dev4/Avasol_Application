
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "@mui/material";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';
import { GetToken } from './Api/auth';
import SERVER_URL from './Server/Server';

const authToken = GetToken();
function Table_AllTickets({ array_Details }) {
  const navigate = useNavigate();
  const [record_status, setRecord_status]=useState([])

  const Row = ({ record }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
      setShowDetails(!showDetails);
    };

    const handleTicketClick = ({ record }) => {
    
      localStorage.setItem('Ticket_Record', JSON.stringify(record));
      navigate('/update_ticket_details', { state: { ticketId: record.requestId } });

    };

  

   
    return (
      <>
        <TableRow>
          <TableCell style={{ fontSize: '18px' }}>{record.requestId}</TableCell>
          <TableCell style={{ fontSize: '18px' }}>
            <Link style={{ textDecoration: 'None', cursor: 'pointer' }} onClick={() => handleTicketClick({ record })}>{record.shortDescription}</Link>
          </TableCell>
          <TableCell style={{ fontSize: '18px' }}>{record.username}</TableCell>
          <TableCell style={{ fontSize: '18px' }}>
            {record.userContactNumb?record.userContactNumb : 'NA'}
          </TableCell>
          <TableCell style={{ fontSize: '18px' }}>{record.openDate.slice(0, 10)}</TableCell>
          <TableCell style={{ fontSize: '18px' }}>
            {record.serviceLocation ? record.serviceLocation: 'NA'}
          </TableCell>
            <TableCell style={{ fontSize: '18px' }}>{record.serviceEngineerId?record.serviceEngineerId:"NA"}</TableCell>
            <TableCell style={{ fontSize: '18px' }}>{record.status}</TableCell>

        
        </TableRow>
      </>
    );
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ m: 1, bgcolor: 'white', maxWidth: '99%', mt: 5 }}>
        <Table>
          <TableRow>
            <TableCell><h4>ID</h4></TableCell>
            <TableCell><h4>Ticket Description</h4></TableCell>
            <TableCell><h4>Customer Name</h4></TableCell>
            <TableCell><h4>Contact Number</h4></TableCell>
            <TableCell><h4>Open Date</h4></TableCell>
            <TableCell><h4>Service Location</h4></TableCell>
            <TableCell><h4 >ServiceEngineer ID</h4></TableCell>
            <TableCell><h4 >Status</h4></TableCell>
           
          </TableRow>
          <TableBody>
            {array_Details.map((record) => (
              <Row key={record.id} record={record} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Table_AllTickets;
