
import React ,{useState,useEffect}from 'react'
import {Row,Col,Button,Card} from 'react-bootstrap'
import { GetToken } from "./Api/auth";
import SERVER_URL from './Server/Server';
import Table_Batteries from "./Table_Batteries";
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const authToken = GetToken();

function getCurrentDate() {
  
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
  const day = currentDate.getDate();

  return `${day}/${month}/${year}`;
}

const currentDate = getCurrentDate();
const url = `${SERVER_URL}user/get-battery-list`

function DisplayBattery(){
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const [TicketDetails, setTicketDetails] = useState([]);
    const navigate=useNavigate()
    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

    useEffect (()=> {
      async function fetchDetails(){
          const response = await fetch(url,{
              method : 'GET',
              headers : {
                  'Authorization' : `Bearer ${authToken}`,
                  'Content-type': 'application/json',
              },
          }).then((response) => response.json())
          .then((array_Details) =>{
              setTicketDetails(array_Details);
          })
        }
        fetchDetails();
    },[])

    return <>
    {TicketDetails.length > 0 ?
        <>
            <Row>
            <Col md={3} className='mx-4' >
            Records
            <select className="form-select " aria-label="Default select example">
                <option selected>5</option>
                <option value="15">15</option>
                <option value="50">50</option>
                <option value="All">All</option>
            </select>
            </Col>
            <Col ></Col>
            <Col md={3} className='mt-3' style={{textAlign:'right',marginRight:'2%'}}>
                <Typography variant='h4' ><Button  variant='contained' style={{backgroundColor:'lightseagreen',color:'white'}} onClick={()=>navigate('/battery_add')}  >Add Battery</Button> </Typography>
            </Col>
            
        </Row>
        <Table_Batteries array_Details={TicketDetails} />
      </>
      :
      <>
      <Row>
    
          <Col md={3} className='mx-4' >
          <Typography variant='h4' >No Batteries</Typography>
          </Col>
          <Col ></Col>
          <Col md={3} style={{textAlign:'right',marginRight:'2%'}}>
              <Typography variant='h5' ><Button  variant='contained' style={{backgroundColor:'lightseagreen',color:'white'}} onClick={()=>navigate('/battery_add')}  >Add Battery</Button> </Typography>
          </Col>
    
      </Row>
      </>
   
  }

</>      
    
}

export default DisplayBattery;