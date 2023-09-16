
import Header from "./Header";
import { useState,useEffect } from "react";
import { GetToken } from "./Api/auth";
import SE_Sidebar from "./SE_Sidebar";
import SE_Dash_upblocks from "./SE_Dash_upblocks";
import SE_Table_comp from "./SE_Table_comp";

const authToken = GetToken();

function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
  const day = currentDate.getDate();

  return `${day}/${month}/${year}`;
}

const currentDate = getCurrentDate();
const url = 'http://avasol.ameyalabs.com:5000/get-ticket-details'

function SE_TicketsToday(){
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const [TicketDetails, setTicketDetails] = useState([]);

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

    const data = {
      serviceDate : currentDate,
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
              body : JSON.stringify(data),
          }).then((response) => response.json())
          .then((array_Details) =>{
              setTicketDetails(array_Details);
          })
        }
        fetchDetails();
    },[TicketDetails])

    return <>
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <SE_Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <main className="main-container">
    <SE_Dash_upblocks />
    {TicketDetails.length > 1 ? <SE_Table_comp array_Details={TicketDetails} /> : 
      <h2  className="mx-3 mt-3">No Tickets are Assigned for you Today</h2>}
    </main>
    </div>
    </>
}

export default SE_TicketsToday;