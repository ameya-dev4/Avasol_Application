import React,{useEffect, useState} from 'react'
import {GetToken} from '../src/Api/auth'
import Cookies from 'js-cookie'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from './Header'
import Sidebar from './Sidebar'
import SERVER_URL from './Server/Server';

const Logout= (event)=>{
    const navigate=useNavigate();
    const access_token=GetToken()
    const data={
        access_token:access_token
    }
    console.log("data",data)
    const parse_data=JSON.stringify(data)
    console.log("pares",parse_data)
    const handleLogout = async () => {
        try {
          const response = await fetch(`${SERVER_URL}user/logout`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`,
            },
            body: JSON.stringify(parse_data),
          });
    
          if (response.ok) {
            // Logout successful
            document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            window.localStorage.clear();
            navigate('/login');
          } else {
            const errorData = await response.json();
          }
        } catch (error) {
          console.error('Logout failed:', error);
        }
      };

      useEffect(()=>{
        handleLogout()
      })
    
        const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <>
      
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className="main-container ">
      <div >
                <div className=" position-absolute top-50 start-50 translate-middle col-6 shadow p-3 bg-body-tertiary rounded bg-white ">
                    <div className='px-2 mx-5 mb-5 text-dark'>
                        <h3>Welcome to EV MEC System</h3>
                    </div>
                    <big className='px-2 mx-5 mb-5 text-dark'>Please Click on your Role</big>
                    <div className='px-2 mx-5 mb-5'style={{width:'50%'}}>
                            <Row>
                                <Button style={{backgroundColor:'#26C281',color:'white',border:'none'}} onClick={()=>navigate('/signin')}>Customer</Button>
                            </Row><br/>
                            <Row>
                                <Button style={{backgroundColor:'#3598DC',color:'white',border:'none'}} onClick={()=>navigate('/')}>Service Engineer </Button>
                            </Row><br/>
                            <Row>
                                <Button style={{backgroundColor:'#BF55EC',color:'white',border:'none'}} onClick={()=>navigate('/signin')}>Admin</Button>
                            </Row>
                            
                    </div>

                </div>
            </div>
      </main> 

        
          </div>

            
    
    </>
    
  )

        

}

export default Logout
