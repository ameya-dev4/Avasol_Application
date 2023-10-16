import Header from "./Header";
import { Typography } from "@mui/material";
import Admin_sidebar from "./Admin_sidebar";
import { useState,useEffect } from "react";
import { GetToken } from "./Api/auth";
import Table_SE from "./Table_SE";
import AdminDash_upblock from "./AdminDash_upblock";
import SERVER_URL from "./Server/Server";
const authToken = GetToken();


function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
  const day = currentDate.getDate();

  return `${day}/${month}/${year}`;
}

const currentDate = getCurrentDate();
const url = `${SERVER_URL}admin/get-service-engineers`

function AllServiceEngineers(){
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const [TicketDetails, setTicketDetails] = useState([]);

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

    useEffect (()=> {
      async function fetchDetails(){
          const response = await fetch(url,{
              method : 'POST',
              headers : {
                  'Authorization' : `Bearer ${authToken}`,
                  'Content-type': 'application/json',
              },
              body : JSON.stringify({status:-1}),
          }).then((response) => response.json())
          .then((array_Details) =>{
              setTicketDetails(array_Details);
              console.log(array_Details);
              
          })
        }
        fetchDetails();
    },[])


    return <>
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <main className="main-container">
    <AdminDash_upblock />
    <Typography  variant='h4' className='mx-3 mt-5'>All Service Engineers</Typography>
    {TicketDetails.length > 0 ? <Table_SE array_Details={TicketDetails} /> : 
      <h2 className="mx-3 mt-3">Service Engineer Details Display Here</h2>}
    </main>
    </div>  
    </>
}

export default AllServiceEngineers;
