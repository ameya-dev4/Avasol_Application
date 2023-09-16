import React ,{useState,useEffect} from 'react'
import {Row,Col,Card} from 'react-bootstrap'
import Header from './Header'
import { GetToken } from './Api/auth';


function SE_Dash_upblocks() {
    const [TicketDetails, setTicketDetails] = useState([]);
    const [All_serv_engg ,setAll_Serv_engg]=useState();
    const authToken=GetToken()
    //Manage New Tickets 
    useEffect (()=> {
        async function fetchDetails(){
            const response = await fetch('http://100.20.33.222:5000/admin/get-new-tickets',{
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
            const response = await fetch('http://100.20.33.222:5000/admin/get-service-engineers',{
                method : 'POST',
                headers : {
                    'Authorization' : `Bearer ${authToken}`,
                    'Content-type': 'application/json',
                },
                body : JSON.stringify({status:3}),
            }).then((response) => response.json())
            .then((array_Details) =>{
                setAll_Serv_engg(array_Details);
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
    <div className='px-3'>
        <div className='container-fluid px-1'> 
            <div className='row g-3 my-2'>
                <div className='col-md-3 dashboard-stat red-intense' >
                    <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded ' style={{backgroundColor:'#E35B5A'}}>
                        <Row>
                            <Col md={9}>
                                <h6 className='fs-1'>{TicketDetails && TicketDetails.length}</h6>
                                <small className='fs-6'>Today's Tasks</small>

                            </Col>
                            <Col>
                            </Col>
                                
                        </Row>
                        <Row >
                        <i className='fa fa-tasks p-3 fs-1 '></i>
                            <a className='text-dark text-decoration-none' href='#'>
                            view more
                            <i className='feather icon-chevron-right'></i>
                            </a>
                        </Row>
                        
                    </div>
                </div>
                <div className='col-md-3 bg-blue-madison bg-font-blue-madison'>
                    <div className='p-3  shadow-sm d-flex justify-content-around align-items-center rounded' style={{backgroundColor:'#5C9BD1'}}>
                        <Row>
                            <Col md={9}>
                            <h6 className='fs-1'>{All_serv_engg && All_serv_engg.length}</h6>
                            <small className='fs-6 '>My Open Tasks</small>
                            </Col>
                            <Col></Col>
                        </Row>
                        <Row>
                        <i className='fa fa-cogs p-3 fs-1'></i>
                        <a className='text-dark text-decoration-none' href='#'>
                            view more
                            <i className='feather icon-chevron-right'></i>
                            </a>
                        </Row>
                       
                    </div>
                </div>
                <div className='col-md-3 dashboard-stat purple-pulm'>
                    <div className='p-3  shadow-sm d-flex justify-content-around align-items-center rounded' style={{backgroundColor:'#19Bc9B'}}>
                        <Row>
                            <Col md={9}>
                                <h6 className='fs-1'>--</h6>
                                <small className='fs-6'>My Earnings</small>
                            </Col>
                            <Col>
                                
                            </Col>
                        </Row>
                        <Row>
                            <i className='fa fa-users p-3 fs-1'></i>
                            <a className='text-dark text-decoration-none' href='/#'>
                            view more
                            <i className='feather icon-chevron-right'></i>
                            </a>
                        </Row>
                        
                    </div>
                </div>
                <div className='col-md-3 dashboard-stat green-haze'>
                    <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded' style={{backgroundColor:'#8775A7'}}>
                    <Row>
                            <Col md={9}>
                                <h6 className='fs-1'>--</h6>
                                <small className='fs-6'>Pending Payments</small>
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

export default SE_Dash_upblocks
