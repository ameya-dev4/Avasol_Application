import React from 'react'
import {Col, Dropdown, Row} from 'react-bootstrap';
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
 import { GetToken } from './Api/auth';
 
function Header_dropdown() {
    // let dropdownRightAlign = false;
    //     if (this.props.rtlLayout) {
    //         dropdownRightAlign = true;
    //     }
    const access_token=GetToken()
    
  return (
            <>
           
            <Dropdown>
                <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                    <BsPersonCircle  className='icon text-white'/>
                        </Dropdown.Toggle>
                            <ul>
                                {access_token!==null?
                                <Dropdown.Menu>
                                <li><a className="dropdown-item" href='/latest_serv_request'>Dashboard</a></li>
                                <li><a className="dropdown-item" href='/user_profile'>My profile</a></li>
                                <li><a className="dropdown-item" href='/signin'>About Us</a></li>
                                    {access_token!==null?
                                    <li><a className="dropdown-item" href='/logout'>Logout</a></li> :""
                                    }
                                        
                                </Dropdown.Menu> :
                                <li><a className="dropdown-item" href='/'>Not yet Login?</a></li>
                                }
                            </ul>
                </Dropdown>
            
            </>
  )
}

export default Header_dropdown
