
// import Table_Tickets from "./Table_Tickets";
// import React ,{useState,useEffect}from 'react'
// import AdminDash_upblock from './AdminDash_upblock'
// import Admin_sidebar from './Admin_sidebar'
// import Header from './Header'
// import {Row,Col,Button,Card} from 'react-bootstrap'
// import { GetToken } from "./Api/auth";
// import Table_comp from "./Table_Componenet";
// import SERVER_URL from "./Server/Server";
// import { Typography } from "@mui/material";

// const authToken = GetToken();

// function getCurrentDate() {
//   const currentDate = new Date();
//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
//   const day = currentDate.getDate();

//   return `${day}/${month}/${year}`;
// }

// const currentDate = getCurrentDate();
// const url = `${SERVER_URL}admin/get-new-tickets`

// function NewTickets(){
//     const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
//     const [TicketDetails, setTicketDetails] = useState([]);

//     const OpenSidebar = () => {
//       setOpenSidebarToggle(!openSidebarToggle)
//     }

//     useEffect (()=> {
//       async function fetchDetails(){
//           const response = await fetch(url,{
//               method : 'GET',
//               headers : {
//                   'Authorization' : `Bearer ${authToken}`,
//                   'Content-type': 'application/json',
//               },
//           })
//           if(response.ok){
//             const result=await response.json()
//             setTicketDetails(result)
//           }else{
//             throw new Error('Failed to fetch New ticket Details....!')
//           }
//         }
//         fetchDetails();
//     },[])

//     return <>
//     <div className='grid-container'>
//     <Header OpenSidebar={OpenSidebar}/>
//     <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
//     <main className="main-container " >
//     <AdminDash_upblock /><br/><br/>
//     <Row>
//             <Col className='mx-3'>
//                 <Button variant='success'><i className='fa fa-plus '> Add New</i></Button>
//             </Col>
//             Records
//             <Col md={3}>
//             <select className="form-select " aria-label="Default select example">
//                 <option selected>5</option>
//                 <option value="15">15</option>
//                 <option value="50">50</option>
//                 <option value="All">All</option>
//             </select>
//             </Col>
//         </Row>
        
//         {/* <NewTickets_Table/>  */}
//     {TicketDetails.length > 0 ?<Table_Tickets array_Details={TicketDetails} /> : 

//       <>
//       <h2 className="mx-3 mt-3">No New Tickets</h2>
//       {/* <div className=" position-absolute top-50 start-50 translate-middle col-1 shadow p-3 bg-body-tertiary rounded ">
                            
//                             <div className="text-center  py-1 px-2">
//                             <div className="spinner-border text-primary " role="status">
//                               <span className="visually-hidden ">Loading...</span>
//                             </div> 
//                             <p className="text-dark d-flex justify-content-center">Loading....</p>
//                             </div>  
      
//                           </div> */}
//         </>
      
//       }
//     </main>
//     </div>
//     </>
// }

// export default NewTickets;

import Table_Tickets from "./Table_Tickets";
import React, { useState, useEffect } from 'react';
import AdminDash_upblock from './AdminDash_upblock';
import Admin_sidebar from './Admin_sidebar';
import Header from './Header';
import { Row, Col, Button } from 'react-bootstrap';
import { GetToken } from "./Api/auth";
import SERVER_URL from "./Server/Server";
import ErrorHandlingPage from "./ErrorMessageAlert";
import ToastSuccessNotify from "./ToastSuccesNotify";

const authToken = GetToken();

function NewTickets() {
  const url = `${SERVER_URL}admin/get-new-tickets`
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [TicketDetails, setTicketDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    const fetchDetails = async () => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-type': 'application/json',
                },
            });
            if (response.ok) {
                const result = await response.json();
                setTicketDetails(result);
            } else {
                throw new Error('Failed to fetch New ticket Details....!');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);


  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

   const handleCancle = () => {
     setIsConfirmationOpen(true);
   };
 
   const handleCloseConfirmation = () => {
     setIsConfirmationOpen(false);
   };
 
   const handleRefresh = () => {
     window.location.reload()
     setIsConfirmationOpen(false);
   };
  

    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <main className="main-container container-fluid" >
                <AdminDash_upblock /><br /><br />
                <Row className="mb-3">
                    <Col className='mx-3'>
                        <Button variant='success'><i className='fa fa-plus '> Add New</i></Button>
                    </Col>
                    <Col md={3}>
                        <select className="form-select " aria-label="Default select example">
                            <option selected>5</option>
                            <option value="15">15</option>
                            <option value="50">50</option>
                            <option value="All">All</option>
                        </select>
                    </Col>
                </Row>

                {isLoading ? (

                    <div className="text-center">
                        <button className="btn btn-primary" type="button" disabled>
                          <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                          <span role="status"> Loading...</span>
                        </button>
                    </div>
                ) : error ?(
                  
                  <div className="text-center alert alert-danger" role="alert">
                        Error: {error}
                        
                    </div> 
                ) : (
                    <div>
                        {TicketDetails.length > 0 ? (
                            <Table_Tickets array_Details={TicketDetails} />
                        ) : (
                            <h2 className="mx-3 mt-3">No New Tickets</h2>
                        )}
                    </div>
                )}
            </main>

            <ErrorHandlingPage
              open={isConfirmationOpen}
              onClose={handleCloseConfirmation}
              onConfirm={handleRefresh}
          
            />
        </div>
    );
}

export default NewTickets;
