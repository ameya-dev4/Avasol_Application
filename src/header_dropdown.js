import React from 'react'
import {Dropdown} from 'react-bootstrap';
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
function Header_dropdown() {
    // let dropdownRightAlign = false;
    //     if (this.props.rtlLayout) {
    //         dropdownRightAlign = true;
    //     }
  return (
    <Dropdown>
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <BsPersonCircle  className='icon text-white'/>
                            </Dropdown.Toggle>
                            <ul>
                                <Dropdown.Menu>
                                    <li><a className="dropdown-item" href='/admin_signup'>Admin Login</a></li>
                                    <li><a className="dropdown-item" href='/signup'>User Signup</a></li>
                                    <li><a className="dropdown-item" href='/signin'>User Login</a></li>
                                </Dropdown.Menu>
                            </ul>
                        </Dropdown>
  )
}

export default Header_dropdown
