// import React, { useState,} from 'react';
// import {useForm} from 'react-hook-form';
// // import { Row, Col, Tabs,Button, Tab,Form,Card,Container,Table } from 'react-bootstrap';
// import { GetToken } from '../src/Api/auth';
// import { useNavigate } from 'react-router-dom';
// import Header from './Header';
// import Sidebar from './Sidebar';
// import SERVER_URL from './Server/Server';
// import FormField from './Update/EditInputFormField';
// import {Grid,Box,Typography,Button,Select,MenuItem,Table,Container} from '@mui/material';

// const BatteryAdd = () => {
//     const navigate=useNavigate()
//     const user_name=localStorage.getItem('username')
//     const parse_username=JSON.parse(user_name)
//     const [check,setCheck]=useState(true);
//     const access_token=GetToken()
//     console.log(access_token)
//     const form=useForm()
//     const [formData,setFormData]=useState(
        // {
        //     selectBattery:"",
        //   batteryCapacity: "",
        //   batteryCurrent: "",
        //   batteryId:"",
        //   batteryVoltage: "",
        //   dealerId:"dealerId",
        //   invoice: "",
        //   invoiceNumber: "invoice number",
        //   invoiceUploaded: "",
        //   make:"",
        //   model: "",
        //   principalId:"",
        //   purchaseDate: "",
        //   status:0,
        //   username:parse_username,
        //   warranty:"",
        //   batteryNumber:"",
        //   dealer:"",
        //   subDealer:""
    
        // }
//     )
    
//       const {register,handleSubmit,formState}=form;
//       const {errors}=formState;
      
//       const dealer=['dealer1','dealer2','dealer3']
//       const sub_dealer={
//           'dealer1':['Telangana','AP','Tamilnadu'],
//           'dealer2':['kerala','UP','odissa'],
//           'dealer3':['delhi','goa','karnataka']
  
//       }  
//       const [select,setSelected]=useState('');
      
//     const submitHandler=()=>{
//         formData.warranty=warranty?"yes":"no"
//         const jsonData=JSON.stringify(formData)
        
        
//         fetch(`${SERVER_URL}user/add-new-battery`,{
//             mode:'cors',
//             method:'POST',
//             headers:{
//                 'Accept':'application/json',
//                 'Content-type':'application/json',
//                 'Authorization':`Bearer ${access_token}`
//             },
//             body:jsonData,
//         }).then(response=>response.json())
//             .then(data=>{
//                 console.log(data)

//             }).catch(err=>{
//                 console.log(err)
//             })

//         alert("Battery added successfully new")
//         navigate('/userMyBatteries')
        
//       }


//       const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
//       const OpenSidebar = () => {
//         setOpenSidebarToggle(!openSidebarToggle)
//       }
    
//     const [warranty,serwarranty]=useState(false)
//     const checkboxHandler=()=>{
//         serwarranty(!warranty)
        
//     }
// console.log(warranty)
//       return (
//         <>
//         <div className='grid-container'>
//        <Header OpenSidebar={OpenSidebar}/>
//        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
//        <main className="main-container">
//        <Container style={{margin:'50px 0px',marginBottom:'60px'}}>
//                 <form noValidate onClick={handleSubmit(submitHandler)}>
//         <Table sx={{border:'1px solid black',p:2,mt:3,backgroundColor:'white'}}>
//         <Grid container spacing={2} sx={{border:'1px black'}}>
//         <Grid item xs={12}>
//               <Button
//                 variant="contained"
//                 size="large"
//                 color='primary'
//                 fullWidth
//                 sx={{ mb: 3  }}
                
