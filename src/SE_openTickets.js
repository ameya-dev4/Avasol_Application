// import Header from "./Header";
// import SE_Sidebar from "./SE_Sidebar";
// import { GetToken } from "./Api/auth";
// import SE_Dash_upblocks from "./SE_Dash_upblocks";
// import { useState,useEffect } from "react";
// import SE_Table_comp from "./SE_Table_comp";


// const url = 'http://avasol.ameyalabs.com:5000/get-ticket-details'

// function SE_OpenTickets(){
//     const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
//     const [TicketDetails, setTicketDetails] = useState([]);
    
//     const authToken = GetToken();

//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle)
//   }

//   const data = {
//     status : 2
//   }

//   useEffect (()=> {
//     async function fetchDetails(){
//         const response = await fetch(url,{
//             method : 'POST',
//             headers : {
//                 'Authorization' : `Bearer ${authToken}`,
//                 'Content-type': 'application/json',
//                 "Access-Control-Allow-Origin": "*",
//             },
//             body : JSON.stringify(data)
//         }).then((response) => response.json())
//         .then((array_Details) =>{
//             setTicketDetails(array_Details);
//         })
//       }
//       fetchDetails();
//   },[TicketDetails]) 

//     return(
//         <>
//         <div className='grid-container'>
//           <Header OpenSidebar={OpenSidebar}/>
//           <SE_Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
//           <main className="main-container">
//           <SE_Dash_upblocks />
//           {TicketDetails.length > 0 ? <SE_Table_comp array_Details={TicketDetails} /> : 
//           <h2 className="mx-3 mt-3">No  Recent Open Tasks </h2>}
//           </main>
//         </div>
//          </>
//     )
// }

// export default SE_OpenTickets;

import Header from "./Header";
import SE_Sidebar from "./SE_Sidebar";
import { GetToken } from "./Api/auth";
import SE_Dash_upblocks from "./SE_Dash_upblocks";
import { useState,useEffect } from "react";
import SE_Table_comp from "./SE_Table_comp";
import { Container } from "react-bootstrap";


const url = 'http://100.20.33.222:5000/se/get-service-request-details'

function SE_OpenTickets(){
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const [TicketDetails, setTicketDetails] = useState([]);
    
    const authToken = GetToken();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const data = {
    status : 1
  }

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
        })
      }
      fetchDetails();
  },[]) 

    return(
        <>
        <div className='grid-container'>
          <Header OpenSidebar={OpenSidebar}/>
          <SE_Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
          <main className="main-container">
          <SE_Dash_upblocks />
          {TicketDetails.length > 0 ? <SE_Table_comp array_Details={TicketDetails} /> : 

            <>
            <h2 className="mx-3 mt-3">No  Recent Open Tasks </h2>
            
                    <div className=" position-absolute top-50 start-50 translate-middle col-1 shadow p-3 bg-body-tertiary rounded ">
                          
                            <div className="text-center  py-1 px-2">
                            <div className="spinner-border text-primary " role="status">
                              <span className="visually-hidden ">Loading...</span>
                            </div> 
                            <p className="text-dark d-flex justify-content-center">Loading....</p>
                            </div>  
      
                          </div>

          </>
          }
          </main>
        </div>
         </>
    )
}

export default SE_OpenTickets;
