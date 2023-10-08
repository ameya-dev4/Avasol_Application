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
import PostNewBattery from './PostNewBattery'
import BatteryAdd from './BatteryAdd'
import Logout from './Logout'
import EditProfile from './Edit_profile'
import UserProfile from './UserProfile'
import AdminSignUp from './Admin_signup'
import Admin_Home from './Admin_Home'

import AssignedTickets from './AssignedTickets'
import NewTickets from './NewTickets'
import NewServiceEngg from './NewServiceEngg'
import AllServiceEngg from './AllServiceEngineers'
import AdminMyProfile from './AdminMyProfile'
import Manage_Users from './Manage_Users'
import AdminMyDashboard from './AdminMyDashboard'
import Admin_logout from './Admin_logout'
import Admin_Edit_Profile from './Admin_Edit_Profile'

//Service Engineer
import SE_MyDashboard from './SE_MyDashboard'
import SE_TicketsToday from './SE_TodayTickets'
import SE_OpenTickets from './SE_openTickets'
import SE_TotalTickets from './SE_TotalTickets'
import SE_Dash_upblocks from './SE_Dash_upblocks'
import SE_MyProfile from './SE_myProfile'
import SE_signUp from './SE_signup'
import UpdateNewTickets from './UpdateNewTicket'
import Update from './SE_updateComp'
import UpdateBattery from './UpdateBattery'
import UpdateLatestServReq from './update_latest_serv_req'
import EditSe_Profile from './SE_EditProfile'
import SE_UpdateTicket from './SE_UpdateTicket'
import SE_Logout from './SE_logout'
import LatestServReqHome from './LatestSerReqHome'
import Admin_Logout from './Admin_logout'


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
            <Route path='latest_serv_request' element={<LatestServReqHome/>}/>
            <Route path='Service_ReqPage' element={<Service_ReqPage/>}/>
            <Route path='paysuccess' element={<PaymentSuccess/>}/>
            <Route path='newRequestPage' element={<NewRequest/>}/>
            <Route path='location' element={<LocationPage/>}/>
            <Route path='post_new_battery' element={<PostNewBattery/>}/>
            <Route path='battery_add' element={<BatteryAdd/>}/>
            <Route path='logout' element={<Logout/>}/>
            <Route path='edit_profile' element={<EditProfile/>}/>
            <Route path='user_profile' element={<UserProfile/>}/>
            <Route path='update_latestServRequest' element={<UpdateLatestServReq/>}/>
            <Route path='update_battery' element={<UpdateBattery/>}/>

            
            <Route path='Admin_signup' element={<AdminSignUp/>}/>
            <Route path='admin_home' element={<Admin_Home/>}/>
            <Route path='assigned_tickets' element={<AssignedTickets/>}/>
            <Route path='new_tickets' element={<NewTickets/>}/>
            <Route path='new_service_engg' element={<NewServiceEngg/>}/>
            <Route path='all_service_engg' element={<AllServiceEngg/>}/>
            <Route path='admin_profile' element={<AdminMyProfile/>}/>
            <Route path='manage_users' element={<Manage_Users/>}/>
            <Route path='admin_mydash' element={<AdminMyDashboard/>}/>
            <Route path='admin_logout' element={<Admin_Logout/>}/>
            <Route path='admin_profile_update' element={<Admin_Edit_Profile/>}/>
            <Route path='update_ticket_details' element={<UpdateNewTickets/>}/>
            <Route path='update_se' element={<Update/>}/>
            <Route path='update_asigned_ticket' element={<UpdateNewTickets/>}/>
            <Route path='update_new_ticket' element={<UpdateNewTickets/>}/>



            <Route exact path="/se_signup" element={<SE_signUp/>} />
            <Route exact path="/se_myDashboard" element={<SE_MyDashboard  />} />
            <Route exact path='/se_todayTickets' element={<SE_TicketsToday  />} />
            <Route exact path='/se_openTickets' element={<SE_OpenTickets />} />
            <Route exact path='/se_totalTickets' element={<SE_TotalTickets />} />
            <Route exact path='/se_pendingAmount' element={<SE_Dash_upblocks />} />
            <Route exact path='/se_Earnings' element={<SE_Dash_upblocks />} />
            <Route exact path='/se_myProfile' element={<SE_MyProfile />} />
            <Route exact path='/se_logout' element={<SE_Logout/> } />
            <Route exact path='/se_update_ticket_details' element = {<SE_UpdateTicket/>} />
            <Route exact path='/update-Profile' element={<EditSe_Profile/>} />
            
            
          </Routes>      
    </>
    
  )
}

export default App

