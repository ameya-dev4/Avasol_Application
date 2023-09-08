import React ,{useState} from "react";
import {Row,Col,Card,Form, Button, Container} from 'react-bootstrap'
import { GetToken } from "../src/Api/auth";
import 'bootstrap/dist/css/bootstrap.min.css'
import AdminDash_upblock from "./AdminDash_upblock";
import Admin_sidebar from "./Admin_sidebar";
import Header from "./Header";

const AllServiceEngg= () => {
    const [toggle,setToggle]=useState(true )
    const Toggle=()=>{
    setToggle(!toggle)
  }

    const access_token=GetToken();
    const user_name=localStorage.getItem('username')
    // const parse_username=JSON.parse(user_name)
    // fetch("http://avasol.ameyalabs.com:5000/get-user-details",{
    //   method:'POST',
    //   headers:{
    //     'Accept':'application/json',
    //     'Access-Control-Allow-Origin': 'https://localhost:3000',
    //     'Authorization':`Bearer ${access_token}`,
    //     'Content-Type':'application/json'
    //   },
    //   body:JSON.stringify(user_name)

    // }) 
    // .then(response=>response.json())
    //   .then(data=>{
    //     console.log("data",data)
    //     localStorage.setItem('userdetails',JSON.stringify(data))
        
    //   }).catch(error =>{
    //     console.error(error)
    //   })
      
      
  
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
        <AdminDash_upblock/><br/><br/>
        <div className="bg-primary rounded mb-3 text-white m-2 p-2 px-2 mx-3">
                <header><i className="fa fa-edit">  All Service Engineers</i></header>
            </div>
            <Row>
                <Col className="mx-3">
                    <Button variant='success'><i className='fa fa-plus '> Add New</i></Button>
                </Col>
            </Row><br/>
            <Row>
            <Col md={2} className="mx-3">
            <select className="form-select " aria-label="Default select example">
                <option selected>By Service engineer</option>
                <option value="15">15</option>
                <option value="50">50</option>
                <option value="All">All</option>
            </select>
            </Col>
            <Col md={2}>
            <select className="form-select " aria-label="Default select example">
                <option selected>By Service Location</option>
                <option value="15">15</option>
                <option value="50">50</option>
                <option value="All">All</option>
            </select>
            </Col>
            <Col md={2}>
            <select className="form-select " aria-label="Default select example">
                <option selected>By Performance</option>
                <option value="15">15</option>
                <option value="50">50</option>
                <option value="All">All</option>
            </select>
            </Col>
            <Col md={2}>
            <select className="form-select " aria-label="Default select example">
                <option selected>By status</option>
                <option value="15">15</option>
                <option value="50">50</option>
                <option value="All">All</option>
            </select>
            </Col>
            <Col>
                <Button variant='primary'> Submit</Button>
            </Col>
            </Row>

            
        <table class="table caption-top  table-hover rounded mt-3 px-3 mx-3" style={{backgroundColor:'#BFCAD1'}}>
            {/* <caption className='text- fs-4 text-dark'>New Service Engineers</caption> */}
            <thead>
                <tr>
                <th scope="col">First Name</th>
                <th scope="col">Contact No</th>
                <th scope="col">Email Id</th>
                <th scope="col">Govt Id</th>
                <th scope="col">Service Area</th>
                <th scope="col">Training</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td><a href='#' className='text-decoration-none'>Alex</a></td>
                <td scope="row">123</td>
                <td>Otto</td>
                <td>4389349834</td>
                <td>hyderabaad</td>
                <td>notes</td>
                <td><a href='#' className='text-decoration-none'>Edit</a></td>
                <td><a href='#' className='text-decoration-none'>Delete</a></td>
                </tr>
                <tr>
                <td><a href='#' className='text-decoration-none'>Alex</a></td>
                <td scope="row">342</td>
                <td>Thornton</td>
                <td>8919529551</td>
                <td>hyderabad</td>
                <td>notes</td>
                <td><a href='#' className='text-decoration-none'>Edit</a></td>
                <td><a href='#' className='text-decoration-none'>Delete</a></td>
                
                </tr>
                <tr>
                <td ><a href='#' className='text-decoration-none'>Alex</a></td>
                <td scope="row">453</td>
                <td>@twitter</td>
                <td>832389334</td>
                <td>hyderabad</td>
                <td>notes</td>
                <td><a href='#' className='text-decoration-none'>Edit</a></td>
                <td><a href='#' className='text-decoration-none'>delete</a></td>
                </tr>
            </tbody>
        </table>
        <p className="mx-3">Showing 1 to 5-6 entries</p>
        
  
      </main> 
          </div>
  
            
    
    </>

    )
}

export default AllServiceEngg;
