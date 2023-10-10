import React ,{useState} from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Dashboard_upBlocks from './Dashboard_upBlocks'
import DisplayBattery from './batteryComponent'

function UserMyBatteries() {
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
        <Dashboard_upBlocks/>
        <DisplayBattery/>
      </main> 
      
        
    </div>

            
    
    </>
    
  )
}

export default UserMyBatteries
