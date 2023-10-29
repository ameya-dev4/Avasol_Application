import Header from "./Header";
import Admin_sidebar from "./Admin_sidebar";
import { useState,useEffect } from "react";
import { GetToken } from "./Api/auth";
import Table_SE from "./Table_SE";
import AdminDash_upblock from "./AdminDash_upblock";
import SERVER_URL from "./Server/Server";
import Table_ManageUsers from "./Table_ManageUsers";

const authToken = GetToken();

function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
  const day = currentDate.getDate();

  return `${day}/${month}/${year}`;
}

const currentDate = getCurrentDate();
const url = `${SERVER_URL}admin/get-users`

function Manage_Users(){
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const [TicketDetails, setTicketDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

    useEffect (()=> {
      async function fetchDetails(){
        try{
          const response = await fetch(url,{
              method : 'POST',
              headers : {
                  'Authorization' : `Bearer ${authToken}`,
                  'Content-type': 'application/json',
              },
              body : JSON.stringify({status:-1}),
          })
          if (response.ok) {
            const result = await response.json();
            setTicketDetails(result);
        } else {
            throw new Error('Failed to fetch New ticket Details....!');
        }
    } catch (error) {
        setError(error.message);
    } finally {
        setIsLoading(false);
    }
        }
        fetchDetails();
    },[])


    return <>
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <main className="main-container">
    <AdminDash_upblock />
    {TicketDetails.length > 0 ? <Table_ManageUsers array_Details={TicketDetails} /> : 
      <>
      <h2 className="mx-3 mt-3">Manage Users Details </h2>  
      <div className="text-center">
          <button className="btn btn-primary" type="button" disabled>
            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span role="status"> Loading...</span>
          </button>
      </div>
      </>
      }
    </main>
    </div>  
    </>
}

export default Manage_Users;