//               >
//                 <Typography variant="h5" sx={{textAlign :'left',textTransform:'none'}}>Update Battery Details</Typography>
//               </Button>
//             </Grid>
       
        
//         <FormField label="Battery Name" name="batteryName" {...register('batteryNumber',{
//                                 required:'misssing battery number'})}/> 
//         <FormField  label="Battery Number" name="batteryNumber"    />

       
//         <FormField label="Make" name="make" {...register('make',{required:'missing make'})} placeholder="Enter Make" />
//         <FormField label="Model" name="model" {...register('model',{required:'missing model' })} placeholder="Enter Model" />

        
//         <FormField label="Battery Voltage" name="batteryVoltage"  placeholder='Enter Battery Voltage' {...register('batteryVoltage',{
//                                 required:'misssing battery voltage'
//                             })}/>
//         <FormField label="Battery Current" name="batteryCurrent"  placeholder='Enter Battery Current' {...register('batteryCurrent',{
//                                 required:'misssing battery number'
//                             })}/>

        
//         <FormField label="Purchase Date" name="purchaseDate" {...register('purchaseDate',{
//                                 required:'missing Date'
//                             })} placeholder='Enter Date'/>
//         <FormField label="Warrenty" name="warranty"  {...register('warranty',{
//                                 required:'misssing warrenty'
//                             })}/>
        
//         <FormField label="Warranty Years" name="warrantyYears"  />
//         <FormField label="Vechicle Type" name="vechicleType" />

//         <FormField label="DealerName & Addrees" name="dealerName&address"/>
//         <FormField label="Dealer Contact" name="Dealer Contact" />

       
//         <FormField label="SubDealerName & Address" name="subDealerName&address" />
//         <FormField label="SubDealer Contact" name="subDealer Contact" />

       
//         <FormField label="Status" name="status" />
        
//         </Grid>
//         <Grid container spacing={3} sx={{p:3}}>
//         <Grid item xs={3}>
//               <Button
//                 variant="contained"
//                 size="large"
//                 fullWidth
//                 sx={{ mt: 5,mb:2}}
//                 onClick={() => navigate(-1)}
//               >
//                close
//               </Button>
//             </Grid>
//         <Grid item xs={3}>
//               <Button
                
//                 variant="contained"
//                 color="success"
//                 size="large"
//                 fullWidth
//                 sx={{ mt: 5,mb:2  }}
//                 // onClick={handleSubmit(submitHandler)}
//               >
//                 Save Changes
//               </Button>
//             </Grid>
            
//         </Grid>
//         </Table>
//       </form>
              
//             </Container>

//        </main> 
 
         
//            </div>
//            </>
//       )

// }

// export default BatteryAdd

import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import {  useLocation, useNavigate } from 'react-router-dom';
import {Grid,Box,Typography,Button,Select,MenuItem,Table,Container} from '@mui/material';
import AdminDash_upblock from './AdminDash_upblock';
import Header from "./Header";
import Admin_sidebar from './Admin_sidebar';
import FormField from './Update/EditInputFormField';
import NoEditable from './Update/InputFormField'
import DropDownField from './Update/DropDownField';
import Dashboard_upBlocks from './Dashboard_upBlocks';
import Sidebar from './Sidebar';
import SERVER_URL from './Server/Server';

const authToken = GetToken();


