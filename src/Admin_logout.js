import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button,Row,Col } from 'react-bootstrap';
import { GetToken } from './Api/auth';
import Header from './Header';
import Admin_sidebar from './Admin_sidebar';
import SERVER_URL from './Server/Server';

function Admin_Logout() {
  const navigate = useNavigate();
  const access_token = GetToken();
  const [logoutError, setLogoutError] = useState(null);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${SERVER_URL}admin/logout`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify({ 'access_token': access_token }),
      });

        // Logout successful
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.localStorage.clear();
        navigate('/signin');
     
    } catch (error) {
      console.error('Logout failed:', error);
      setLogoutError('Logout failed');
    }
  };

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <>
      
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
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
  );
}

export default Admin_Logout;
