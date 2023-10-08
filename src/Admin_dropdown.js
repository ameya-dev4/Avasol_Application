import React from 'react'
import {Col, Dropdown, Row} from 'react-bootstrap';
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
 import { GetToken } from './Api/auth';
 
function Admin_dropdown() {
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
                                <Dropdown.Menu>
                                <li><a className="dropdown-item" href='/admin_home'>Dashboard</a></li>
                                <li><a className="dropdown-item" href='/admin_profile'>My profile</a></li>
                                <li><a className="dropdown-item" href='#'>About Us</a></li>
                                    {access_token!==null?
                                    <li><a className="dropdown-item" href='/admin_logout'>Logout</a></li> :""
                                    }
                                        
                                </Dropdown.Menu>
                            </ul>
                </Dropdown>
            
            </>
  )
}

export default Admin_dropdown