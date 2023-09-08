import React,{useState}from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
function Upblock_comp() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
  return (
    <div>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    </div>
  )
}

export default Upblock_comp
