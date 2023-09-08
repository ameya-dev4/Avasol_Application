import React from 'react'
import {Link} from 'react-router-dom'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'


function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand text-white'>
                {/* <BsCart3  className='icon_header text-white'/> */}
                <i className='fa fa-flash'><b>Ameya</b></i>
                
            </div>
            <span className='icon close_icon text-danger' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
                <Link to='/Admin_signup'>
                    {/* <BsFillArchiveFill className='icon'/> */}
                    <i className='feather icon-monitor'> Admin Signup</i>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/signup'>
                    {/* <BsGrid1X2Fill className='icon'/> Dashboard */}
                    <i className='feather icon-users'> SignUp</i>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/signin'>
                    {/* <BsFillArchiveFill className='icon'/> */}
                    <i className='feather icon-log-in'> Login</i>
                </Link>
            </li>
            <li className='sidebar-list-item'>
            <Link to='/latest_serv_request'>
                    {/* <BsFillArchiveFill className='icon'/> */}
                    <i className='feather icon-home'> User DashBoard</i>
                </Link>
            </li>
            <li className='sidebar-list-item'>
            <Link to='/userMyBatteries'>
                    {/* <BsFillArchiveFill className='icon'/> */}
                    <i className='fa fa-server'> My Batteries</i>
                </Link>
            </li>
            <li className='sidebar-list-item'>
            <Link to='/latest_serv_request'>
                    {/* <BsFillArchiveFill className='icon'/> */}
                    <i className='fa fa-server'> My Service Request</i>
                </Link>
            </li>
            <li className='sidebar-list-item'>
            <Link to='/signin'>
                    {/* <BsFillArchiveFill className='icon'/> */}
                    <i className='fa fa-money'> My Payments</i>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/user_profile'>
                    {/* <BsFillArchiveFill className='icon'/> */}
                    <i className='feather icon-user'> My Profile</i>
                </Link>
        
            </li>
            <li className='sidebar-list-item'>
            <Link to='/logout'>
                    {/* <BsFillArchiveFill className='icon'/> */}
                    <i className='feather icon-log-out'> Logout</i>
                </Link>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar