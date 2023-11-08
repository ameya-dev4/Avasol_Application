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
import TicketPage from './TicketPage';
import SERVER_URL from './Server/Server';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import DeleteConfirm from './DeleteConfirm';


const authToken = GetToken();

// async function fetchDataAndEnhanceArray({array_Details}){
//   const enhancedArray = await Promise.all(
//     array_Details.map(async (item) => {
//       const data = {
//         username : item.username,
//       }
//       const response = await fetch(`${SERVER_URL}user/get-battery-list`,{
//         method : 'GET',
//         headers : {
//           'Authorization' : `Bearer ${authToken}`,
//           'Content-Type' : 'application/json',
//         },
//         // body:JSON.stringify(data),
//       })
//       const outPut_value = await response.json();
//       console.log(outPut_value);
      
//       return { ...item, customerDetails: outPut_value };
//     })
//   )
//   return enhancedArray ; 
// }

function Table_Batteries({array_Details}){  
  const navigate = useNavigate();
  const [enhancedArray, setEnhancedArray ] = useState([]);




  // useEffect(() => {fetchDataAndEnhanceArray({array_Details : array_Details }).then((result) => {
  //   setEnhancedArray(result);
  // });
  // },[])
        
  
   const Row = ({ record }) => {
        const [showDetails, setShowDetails] = useState(false);
      
        const toggleDetails = () => {

          setShowDetails(!showDetails);
        };
        const handleTicketClick = ({record}) => {
          console.log(record)
          localStorage.setItem('display_details',record);
          navigate('/update_battery',{state:{batteryId:record}});
        };
        
        const handleDelete = (input_value) =>{
            setIsDeleteConfirmOpen(false)
            let batteryInfo;
            let batteryId = input_value;
            for(let i=0; i<array_Details.length ; i++){
              if(batteryId === array_Details[i].batteryId){
                 batteryInfo = array_Details[i]
                 var batteryName=batteryInfo.batteryName
                array_Details.pop(batteryInfo);
              }
        
            }
            
        console.log("batteryName",batteryName)
            fetch(`${SERVER_URL}user/delete-battery`,{
              method : "DELETE",
              headers : {
                'Authorization':`Bearer ${authToken}`,
                'Content-Type' : 'application/json',
              },
              body: JSON.stringify(batteryInfo),
            }).then(response => {
              if (response.ok) {
                toast.success(`${batteryName} deleted Successfully...!`, {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose:3000
                });
                setTimeout(() => {
                 window.location.reload()
                },4000);
                // console.log('DELETE request successful.');
                // alert("Deleted Succesfully")
                
                // Handle success or update the UI accordingly
              } else {
                console.error('DELETE request failed.');
                // Handle error or update the UI accordingly
              }
            })
            .catch(error => {
              console.error('Error occurred during DELETE request:', error);
              // Handle error or update the UI accordingly
            });
          }
        
          const FormatDate = (dateString)=>{
            const dateObject = new Date(dateString);
            const formattedDate = dateObject.toLocaleString("en-US",{
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              // timeZoneName: "short",
            });
            return formattedDate;
        
          }

        
          const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
        const deleteCancle = () => {
          setIsDeleteConfirmOpen(true);
        };
      
        const deleteCloseConfirmation = () => {
          setIsDeleteConfirmOpen(false);
        };

      
        return (
          <>
           <TableRow >
            <TableCell style={{fontSize:'18px'}}>{record.batteryName}</TableCell>
            <TableCell style={{fontSize:'18px'}}><Link style={{textDecoration : 'None',cursor:'pointer'}} onClick={() => handleTicketClick({record})} >{record.batteryId}</Link></TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.make}</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.model}</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.warranty}</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.status}</TableCell>
            <TableCell style={{fontSize:'18px'}}><Link style={{textDecoration : 'None',cursor:'pointer'}} onClick={deleteCancle} > Delete</Link></TableCell>

            </TableRow>
          
           {/* delete confirmation */}
           <DeleteConfirm
          open={isDeleteConfirmOpen}
          onClose={deleteCloseConfirmation}
          onConfirm={()=>handleDelete(record.batteryId)}
          />
                    
        </>);
    };
      
    return (
      <>
      
        <TableContainer component={Paper} sx={{m:3,bgcolor:'white',maxWidth:'97%',mt:3}}>
          <Table>
              <TableRow>
              <TableCell><h5>Battery Name</h5></TableCell>
                <TableCell><h5>Battery Number</h5></TableCell>
                <TableCell><h5>Battery Make </h5></TableCell>
                <TableCell><h5>Battery Model</h5></TableCell>
                <TableCell><h5>Warranty </h5></TableCell>
                <TableCell><h5>Status  </h5></TableCell>
                <TableCell><h5>Delete  </h5></TableCell>
              </TableRow>
            <TableBody>
              {array_Details.map((record) => (
              <Row key={record.id} record={record} />))}
            </TableBody>  
           </Table>
        </TableContainer>

        {/* Toast Notification */}
        <ToastContainer/>
        
          
        />
      
      </>
    );  

}
export default Table_Batteries;