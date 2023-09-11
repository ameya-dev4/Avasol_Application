import React from 'react'
import {Link} from 'react-router-dom'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'


function Admin_sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand text-white'>
                <i className='fa fa-flash'><b>Ameya</b></i>    
            </div>
            <span className='icon close_icon text-danger' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
                <Link to='/admin_mydash'>
                    {/* <BsFillArchiveFill className='icon'/> */}
                    <i className='feather icon-home'> My Dashboard</i>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/new_tickets'>
                    {/* <BsGrid1X2Fill className='icon'/> Dashboard */}
                    <i className='fa fa-server'> New Tickets</i>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/assigned_tickets'>
                    {/* <BsFillArchiveFill className='icon'/> */}
                    <i className='fa fa-server'> Assigned Tickets</i>
                </Link>
            </li>
            <li className='sidebar-list-item'>
            <Link to='/new_service_engg'>
                    {/* <BsFillArchiveFill className='icon'/> */}
                    <i className='fa fa-server'> New Service Engineers</i>
                </Link>
            </li>
            <li className='sidebar-list-item'>
            <Link to='/all_service_engg'>
                    {/* <BsFillArchiveFill className='icon'/> */}
                    <i className='fa fa-server'> All Service Engineers</i>
                </Link>
            </li>
            <li className='sidebar-list-item'>
            <Link to='/manage_users'>
                    {/* <BsFillArchiveFill className='icon'/> */}
                    <i className='feather icon-users'> Manage Users</i>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/admin_profile'>
                    {/* <BsFillArchiveFill className='icon'/> */}
                    <i className='feather icon-user'> My Profile</i>
                </Link>
        
            </li>
            <li className='sidebar-list-item'>
                <Link to='#'>
                    {/* <BsFillArchiveFill className='icon'/> */}
                    <i className='feather icon-clock'> Pending Payments</i>
                </Link>
        
            </li>
            <li className='sidebar-list-item'>
                <Link to='#'>
                    {/* <BsFillArchiveFill className='icon'/> */}
                    <i className='feather icon-zap'> Total Earnings</i>
                </Link>
        
            </li>
            <li className='sidebar-list-item'>
            <Link to='#'>
                    {/* <BsFillArchiveFill className='icon'/> */}
                    <i className='feather icon-settings'> Settings</i>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/admin_logout'>
                    {/* <BsFillArchiveFill className='icon'/> */}
                    <i className='feather icon-log-out'> Logout</i>
                </Link>
            </li>
        </ul>
    </aside>
  )
}

export default Admin_sidebar