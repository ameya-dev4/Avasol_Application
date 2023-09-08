import React ,{useState} from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import ViewBatteryDetails from './ViewBatterDetails'

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
        <ViewBatteryDetails/>
      </main> 
      
        
    </div>

            
    
    </>
    
  )
}

export default UserMyBatteries
