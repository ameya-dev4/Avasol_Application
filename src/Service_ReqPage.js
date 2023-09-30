import React,{useState} from 'react'
import { Row, Col, Tabs, Tab,Card} from 'react-bootstrap';
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
      <PostNewBattery/>

    {/* <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className="main-container text-dark">
          
      <Card className="shadow p-3 mb-5 bg-body-tertiary rounded ">
          <Row>
                <Col>
                    <hr/>
                    <Tabs defaultActiveKey="battery">
                        <Tab eventKey="battery" title="BATTERY">
                            
                        </Tab>
                        <Tab eventKey="location" title="LOCATION">
                            <LocationPage/>
                        </Tab>
                        <Tab eventKey="confirm" title="CONFIRM">
                            <h2> Confirmation Page</h2>
                    
                        </Tab>
                        <Tab eventKey="payment" title="PAYMENT">
                            <Payment/>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Card>
      </main> 
      
        
    </div> */}

            
    
    </>
    
  )


}

export default Service_ReqPage;
