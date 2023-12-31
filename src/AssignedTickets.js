import { useState,useEffect } from "react";
import { GetToken } from "./Api/auth";
import Table_Tickets from "./Table_Tickets";
import {Row,Col,Button,Card} from 'react-bootstrap'
import AdminDash_upblock from './AdminDash_upblock'
import Header from './Header'
import Admin_sidebar from './Admin_sidebar'
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
const url = `${SERVER_URL}admin/get-assigned-tickets`

function AssignedTickets(){
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
              console.log(array_Details)
          })
        }
        fetchDetails();
    },[])
    console.log(TicketDetails)

    return <>
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <main className="main-container">
    <AdminDash_upblock /><br/><br/>
    <Row>
                <Col className='mx-3'>
                    <Button variant='success'><i className='fa fa-plus'> Add New</i></Button>
                </Col>
            </Row><br/>
            <Row>
            <Col md={2} className='mx-3'>
            <select className="form-select " aria-label="Default select example">
                <option selected>By Service engineer</option>
                <option value="15">15</option>
                <option value="50">50</option>
                <option value="All">All</option>
            </select>
            </Col>
            <Col md={2}>
            <select className="form-select " aria-label="Default select example">
                <option selected>By Target</option>
                <option value="15">15</option>
                <option value="50">50</option>
                <option value="All">All</option>
            </select>
            </Col>
            <Col md={2}>
            <select className="form-select " aria-label="Default select example">
                <option selected>By Customer</option>
                <option value="15">15</option>
                <option value="50">50</option>
                <option value="All">All</option>
            </select>
            </Col>
            <Col md={2}>
            <select className="form-select " aria-label="Default select example">
                <option selected>By status</option>
                <option value="15">15</option>
                <option value="50">50</option>
                <option value="All">All</option>
            </select>
            </Col>
            <Col>
                <Button variant='primary'> Submit</Button>
            </Col>
            </Row>

    { TicketDetails && TicketDetails.length > 0 ? <Table_Tickets array_Details={TicketDetails} /> : 
        <>
      <h2 className="mx-3 mt-3">Assigned Tickets Details </h2>
      <div className="text-center">
          <button className="btn btn-primary" type="button" disabled>
            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span role="status"> Loading...</span>
          </button>
      </div>
      </>
      }
    </main>
    </div>
    </>
}

export default AssignedTickets;