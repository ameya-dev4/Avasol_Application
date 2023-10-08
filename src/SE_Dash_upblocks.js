import React ,{useState,useEffect} from 'react'
import {Row,Col,Card} from 'react-bootstrap'
import Header from './Header'
import { GetToken } from './Api/auth';
import SERVER_URL from './Server/Server';

function SE_Dash_upblocks() {
    const [TicketDetails, setTicketDetails] = useState([]);
    const [openTickets ,setOpenTickets]=useState();
    const authToken=GetToken()
    const currentDate = getCurrentDate();
    const url = `${SERVER_URL}se/get-service-request-details`
    
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
            setOpenTickets(array_Details);
        })
      }
      fetchDetails();
  },[])

  const data1 = {
    status : 8
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
          const result=await response.json()
          setTicketDetails(result)
        }else{
          throw new Error('Failed to get Open Tickets details...!')
        }
        } catch (error) {
          console.error(error)
        }
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
                                <h6 className='fs-1'>{TicketDetails>0? TicketDetails.length:0}</h6>
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
                            <h6 className='fs-1'>{openTickets>0?openTickets.length:0}</h6>
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
