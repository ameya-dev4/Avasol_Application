import React,{useState} from 'react'
import { Row, Col, Tabs, Tab} from 'react-bootstrap';
import Payment from './Payment';
import LocationPage from './LocationPage';
import PostNewBattery from './PostNewBattery';
import Sidebar from './Sidebar';
import Header from './Header';




const Service_ReqPage = () => {
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
                <hr/>
                <Tabs defaultActiveKey="battery">
                    <Tab eventKey="battery" title="BATTERY">
                        <PostNewBattery/>
                    </Tab>
                    <Tab eventKey="location" title="LOCATION">
                        <LocationPage/>
                    </Tab>
                    <Tab eventKey="confirm" title="CONFIRM">
                        <h2> Confirmation Page</h2>
                        {/* <PaymentSuccess/> */}
                    </Tab>
                    <Tab eventKey="payment" title="PAYMENT">
                        <Payment/>
                    </Tab>
                </Tabs>
            </Col>
        </Row>
      </main> 
      
        
    </div>

            
    
    </>
    
  )
//   return (
//     <>
        // <Row>
        //     <Col>
        //         <hr/>
        //         <Tabs defaultActiveKey="battery">
        //             <Tab eventKey="battery" title="BATTERY">
        //                 <PostNewBattery/>
        //             </Tab>
        //             <Tab eventKey="location" title="LOCATION">
        //                 <LocationPage/>
        //             </Tab>
        //             <Tab eventKey="confirm" title="CONFIRM">
        //                 <h2> Confirmation Page</h2>
        //                 {/* <PaymentSuccess/> */}
        //             </Tab>
        //             <Tab eventKey="payment" title="PAYMENT">
        //                 <Payment/>
        //             </Tab>
        //         </Tabs>
        //     </Col>
        // </Row>
//   </>
// )

}

export default Service_ReqPage;
