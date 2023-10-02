
// import Header from './Header'
// import SE_Sidebar from "./SE_Sidebar";
// import { useState ,useEffect} from "react";
// import { GetToken } from "./Api/auth";
// import SE_Dash_upblocks from "./SE_Dash_upblocks";
// import SE_Table_comp from "./SE_Table_comp";

// const userName = localStorage.getItem('username');
// console.log(userName);
// const url = 'http://100.20.33.222:5000/se/get-service-request-details'


// function SE_TotalTickets(){
//     const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
//     const [TicketDetails, setTicketDetails] = useState([]);
//     //const {authToken} = useAuth();
//     const authToken = GetToken();

//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle)
//   }
//   let data = {
//     username : userName,
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
//   },[]) ;
  

//     return (
//     <>
//     <div className='grid-container'>
//       <Header OpenSidebar={OpenSidebar}/>
//       <SE_Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
//       <main className="main-container">
//       <SE_Dash_upblocks />
//       {TicketDetails.length > 1 ? <SE_Table_comp array_Details={TicketDetails} /> : 
      // <>
      //   <h2 className='mx-3 mt-3'>No Tickets are Assigned </h2>
      //   <div className=" position-absolute top-50 start-50 translate-middle col-1 shadow p-3 bg-body-tertiary rounded ">
                            
      //                       <div className="text-center  py-1 px-2">
      //                       <div className="spinner-border text-primary " role="status">
      //                         <span className="visually-hidden ">Loading...</span>
      //                       </div> 
      //                       <p className="text-dark d-flex justify-content-center">Loading....</p>
      //                       </div>  
      
      //                     </div>
      // </>
      
      
      
//       }
      
//       </main>
//     </div>
//      </>
//     )
// }

// export default SE_TotalTickets;


import Table_comp from './Table_Componenet';
import Header from './Header'
import { useState ,useEffect} from "react";
import { GetToken } from "./Api/auth";
import SE_Sidebar from "./SE_Sidebar";
import SE_Dash_upblocks from "./SE_Dash_upblocks";
import SERVER_URL from './Server/Server';

const userName = localStorage.getItem('username');
console.log(userName);
const url = `${SERVER_URL}se/get-service-request-details`


function SE_TotalTickets(){
    const [data, setData]= useState(null)
    const [error, setError] = useState(null)

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const [TicketDetails, setTicketDetails] = useState([]);
    //const {authToken} = useAuth();
    const authToken = GetToken();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  let data1 = {
    username : userName,
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
            body : JSON.stringify(data1)
        })
          if(response.ok){
            const results= await response.json()
            setData(results)
            setTicketDetails(results)
            console.log('Fetching successful..!')
          }else{
            throw new Error('failed to get service request details...!')

          }

        } catch (error) {
          setError(error.message)
        }

      }
      fetchDetails();
  },[]) 
  

    return (
    <>
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <SE_Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className="main-container">
      <SE_Dash_upblocks/>
      {TicketDetails.length > 0 ? <Table_comp array_Details={TicketDetails} /> : 
      <>
      <h2 className='mx-3 mt-3'>No Tickets are Assigned </h2>
      <div className=" position-absolute top-50 start-50 translate-middle col-1 shadow p-3 bg-body-tertiary rounded mt-5">
                          
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

export default SE_TotalTickets;