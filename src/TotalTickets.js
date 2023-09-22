import AdminDash_upblock from "./AdminDash_upblock";
import Table_comp from "../Table_Component";
import Header from './Sidebar'
import Sidebar from './Admin_sidebar'
import { useState ,useEffect} from "react";
import { GetToken } from "./Api/auth";
import Admin_sidebar from "./Admin_sidebar";

const userName = localStorage.getItem('username');
console.log(userName);
const url = 'http://avasol.ameyalabs.com:5000/get-ticket-details'


function TotalTickets(){
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const [TicketDetails, setTicketDetails] = useState([]);
    //const {authToken} = useAuth();
    const authToken = GetToken();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  let data = {
    username : userName,
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
  

    return (
    <>
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className="main-container">
      <AdminDash_upblock/>
      {TicketDetails.length > 1 ? <Table_comp array_Details={TicketDetails} /> : 
      <h2>No Tickets are Assigned BadLuck</h2>}
      
      </main>
    </div>
     </>
    )
}

export default TotalTickets;