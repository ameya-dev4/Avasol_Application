
import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Link,Typography} from "@mui/material";
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

function DisplayBattery(){  
  const navigate = useNavigate();
  const [enhancedArray, setEnhancedArray ] = useState([]);
  const [latestRequests, setLatestRequests]=useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to make the GET request
    async function getLatestRequests() {
      try {
        const response = await fetch(`${SERVER_URL}user/latest-service-requests`,{
            method:"GET",
            headers:{
                'Content-Type':"application/json",
                "Authorization": "Bearer " + authToken,
            },
        });
        if(response.ok){
          const data = await response.json();
          setLatestRequests(data);
        }else{
          throw new Error('Failed to get service requests...!')
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching latest requests:', error);
      }
    }

    // Call the function to get and display the latest service requests on page load
    getLatestRequests();
  }, []);

   const Row = ({ record }) => {
        const [showDetails, setShowDetails] = useState(false);
      
        const toggleDetails = () => {

          setShowDetails(!showDetails);
        };
        const handleTicketClick = ({record}) => {
          console.log(record)
          localStorage.setItem('display_details',JSON.stringify(record));
          navigate('/update_latestServRequest',{state:{shortDescription:record}});
        };
        
        const handleDelete = (input_value) =>{
            let batteryInfo;
            let batteryId = input_value;
            for(let i=0; i<latestRequests.length ; i++){
              if(batteryId === latestRequests[i].batteryId){
                 batteryInfo = latestRequests[i]
                // latestRequests.pop(batteryInfo);
                latestRequests.splice(i, 1);
              }
        
            }
            
        
            fetch(`${SERVER_URL}user/delete-service-request`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(batteryInfo),
            })
              .then((response) => {
                if (response.ok) {
                  console.log('DELETE request successful.');
                  alert('Deleted Successfully');

                  // Remove the deleted item from enhancedArray
                  setEnhancedArray((prevArray) =>
                    prevArray.filter((item) => item.batteryId !== batteryId)
                  );

                  // Navigate or update UI as needed
                } else {
                  console.error('DELETE request failed.');
                  // Handle error or update the UI accordingly
                }
              })
              .catch((error) => {
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
              // hour: "numeric",
              // minute: "numeric",
              // second: "numeric",
              // timeZoneName: "short",
            });
            return formattedDate;
        
          }
      
          
      
        return (
          <>
          
           <TableRow >
            <TableCell style={{fontSize:'18px'}}><Link style={{textDecoration : 'None',cursor:'pointer'}} onClick={() => handleTicketClick({record})} >{record.shortDescription}</Link></TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.openDate?record.openDate.slice(0,10):'NA'}</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.assignedDate?record.assignedDate.slice(0,10):'NA'}</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.serviceLocation?record.serviceLocation:'NA'}</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.seFirstName?record.seFirstName:"NA"}</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.serviceEngineerNotes?record.serviceEngineerNotes:"NA"}</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.seContactNumb?record.seContactNumb:"NA"}</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.targetDate?record.targetDate.slice(0,10):"NA"}</TableCell>
            <TableCell style={{fontSize:'18px'}}>{record.status}</TableCell>
            {/* <TableCell style={{fontSize:'18px'}}><Link style={{textDecoration : 'None',cursor:'pointer'}} onClick={() => handleDelete(record.batteryId)} > Delete</Link></TableCell> */}

            </TableRow>
                    
        </>);
    };
      
    if (loading) {
      return <Typography>Loading...</Typography>;
    }
    return (
      latestRequests.length < 0 ?<Typography >No Recent Requests</Typography> : 
      <>
        <TableContainer component={Paper} sx={{bgcolor:'white',maxWidth:'100%',mt:3}}>
          <Table>
              <TableRow>
              <TableCell><h5>Description</h5></TableCell>
                <TableCell><h5>Open Date</h5></TableCell>
                <TableCell><h5>Assigned Date</h5></TableCell>
                <TableCell><h5>Service Location </h5></TableCell>
                <TableCell><h5>SE Name</h5></TableCell>
                <TableCell><h5>SE Notes</h5></TableCell>
                <TableCell><h5>SE Contact</h5></TableCell>
                <TableCell><h5>Target Service Date</h5></TableCell>
                <TableCell><h5>Status  </h5></TableCell>
              </TableRow>
            <TableBody>
              {latestRequests.map((record) => (
              <Row key={record.id} record={record} />))}
            </TableBody>  
           </Table>
        </TableContainer>
        
      </>

    );  

}
export default DisplayBattery;
