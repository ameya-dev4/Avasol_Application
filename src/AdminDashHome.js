import React from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import ServiceNav from './AdminNav'
import AdminDash_upblock from './AdminDash_upblock'

function AdminDashHome({Toggle}) {
  return (
    <>
    <AdminDash_upblock/><br/><br/><br/>
        <Row>
            <Col>
                <Button variant='success'><i className='fa fa-plus'> Add New</i></Button>
            </Col>
            Records
            <Col md={3}>
            <select className="form-select " aria-label="Default select example">
                <option selected>5</option>
                <option value="15">15</option>
                <option value="50">50</option>
                <option value="All">All</option>
            </select>
            </Col>
        </Row>
        
        <table class="table caption-top  table-hover rounded mt-3 px-3" style={{backgroundColor:'#BFCAD1'}}>
            <caption className='text- fs-4 text-dark'>Manage Users</caption>
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Description</th>
                <th scope="col">Customer Name</th>
                <th scope="col">SE Name</th>
                <th scope="col">Open Date</th>
                <th scope="col">Status</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">Alexa</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td><a href='#' className='text-decoration-none'>Edit</a></td>
                <td><a href='#' className='text-decoration-none'>Delete</a></td>
                </tr>
                <tr>
                <th scope="row">Ramu</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Mark</td>
                <td>Otto</td>
                <td><a href='#' className='text-decoration-none'>Edit</a></td>
                <td><a href='#' className='text-decoration-none'>Delete</a></td>
                
                </tr>
                <tr>
                <th scope="row">Sita</th>
                <td >Larry the Bird</td>
                <td>@twitter</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td><a href='#' className='text-decoration-none'>Edit</a></td>
                <td><a href='#' className='text-decoration-none'>delete</a></td>
                </tr>
            </tbody>
        </table>
        <p>Showing 1 to 5-6 entries</p>
    </>
  )
}

export default AdminDashHome
