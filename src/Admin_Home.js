import React,{useState} from 'react'
import Admin_sidebar from './Admin_sidebar'
import Dashboard_upBlocks from './Dashboard_upBlocks'
import Header from './Header'
import AdminDash_upblock from './AdminDash_upblock'
function Admin_Home() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <>
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className="main-container">
        <AdminDash_upblock/>
      </main> 
          </div>

            
    
    </>
    
  )
}

export default Admin_Home
