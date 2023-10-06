
// import Header from "./Header";
// import { useState,useEffect } from "react";
// import { GetToken } from "./Api/auth";
// import SE_Sidebar from "./SE_Sidebar";
// import SE_Dash_upblocks from "./SE_Dash_upblocks";
// import SE_Table_comp from "./SE_Table_comp";

// const authToken = GetToken();

// function getCurrentDate() {
//   const currentDate = new Date();
//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
//   const day = currentDate.getDate();

//   return `${day}/${month}/${year}`;
// }

// const currentDate = getCurrentDate();
// const url = 'http://100.20.33.222:5000/se/get-service-request-details'

// function SE_TicketsToday(){
//     const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
//     const [TicketDetails, setTicketDetails] = useState([]);

//     const OpenSidebar = () => {
//       setOpenSidebarToggle(!openSidebarToggle)
//     }

//     const data = {
//       serviceDate : currentDate,
//     }

//     useEffect (()=> {
//       async function fetchDetails(){
//           const response = await fetch(url,{
//               method : 'POST',
//               headers : {
//                   'Authorization' : `Bearer ${authToken}`,
//                   'Content-type': 'application/json',
//                   "Access-Control-Allow-Origin": "*",
//               },
//               body : JSON.stringify(data),
//           }).then((response) => response.json())
//           .then((array_Details) =>{
//               setTicketDetails(array_Details);
//           })
//         }
//         fetchDetails();
//     },[])

//     return <>
//     <div className='grid-container'>
//     <Header OpenSidebar={OpenSidebar}/>
//     <SE_Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
//     <main className="main-container">
//     <SE_Dash_upblocks />
//     {TicketDetails.length > 1 ? <SE_Table_comp array_Details={TicketDetails} /> : 
      
      // <>
      //       <h2  className="mx-3 mt-3">No Tickets are Assigned for you Today</h2>
            
      //               <div className=" position-absolute top-50 start-50 translate-middle col-1 shadow p-3 bg-body-tertiary rounded ">
                          
      //                       <div className="text-center  py-1 px-2">
      //                       <div className="spinner-border text-primary " role="status">
      //                         <span className="visually-hidden ">Loading...</span>
      //                       </div> 
      //                       <p className="text-dark d-flex justify-content-center">Loading....</p>
      //                       </div>  
      
      //                     </div>

      //     </>
      
//       }

//     </main>
//     </div>
//     </>
// }

// export default SE_TicketsToday;

import SE_Dash_upblocks from "./SE_Dash_upblocks";
import Table_comp from "./Table_Componenet";
import Header from "./Header";
import SE_Sidebar from "./SE_Sidebar";
import { useState,useEffect } from "react";
import { GetToken } from "./Api/auth";
import SERVER_URL from "./Server/Server";
const authToken = GetToken();

function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
  const day = currentDate.getDate();

  return `${day}/${month}/${year}`;
}

const currentDate = getCurrentDate();
const url = `${SERVER_URL}se/get-service-request-details`

function SE_TicketsToday(){
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const [TicketDetails, setTicketDetails] = useState([]);

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

    const data = {
      serviceDate : currentDate,
    }

    useEffect (()=> {
      async function fetchDetails(){
          try {
            const response = await fetch(url,{
              method : 'POST',
              headers : {
                  'Authorization' : `Bearer ${authToken}`,
                  'Content-type': 'application/json',
                  "Access-Control-Allow-Origin": "*",
              },
              body : JSON.stringify(data),
          })
            if(response.ok){
              const result=await response.json()
              setTicketDetails(result)
            }else{
              throw new Error('Failed to get Today Tickets details...!')
            }
        } catch (error) {
            console.error(error)
          }
        fetchDetails();
    }
  },[])

    return <>
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <SE_Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <main className="main-container">
    <SE_Dash_upblocks/>
    {TicketDetails.length > 0 ? <Table_comp array_Details={TicketDetails} /> : 
      <h2>No Tickets are Assigned for you Today</h2>}
    </main>
    </div>
    </>
}

export default SE_TicketsToday;