function BatteryAdd() {
  const [warranty_def, setWarranty_def]=useState('no')
  const [vechicel_def, setVechicle_def]=useState('None')

  const vechicleType = [{value:vechicel_def, label :'Select Vechicle Type  '},{value:'2', label:'Two'},{label:'Three',value:'3'}]
  const warrantyType = [{value:warranty_def, label :'Select Warranty'},{value:'Yes', label :'Yes'},{label:'No',value:'No'}]
  const statusOptions = [{label:'New',value:1},{label:'Assigned',value:2},{label:'Rejected',value:5},{label:'Closed',value:14}];
  const performanceOptions = [{label:'Average',value:'average'},{label:'Good',value:'good'},{label:'Excellent',value:'excellent'},{label:'Needs Improvement',value:'needs Improvement'}];


  const Rating = [{label:'Average',value:'average'},{label:'Good',value:'good'},{label:'Excellent',value:'excellent'},{label:'Needs Improvement',value:'needs Improvement'}];
  const navigate = useNavigate();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const location = useLocation();


  const username=localStorage.getItem('username')
  const parse_username=JSON.parse(username)
  const [formData, setFormData] = useState({
    selectBattery:"",
  batteryCapacity: "",
  batteryCurrent: "",
  batteryId:"",
  batteryVoltage: "",
  dealerId:"dealerId",
  invoice: "",
  invoiceNumber: "invoice number",
  invoiceUploaded: "",
  make:"",
  model: "",
  principalId:"",
  purchaseDate: "",
  status:Number(0),
  username:parse_username,
  warranty:"",
  batteryNumber:"",
  dealer:"",
  subDealer:"",
  batteryName:""

});


//   console.log("formdata",formData)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVechicleChange = (e) => {
    setVechicle_def(e.target.value) 
    const {name , value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleWarrentyChange = (e) => {
    setWarranty_def(e.target.value)
    const {name , value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const [latestRequests, setLatestRequests] = useState([]);
  const[displayDetails , setDisplayDetails] = useState(false);


   const onSubmit = (e) => {
    e.preventDefault();
    // formData contains the form values
    console.log(formData);
    fetch(`${SERVER_URL}user/add-new-battery`,{
      method:'POST',
      headers:{
        'Authorization':`Bearer ${authToken}`,
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData)
    }).then((response) => response.json())
    .then((data) =>{
      console.log(data);
      alert('Battery successfully added...!');
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
      <Container style={{margin:'50px 0px'}}>
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
                <Typography variant="h5" sx={{textAlign :'left',textTransform:'none'}}>New Battery Details</Typography>
              </Button>
            </Grid>
       
        <FormField label="Battery Name" name="batteryName" value={formData.batteryName} placeholder='Enter Battery Name' onChange={handleInputChange} />
        <FormField  label="Battery Number" name="batteryNumber" placeholder='Enter Battery Number' value={formData.batteryNumber} onChange={handleInputChange}  />

        <FormField  label="Battery ID" name="batteryId"   placeholder='eg:1234' value={formData.batteryId} onChange={handleInputChange}  />
        {/* Row 2 */}
        <FormField label="Make" name="make" onChange={handleInputChange} placeholder='Enter Battery Make' value={formData.make}/>
        <FormField label="Model" name="model" onChange={handleInputChange} placeholder='Enter Battery Model' value={formData.model}/>

        {/* Row 3 */}
        <FormField label="Battery Voltage" name="batteryVoltage" onChange={handleInputChange}  placeholder='Enter  Battery Voltage' value={formData.batteryVoltage}/>
        <FormField label="Battery Current" name="batteryCurrent" onChange={handleInputChange} placeholder='Enter Current '  value={formData.batteryCurrent}/>

        {/* Row 4 */}
        <FormField label="Purchase Date" name="purchaseDate" onChange={handleInputChange} placeholder='YYYY/MM/DD' value={formData.purchaseDate.slice(0,10)} disabled={false} />
        <DropDownField label="Warranty" name="warranty" onChange={handleWarrentyChange}  value={warranty_def} options={warrantyType}/>
        
        <FormField label="Warranty Years" name="warrantyYears" onChange={handleInputChange} value={formData.warrantyYears} placeholder='Enter Warranty Years'/>
        <DropDownField label="Vechicle Type" name="vechicleType" onChange={handleVechicleChange} value={vechicel_def} options={vechicleType}/>

        {/* Row 6 */}
        <FormField label="Dealer Addrees" name="dealerAddress" onChange={handleInputChange}  placeholder='Enter Dealer Address' value={formData.delearAddress}/>
        <FormField label="Dealer Contact" name="Dealer Contact" onChange={handleInputChange} placeholder='Enter 10 digit number' value={formData.DealerContact}/>

        {/* Row 7 */}
        <FormField label="Sub-Dealer Address" name="subDealerAddress" placeholder='Enter Sub-Dealer Address' onChange={handleInputChange}  value={formData.subDealerAddress}/>
        <FormField label="Sub-Dealer Contact" name="subDealer Contact"  placeholder='Enter 10 digit number' onChange={handleInputChange} value={formData.subDealerContact}/>

        {/* Row 8 */}
        <NoEditable label="Status" name="status" onChange={handleInputChange}   value={formData.status}/>
        {/* options={Rating} */}
        </Grid>
        <Grid container spacing={3} sx={{p:3}}>
        <Grid item xs={3}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ mb:2}}
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
                sx={{mb:2  }}
                onClick={onSubmit}
              >
                Add
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


export default BatteryAdd;
