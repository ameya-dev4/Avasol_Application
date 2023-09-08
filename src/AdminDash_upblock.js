import React ,{useState} from 'react'
import {Row,Col,Card} from 'react-bootstrap'
import Header from './Header'


function AdminDash_upblock() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='px-3'>
       {/* <Header OpenSidebar={OpenSidebar}/> */}
        <div>
            <h2 className='mx-2'>Admin Dashboard</h2>
        </div>
        <div className='container-fluid px-1'> 
            <div className='row g-3 my-2'>
                <div className='col-md-3 dashboard-stat red-intense' >
                    <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded ' style={{backgroundColor:'#E35B5A'}}>
                        <Row>
                            <Col>
                                <h6 className='fs-1'>50</h6>
                            </Col>
                            <Col>
                            <p className='fs-6'>Manage Tickets</p>
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
                            <Col>
                            <h6 className='fs-1'>21</h6>
                            </Col>
                            <Col>
                                <p className='fs-6'>Manage Service Engineers</p>
                            </Col>
                        </Row>
                        <Row>
                        <i className='fa fa-cogs p-3 fs-1'></i>
                        <a className='text-dark text-decoration-none' href='/all_service_engg'>
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
                                <h6 className='fs-1'>280</h6>
                            </Col>
                            <Col>
                                <p className='fs-6'>Manage Users</p>
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
                <div className='col-md-3 dashboard-stat purple-pulm'>
                    <div className='p-3  shadow-sm d-flex justify-content-around align-items-center rounded' style={{backgroundColor:'#8775A7'}}>
                        <Row>
                            <Col>
                                <h6 className='fs-1'>25</h6>
                            </Col>
                            <Col>
                                <p className='fs-6'>Manage Payments</p>
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
