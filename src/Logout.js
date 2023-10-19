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
        access_token:"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJMOG01a0x2OHpqR2ZZOUZVY1pUSnAwQ3BaVW92M0tjQXNkeWlFc3dwZ3pBIn0.eyJleHAiOjE2OTc2MzE4MDksImlhdCI6MTY5NzYyODIwOSwianRpIjoiZDBkNDExMTAtYzQyNi00NzIzLTk5MzYtMjlmMjdiMTZkYWRiIiwiaXNzIjoiaHR0cDovLzQ0LjIzMC4yMy4xMzo4MDgwL3JlYWxtcy9ldmNybS11c2VycyIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiI5MWE1MjZmMS0wZjcxLTQwZmYtYjBhYS1kODVlMWU3YTFkODEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJldmNybS11c2VycyIsInNlc3Npb25fc3RhdGUiOiIxZDdlNTcyYS03ODA4LTQwMzAtYTY2OS02YTRhZGMzMmZlOWUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly8xMDAuMjAuMzMuMjIyLzo1MDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWF2YXNvbC11c2VycyIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJjdXN0b21lciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsibWFuYWdlLXJlYWxtIiwiaW1wZXJzb25hdGlvbiIsIm1hbmFnZS11c2VycyIsInZpZXctdXNlcnMiLCJxdWVyeS1ncm91cHMiLCJxdWVyeS11c2VycyJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgbWljcm9wcm9maWxlLWp3dCBlbWFpbCBwcm9maWxlIiwic2lkIjoiMWQ3ZTU3MmEtNzgwOC00MDMwLWE2NjktNmE0YWRjMzJmZTllIiwidXBuIjoiYW1leWEiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJMYWJzIEFtZXlhIiwiZ3JvdXBzIjpbImRlZmF1bHQtcm9sZXMtYXZhc29sLXVzZXJzIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImN1c3RvbWVyIl0sInByZWZlcnJlZF91c2VybmFtZSI6ImFtZXlhIiwiZ2l2ZW5fbmFtZSI6IkxhYnMiLCJmYW1pbHlfbmFtZSI6IkFtZXlhIiwiZW1haWwiOiJhbWV5YWxhYnNkZXYxQGdtYWlsLmNvbSJ9.vO-TbRSNlFh7vT7hCJshiCWvfdDlSujBKv1ts7lbKKYHjx2o1MVB_aodt1hkSRqspKRO6X7WLAYfdWisbwfc7KQeJ4VeyfEVZgnN5xL96Pou7cNO3-isfjWXsUigsA_vbOKgQl64NQFPNrb6yhsEnFC4EVN_t24ochCW3OMuuEHOL816ddxXPcat08FBmEGBkwEcykYyXJsL-TBYbZfg_uW1WPQEMjCrr4FM1mBDbg9XODtt3nyMGbnL0fFPW8W2ZdZPGhhZVAmDPAR6vBnFRoDumWA_Iis5EXhBF7xSlt_rOpawK0mXX5Hzo35OggEWIW540g6CsuXFOP_8c_IdIA"
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
            body: JSON.stringify(data),
          });
            // Logout successful
            document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            window.localStorage.clear();
            // navigate('/login');
          
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
