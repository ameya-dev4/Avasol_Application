
// import React, { useEffect, useState } from 'react';
// import { GetToken } from './Api/auth';
// import { useLocation, useNavigate } from 'react-router-dom';
// import {Grid,Typography,Button,Table} from '@mui/material';
// import AdminDash_upblock from './AdminDash_upblock';
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import FormField from './Update/InputFormField';
// import DropDownField from './Update/DropDownField';

// const authToken = GetToken();
// const trainingOptions = [{value:'Yes', label :'Yes'},{label:'No',value:'No'}]
// const statusOptions = [{label:'New',value:1},{label:'Assigned',value:2},{label:'Rejected',value:5},{label:'Closed',value:14}];
// const performanceOptions = [{label:'Average',value:'average'},{label:'Good',value:'good'},{label:'Excellent',value:'excellent'},{label:'Needs Improvement',value:'needs Improvement'}];



// function Update() {
//   const navigate = useNavigate();
//   const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle)
//   }
//   const [formData, setFormData] = useState({
//     "approvedBy": "",
//   "approvedDate": "",
//   "bankAccountNo": "",
//   "bankName": "",
//   "branchName": "",
//   "contactNumber": "",
//   "emailId": "",
//   "firstName": "",
//   "ifsc": "",
//   "lastName": "",
//   "password": "",
//   "performance": "",
//   "serviceArea": "",
//   "status": Number(0),
//   "trainingDetails": "",
//   "username": ""
    
//   });
//   const location = useLocation();
//   const ServiceEngineerName = location.state.updateArray.username;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://100.20.33.222:5000/admin/get-se', {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ username: ServiceEngineerName })
//         });
//         if (response.ok) {
//           const data = await response.json();
//           // Set form values using setFormData
//           setFormData({
//             ...data,
//           status : findselectedOption(data.status , statusOptions),
//           trainingDetails : findselectedOption(data.trainingDetails,trainingOptions),
//           performance : findselectedOption(data.performance ,performanceOptions),
//         });
//         } else {
//           // Handle error if API request fails
//         }
//       } catch (error) {
//         // Handle any other errors
//       }
//     };

//     fetchData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSelectChange = (e) => {
//     const {name , value} = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const findselectedOption = (value,options) =>{
//     return options.find((option) => option.value === value) || 'hello' ;

//   }


//   const onSubmit = (e) => {
//     e.preventDefault();
//     // formData contains the form values
//     console.log(formData);
//     fetch('http://100.20.33.222:5000/admin/update-service-engineer',{
//       method:'PUT',
//       headers:{
//         'Authorization':`Bearer ${authToken}`,
//         'Content-Type':'application/json',
//       },
//       body:JSON.stringify(formData)
//     }).then((response) => response.json())
//     .then((data) =>{
//       console.log(data);
//       alert('Details are Successfully Updated');
//       navigate(-1);
//     }).catch((error) => {
//       console.log(error);
//     })
//     // Perform your form submission logic here
//   };

//   return (
//     <div className="grid-container"  style={{borderBlock:'2px solid black'}}>
//       {/* ... form rendering ... */}
//       <Header OpenSidebar={OpenSidebar}/>
//       <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
//       <main className='main-container'>
//       <AdminDash_upblock />
//       <form onSubmit={onSubmit}>
//         <Table sx={{border:'1px solid black',p:2,mt:10,backgroundColor:'white'}}>
//         <Grid container spacing={2} sx={{border:'1px black'}}>
//         <Grid item xs={12}>
//               <Button
//                 variant="contained"
//                 size="large"
//                 color='primary'
//                 fullWidth
//                 sx={{ mb: 3  }}
                
//               >
//                 <Typography variant="h5" sx={{textAlign :'left',textTransform:'none'}}>Update Service Engineer Details</Typography>
//               </Button>
//             </Grid>
       
//         {/* Row 1 */}
//         <FormField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
//         <FormField  label="Last Name" name="lastName"  value={formData.lastName} onChange={handleInputChange}  />

//         {/* Row 2 */}
//         <FormField label="Contact Number" name="contactNumber" onChange={handleInputChange} value={formData.contactNumber}/>
//         <FormField label="Email Id" name="emailId" onChange={handleInputChange}  value={formData.emailId}/>

