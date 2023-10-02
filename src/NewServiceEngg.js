
import Header from "./Header";
import { useState,useEffect } from "react";
import { GetToken } from "./Api/auth";
import Table_SE from "./Table_SE";
import AdminDash_upblock from "./AdminDash_upblock";
import Admin_sidebar from "./Admin_sidebar";
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

function NewServiceEngineers(){
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const [TicketDetails, setTicketDetails] = useState([]);
    const [data, setData]= useState(null)
    const [error,setError] = useState(null)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

    useEffect (()=> {
      async function fetchDetails(){
          try {
            const response = await fetch(url,{
              method : 'POST',
              headers : {
                  'Authorization' : `Bearer ${authToken}`,
                  'Content-type': 'application/json',
              },
              body : JSON.stringify({status:1}),
          })
              if(response.ok){
                const result=await response.json()
                setData(result)
                setTicketDetails(result)
                console.log('fetching successful...!')
              }else{
                throw new Error("failed to fetch New Service Engineers...!")
                
              }

          } catch (error) {
            setError(error.message)
          }
        }
        fetchDetails();
    },[])
    console.log(TicketDetails);
    

    return <>
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <Admin_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <main className="main-container">
    <AdminDash_upblock />
    {TicketDetails.length > 0 ? <Table_SE array_Details={TicketDetails} /> : 

      <h2 className="mx-3 mt-3">New Service Engineer Details Display Here</h2> }
    </main>
    </div>
    </>
}

export default NewServiceEngineers;
