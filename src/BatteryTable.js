
import Table_Tickets from "./Table_Tickets";
import React ,{useState,useEffect}from 'react'
import AdminDash_upblock from './AdminDash_upblock'
import Admin_sidebar from './Admin_sidebar'
import Header from './Header'
import {Row,Col,Button,Card} from 'react-bootstrap'
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
const url = `${SERVER_URL}admin/get-new-tickets`

function batteryTables(){
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

export default batteryTables;

