import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Link, Typography } from "@mui/material";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';





function Table_SE({array_Details}){  
  const navigate = useNavigate();
 
   const Row = ({ record }) => {
        const [showDetails, setShowDetails] = useState(false);
      
        const toggleDetails = () => {

          setShowDetails(!showDetails);
        };
        const handleTicketClick = ({record}) => {
          console.log(record)
          localStorage.setItem('display_details',record);
          //navigate('/update-se',{state:{updateArray:record}});
          navigate('/update_se', {state : {updateArray : record}})
        };
        
        
      
        return (
          <>
           <TableRow >
            
            <TableCell style={{fontSize:'18px'}}><Link style={{textDecoration : 'None',cursor:'pointer'}} onClick={() => handleTicketClick({record})} >{record.firstName}</Link></TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.contactNumber}</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.emailId}</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.GovtId}</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.serviceArea}</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.trainingDetails}</TableCell>

            </TableRow>
                    
        </>);
    };
      
    return (
      <>
      
        <TableContainer component={Paper} sx={{m:1,bgcolor:'white',maxWidth:'99%' , mt:3}}>
          <Table>
              <TableRow>
                <TableCell><h5>First Name   </h5> </TableCell>
                <TableCell><h5>Contact #    </h5> </TableCell>
                <TableCell><h5>Email Id     </h5> </TableCell>
                <TableCell><h5>Govt Id      </h5>  </TableCell>
                <TableCell><h5>Service Area </h5>  </TableCell>
                <TableCell><h5>Training ?   </h5> </TableCell>
              </TableRow>
            <TableBody>
              {array_Details.map((record) => (
              <Row key={record.id} record={record} />))}
            </TableBody>  
           </Table>
        </TableContainer>
      </>
    );  

}
export default Table_SE;