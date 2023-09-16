import React from 'react'
import { BsPeopleFill,  BsFillGearFill}from 'react-icons/bs';
 import {FaHome,FaClipboardList,FaMoneyBillWave } from 'react-icons/fa';
 import {MdOutlinePendingActions} from 'react-icons/md'
import {GiMechanicGarage} from "react-icons/gi";
import {Link} from "react-router-dom"

 

function SE_Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <GiMechanicGarage  className='icon_header'/> AMEYA
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
            <Link to="/se_myDashboard">
                    <FaHome className='icon'/> My Dashboard
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/se_todayTickets">
                    <FaClipboardList className='icon'/> Today's Tickets
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/se_openTickets">
                    <FaClipboardList className='icon'/> Open Tickets
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/se_totalTickets">
                    <FaClipboardList className='icon'/>Total Tickets
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/se_pendingAmount">
                    <MdOutlinePendingActions className='icon'/> Pending Amounts
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/se_Earnings">
                    <FaMoneyBillWave className='icon'/> Total Earnings
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/se_myprofile">
                    <BsPeopleFill className='icon'/> My Profile
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/se_logout">
                    <BsFillGearFill className='icon'/> Logout
                </Link>
            </li>
        </ul>
    </aside>
  )
}

export default SE_Sidebar