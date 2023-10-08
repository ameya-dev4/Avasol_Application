import React ,{useState,useEffect}from 'react'
import {Row,Col, Breadcrumb} from "react-bootstrap"
import { GetToken } from './Api/auth';
import SERVER_URL from './Server/Server';

function Dashboard_upBlocks() {
    const [batteries, setBatteries] = useState([]);
    const [latestRequests,setLatestRequests]=useState([])
    const access_token=GetToken();

    useEffect(() => {
        // Function to make the GET request
        async function getLatestRequests() {
          try {
            const response = await fetch(`${SERVER_URL}user/get-battery-list`,{
                method:"GET",
                headers:{
                    'Content-Type':"application/json",
                    "Authorization": "Bearer " + access_token,
                },
            });
            const data = await response.json();
            setBatteries(data);
            // console.log(data)
          } catch (error) {
            console.error('Error fetching latest requests:', error);
          }
        }
    
        // Call the function to get and display the latest service requests on page load
        getLatestRequests();
      }, [])

      //manage Latest Service Requests
      useEffect(() => {
        // Function to make the GET request
        async function getLatestRequests() {
          try {
            const response = await fetch(`${SERVER_URL}user/latest-service-requests`,{
                method:"GET",
                headers:{
                    'Content-Type':"application/json",
                    "Authorization": "Bearer " + access_token,
                },
            });
            const data = await response.json();
            setLatestRequests(data);
          } catch (error) {
            console.error('Error fetching latest requests:', error);
          }
        }
    
        // Call the function to get and display the latest service requests on page load
        getLatestRequests();
      }, [])
    
  return (
    <>
    <Breadcrumb/>
    <div className='px-3'>
        <div className='container-fluid px-1'> 
            <div className='row g-3 my-2'>
                <div className='col-md-3 dashboard-stat red-intense' >
                    <div className='p-3  shadow-sm d-flex justify-content-around align-items-center rounded ' style={{backgroundColor:'#E35B5A'}}>
                    {/* <i className='fa fa-tasks p-3 fs-1 opacity-25  ' aria-hidden="true" ></i> */}
                        <Row>
                            <Col md={9}>
                                <h6 className='fs-1'>{batteries.length >0 ?batteries.length:0}</h6>
                                <small className='fs-6'>My Batteries</small>
                            </Col>
                            <Col>
                            </Col>
                                
                        </Row>
                        <Row >
                        <i className='fa fa-tasks p-3 fs-1' ></i>
                            <a className='text-dark text-decoration-none' href='/userMyBatteries'>
                            view more
                            <i className='feather icon-chevron-right'></i>
                            </a>
                        </Row>

                        
                    </div>
                </div>
                <div className='col-md-3 bg-blue-madison bg-font-blue-madison'>
                    <div className='p-3  shadow-sm d-flex justify-content-around align-items-center rounded' style={{backgroundColor:'#578EBE'}}>
                        <Row>
                            <Col md={9}>
                            <h6 className='fs-1'>{latestRequests.length >0 ? latestRequests.length:0}</h6>
                            <small className='fs-6'>My Service Tickets</small>
                            </Col>
                            <Col>
                                
                            </Col>
                        </Row>
                        <Row>
                        <i className='fa fa-cogs p-3 fs-1'></i>
                        <a className='text-dark text-decoration-none' href='/latest_serv_request'>
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
                                <h6 className='fs-1'>--</h6>
                                <small className='fs-6'>My Payments</small>
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
                <div className='col-md-3 dashboard-stat green-haze'>
                    <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded' style={{backgroundColor:'#44B6A6'}}>
                        {/* <Row style={{marginLeft:'8px'}}>
                            <Col >
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{marginTop:'70px'}}>
                            <small className='fs-6'>My Profile</small>
                            </Col>
                            <Col>
                            <i className='fa fa-users p-3 fs-1'></i>
                            <a className='text-dark text-decoration-none' href='/user_profile'>
                            view more
                            <i className='feather icon-chevron-right'></i>
                            </a>
                            </Col>
                            
                        </Row> */}
                        <Row>
                            <Col md={9} style={{marginTop:'47px'}}>
                                <h6 className='fs-1 '></h6>
                                <small className='fs-6'>My Profile</small>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                        <Row >
                            <i className='fa fa-users p-3 fs-1'></i>
                            <a className='text-dark text-decoration-none' href='/user_profile'>
                            view more
                            <i className='feather icon-chevron-right'></i>
                            </a>
                        </Row>
                       
                    </div>
                </div>
            </div>
        
        </div>
    </div>
    </>
  )
}

export default Dashboard_upBlocks
