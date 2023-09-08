import React from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
import Header_dropdown from './header_dropdown'

function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        <div className='header-right'>
            {/* <BsFillBellFill  href='' className='icon'/> */}
            <Header_dropdown/>
            {/* <BsFillEnvelopeFill className='icon'/>
            <BsPersonCircle className='icon'/> */}
        </div>
    </header>
  )
}

export default Header