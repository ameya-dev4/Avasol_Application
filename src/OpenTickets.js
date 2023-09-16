import Header from "./Header";
import Admin_sidebar from "./Admin_sidebar";
import { GetToken } from "./Api/auth";
import { useState,useEffect } from "react";
import Table_comp from "../Table_Component";
import AdminDash_upblock from "./AdminDash_upblock";


const url = 'http://avasol.ameyalabs.com:5000/get-ticket-details'

function OpenTickets(){
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const [TicketDetails, setTicketDetails] = useState([]);
    
    const authToken = GetToken();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const data = {
    status : 2
  }

  useEffect (()=> {
    async function fetchDetails(){
        const response = await fetch(url,{
            method : 'POST',
            headers : {
                'Authorization' : `Bearer ${authToken}`,
                'Content-type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
            body : JSON.stringify(data)
        }).then((response) => response.json())
        .then((array_Details) =>{
            setTicketDetails(array_Details);
        })
      }
      fetchDetails();
  },[TicketDetails]) 

    return(
        <>
        <div className='grid-container'>
          <Header OpenSidebar={OpenSidebar}/>
          <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
          <main className="main-container">
          <AdminDash_upblock/>
          {TicketDetails.length > 0 ? <Table_comp array_Details={TicketDetails} /> : 
          <h2 className="mx-3 mt-3">No Tickets are Assigned</h2>}
          </main>
        </div>
         </>
    )
}

export default OpenTickets;