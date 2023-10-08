// import React,{useState} from 'react'
// import {GetToken} from '../src/Api/auth'
// import { Button, Card, Col, Row } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import Header from './Header'

// import Admin_sidebar from './Admin_sidebar';
// import SERVER_URL from './Server/Server';

// const Admin_Logout= (event)=>{
//     const navigate=useNavigate();
//     const access_token=GetToken();
//     const send_token=access_token
//     // Cookies.remove('access_token')
//     // Cookies.remove('refresh_token')
//     // alert("do you want to logout")
//     const token={access_token:send_token}
//     fetch(`${SERVER_URL}admin/logout`,{
//             method:'POST',
//             mode:'cors',
//             headers:{
//                 'Content-Type': 'application/json',
//                 'Authorization':`Bearer ${access_token}`
                
//             },
//             body:JSON.stringify(token)
//         }).then((resp)=>resp.json())
//         .then((data)=>{
//             document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//             document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//             window.localStorage.clear()
//             console.log(data)
//         }).catch((err)=>{
//             console.error("logout Failed...!",err)
//         })

//         const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle)
//   }

//   return (
//     <>
      
//     <div className='grid-container'>
//       <Header OpenSidebar={OpenSidebar}/>
//       <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
//       <main className="main-container">
//       <div >
//                 <div className=" position-absolute top-50 start-50 translate-middle col-6 shadow p-3 bg-body-tertiary rounded bg-white">
//                     <div className='px-2 mx-5 mb-5 text-dark'>
//                         <h3>Welcome to EV MEC System</h3>
//                     </div>
//                     <big className='px-2 mx-5 mb-5 text-dark'>Please Click on your Role</big>
//                     <div className='px-2 mx-5 mb-5'style={{width:'50%'}}>
//                             <Row>
//                                 <Button style={{backgroundColor:'#26C281',color:'white',border:'none'}} onClick={()=>navigate('/')}>Customer</Button>
//                             </Row><br/>
//                             <Row>
//                                 <Button style={{backgroundColor:'#3598DC',color:'white',border:'none'}} onClick={()=>navigate('/')}>Service Engineer </Button>
//                             </Row><br/>
//                             <Row>
//                                 <Button style={{backgroundColor:'#BF55EC',color:'white',border:'none'}}  onClick={()=>navigate('/')}>Admin</Button>
//                             </Row>
                            
//                     </div>

//                 </div>
//             </div>
//       </main> 

        
//           </div>

            
    
//     </>
    
//   )
// }

// export default Admin_Logout

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
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

      if (response.ok) {
        // Logout successful
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.localStorage.clear();
        navigate('/login');
      } else {
        const errorData = await response.json();
        if (errorData && errorData.detail) {
          // If 'detail' exists in the error response, set it as the logout error message
          setLogoutError(errorData.detail);
        } else {
          // Handle other types of errors
          setLogoutError('Logout failed');
        }
      }
    } catch (error) {
      console.error('Logout failed:', error);
      setLogoutError('Logout failed');
    }
  };

  return (
    <>
      <Header />
      <Admin_sidebar />
      <div className="container">
        <h2>Logout</h2>
        {logoutError && <p className="text-danger">{logoutError}</p>}
        <Button variant="primary" onClick={handleLogout}>Logout</Button>
      </div>
    </>
  );
}

export default Admin_Logout;
