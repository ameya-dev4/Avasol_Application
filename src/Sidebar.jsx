import React from 'react'
import { GiMechanicGarage } from 'react-icons/gi'
import {Link} from 'react-router-dom'


function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand text-white'>
                {/* <i className='fa fa-flash'><b>Ameya</b></i> */}
                <GiMechanicGarage  className='icon_header '/> AMEYA
                
            </div>
            <span className='icon close_icon text-danger' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
        {/* <li className='sidebar-list-item'>
                <Link to='/Admin_signup'>
                    
                    <i className='feather icon-monitor'> Admin Signup</i>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/se_signup'>
                   
                    <i className='feather icon-users'> SE_SignUp</i>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/signup'>
                    
                    <i className='feather icon-users'> SignUp</i>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/signin'>
                    
                    <i className='feather icon-log-in'> Login</i>
                </Link>
            </li> */}
            <li className='sidebar-list-item'>
            <Link to='/latest_serv_request'>
                    
                    <i className='feather icon-home'> User DashBoard</i>
                </Link>
            </li>
            <li className='sidebar-list-item'>
            <Link to='/userMyBatteries'>
                   
                    <i className='fa fa-server'> My Batteries</i>
                </Link>
            </li>
            <li className='sidebar-list-item'>
            <Link to='/latest_serv_request'>
                    
                    <i className='fa fa-server'> My Service Request</i>
                </Link>
            </li>
            <li className='sidebar-list-item'>
            <Link to='/signin'>
                    
                    <i className='fa fa-money'> My Payments</i>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/user_profile'>
                    
                    <i className='feather icon-user'> My Profile</i>
                </Link>
        
            </li>
            <li className='sidebar-list-item'>
            <Link to='/logout'>
                    
                    <i className='feather icon-log-out'> Logout</i>
                </Link>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar