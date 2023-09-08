import React from 'react'
import {Row,Col, Breadcrumb} from "react-bootstrap"


function Dashboard_upBlocks() {
  return (
    <>
    <Breadcrumb/>
    <div className='px-3'>
        <div className='container-fluid px-1'> 
            <div className='row g-3 my-2'>
                <div className='col-md-3 dashboard-stat red-intense' >
                    <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded ' style={{backgroundColor:'#E35B5A'}}>
                        <Row>
                            <Col>
                                <h6 className='fs-1'>230</h6>
                            </Col>
                            <Col>
                            <small className='fs-6'>My Batteries</small>
                            </Col>
                                
                        </Row>
                        <Row >
                        <i className='fa fa-tasks p-3 fs-1 '></i>
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
                            <Col>
                            <h6 className='fs-1'>2321</h6>
                            </Col>
                            <Col>
                                <small className='fs-6'>My Service Tickets</small>
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
                <div className='col-md-3 dashboard-stat green-haze'>
                    <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded' style={{backgroundColor:'#44B6A6'}}>
                        <Row>
                            <Col>
                                <h6 className='fs-1'>2580</h6>
                            </Col>
                            <Col>
                                <small className='fs-6'>My Profile</small>
                            </Col>
                        </Row>
                        <Row>
                            <i className='fa fa-users p-3 fs-1'></i>
                            <a className='text-dark text-decoration-none' href='/user_profile'>
                            view more
                            <i className='feather icon-chevron-right'></i>
                            </a>
                        </Row>
                       
                    </div>
                </div>
                <div className='col-md-3 dashboard-stat purple-pulm'>
                    <div className='p-3  shadow-sm d-flex justify-content-around align-items-center rounded' style={{backgroundColor:'#8775A7'}}>
                        <Row>
                            <Col>
                                <h6 className='fs-1'>2345</h6>
                            </Col>
                            <Col>
                                <small className='fs-6'>My Payments</small>
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
    </>
  )
}

export default Dashboard_upBlocks
