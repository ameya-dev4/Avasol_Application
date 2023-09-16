
import Table_Tickets from "./Table_Tickets";
import React ,{useState,useEffect}from 'react'
import AdminDash_upblock from './AdminDash_upblock'
import Admin_sidebar from './Admin_sidebar'
import Header from './Header'
import {Row,Col,Button,Card} from 'react-bootstrap'
import { GetToken } from "./Api/auth";
import NewTickets_Table from "./NewTickets_Table";

const authToken = GetToken();

function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
  const day = currentDate.getDate();

  return `${day}/${month}/${year}`;
}

const currentDate = getCurrentDate();
const url = 'http://100.20.33.222:5000/admin/get-new-tickets'

function NewTickets(){
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const [TicketDetails, setTicketDetails] = useState([]);

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

    useEffect (()=> {
      async function fetchDetails(){
          const response = await fetch(url,{
              method : 'GET',
              headers : {
                  'Authorization' : `Bearer ${authToken}`,
                  'Content-type': 'application/json',
              },
          }).then((response) => response.json())
          .then((array_Details) =>{
              setTicketDetails(array_Details);
          })
        }
        fetchDetails();
    },[])

    return <>
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <main className="main-container " >
    <AdminDash_upblock /><br/><br/>
    <Row>
            <Col className='mx-3'>
                <Button variant='success'><i className='fa fa-plus '> Add New</i></Button>
            </Col>
            Records
            <Col md={3}>
            <select className="form-select " aria-label="Default select example">
                <option selected>5</option>
                <option value="15">15</option>
                <option value="50">50</option>
                <option value="All">All</option>
            </select>
            </Col>
        </Row>
        
        {/* <NewTickets_Table/>  */}
    {TicketDetails.length > 0 ?<Table_Tickets array_Details={TicketDetails} /> : 
      <h2 className="mx-3 mt-3">No New Tickets</h2>}
    </main>
    </div>
    </>
}

export default NewTickets;

// import React ,{useState}from 'react'
// import AdminDash_upblock from './AdminDash_upblock'
// import Admin_sidebar from './Admin_sidebar'
// import Header from './Header'
// import {Row,Col,Button,Card} from 'react-bootstrap'

// function NewTickets() {

//   const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
//   const OpenSidebar = () => {
//   setOpenSidebarToggle(!openSidebarToggle)
// }
//   return (
//     <>
//   <div className='grid-container'>
//     <Header OpenSidebar={OpenSidebar}/>
//     <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
//     <main className="main-container">
//       <AdminDash_upblock/><br/><br/>
      
      // <Row>
      //       <Col className='mx-3'>
      //           <Button variant='success'><i className='fa fa-plus '> Add New</i></Button>
      //       </Col>
      //       Records
      //       <Col md={3}>
      //       <select className="form-select " aria-label="Default select example">
      //           <option selected>5</option>
      //           <option value="15">15</option>
      //           <option value="50">50</option>
      //           <option value="All">All</option>
      //       </select>
      //       </Col>
      //   </Row>
        
//         <table class="table caption-top  table-hover rounded mt-3 px-3 mx-3" style={{backgroundColor:'#BFCAD1'}}>
//             <caption className='text- fs-4 text-white'>New Tickets</caption>
//             <thead>
//                 <tr>
//                 <th scope="col">ID</th>
//                 <th scope="col">Ticket description</th>
//                 <th scope="col">Customer Name</th>
//                 <th scope="col">Customer Contact</th>
//                 <th scope="col">Open Data</th>
//                 <th scope="col">Service Location</th>
//                 <th scope="col">Edit</th>
//                 <th scope="col">Delete</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 <tr>
//                 <th scope="row">123</th>
//                 <td><a href='#' className='text-decoration-none'>Battery not Charging</a></td>
//                 <td>Otto</td>
//                 <td>@mdo</td>
//                 <td>9951569178</td>
//                 <td>Otto</td>
//                 <td><a href='#' className='text-decoration-none'>Edit</a></td>
//                 <td><a href='#' className='text-decoration-none'>Delete</a></td>
//                 </tr>
//                 <tr>
//                 <th scope="row">342</th>
//                 <td><a href='#' className='text-decoration-none'>Battery Heating up</a></td>
//                 <td>Thornton</td>
//                 <td>8919529551</td>
//                 <td>Mark</td>
//                 <td>Otto</td>
//                 <td><a href='#' className='text-decoration-none'>Edit</a></td>
//                 <td><a href='#' className='text-decoration-none'>Delete</a></td>
                
//                 </tr>
//                 <tr>
//                 <th scope="row">453</th>
//                 <td ><a href='#' className='text-decoration-none'>Battery damage</a></td>
//                 <td>@twitter</td>
//                 <td>832389334</td>
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
//     </>
//   )
// }

// export default NewTickets
