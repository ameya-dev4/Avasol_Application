import { useState } from 'react'
import './App.css'

import Home from './Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp1 from './SignUp1'
import SignIn from './Signin'
import UserMyBatteries from './UserMyBatteries'
import LatestServRequest from './latestServRequest'
import Service_ReqPage from './Service_ReqPage'
import PaymentSuccess from './PaymentSuccess'
import NewRequest from './NewRequestPage'
import LocationPage from './LocationPage'
import LatestServReqHome from './LatestSerReqHome'
import PostNewBattery from './PostNewBattery'
import BatteryAdd from './BatteryAdd'
import Logout from './Logout'
import EditProfile from './Edit_profile'
import UserProfile from './UserProfile'
import AdminSignUp from './Admin_signup'
import Admin_Home from './Admin_Home'
import Admin_mainpage from './Admin_mainpage'
import AssignedTickets from './AssignedTickets'
import NewTickets from './NewTickets'
import NewServiceEngg from './NewServiceEngg'
import AllServiceEngg from './AllServiceEngineers'
import AdminMyProfile from './AdminMyProfile'
import Manage_Users from './Manage_Users'
import AdminMyDashboard from './AdminMyDashboard'
import Admin_logout from './Admin_logout'
import Admin_Edit_Profile from './Admin_Edit_Profile'



function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <>
    <Routes>
            <Route path='/' element={<SignIn/>} />
            <Route path='signup' element={<SignUp1/>}/>
            <Route path='signin' element={<SignIn/>}/>
            <Route path='userMyBatteries' element={<UserMyBatteries/>}/>
            <Route path='latest_serv_request' element={<LatestServRequest/>}/>
            <Route path='Service_ReqPage' element={<Service_ReqPage/>}/>
            <Route path='paysuccess' element={<PaymentSuccess/>}/>
            <Route path='newRequestPage' element={<NewRequest/>}/>
            <Route path='location' element={<LocationPage/>}/>
            <Route path='post_new_battery' element={<PostNewBattery/>}/>
            <Route path='battery_add' element={<BatteryAdd/>}/>
            <Route path='logout' element={<Logout/>}/>
            <Route path='edit_profile' element={<EditProfile/>}/>
            <Route path='user_profile' element={<UserProfile/>}/>

            <Route path='Admin_signup' element={<AdminSignUp/>}/>
            <Route path='admin_home' element={<Admin_Home/>}/>
            <Route path='assigned_tickets' element={<AssignedTickets/>}/>
            <Route path='new_tickets' element={<NewTickets/>}/>
            <Route path='new_service_engg' element={<NewServiceEngg/>}/>
            <Route path='all_service_engg' element={<AllServiceEngg/>}/>
            <Route path='admin_profile' element={<AdminMyProfile/>}/>
            <Route path='manage_users' element={<Manage_Users/>}/>
            <Route path='admin_mydash' element={<AdminMyDashboard/>}/>
            <Route path='admin_logout' element={<Admin_logout/>}/>
            <Route path='admin_profile_update' element={<Admin_Edit_Profile/>}/>

            
            
          </Routes>      
    </>
    
  )
}

export default App

