import React,{useState} from 'react'
import Admin_sidebar from './Admin_sidebar'
import Dashboard_upBlocks from './Dashboard_upBlocks'
import Header from './Header'
import { Route, Routes } from 'react-router-dom'
import Admin_Home from './Admin_Home'
function Admin_mainpage() {
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
        <Routes>
            <Route path='/admin_home'  element={<Admin_Home/>}/>
        </Routes>
      </main> 
          </div>

            
    
    </>
    
  )
}

export default Admin_mainpage
