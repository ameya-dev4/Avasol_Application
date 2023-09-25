import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import {  useLocation, useNavigate } from 'react-router-dom';
import {Grid,Box,Typography,Button,Select,MenuItem,Table,Container} from '@mui/material';
import AdminDash_upblock from './AdminDash_upblock';
import Header from "./Header";
import Admin_sidebar from './Admin_sidebar';
import FormField from './Update/InputFormField';
import DropDownField from './Update/DropDownField';
import Dashboard_upBlocks from './Dashboard_upBlocks';
import Sidebar from './Sidebar';

const authToken = GetToken();
const SEoptions = [{value:'SE1', label :'SE1'},{label:'SE2',value:'SE2'}]
const statusOptions = [{label:'New',value:1},{label:'Assigned',value:2},{label:'Rejected',value:5},{label:'Closed',value:14}];
const performanceOptions = [{label:'Average',value:'average'},{label:'Good',value:'good'},{label:'Excellent',value:'excellent'},{label:'Needs Improvement',value:'needs Improvement'}];



function UpdateBattery() {
  const navigate = useNavigate();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const location = useLocation();
  const batteryDetails = location.state.batteryId
  console.log("**********");
  console.log(batteryDetails);
  console.log("***********");
  const [formData, setFormData] = useState(batteryDetails);



  // useEffect (()=> {
  //   async function fetchDetails() {
  //     try {
  //       const response = await fetch('http://100.20.33.222:5000/user/get-battery-details', {
  //         method: 'POST',
  //         headers: {
  //           'Authorization': `Bearer ${authToken}`,
  //           'Content-type': 'application/json',
  //         },
  //         body: JSON.stringify({ batteryId: batteryId }),
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const batteryDetails = await response.json();
  //       setFormData(batteryDetails);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }
  //   fetchDetails();
  // }, [batteryId, authToken]);


  console.log("formdata",formData)
  // const fdata=JSON.stringify(formData)
  // const parse_formdata=JSON.parse(fdata)
  // console.log("parse",parse_formdata)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const {name , value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



//   const handleDelete = (input_value) =>{
//     let batteryInfo;
//     let batteryId = input_value;
//     for(let i=0; i<latestBattery.length ; i++){
//       if(batteryId === latestBattery[i].batteryId){
//          batteryInfo = latestBattery[i]
//         latestBattery.pop(batteryInfo);
//       }

//     }
    

//     fetch("http://100.20.33.222:5000/user/delete-battery",{
//       method : "DELETE",
//       headers : {
//         'Authorization':`Bearer ${authToken}`,
//         'Content-Type' : 'application/json',
//       },
//       body: JSON.stringify(batteryInfo),
//     }).then(response => {
//       if (response.ok) {
//         console.log('DELETE request successful.');
//         alert("Deleted Succesfully")
//         navigate('/userMyBatteries')
//         // Handle success or update the UI accordingly
//       } else {
//         console.error('DELETE request failed.');
//         // Handle error or update the UI accordingly
//       }
//     })
//     .catch(error => {
//       console.error('Error occurred during DELETE request:', error);
//       // Handle error or update the UI accordingly
//     });
//   }


  const FormatDate = (dateString)=>{
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleString("en-US",{
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      // timeZoneName: "short",
    });
    return formattedDate;

  }


  const onSubmit = (e) => {
    e.preventDefault();
    // formData contains the form values
    console.log(formData);
    fetch('http://100.20.33.222:5000/user/update-battery',{
      method:'PUT',
      headers:{
        'Authorization':`Bearer ${authToken}`,
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData)
    }).then((response) => response.json())
    .then((data) =>{
      console.log(data);
      alert('Details are Successfully Updated');
      navigate(-1);
    }).catch((error) => {
      console.log(error);
    })
    // Perform your form submission logic here
  };

  return (
    <div className="grid-container"  style={{borderBlock:'2px solid black'}}>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
      <Dashboard_upBlocks />
      <Container style={{margin:'50px 0px',marginBottom:'60px'}}>
                <form noValidate>
        <Table sx={{border:'1px solid black',p:2,mt:3,backgroundColor:'white'}}>
        <Grid container spacing={2} sx={{border:'1px black'}}>
        <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                color='primary'
                fullWidth
                sx={{ mb: 3  }}
                
              >
                <Typography variant="h5" sx={{textAlign :'left',textTransform:'none'}}>Update Battery Details</Typography>
              </Button>
            </Grid>
       
        {/* Row 1 */}
        <FormField label="Battery Name" name="batteryName" value={formData.batteryName} onChange={handleInputChange} />
        <FormField  label="Battery Number" name="batteryNumber"  value={formData.batteryNumber} onChange={handleInputChange}  />

        {/* Row 2 */}
        <FormField label="Make" name="make" onChange={handleInputChange} value={formData.make}/>
        <FormField label="Model" name="model" onChange={handleInputChange}  value={formData.model}/>

        {/* Row 3 */}
        <FormField label="Battery Voltage" name="batteryVoltage" onChange={handleInputChange} value={formData.batteryVoltage}/>
        <FormField label="Battery Current" name="batteryCurrent" onChange={handleInputChange}  value={formData.batteryCurrent}/>

        {/* Row 4 */}
        <FormField label="Purchase Date" name="purchaseDate" onChange={handleInputChange} value={formData.purchaseDate.slice(0,10)} disabled={false} />
        <FormField label="Warrenty" name="warranty" onChange={handleInputChange}  value={formData.warranty}/>
        
        <FormField label="Warranty Years" name="warrantyYears" onChange={handleInputChange} value={formData.warrantyYears}/>
        <FormField label="Vechicle Type" name="vechicleType" onChange={handleInputChange} value={formData.vechicleType}/>

        {/* Row 6 */}
        <FormField label="DealerName & Addrees" name="dealerName&address" onChange={handleInputChange} value={formData.delearAddress}/>
        <FormField label="Dealer Contact" name="Dealer Contact" onChange={handleInputChange} value={formData.DealerContact}/>

        {/* Row 7 */}
        <FormField label="SubDealerName & Address" name="subDealerName&address" onChange={handleInputChange}  value={formData.subDealerAddress}/>
        <FormField label="SubDealer Contact" name="subDealer Contact" onChange={handleInputChange} value={formData.subDealerContact}/>

        {/* Row 8 */}
        <FormField label="Status" name="status" onChange={handleInputChange}   value={formData.status}/>
        {/* options={Rating} */}
        </Grid>
        <Grid container spacing={3} sx={{p:3}}>
        <Grid item xs={3}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 5,mb:2}}
                onClick={() => navigate(-1)}
              >
               close
              </Button>
            </Grid>
        <Grid item xs={3}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                fullWidth
                sx={{ mt: 5,mb:2  }}
                onClick={onSubmit}
              >
                Save Changes
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                
                variant="contained"
                size="large"
                fullWidth
                color='error'
                sx={{ mt: 5,mb:2  }}
                // onClick={() => handleDelete(formData.batteryId)}
              >
                Delete Battery
              </Button>
            </Grid>
        </Grid>
        </Table>
      </form>
              
            </Container>
      </main>
    </div>
  )
}


export default UpdateBattery;