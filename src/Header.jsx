import React,{useState,useEffect} from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
import Header_dropdown from './header_dropdown'
import { Col,Row } from 'react-bootstrap'
import Admin_dropdown from './Admin_dropdown'
import SE_dropdown from './SE_dropdown'
import { GetToken } from './Api/auth'

function Header({OpenSidebar}) {

  const username=localStorage.getItem('username')
  const parse_username=JSON.parse(username)
  const accountType = localStorage.getItem('login_acoount');
  const parse_accountType=JSON.parse(accountType)
  const access_token=GetToken()

  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        <div className='header-right'>
            {access_token!==null?
            <Row>
            <Col>
              <h6>
                Welcome {parse_username}
              </h6> 
            </Col>
            <Col>
            {parse_accountType==='user'?<Header_dropdown/>:parse_accountType==='admin'?<Admin_dropdown/>:<SE_dropdown/>}
              
            </Col>
          </Row> : ""
          }
            
        </div>
    </header>
  )
}

export default Header