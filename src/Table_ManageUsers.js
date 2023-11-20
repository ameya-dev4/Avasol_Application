// import React, { useState ,useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
// import {Link} from "@mui/material";
// import {
//   TableContainer,
//   Table,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
// } from '@mui/material';
// import { GetToken } from './Api/auth';
// import SERVER_URL from './Server/Server';


// const authToken = GetToken();

// async function fetchDataAndEnhanceArray({array_Details}){
//   const enhancedArray = await Promise.all(
//     array_Details.map(async (item) => {
//       const data = {
//         username : item.username,
//       }
//       const response = await fetch(`${SERVER_URL}admin/get-user`,{
//         method : 'POST',
//         headers : {
//           'Authorization' : `Bearer ${authToken}`,
//           'Content-Type' : 'application/json',
//         },
//         body:JSON.stringify(data),
//       })
//       const outPut_value = await response.json();
      
//       return { ...item, customerDetails: outPut_value };
//     })
//   )
//   return enhancedArray ; 
// }

// function Table_ManageUsers({array_Details}){  
//   const navigate = useNavigate();
//   const [enhancedArray, setEnhancedArray ] = useState([]);

 
//   useEffect(() => {fetchDataAndEnhanceArray({array_Details : array_Details }).then((result) => {
//     setEnhancedArray(result);
//   });
//   },[])
//    const Row = ({ record}) => {
//         const [showDetails, setShowDetails] = useState(false);
        
      
//         const toggleDetails = () => {

//           setShowDetails(!showDetails);
//         };
//         const handleTicketClick = ({record}) => {
//           navigate('/update_ticket_details',{state:{ticketId:record.requestId}});
//         };

      


        

        
      
//         return (
//           <>
//            <TableRow >
//             <TableCell style={{fontSize:'18px'}}>{record.firstName}</TableCell>
//             <TableCell style={{fontSize:'18px'}}><Link style={{textDecoration : 'None',cursor:'pointer'}} onClick={() => handleTicketClick({record})} >{record.lastName}</Link></TableCell>
//             <TableCell style={{fontSize:'18px'}}>{record.username}</TableCell>
//             <TableCell style={{fontSize:'18px'}}>{record.address}</TableCell>
//             <TableCell style={{fontSize:'18px'}}>{record.contactNumber}</TableCell>
//             <TableCell style={{fontSize:'18px'}}>{record.status}</TableCell>
            

//             </TableRow>
                    
//         </>);
//     };

       
//     return (
//       <>
      
//         <TableContainer component={Paper} sx={{m:1,bgcolor:'white',maxWidth:'99%',mt:10}}>
//           <Table>
//               <TableRow>
//                 <TableCell><h4>First Name</h4></TableCell>
//                 <TableCell><h4>Last Name</h4></TableCell>
//                 <TableCell><h4>Customer Name </h4></TableCell>
//                 <TableCell><h4>Address</h4></TableCell>
//                 <TableCell><h4>Contact Number</h4></TableCell>
//                 <TableCell><h4>Status</h4></TableCell>
//               </TableRow>
//             <TableBody>
//               {enhancedArray.map((record) => (
//               <Row key={record.id} record={record} />))}
//             </TableBody>  
//            </Table>
//         </TableContainer>
//       </>
//     );  

// }
// export default Table_ManageUsers;

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
  Typography
} from '@mui/material';
import { GetToken } from './Api/auth';
import SERVER_URL from './Server/Server';

const authToken = GetToken();

async function fetchDataAndEnhanceArray({ array_Details }) {
  const enhancedArray = await Promise.all(
    array_Details.map(async (item) => {
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
      const outPut_value = await response.json();

      return { ...item, customerDetails: outPut_value };
    })
  );
  return enhancedArray;
}

function Table_ManageUsers({ array_Details }) {
  const navigate = useNavigate();
  const [enhancedArray, setEnhancedArray] = useState([]);

  useEffect(() => {
    console.log('Fetching data...');
    async function fetchData() {
      try {
        const data = await fetchDataAndEnhanceArray({ array_Details });
        setEnhancedArray(data);
        console.log('Data fetched successfully');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [array_Details]);

  const Row = ({ record }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
      setShowDetails(!showDetails);
    };

    const handleTicketClick = ({ record }) => {
      navigate('/ManageUser_details',{state:{username:record}});
    };

    

    return (
      <>
        <TableRow>
          <TableCell style={{ fontSize: '18px' }}>{record.firstName}</TableCell>
          <TableCell style={{ fontSize: '18px' }}>
            <Link style={{ textDecoration: 'None', cursor: 'pointer' }} onClick={() => handleTicketClick({ record })}>{record.lastName}</Link>
          </TableCell>
          <TableCell style={{ fontSize: '18px' }}>{record.username}</TableCell>
          <TableCell style={{ fontSize: '18px' }}>{record.address?record.address:'NA'}</TableCell>
          <TableCell style={{ fontSize: '18px' }}>{record.contactNumber}</TableCell>
          <TableCell style={{ fontSize: '18px' }}>{record.status}</TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <>
      <Typography  variant='h4' className='mx-3 mt-5'>Manage users</Typography>
      <TableContainer component={Paper} sx={{ m: 1, bgcolor: 'white', maxWidth: '99%', mt:3}}>
        <Table>
          <TableRow>
            <TableCell><h4>First Name</h4></TableCell>
            <TableCell><h4>Last Name</h4></TableCell>
            <TableCell><h4>Customer Name</h4></TableCell>
            <TableCell><h4>Address</h4></TableCell>
            <TableCell><h4>Contact Number</h4></TableCell>
            <TableCell><h4>Status</h4></TableCell>
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

export default Table_ManageUsers;

