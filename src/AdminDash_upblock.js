import React ,{useState,useEffect} from 'react'
import {Row,Col,Card} from 'react-bootstrap'
import Header from './Header'
import { GetToken } from './Api/auth';
import SERVER_URL from './Server/Server';


function AdminDash_upblock() {
    
    const [TicketDetails, setTicketDetails] = useState([]);
    const [All_serv_engg ,setAll_Serv_engg]=useState([]);
    const [users ,setUsers]=useState([]);
    const authToken=GetToken()
    //Manage New Tickets 
    useEffect (()=> {
        async function fetchDetails(){
            const response = await fetch(`${SERVER_URL}admin/get-new-tickets`,{
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

    
      //Manage Service Engineers
      useEffect (()=> {
        async function fetchDetails(){
            const response = await fetch(`${SERVER_URL}admin/get-service-engineers`,{
                method : 'POST',
                headers : {
                    'Authorization' : `Bearer ${authToken}`,
                    'Content-type': 'application/json',
                },
                body : JSON.stringify({status:-1}),
            }).then((response) => response.json())
            .then((array_Details) =>{
                setAll_Serv_engg(array_Details);
                console.log(array_Details);
                
            })
          }
          fetchDetails();
      },[])

      //Manage Users
      useEffect (()=> {
        async function fetchDetails(){
            const response = await fetch(`${SERVER_URL}admin/get-users`,{
                method : 'POST',
                headers : {
                    'Authorization' : `Bearer ${authToken}`,
                    'Content-type': 'application/json',
                },
                body : JSON.stringify({status:-1}),
            }).then((response) => response.json())
            .then((array_Details) =>{
                setUsers(array_Details);
                console.log(array_Details);
                
            })
          }
          fetchDetails();
      },[])

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div >
        <div className='container-fluid px-1'> 
            <div className='row g-3 my-2'>
                <div className='col-md-3 dashboard-stat red-intense' >
                    <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded ' style={{backgroundColor:'#E35B5A'}}>
                        <Row>
                            <Col md={9}>
                                <h6 className='fs-1'>{TicketDetails.length>0?TicketDetails.length:0}</h6>
                                <small className='fs-6'>Manage Tickets</small>
                            </Col>
                            <Col>
                            </Col>
                                
                        </Row>
                        <Row >
                        <i className='fa fa-tasks p-3 fs-1 '></i>
                            <a className='text-dark text-decoration-none' href='/new_tickets'>
                            view more
                            <i className='feather icon-chevron-right'></i>
                            </a>
                        </Row>
                        
                    </div>
                </div>
                <div className='col-md-3 bg-blue-madison bg-font-blue-madison'>
                    <div className='p-3  shadow-sm d-flex justify-content-around align-items-center rounded' style={{backgroundColor:'#578EBE'}}>
                        <Row>
                            <Col md={12}>
                            <h6 className='fs-1'>{All_serv_engg.length>0?All_serv_engg.length:0}</h6>
                            <small className='fs-6 '>Manage Service Engineers</small>
                            </Col>
                            <Col></Col>
                        </Row>
                        <Row>
                        <i className='fa fa-cogs p-3 fs-1'></i>
                        <a className='text-dark text-decoration-none' href='/all_Service_engg'>
                            view more
                            <i className='feather icon-chevron-right'></i>
                            </a>
                        </Row>
                       
                    </div>
                </div>
                <div className='col-md-3 dashboard-stat purple-pulm'>
                    <div className='p-3  shadow-sm d-flex justify-content-around align-items-center rounded' style={{backgroundColor:'#8775A7'}}>
                        <Row>
                            <Col md={9}>
                                <h6 className='fs-1'>{users.length>0?users.length:0}</h6>
                                <small className='fs-6'>Manage Users</small>
                            </Col>
                            <Col>
                                
                            </Col>
                        </Row>
                        <Row>
                            <i className='fa fa-users p-3 fs-1'></i>
                            <a className='text-dark text-decoration-none' href='/manage_users'>
                            view more
                            <i className='feather icon-chevron-right'></i>
                            </a>
                        </Row>
                        
                    </div>
                </div>
                <div className='col-md-3 dashboard-stat green-haze'>
                    <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded' style={{backgroundColor:'#44B6A6'}}>
                    <Row>
                            <Col md={9}>
                                <h6 className='fs-1'>--</h6>
                                <small className='fs-6'>Manage Payments</small>
                            </Col>
                            <Col>
                               
                            </Col>
                        </Row>
                        <Row>
                            <i className='fa fa-money p-3 fs-1'></i>
                            <a className='text-dark text-decoration-none' href='#'>
                            view more
                            <i className='feather icon-chevron-right'></i>
                            </a>
                        </Row>
                       
                    </div>
                </div>
            </div>
        
        </div>
    </div>
        
  )
}

export default AdminDash_upblock
