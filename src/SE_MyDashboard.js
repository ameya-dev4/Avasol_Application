
// import Header from './Header'
// import SE_Sidebar from "./SE_Sidebar";
// import { useState ,useEffect} from "react";
// import { GetToken } from "./Api/auth";
// import SE_Dash_upblocks from "./SE_Dash_upblocks";
// import SE_Table_comp from "./SE_Table_comp";
// import { Container } from 'react-bootstrap';

// const userName = localStorage.getItem('username');
// console.log(userName);
// const url = 'http://100.20.33.222:5000/se/latest-service-requests'

// function error_func(){
//     return <h2>Failed to fetch</h2>
// }
 
// function SE_MyDashboard(){
//     const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
//     const [TicketDetails , setTicketDetails] = useState([]);
//     //const {authToken} = useAuth();
//     const authToken = GetToken();

//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle)
//   }
  
 
//     try{
//         useEffect (()=> {
//         async function fetchDetails(){
//             const response = await fetch(url,{
//                 method : 'GET',
//                 headers : {
//                     'Authorization' : `Bearer ${authToken}`,
//                     'Content-type': 'application/json',
//                     "Access-Control-Allow-Origin": "*",
//                 },
//             }).then((response) => response.json())
//             .then((array_Details) =>{
//                 setTicketDetails(array_Details);
//                 localStorage.setItem('DashboardTickets',array_Details);
//             })
//           }
//           fetchDetails();
//       },[]) 
//     }catch(err){
//         error_func()
//         console.error("Failed to fetch",err)
//     }
    
  
//     return (
//     <>
//     <div className='grid-container'>
//       <Header OpenSidebar={OpenSidebar}/>
//       <SE_Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
//       <main className="main-container">
//       <SE_Dash_upblocks />
//       {TicketDetails && TicketDetails.length > 0 ? <SE_Table_comp array_Details={TicketDetails} /> : 
      
//         <>
//         <h2 className='mx-3 mt-3'>No Recent Tasks</h2>
//         {/* <Container style={{width:'100%',height:'100%',backgroundColor:'white'}}> */}
//                 <div className=" position-absolute top-50 start-50 translate-middle col-1 shadow p-3 bg-body-tertiary rounded ">
                      
//                         <div className="text-center d-flex justify-content-center py-2 px-2">
//                         <div className="spinner-border text-primary " role="status">
//                           <span className="visually-hidden ">Loading...</span>
//                         </div> 
//                         <p className="text-dark d-flex justify-content-center">Loading....</p>
//                         </div>  
                              
//                       </div>

//             {/* </Container> */}
//         </>
//       }
      
//       </main>
//     </div>
//      </>
//     )
// }

// export default SE_MyDashboard;

import React from "react";
import Table_comp from "./Table_Componenet";
import Header from './Header'
import SE_Sidebar from "./SE_Sidebar";
import { useState ,useEffect} from "react";
import { GetToken } from "./Api/auth";
import SE_Dash_upblocks from "./SE_Dash_upblocks";
import SERVER_URL from "./Server/Server";

const userName = localStorage.getItem('username');
console.log(userName);
const url = `${SERVER_URL}se/latest-service-requests`


function SE_MyDashboard(){
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
  useEffect (()=> {
    async function fetchDetails(){
        const response = await fetch(url,{
            method : 'GET',
            headers : {
                'Authorization' : `Bearer ${authToken}`,
                'Content-type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
            //body : JSON.stringify(data)
        }).then((response) => response.json())
        .then((array_Details) =>{
            setTicketDetails(array_Details);
           // localStorage.setItem('DashboardTickets',array_Details);
        })
      }
      fetchDetails();
  },[]) ;

  
    return (
    <>
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <SE_Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className="main-container">
      <SE_Dash_upblocks/>
      {TicketDetails.length > 0 ? <Table_comp array_Details={TicketDetails} /> : 
      <h2 className="mx-3">No Tickets are Assigned</h2>}
      
      </main>
    </div>
     </>
    )
}

export default SE_MyDashboard;