
import Table_comp from "./Table_Componenet";
import Header from './Header'
import Sidebar from './Admin_sidebar'
import { useState ,useEffect} from "react";
import { GetToken } from "./Api/auth";
import { Box, Typography,Container } from "@mui/material";
import { Card,Row } from "react-bootstrap";
import AdminDash_upblock from "./AdminDash_upblock";
import SERVER_URL from "./Server/Server";
import Table_Tickets from "./Table_Tickets";
import Table_AllTickets from "./Table_AllTickets";

const userName = localStorage.getItem('username');
console.log(userName);


function AdminMyDashboard(){
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const [TicketDetails , setTicketDetails] = useState([]);
    const [user_Details, setUserDetails] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    //const {authToken} = useAuth();
    const authToken = GetToken();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  useEffect (()=> {
    async function fetchDetails(){
      try{
        const response = await fetch(`${SERVER_URL}admin/get-ticket-details`,{
            method : 'POST',
            headers : {
                'Authorization' : `Bearer ${authToken}`,
                'Content-type': 'application/json',
            },
            body:JSON.stringify({status:-1})
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
  
  console.log("all tickets",TicketDetails)

  useEffect (() =>{ async function fetchDetails(){
    const response = await fetch(`${SERVER_URL}admin/get-profile`,{
        method : 'GET',
        headers : {
            'Authorization' : `Bearer ${authToken}`,
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    }).then((response) => response.json())
    .then((user_Details) =>{
      setUserDetails(user_Details);
      console.log(user_Details);
        
    })
  }
  fetchDetails();
},[])

localStorage.setItem('profile_details',JSON.stringify(user_Details))
  
    return (
    <>
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className="main-container">
      <AdminDash_upblock /><br/>
      <br/>

      {isLoading ? (
                    <div className="text-center">
                        <button className="btn btn-primary" type="button" disabled>
                          <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                          <span role="status"> Loading...</span>
                        </button>
                    </div>
                ) : error ?(
                  
                  <div className="text-center alert alert-danger" role="alert">
                        Error: {error}
                        
                    </div> 
                ) : (
                    <div>
                        {TicketDetails.length > 0 ? (
                            <Table_AllTickets array_Details={TicketDetails} />
                        ) : (
                            <h2 className="mx-3 mt-3">No  Tickets Details</h2>
                        )}
                    </div>
                )}
      
      </main>
    </div>
     </>
    )
}

export default AdminMyDashboard;