//         {/* Row 3 */}
//         <FormField label="Enrolled Date" name="enrolledDate" onChange={handleInputChange} value={formData.enrolledDate}/>
//         <DropDownField label="Training" name="trainingDetails" onChange={handleSelectChange} options={trainingOptions} value={formData.trainingDetails}/>

//         {/* Row 4 */}
//         <FormField label="Service Area" name="serviceArea" onChange={handleInputChange} value={formData.serviceArea} disabled={false} />
//         <DropDownField label="Status" name="status" onChange={handleSelectChange} options={statusOptions} value={formData.status}/>

//         {/* Row 5 */}
//         <FormField label="Address 1" name="address1" onChange={handleInputChange} value={formData.address}/>
//         <FormField label="Address 2" name="address" onChange={handleInputChange} value={formData.address2}/>

//         {/* Row 6 */}
//         <FormField label="Distric" name="district" onChange={handleInputChange} value={formData.district}/>
//         <FormField label="State" name="state" onChange={handleInputChange} value={formData.state}/>

//         {/* Row 7 */}
//         <DropDownField label="Performance" name="performance" onChange={handleSelectChange} options={performanceOptions}  value={formData.performance}/>
//         <FormField label="Reference" name="reference" onChange={handleInputChange} value={formData.reference}/>

//         {/* Row 8 */}
//         <FormField label="Bank Name" name="bankName" onChange={handleInputChange}  value={formData.bankName}/>
//         <FormField label="Branch Name" name="branchName" onChange={handleInputChange} value={formData.branchName}/>

//         {/*Row 9 */}
//         <FormField label="Account Holder Name " name="accountHolderName" onChange={handleInputChange} value={formData.accountHolderName}/>
//         <FormField label="Bank A/C #" name="bankAccount" onChange={handleInputChange} value={formData.bankAccountNo}/>

//         {/* Row 10 */}
//         <FormField label="IFSC code" name="ifsc" onChange={handleInputChange} value={formData.ifsc}/>

//         <Grid item xs={2}>
//               <Button
//                 variant="contained"
//                 size="large"
//                 fullWidth
//                 sx={{ mt: 20,mb:2}}
//                 onClick={() => navigate(-1)}
//               >
//                close
//               </Button>
//             </Grid>
//         <Grid item xs={2}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="success"
//                 size="large"
//                 fullWidth
//                 sx={{ mt: 20,mb:2  }}
//               >
//                 Save Changes
//               </Button>
//             </Grid>
//         </Grid>
//         </Table>
//       </form>
//       </main>
//     </div>
//   );
// }






// export default Update;

import React, { useEffect, useState } from 'react';
import { GetToken } from './Api/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import {Grid,Typography,Button,Table} from '@mui/material';
import AdminDash_upblock from './AdminDash_upblock';
import Header from "./Header";
import Sidebar from "./Sidebar";
import FormField from './Update/InputFormField';
import DropDownField from './Update/DropDownField';
import SERVER_URL from './Server/Server';

const authToken = GetToken();
const trainingOptions = [{value:'Yes', label :'Yes'},{label:'No',value:'No'}]
const statusOptions = [{label:'New',value:1},{label:'Assigned',value:2},{label:'Rejected',value:5},{label:'Closed',value:14}];
const performanceOptions = [{label:'Average',value:'average'},{label:'Good',value:'good'},{label:'Excellent',value:'excellent'},{label:'Needs Improvement',value:'needs Improvement'}];



