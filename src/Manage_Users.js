import Header from "./Header";
import Admin_sidebar from "./Admin_sidebar";
import { useState,useEffect } from "react";
import { GetToken } from "./Api/auth";
import Table_SE from "./Table_SE";
import AdminDash_upblock from "./AdminDash_upblock";
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
const url = `${SERVER_URL}admin/get-service-engineers`

function Manage_Users(){
    const [data,setData]= useState(null)
    const [error,setError]= useState(null)
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const [TicketDetails, setTicketDetails] = useState([]);

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

    useEffect (()=> {
      async function fetchDetails(){
          try {
            const response = await fetch(url,{
              method : 'POST',
              headers : {
                  'Authorization' : `Bearer ${authToken}`,
                  'Content-type': 'application/json',
              },
              body : JSON.stringify({status:2}),
          })
              if(response.ok){
                const result=await response.json()
                setData(result)
                setTicketDetails(result)
                console.log("fetching successful...!")
              }else{
                throw new Error("Failed to fetch Manage Users...!")
              }
          } catch (error) {
            setError(error.message)
          }
        }
        fetchDetails();
    },[])


    return <>
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <main className="main-container">
    <AdminDash_upblock />
    {TicketDetails.length > 0 ? <Table_SE array_Details={TicketDetails} /> : 
      <h2 className="mx-3 mt-3">Manage Users Details Display Here</h2>}
    </main>
    </div>  
    </>
}

export default Manage_Users;


// import React,{useState} from 'react'
// import Header from './Header'
// import Sidebar from './Sidebar'
// import AdminDash_upblock from './AdminDash_upblock'
// import { Col,Row,Button } from 'react-bootstrap'
// import Admin_sidebar from './Admin_sidebar'
// const Manage_Users = () => {
//     const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
//     const OpenSidebar = () => {
//       setOpenSidebarToggle(!openSidebarToggle)
//     }
  
//     return (
//       <>
        
//       <div className='grid-container'>
//         <Header OpenSidebar={OpenSidebar}/>
//         <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
//         <main className="main-container">
//         <AdminDash_upblock/><br/><br/><br/>
//         <Row>
//             <Col className='mx-3'>
//                 <Button variant='success'><i className='fa fa-plus'> Add New</i></Button>
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
        
//         <table class="table caption-top  table-hover rounded mt-3 px-3 mx-3" style={{backgroundColor:'#BFCAD1'}}>
//             <caption className='text- fs-4 text-white '>Manage Users</caption>
//             <thead>
//                 <tr>
//                 <th scope="col">ID</th>
//                 <th scope="col">Description</th>
//                 <th scope="col">Customer Name</th>
//                 <th scope="col">SE Name</th>
//                 <th scope="col">Open Date</th>
//                 <th scope="col">Status</th>
//                 <th scope="col">Edit</th>
//                 <th scope="col">Delete</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 <tr>
//                 <th scope="row">Alexa</th>
//                 <td>Mark</td>
//                 <td>Otto</td>
//                 <td>@mdo</td>
//                 <td>Mark</td>
//                 <td>Otto</td>
//                 <td><a href='#' className='text-decoration-none'>Edit</a></td>
//                 <td><a href='#' className='text-decoration-none'>Delete</a></td>
//                 </tr>
//                 <tr>
//                 <th scope="row">Ramu</th>
//                 <td>Jacob</td>
//                 <td>Thornton</td>
//                 <td>@fat</td>
//                 <td>Mark</td>
//                 <td>Otto</td>
//                 <td><a href='#' className='text-decoration-none'>Edit</a></td>
//                 <td><a href='#' className='text-decoration-none'>Delete</a></td>
                
//                 </tr>
//                 <tr>
//                 <th scope="row">Sita</th>
//                 <td >Larry the Bird</td>
//                 <td>@twitter</td>
//                 <td>Mark</td>
//                 <td>Otto</td>
//                 <td>@mdo</td>
//                 <td><a href='#' className='text-decoration-none'>Edit</a></td>
//                 <td><a href='#' className='text-decoration-none'>delete</a></td>
//                 </tr>
//             </tbody>
//         </table>
//         <p className='mx-3'>Showing 1 to 5-6 entries</p>
   
//         </main> 
        
          
//       </div>
  
              
      
//       </>
      
//     )
// }

// export default Manage_Users
