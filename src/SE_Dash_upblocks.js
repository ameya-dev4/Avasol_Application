import React ,{useState,useEffect} from 'react'
import {Row,Col,Card} from 'react-bootstrap'
import Header from './Header'
import { GetToken } from './Api/auth';


function SE_Dash_upblocks() {
    const [TicketDetails, setTicketDetails] = useState([]);
    const [All_serv_engg ,setAll_Serv_engg]=useState();
    const authToken=GetToken()
    const currentDate = getCurrentDate();
    const url = 'http://100.20.33.222:5000/se/get-service-request-details'
    
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
    const day = currentDate.getDate();
  
    return `${day}/${month}/${year}`;
  }


  const data = {
    serviceDate : currentDate,
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
            body : JSON.stringify(data),
        }).then((response) => response.json())
        .then((array_Details) =>{
            setTicketDetails(array_Details);
        })
      }
      fetchDetails();
  },[])

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
