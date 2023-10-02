import React, { useEffect, useState } from 'react';
import { GetToken } from '../src/Api/auth';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Admin_sidebar from './Admin_sidebar';
import SERVER_URL from './Server/Server';

const Admin_Logout = (event) => {
  const navigate = useNavigate();
  const access_token = GetToken();
  const send_token = access_token;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const token = { access_token: send_token };
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}admin/logout`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(token),
        });
        if (response.ok) {
          document.cookie =
            'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie =
            'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          window.localStorage.clear();
        } else {
          // Check if the response has a JSON error message
          const result = await response.json();
          if (result.message) {
            setError(result.message);
          } else {
            throw new Error('Admin Logout Failed...!');
          }
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : data ? (
        <>
      
        <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <main className="main-container">
            <div >
                    <div className=" position-absolute top-50 start-50 translate-middle col-6 shadow p-3 bg-body-tertiary rounded bg-white">
                        <div className='px-2 mx-5 mb-5 text-dark'>
                            <h3>Welcome to EV MEC System</h3>
                        </div>
                        <big className='px-2 mx-5 mb-5 text-dark'>Please Click on your Role</big>
                        <div className='px-2 mx-5 mb-5'style={{width:'50%'}}>
                                <Row>
                                    <Button style={{backgroundColor:'#26C281',color:'white',border:'none'}} onClick={()=>navigate('/')}>Customer</Button>
                                </Row><br/>
                                <Row>
                                    <Button style={{backgroundColor:'#3598DC',color:'white',border:'none'}} onClick={()=>navigate('/')}>Service Engineer </Button>
                                </Row><br/>
                                <Row>
                                    <Button style={{backgroundColor:'#BF55EC',color:'white',border:'none'}}  onClick={()=>navigate('/')}>Admin</Button>
                                </Row>
                                
                        </div>

                    </div>
                </div>
        </main> 

            
    </div>          
        
    </>
      ) : (
        <div className="position-absolute top-50 start-50 translate-middle col-1 shadow p-3 bg-body-tertiary rounded">
          <div className="text-center py-1 px-2">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-dark d-flex justify-content-center">Loading....</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin_Logout;
