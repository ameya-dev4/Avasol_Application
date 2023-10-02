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
// import TicketPage from './TicketPage';


// const authToken = GetToken();

// async function fetchDataAndEnhanceArray({array_Details}){
//   const enhancedArray = await Promise.all(
//     array_Details.map(async (item) => {
//       const data = {
//         username : item.username,
//       }
//       const response = await fetch('http://100.20.33.222:5000/admin/get-ticket-details',{
//         method : 'POST',
//         headers : {
//           'Authorization' : `Bearer ${authToken}`,
//           'Content-Type' : 'application/json',
//         },
//         body:JSON.stringify(data),
//       })
//       const outPut_value = await response.json();
//       console.log(outPut_value);
      
//       return { ...item, customerDetails: outPut_value };
//     })
//   )
//   return enhancedArray ; 
// }

// function Table_Tickets({array_Details}){  
//   const navigate = useNavigate();
//   const [enhancedArray, setEnhancedArray ] = useState([]);




//   useEffect(() => {fetchDataAndEnhanceArray({array_Details : array_Details }).then((result) => {
//     setEnhancedArray(result);
//   });
//   },[])
//   console.log(enhancedArray);
//    const Row = ({ record }) => {
//         const [showDetails, setShowDetails] = useState(false);
      
//         const toggleDetails = () => {

//           setShowDetails(!showDetails);
//         };
//         const handleTicketClick = ({record}) => {
//           console.log(record)
//           localStorage.setItem('display_details',record);
//           navigate('/update_ticket_details',{state:{ticketId:record.requestId}});
//         };
        

        
      
//         return (
//           <>
//            <TableRow >
//             <TableCell style={{fontSize:'18px'}}>{record.requestId}</TableCell>
//             <TableCell style={{fontSize:'18px'}}><Link style={{textDecoration : 'None',cursor:'pointer'}} onClick={() => handleTicketClick({record})} >{record.shortDescription}</Link></TableCell>
//             <TableCell style={{fontSize:'18px'}}>{record.username}</TableCell>
//             <TableCell style={{fontSize:'18px'}}>{record.customerDetails.contactNumber}</TableCell>
//             <TableCell style={{fontSize:'18px'}}>{record.openDate.slice(0,10)}</TableCell>
//             <TableCell style={{fontSize:'18px'}}>{record.customerDetails.city}</TableCell>
            

//             </TableRow>
                    
//         </>);
//     };
      
//     return (
//       <>
      
//         <TableContainer component={Paper} sx={{m:3,bgcolor:'white',maxWidth:'97%',mt:10}}>
//           <Table>
//               <TableRow>
//                 <TableCell><h5>ID</h5></TableCell>
//                 <TableCell><h5>Ticket Description</h5></TableCell>
//                 <TableCell><h5>Customer Name </h5></TableCell>
//                 <TableCell><h5>Contact Number</h5></TableCell>
//                 <TableCell><h5>Open Date</h5></TableCell>
//                 <TableCell><h5>Service Location </h5></TableCell>
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
// export default Table_Tickets;
import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from "@mui/material";
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

async function fetchDataAndEnhanceArray({array_Details}){
  
  const enhancedArray = await Promise.all(
    array_Details.map(async (item) => {
      const data = {
        username : item.username,
      }
      try {
        
        const response = await fetch(`${SERVER_URL}admin/get-user`,{
          method : 'POST',
          headers : {
            'Authorization' : `Bearer ${authToken}`,
            'Content-Type' : 'application/json',
          },
          body:JSON.stringify(data),
        })
        if(response.ok){
          const outPut_value = await response.json();
          console.log(outPut_value);
          return { ...item, customerDetails: outPut_value };
        }else{
          throw new Error('failed to fetch Ticket Details...!')
        }

      } catch (error) {
        console.error(error)
      }
      
    })
  )
  return enhancedArray ; 
}

function Table_Tickets({array_Details}){  
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
          navigate('/update_ticket_details',{state:{ticketId:record.requestId}});
        };
        

        
      
        return (
          <>
           <TableRow >
            <TableCell style={{fontSize:'18px'}}>{record.requestId}</TableCell>
            <TableCell style={{fontSize:'18px'}}><Link style={{textDecoration : 'None',cursor:'pointer'}} onClick={() => handleTicketClick({record})} >{record.shortDescription}</Link></TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.username}</TableCell>
            <TableCell style={{fontSize:'18px'}}>Contact Number</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.openDate.slice(0,10)}</TableCell>
            <TableCell style={{fontSize:'18px'}}>City</TableCell>
            </TableRow>
                    
        </>);
    };
      
    return (
      <>
      
        <TableContainer component={Paper} sx={{m:1,bgcolor:'white',maxWidth:'99%',mt:10}}>
          <Table>
              <TableRow>
                <TableCell><h4>ID</h4></TableCell>
                <TableCell><h4>Ticket Description</h4></TableCell>
                <TableCell><h4>Customer Name </h4></TableCell>
                <TableCell><h4>Contact Number</h4></TableCell>
                <TableCell><h4>Open Date</h4></TableCell>
                <TableCell><h4>Service Location </h4></TableCell>
              </TableRow>
            <TableBody>
              {enhancedArray.map((record) => (
              <Row key={record.id} record={record} />))}
            </TableBody>  
           </Table>
        </TableContainer>
      </>
    );  

}
export default Table_Tickets;






