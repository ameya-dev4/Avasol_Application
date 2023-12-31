
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

async function fetchUserDetails(item) {
  const data = {
    username: item.username,
  };
  const response = await fetch(`${SERVER_URL}admin/get-user`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

async function fetchDataAndEnhanceArray(array_Details) {
  const enhancedArray = await Promise.all(
    array_Details.map(async (item) => {
      const outPut_value = await fetchUserDetails(item);
      return { ...item, customerDetails: outPut_value };
    })
  );
  return enhancedArray;
}

function Table_Tickets({ array_Details }) {
  const navigate = useNavigate();
  const [enhancedArray, setEnhancedArray] = useState([]);
  const [record_status, setRecord_status]=useState([])

  useEffect(() => {
    async function fetchData() {
      const result = await fetchDataAndEnhanceArray(array_Details);
      setEnhancedArray(result);
    }
    fetchData();
  }, [array_Details]);

  const handleTicketClick = (record) => {
    localStorage.setItem('display_details', JSON.stringify(record));
    navigate('/update_ticket_details', { state: { ticketId: record.requestId } });
  };


  const Row = ({ record }) => {
    setRecord_status(record)
    return (
      <>
        <TableRow>
          <TableCell style={{ fontSize: '18px' }}>{record.requestId}</TableCell>
          <TableCell style={{ fontSize: '18px' }}>
            <Link style={{ textDecoration: 'None', cursor: 'pointer' }} onClick={() => handleTicketClick(record)}>{record.shortDescription}</Link>
          </TableCell>
          <TableCell style={{ fontSize: '18px' }}>{record.username}</TableCell>
          <TableCell style={{ fontSize: '18px' }}>
            {record.customerDetails ? record.customerDetails.contactNumber : 'N/A'}
          </TableCell>
          <TableCell style={{ fontSize: '18px' }}>{record.openDate.slice(0, 10)}</TableCell>
          <TableCell style={{ fontSize: '18px' }}>
            {record.customerDetails ? record.customerDetails.city : 'N/A'}
          </TableCell>
          {record.status === 2 && (
            <TableCell style={{ fontSize: '18px' }}>{record.serviceEngineerId}</TableCell>
          )}
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
            {record_status.status === 2 && (<TableCell><h4 className='text-dark'>ServiceEngineer ID</h4></TableCell>)}
          </TableRow>
          <TableBody>
            {enhancedArray.map((record) => (
              <Row key={record.id} record={record} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Table_Tickets;
