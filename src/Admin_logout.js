import React,{useState} from 'react'
import {GetToken} from '../src/Api/auth'
import Cookies from 'js-cookie'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from './Header'
import Sidebar from './Sidebar'
import Admin_sidebar from './Admin_sidebar';

const Admin_Logout= (event)=>{
    const navigate=useNavigate();
    const access_token=GetToken();
    console.log(access_token)
    // Cookies.remove('access_token')
    // Cookies.remove('refresh_token')
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.localStorage.clear()
    // alert("do you want to logout")
    fetch('http://100.20.33.222:5000/admin/logout',{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(event)
        })

        const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <>
      
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className="main-container">
      <div >
                <div className=" position-absolute top-50 start-50 translate-middle col-6 shadow p-3 bg-body-tertiary rounded ">
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
    
  )

        // return(
            // <div >
            //     <div className=" position-absolute top-50 start-50 translate-middle col-6 shadow p-3 bg-body-tertiary rounded ">
            //         <div className='px-2 mx-5 mb-5 text-dark'>
            //             <h3>Welcome to EV MEC System</h3>
            //         </div>
            //         <big className='px-2 mx-5 mb-5 text-dark'>Please Click on your Role</big>
            //         <div className='px-2 mx-5 mb-5'style={{width:'50%'}}>
            //                 <Row>
            //                     <Button style={{backgroundColor:'#26C281',color:'white',border:'none'}} onClick={()=>navigate('/signin')}>Customer</Button>
            //                 </Row><br/>
            //                 <Row>
            //                     <Button style={{backgroundColor:'#3598DC',color:'white',border:'none'}} onClick={()=>navigate('/auth/service_signup')}>Service Engineer </Button>
            //                 </Row><br/>
            //                 <Row>
            //                     <Button style={{backgroundColor:'#BF55EC',color:'white',border:'none'}}>Admin</Button>
            //                 </Row>
                            
            //         </div>

            //     </div>
            // </div>
        // )
        

}

export default Admin_Logout
