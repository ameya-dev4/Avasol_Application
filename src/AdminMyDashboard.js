
import Table_comp from "./Table_Componenet";
import Header from './Header'
import Sidebar from './Admin_sidebar'
import { useState ,useEffect} from "react";
import { GetToken } from "./Api/auth";
import { Box, Typography,Container } from "@mui/material";
import { Card,Row } from "react-bootstrap";
import AdminDash_upblock from "./AdminDash_upblock";

const userName = localStorage.getItem('username');
console.log(userName);


function AdminMyDashboard(){
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const [TicketDetails , setTicketDetails] = useState([]);
    //const {authToken} = useAuth();
    const authToken = GetToken();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  
  
    return (
    <>
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className="main-container">
      <AdminDash_upblock />
      { TicketDetails && TicketDetails.length > 0 ? <Table_comp array_Details={TicketDetails} /> : 
      <>
      <Box>
        <Typography variant="h4" className="mx-3 mt-3">
          No Ticket Details
        </Typography>
        </Box>
        <Container >
        <div className=" position-absolute top-50 start-50 translate-middle col-1 shadow p-3 bg-body-tertiary rounded ">
              
                <div className="text-center d-flex justify-content-center py-2 px-2">
                <div className="spinner-border text-primary " role="status">
                  <span className="visually-hidden ">Loading...</span>
                </div> 
                </div>  
                      
              </div>

          </Container>
          </>
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
