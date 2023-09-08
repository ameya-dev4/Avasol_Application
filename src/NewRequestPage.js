import React,{useState} from 'react'
import { Row, Col, Tabs, Tab,Form,Button } from 'react-bootstrap';
import Header from './Header';
import Sidebar from './Sidebar';
import { Navigate } from 'react-router-dom';
const  NewRequest=()=>{
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <>
      
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className="main-container">
      <Row>
                    <Col>
                        <h5>New Request Page</h5>
                        <hr/>
                        <Tabs defaultActiveKey="request">
                            <Tab eventKey="request" title="REQUEST">
                                <h5>Request Page</h5>
                            </Tab>
                            <Tab eventKey="payment" active={true} title="PAYMENT">
                                <h5>payment page</h5>
                            </Tab>
                            <Tab eventKey="confirm" title="CONFIRM">
                                <Form.Label>Enter Date of Request</Form.Label>
                                <Form.Control type="text" placeholder="Date of Request" /><br/>
                                <Form.Label>Enter Service Number</Form.Label>
                                <Form.Control type="text" placeholder="Service Number" /><br/>
                                <Form.Label>Make A Call</Form.Label>
                                <Form.Control type="text" placeholder="Call If Required" /><br/><br/><br/>
                                <Button variant='success'  > Done </Button>
                                    
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
      </main> 
      
        
    </div>

            
    
    </>
    
  )
//   return (
         
                // <Row>
                //     <Col>
                //         <h5>New Request Page</h5>
                //         <hr/>
                //         <Tabs defaultActiveKey="request">
                //             <Tab eventKey="request" title="REQUEST">
                //                 <h5>Request Page</h5>
                //             </Tab>
                //             <Tab eventKey="payment" active={true} title="PAYMENT">
                //                 <h5>payment page</h5>
                //             </Tab>
                //             <Tab eventKey="confirm" title="CONFIRM">
                //                 <Form.Label>Enter Date of Request</Form.Label>
                //                 <Form.Control type="text" placeholder="Date of Request" /><br/>
                //                 <Form.Label>Enter Service Number</Form.Label>
                //                 <Form.Control type="text" placeholder="Service Number" /><br/>
                //                 <Form.Label>Make A Call</Form.Label>
                //                 <Form.Control type="text" placeholder="Call If Required" /><br/><br/><br/>
                //                 <Button variant='success'  > Done </Button>
                                    
                //             </Tab>
                //         </Tabs>
                //     </Col>
                // </Row>
//   )
}

export default NewRequest;