function Update() {
  const navigate = useNavigate();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  const [formData, setFormData] = useState({
    "approvedBy": "",
  "approvedDate": "",
  "bankAccountNo": "",
  "bankName": "",
  "branchName": "",
  "contactNumber": "",
  "emailId": "",
  "firstName": "",
  "ifsc": "",
  "lastName": "",
  "password": "",
  "performance": "",
  "serviceArea": "",
  "status": Number(0),
  "trainingDetails": "",
  "username": ""
    
  });
  const location = useLocation();
  const ServiceEngineerName = location.state.updateArray.username;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}admin/get-se`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: ServiceEngineerName })
        });
        if (response.ok) {
          const data = await response.json();
          // Set form values using setFormData
          setFormData({
            ...data,
          status : findselectedOption(data.status , statusOptions),
          trainingDetails : findselectedOption(data.trainingDetails,trainingOptions),
          performance : findselectedOption(data.performance ,performanceOptions),
        });
        } else {
          // Handle error if API request fails
        }
      } catch (error) {
        // Handle any other errors
      }
    };

    fetchData();
  }, []);

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

  const findselectedOption = (value,options) =>{
    return options.find((option) => option.value === value) || 'hello' ;

  }


  const onSubmit = (e) => {
    e.preventDefault();
    // formData contains the form values
    console.log(formData);
    fetch(`${SERVER_URL}admin/update-service-engineer`,{
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
      {/* ... form rendering ... */}
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
      <AdminDash_upblock />
      <form onSubmit={onSubmit}>
        <Table sx={{border:'1px solid black',p:2,mt:10,backgroundColor:'white'}}>
        <Grid container spacing={2} sx={{border:'1px black'}}>
        <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                color='primary'
                fullWidth
                sx={{ mb: 3  }}
                
              >
                <Typography variant="h5" sx={{textAlign :'left',textTransform:'none'}}>Update Service Engineer Details</Typography>
              </Button>
            </Grid>
       
        {/* Row 1 */}
        <FormField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
        <FormField  label="Last Name" name="lastName"  value={formData.lastName} onChange={handleInputChange}  />

        {/* Row 2 */}
        <FormField label="Contact Number" name="contactNumber" onChange={handleInputChange} value={formData.contactNumber}/>
        <FormField label="Email Id" name="emailId" onChange={handleInputChange}  value={formData.emailId}/>

        {/* Row 3 */}
        <FormField label="Enrolled Date" name="enrolledDate" onChange={handleInputChange} value={formData.enrolledDate}/>
        <DropDownField label="Training" name="trainingDetails" onChange={handleSelectChange} options={trainingOptions} value={formData.trainingDetails}/>

        {/* Row 4 */}
        <FormField label="Service Area" name="serviceArea" onChange={handleInputChange} value={formData.serviceArea} disabled={false} />
        <DropDownField label="Status" name="status" onChange={handleSelectChange} options={statusOptions} value={formData.status}/>

        {/* Row 5 */}
        <FormField label="Address 1" name="address1" onChange={handleInputChange} value={formData.address}/>
        <FormField label="Address 2" name="address" onChange={handleInputChange} value={formData.address2}/>

        {/* Row 6 */}
        <FormField label="Distric" name="district" onChange={handleInputChange} value={formData.district}/>
        <FormField label="State" name="state" onChange={handleInputChange} value={formData.state}/>

        {/* Row 7 */}
        <DropDownField label="Performance" name="performance" onChange={handleSelectChange} options={performanceOptions}  value={formData.performance}/>
        <FormField label="Reference" name="reference" onChange={handleInputChange} value={formData.reference}/>

        {/* Row 8 */}
        <FormField label="Bank Name" name="bankName" onChange={handleInputChange}  value={formData.bankName}/>
        <FormField label="Branch Name" name="branchName" onChange={handleInputChange} value={formData.branchName}/>

        {/*Row 9 */}
        <FormField label="Account Holder Name " name="accountHolderName" onChange={handleInputChange} value={formData.accountHolderName}/>
        <FormField label="Bank A/C #" name="bankAccount" onChange={handleInputChange} value={formData.bankAccountNo}/>

        {/* Row 10 */}
        <FormField label="IFSC code" name="ifsc" onChange={handleInputChange} value={formData.ifsc}/>

        <Grid item xs={2}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 20,mb:2}}
                onClick={() => navigate(-1)}
              >
               close
              </Button>
            </Grid>
        <Grid item xs={2}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                fullWidth
                sx={{ mt: 20,mb:2  }}
              >
                Save Changes
              </Button>
            </Grid>
        </Grid>
        </Table>
      </form>
      </main>
    </div>
  );
}






export default Update;