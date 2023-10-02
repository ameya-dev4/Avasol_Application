import Header from "./Header";
import Admin_sidebar from "./Admin_sidebar";
import { GetToken } from "./Api/auth";
import { useState,useEffect } from "react";
import Table_comp from "../Table_Component";
import AdminDash_upblock from "./AdminDash_upblock";
import SERVER_URL from "./Server/Server";

const url = `${SERVER_URL}get-ticket-details`

function OpenTickets(){
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const [TicketDetails, setTicketDetails] = useState([]);
    const [data, setData]=useState(null)
    const [error, setError] = useState(null)

    const authToken = GetToken();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const data1 = {
    status : 2
  }

  useEffect (()=> {
    async function fetchDetails(){
        try {
          
          const response = await fetch(url,{
            method : 'POST',
            headers : {
                'Authorization' : `Bearer ${authToken}`,
                'Content-type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
            body : JSON.stringify(data1)
        })
        if(response.ok){
          const result=await response.json()
          setData(result)
          console.log('fetching Successful')
        }else{
          throw new Error('failed to fetch Open Tickets...!')
        }

        } catch (error) {
          setError(error.message)
        }
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

          <>
          <h2 className="mx-3 mt-3">No Tickets are Assigned</h2>
          {/* <div className=" position-absolute top-50 start-50 translate-middle col-1 shadow p-3 bg-body-tertiary rounded ">
                            
                            <div className="text-center  py-1 px-2">
                            <div className="spinner-border text-primary " role="status">
                              <span className="visually-hidden ">Loading...</span>
                            </div> 
                            <p className="text-dark d-flex justify-content-center">Loading....</p>
                            </div>  
      
                          </div> */}
            </>
          }
          </main>
        </div>
         </>
    )
}

export default OpenTickets;