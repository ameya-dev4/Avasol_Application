
import Table_comp from "./Table_Componenet";
import Header from './Header'
import Sidebar from './Admin_sidebar'
import { useState ,useEffect} from "react";
import { GetToken } from "./Api/auth";
import { Box, Typography } from "@mui/material";
import { Card,Row } from "react-bootstrap";
import AdminDash_upblock from "./AdminDash_upblock";

const userName = localStorage.getItem('username');
console.log(userName);
const url = 'http://avasol.ameyalabs.com:5000/'


function AdminMyDashboard(){
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const [TicketDetails , setTicketDetails] = useState([]);
    //const {authToken} = useAuth();
    const authToken = GetToken();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  let data = {
    username :userName,
  }
  /*
  useEffect (()=> {
    async function fetchDetails(){
        const response = await fetch(url,{
            method : 'POST',
            headers : {
                'Authorization' : `Bearer ${authToken}`,
                'Content-type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
            body : JSON.stringify(data)
        }).then((response) => response.json())
        .then((array_Details) =>{
            setTicketDetails(array_Details);
            localStorage.setItem('DashboardTickets',array_Details);
        })
      }
      fetchDetails();
  },[]) 
  */
  
    return (
    <>
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className="main-container">
      <AdminDash_upblock />
      { TicketDetails && TicketDetails.length > 0 ? <Table_comp array_Details={TicketDetails} /> : 
      <Box>
        <Typography variant="h4" className="mx-3 mt-3">
          No Ticket Details
        </Typography>
        </Box>
    }
      
      </main>
    </div>
     </>
    )
}

export default AdminMyDashboard;

// import React,{useState} from 'react'
// import {Row,Col,Button, Card} from 'react-bootstrap'
// import AdminDash_upblock from './AdminDash_upblock'
// import Header from './Header'
// import Sidebar from './Sidebar'
// import Admin_sidebar from './Admin_sidebar'

// function AdminMyDashboard() {

//   const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle)
//   }

//   return (
//     <>
      
//     <div className='grid-container'>
//       <Header OpenSidebar={OpenSidebar}/>
//       <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
//       <main className="main-container">
//         <AdminDash_upblock/><br/><br/>
//         <div className='m-3'>
                // <Card >
                //     <Row className='bg-primary'>
                //         <p ><i className='fa fa-edit text-white'> Admin Dashboard</i></p>
                //     </Row>
                    
                // </Card>
//             </div>
//       </main> 
      
        
//     </div>

            
    
//     </>
    
//   )
//   //   const [toggle,setToggle]=useState(true )
//   //   const Toggle=()=>{
//   //     setToggle(!toggle)
//   //   }
//   //   return (
//   //     <>
//   //     <div className='container-fluid bg-white min-vh-100' >
//   //         <div className='row'>
//   //          {toggle && <div className='col-3 col-md-2 bg-white vh-100 position-absolute'>
//   //             <ServiceSidebar/>
//   //           </div>}
//   //           {toggle && <div className='col-3 col-md-2'></div>}
//   //           <div className='col'>
//   //             <ServiceDash_upblock Toggle={Toggle}/>
//   //             <br/><br/>

//             // <div className='m-4'>
//             //     <Card >
//             //         <Row className='bg-primary'>
//             //             <p ><i className='fa fa-edit'> Admin Dashboard</i></p>
//             //         </Row>
                    
//             //     </Card>
//             // </div>
            
//   //           </div>
            
            
//   //         </div>
//   //       </div>
//   //     </>
//   // )
// }

// export default AdminMyDashboard
