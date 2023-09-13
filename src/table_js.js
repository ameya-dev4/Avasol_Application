import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Row, Col, Card } from 'react-bootstrap';
import Popup from './Popup';
import { useNavigate } from 'react-router-dom';
import { GetToken } from './Api/auth';

const apiUrl = 'http://100.20.33.222:5000/user/latest-service-requests';
const access_token = GetToken();
console.log(access_token)

function DisplayBattery() {
  const navigate = useNavigate();
  const [latestBattery, setLatestBattery] = useState([]);
  const [selectedBattery, setSelectedBattery] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('ServicesList');
    if (storedData) {
      setLatestBattery(JSON.parse(storedData));
    }
  }, []);

  // Save the latestBattery data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ServicesList', JSON.stringify(latestBattery));
  }, [latestBattery]);

  const [assignedBy, setAssignBy] = useState('');
  const [assignedDate, setAssignDate] = useState('');
  const [noteToServiceEngineer, setNoteToServiceEngineer] = useState('');
  const [payerId, setPayerId] = useState('');
  const [openDate, setOpenDate] = useState('');
  const [serviceEngineerId, setServiceEngineerId] = useState('');
  const [serviceEngineerNotes, setServiceEngineerNotes] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [warranty, setWarranty] = useState('');
  const [status, setStatus] = useState('');
  const [attendedDate, setAttendedDate] = useState('');
  const [amount, setAmount] = useState('');
  const [otpId, setOtpId] = useState('');
  const [requestId, setRequestId] = useState('');

  useEffect(() => {
    async function getLatestBattery() {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + access_token,
          },
        });
        const data = await response.json();
        console.log('view_batteries', data);
        setLatestBattery(data);
      } catch (error) {
        console.error('Error fetching latest Battery:', error);
      }
    }
    getLatestBattery();
  }, []);

  const handleDelete = (input_value) => {
    let batteryInfo;
    let batteryId = input_value;
    for(let i=0; i<latestBattery.length ; i++){
      if(batteryId === latestBattery[i].batteryId){
         batteryInfo = latestBattery[i]
        latestBattery.pop(batteryInfo);
      }
    }
   
    fetch('http://100.20.33.222:5000/user/delete-service-request', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(selectedBattery)
    })
      .then((response) => {
        if (response.ok) {
          console.log('DELETE request successful.');
          setIsOpen(!isOpen)
          alert('Deleted Successfully');
          
          navigate('/latest_serv_request');
        } else {
          console.error('DELETE request failed.');
        }
      })
      .catch((error) => {
        console.error('Error occurred during DELETE request:', error);
      });
  };

  const FormatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    return formattedDate;
  };

  const handleEdit = (battery) => {
    setSelectedBattery(battery);
    setIsOpen(true);
    // Set the state values for editing
    setAssignBy(battery.assignedBy);
    setAssignDate(battery.assignedDate);
    setNoteToServiceEngineer(battery.noteToServiceEngineer);
    setPayerId(battery.payerId);
    setOpenDate(battery.openDate);
    setServiceEngineerId(battery.serviceEngineerId);
    setServiceEngineerNotes(battery.serviceEngineerNotes);
    setShortDescription(battery.shortDescription);
    setTransactionId(battery.transactionId);
    setWarranty(battery.warranty);
    setPurchaseDate(battery.purchaseDate);
    setStatus(battery.status);
    setAttendedDate(battery.attendedDate);
    setAmount(battery.amount);
    setOtpId(battery.otpId);
    setRequestId(battery.requestId);
  };

  const handleUpdateBattery = () => {
    const updatedBatteryData = {
      batteryId: selectedBattery.batteryId,
      assignedBy,
      assignedDate,
      attendedDate,
      noteToServiceEngineer,
      payerId,
      openDate,
      serviceEngineerId,
      serviceEngineerNotes,
      shortDescription,
      transactionId,
      status,
      otpId,
      purchaseDate,
      warranty,
      requestId,
      username: selectedBattery.username,
      amount,
    };

    fetch(`http://100.20.33.222:5000/user/update-service-request`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(updatedBatteryData),
    })
      .then(async (response) => {
        if (response.ok) {
          console.log('PUT request successful.');
          alert('Updated Successfully');
          setSelectedBattery(null);
          setIsOpen(false);

          // Update the latestBattery array with the updated data
          setLatestBattery((prevLatestBattery) =>
            prevLatestBattery.map((battery) =>
              battery.batteryId === selectedBattery.batteryId
                ? { ...battery, ...updatedBatteryData }
                : battery
            )
          );

          navigate('/latest_serv_request');
        } else {
          const errorResponse = await response.json();
          console.error('PUT request failed:', errorResponse);
          alert('Update failed. Please check the console for details.');
        }
      })
      .catch((error) => {
        console.error('Error occurred during PUT request:', error);
        alert('Update failed. Please check the console for details.');
      });
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Container>
        <table className="table caption-top table-hover rounded mt-3 px-3" style={{ backgroundColor: '#FAFAFA' }}>
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Open Date</th>
              <th scope="col">Service Location</th>
              <th scope="col">SE Name</th>
              <th scope="col">SE Contact</th>
              <th scope="col">SE Notes</th>
              <th scope="col">Target Service Date</th>
              <th scope="col">Status</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {latestBattery.map((record) => (
              <tr key={record.batteryId}>
                <td>
                  <Button
                    style={{ backgroundColor: 'lightseagreen', border: 'none' }}
                    className="btn-sm"
                    onClick={() => handleEdit(record)}
                  >
                    {record.shortDescription}
                  </Button>
                </td>
                <td>{FormatDate(record.openDate)}</td>
                <td>{FormatDate(record.assignedDate)}</td>
                <td>Service location</td>
                <td>SE Name</td>
                <td>{record.serviceEngineerNotes}</td>
                <td>target ServiceDate</td>
                <td>{record.status}</td>
                <td>
                  <a
                    href="#"
                    className="text-decoration-none"
                    onClick={() => handleDelete(record.batteryId)}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>         
      {selectedBattery && isOpen?(
        <Popup
          content={
            <Container>
              <div className="bg-primary rounded mb-3 text-white m-2 p-2 px-3">
                <header>Edit Service Details</header>
              </div>
              <Card className="shadow p-3 mb-5 bg-body-tertiary rounded">
                <Col className="m-3 mt-2 col">
                  <Row className="mb-2">
                    <Col>
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="text" value={selectedBattery.username} readOnly />
                    </Col>
                    <Col>
                      <Form.Label>Battery ID</Form.Label>
                      <Form.Control type="text" value={selectedBattery.batteryId} readOnly />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label>Assigned By</Form.Label>
                      <Form.Control
                        type="text"
                        value={assignedBy}
                        onChange={(e) => setAssignBy(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Assigned Date</Form.Label>
                      <Form.Control
                        type="text"
                        value={assignedDate}
                        onChange={(e) => setAssignDate(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <Form.Label>ServiceEngineer Notes</Form.Label>
                      <Form.Control
                        type="text"
                        value={serviceEngineerNotes}
                        onChange={(e) => setNoteToServiceEngineer(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label>Service_Engg ID</Form.Label>
                      <Form.Control type="text" value={serviceEngineerId} readOnly />
                    </Col>
                    <Col>
                      <Form.Label>Short Description</Form.Label>
                      <Form.Control
                        type="text"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label>Transaction_Id</Form.Label>
                      <Form.Control type="text" value={transactionId} readOnly />
                    </Col>
                    <Col>
                      <Form.Label>Warranty</Form.Label>
                      <Form.Control type="text" value={warranty} readOnly />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label>PurchaseDate</Form.Label>
                      <Form.Control type="text" value={FormatDate(purchaseDate)} readOnly />
                    </Col>
                    <Col>
                      <Form.Label>Status</Form.Label>
                      <Form.Control type="text" value={status} readOnly />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col md={6} className="d-flex mt-4">
                      <Col>
                        <Button variant="success" type="submit" onClick={handleUpdateBattery}>
                          Update
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(selectedBattery.batteryId)}
                        >
                          Delete Battery
                        </Button>
                      </Col>
                    </Col>
                  </Row>
                </Col>
              </Card>
            </Container>
          }
          handleClose={togglePopup}
        />
      ):("")}
    </div>
  );
}

export default DisplayBattery;



// import React, { useState, useEffect } from 'react';
// import { Button, Container, Form, Row, Col, Card } from 'react-bootstrap';
// import Popup from './Popup';
// import { useNavigate } from 'react-router-dom';
// import { GetToken } from './Api/auth';

// const apiUrl = 'http://avasol.ameyalabs.com:5000/latest-service-requests';
// const access_token = GetToken();

// function DisplayBattery() {
//   const navigate = useNavigate();
//   const [latestBattery, setLatestBattery] = useState([]);
//   const [selectedBattery, setSelectedBattery] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const storedData = localStorage.getItem('ServicesList');
//     if (storedData) {
//       setLatestBattery(JSON.parse(storedData));
//     }
//   }, []);

//   // Save the latestBattery data to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('ServiceList', JSON.stringify(latestBattery));
//   }, [latestBattery]);

//   const [assignedBy, setAssignBy] = useState('');
//   const [assignedDate, setAssignDate] = useState('');
//   const [noteToServiceEngineer, setNoteToServiceEngineer] = useState('');
//   const [payerId, setPayerId] = useState('');
//   const [openDate, setOpenDate] = useState('');
//   const [serviceEngineerId, setServiceEngineerId] = useState('');
//   const [serviceEngineerNotes,setServiceEngineerNotes] = useState('');
//   const [shortDescription, setShortDescription] = useState('');
//   const [transactionId, setTranscationId] = useState('');
//   const [purchaseDate, setPurchaseDate] = useState('');
//   const [warranty, setwarranty] = useState('');
//   const [status, setStatus]=useState('')
//   const [attendedDate, setAttendedDate]=useState('')
//   const [amount, setamount]=useState('')
//   const [otpId, setOtpId]=useState('')
//   const [requestId, setRequestId]=useState('')


//   useEffect(() => {
//     async function getLatestBattery() {
//       try {
//         const response = await fetch(apiUrl, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + access_token,
//           },
//         });
//         const data = await response.json(); 
//         console.log("view_batteries",data)
//         setLatestBattery(data);
//         // localStorage.setItem('batteryTables', JSON.stringify(data));
//       } catch (error) {
//         console.error('Error fetching latest Battery:', error);
//       }
//     }
//     getLatestBattery();
//   }, []);
//   console.log("battery",selectedBattery)


//   const handleDelete = (input_value) =>{
//     let batteryInfo;
//     let batteryId = input_value;
//     for(let i=0; i<latestBattery.length ; i++){
//       if(batteryId === latestBattery[i].batteryId){
//          batteryInfo = latestBattery[i]
//         latestBattery.pop(batteryInfo);
//       }

//     }
    

//     fetch("http://avasol.ameyalabs.com:5000/delete-service-request",{
//       method : "DELETE",
//       headers : {
//         'Authorization':`Bearer ${access_token}`,
//         'Content-Type' : 'application/json',
//       },
//       body: JSON.stringify(batteryInfo),
//     }).then(response => {
//       if (response.ok) {
//         console.log('DELETE request successful.');
//         alert("Deleted Succesfully")
//         navigate('/latest_serv_request')
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

//   const FormatDate = (dateString)=>{
//     const dateObject = new Date(dateString);
//     const formattedDate = dateObject.toLocaleString("en-US",{
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "numeric",
//       minute: "numeric",
//       second: "numeric",
//       // timeZoneName: "short",
//     });
//     return formattedDate;

//   }


//   const handleEdit = (battery) => {
//     setSelectedBattery(battery);
//     setIsOpen(true);
//     // Set the state values for editing
//     setAssignBy(battery.assignedBy);
//     setAssignDate(battery.assignedDate);
//     setNoteToServiceEngineer(battery.noteToServiceEngineer);
//     setPayerId(battery.payerId);
//     setOpenDate(battery.openDate);
//     setServiceEngineerId(battery.serviceEngineerId)
//     setServiceEngineerNotes(battery.serviceEngineerNotes)
//     setShortDescription(battery.shortDescription)
//     setTranscationId(battery.transactionId)
//     setwarranty(battery.warranty)
//     setPurchaseDate(battery.purchaseDate)
//     setStatus(battery.status)
//     setAttendedDate(battery.attendedDate)
//     setamount(battery.amount)
//     setOtpId(battery.otpId)
//     setRequestId(battery.requestId)


//   };

  
 
//   // const handleUpdateBattery = () => {
//   //   fetch(`http://avasol.ameyalabs.com:5000/update-battery`, {
//   //     method: 'PUT',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //       'Authorization': `Bearer ${access_token}`,
//   //     },
//   //     body: JSON.stringify({
//   //       batteryId: selectedBattery.batteryId,
//   //       batteryCapacity:batteryCapacity,
//   //       batteryVoltage:batteryVoltage,
//   //       batteryCurrent:batteryCurrent,
//   //       make:make,
//   //       model:model,
//   //       dealerId:dealerId,
//   //       invoice:invoice,
//   //       invoiceNumber:invoiceNumber,
//   //       invoiceUploaded:invoiceUploaded,
//   //       principalId:principalId,
//   //       purchaseDate:purchaseDate,
//   //       warranty:warranty,
//   //       status:0, 
//   //       username:selectedBattery.username
        
//   //     }),
//   //   })
//   //     .then((response) => {
//   //       if (response.ok) {
//   //         console.log('PUT request successful.');
//   //         alert('Updated Successfully');
//   //         setSelectedBattery(null);
//   //         setIsOpen(false);
//   //         // Update the latestBattery array with the updated data
//   //         setLatestBattery((prevLatestBattery) =>
//   //           prevLatestBattery.map((battery) =>
//   //             battery.batteryId === selectedBattery.batteryId
//   //               ? {
//   //                   ...battery,
//   //                   batteryCapacity:batteryCapacity,
//   //                 batteryVoltage:batteryVoltage,
//   //                 batteryCurrent:batteryCurrent,
//   //                 make:make,
//   //                 model:model,
//   //                 dealerId:dealerId,
//   //                 invoice:invoice,
//   //                 invoiceNumber:invoiceNumber,
//   //                 invoiceUploaded:invoiceUploaded,
//   //                 principalId:principalId,
//   //                 purchaseDate:purchaseDate,
//   //                 warranty:warranty,
//   //                 status:0, 
//   //                 }
//   //               : battery
//   //           )
//   //         );
//   //         navigate('/userMyBatteries')
//   //       } else {
//   //         console.error('PUT request failed:', response.status);
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error occurred during PUT request:', error);
//   //     });
//   // };
//   const handleUpdateBattery = () => {
//     const updatedBatteryData = {
//       batteryId: selectedBattery.batteryId,
//       assignedBy:assignedBy,
//       assignedDate:assignedDate,
//       attendedDate:attendedDate,
//       noteToServiceEngineer:noteToServiceEngineer,
//       payerId:payerId,
//       openDate:openDate,
//       serviceEngineerId:serviceEngineerId,
//       serviceEngineerNotes:serviceEngineerNotes,
//       shortDescription:shortDescription,
//       transactionId:1,
//       status:6,
//       otpId:0,
//       purchaseDate:purchaseDate,
//       warranty:warranty,
//       status:0, 
//       requestId:0,
//       username:selectedBattery.username,
//       amount:amount
//     };
  
//     fetch(`http://avasol.ameyalabs.com:5000/update-service-request`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${access_token}`,
//       },
//       body: JSON.stringify(updatedBatteryData),
//     })
//       .then(async (response) => {
//         if (response.ok) {
//           console.log('PUT request successful.');
//           alert('Updated Successfully');
//           setSelectedBattery(null);
//           setIsOpen(false);
  
//           // Update the latestBattery array with the updated data
//           setLatestBattery((prevLatestBattery) =>
//             prevLatestBattery.map((battery) =>
//               battery.batteryId === selectedBattery.batteryId
//                 ? { ...battery, ...updatedBatteryData }
//                 : battery
//             )
//           );
  
//           navigate('/latest_serv_request');
//         } else {
//           const errorResponse = await response.json();
//           console.error('PUT request failed:', errorResponse);
//           alert('Update failed. Please check the console for details.');
//         }
//       })
//       .catch((error) => {
//         console.error('Error occurred during PUT request:', error);
//         alert('Update failed. Please check the console for details.');
//       });
//   };
  

//   const togglePopup = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div>
//       <Container>
//         <table className="table caption-top  table-hover rounded mt-3 px-3" style={{ backgroundColor: '#FAFAFA' }}>
//           <thead>
//              <tr>
//                <th scope="col">Description</th>
//              <th scope="col">Open Date</th>
//              <th scope="col">Service Location</th>
//             <th scope="col">SE Name</th>
//                <th scope="col">SE Contact</th>
//                <th scope="col">SE Notes</th>
//                <th scope="col">Target Service Date</th>
//                <th scope="col">Status</th>
//               <th scope="col">Delete</th>
//               </tr>
//           </thead>
//           <tbody>
//             {latestBattery.map((record) => (
//               <tr>
//                 {/* <th scope="row">{record.shortDescription}</th> */}
//                 <td>
//                   <Button
//                     style={{backgroundColor:'lightseagreen',border:'none'}}
//                     className="btn-sm"
//                     onClick={() => handleEdit(record)}
//                   >
//                     {record.shortDescription}
//                   </Button>
//                 </td>
//                 <td>{FormatDate(record.openDate)}</td>
//                 <td>{FormatDate(record.assignedDate)}</td>
//                 <td>Service location</td>
//                 <td>SE Name</td>
//                 <td>{record.serviceEngineerNotes}</td>
//                 <td>target ServiceDate</td>
//                 <td>{record.status}</td>
//                 <td>
//                   <a
//                     href="#"
//                     className="text-decoration-none"
//                     onClick={() => handleDelete(record.batteryId)}
//                   >
//                     Delete
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </Container>

//       {selectedBattery && isOpen && (
//         <Popup
//           content={
//             <Container>
//               {/* <h3 className='text-dark'>Edit Service Details</h3> */}
//               <div className="bg-primary rounded mb-3 text-white m-2 p-2 px-3">
//                 <header>Edit Service Details</header>
//             </div>
//                 <Card className="shadow p-3 mb-5 bg-body-tertiary rounded">
//                   <Col className="m-3 mt-2 col">
//                     <Row className="mb-2">
//                       <Col>
//                         <Form.Label>Username</Form.Label>
//                         <Form.Control
//                           type="text"
//                           value={selectedBattery.username}
//                           readOnly
//                         />
//                       </Col>
//                       <Col>
//                         <Form.Label>Battery ID</Form.Label>
//                         <Form.Control
//                           type="text"
//                           value={selectedBattery.batteryId}
//                           readOnly
//                         />
//                       </Col>
//                     </Row>
//                     <Row className="mb-2">
//                       <Col>
//                         <Form.Label>Assigned By</Form.Label>
//                         <Form.Control
//                           type="text"
//                           value={assignedBy}
//                           onChange={(e) => setAssignBy(e.target.value)}
//                         />
//                       </Col>
//                       <Col>
//                         <Form.Label>Assigned Date</Form.Label>
//                         <Form.Control
//                           type="text"
//                           value={assignedDate}
//                           onChange={(e) => setAssignDate(e.target.value)}
//                         />
//                       </Col>
//                       <Col>
//                         <Form.Label>ServiceEngineer Notes</Form.Label>
//                         <Form.Control
//                           type="text"
//                           value={serviceEngineerNotes}
//                           onChange={(e) =>setNoteToServiceEngineer(e.target.value)}
//                         />
//                       </Col>
//                     </Row>
//                     <Row className="mb-2">
//                       <Col>
//                         <Form.Label>Service_Engg ID</Form.Label>
//                         <Form.Control
//                           type="text"
//                           value={serviceEngineerId}
//                           readOnly
//                         />
//                       </Col>
//                       <Col>
//                         <Form.Label>Short Description</Form.Label>
//                         <Form.Control
//                           type="text"
//                           value={shortDescription}
//                           onChange={(e) => setShortDescription(e.target.value)}
                          
//                         />
//                       </Col>
//                     </Row>
//                     <Row className="mb-2" >
//                           <Col>
//                               <Form.Label>Transaction_Id</Form.Label>
//                               <Form.Control type="text" value={transactionId} readOnly  ></Form.Control>
//                           </Col>
//                           <Col>
//                               <Form.Label>Warranty</Form.Label>
//                               <Form.Control type="text" value={warranty} readOnly ></Form.Control>
//                           </Col>
//                       </Row>
                    
//                     <Row className="mb-2" >
//                           <Col>
//                               <Form.Label>PurchaseDate</Form.Label>
//                               <Form.Control type="text" value={FormatDate(purchaseDate)} readOnly ></Form.Control>
//                           </Col>
//                           <Col>
//                               <Form.Label>Status</Form.Label>
//                               <Form.Control type="text" value={status} readOnly ></Form.Control>
//                           </Col>
//                       </Row>
//                     <Row className="mb-2">
//                       <Col md={6} className="d-flex mt-4">
//                         <Col>
//                           <Button variant="success" type="submit" onClick={handleUpdateBattery}>
//                             Update
//                           </Button>
//                         </Col>
//                         <Col>
//                           <Button
//                             variant="danger"
//                             onClick={() => handleDelete(selectedBattery.batteryId)}
//                           >
//                             Delete Battery
//                           </Button>
//                         </Col>
//                       </Col>
//                     </Row>
//                   </Col>
//                 </Card>
              
//             </Container>
//           }
//           handleClose={togglePopup}
//         />
//       )}
//     </div>
//   );
// }

// export default DisplayBattery;




// import React, { useState, useEffect } from 'react';
// import { Button, Container, Form, Row, Col, Card } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { GetToken } from './Api/auth';
// import Popup from './Popup';
// const apiUrl = 'http://avasol.ameyalabs.com:5000/view-batteries';
// const access_token = GetToken();

// function DisplayBattery() {
//   const navigate = useNavigate();
//   const [latestBattery, setLatestBattery] = useState([]);
//   const [selectedBattery, setSelectedBattery] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);

//   // Refactor input state handling
//   const [formData, setFormData] = useState({
//     batteryCapacity: '',
//     batteryVoltage: '',
//     batteryCurrent: '',
//     make: '',
//     model: '',
//     dealerId: '',
//     invoice: '',
//     invoiceNumber: '',
//     invoiceUploaded: '',
//     principalId: '',
//     purchaseDate: '',
//     warranty: '',
//     status: '',
//   });

//   useEffect(() => {
//     const storedData = localStorage.getItem('batteryData');
//     if (storedData) {
//       setLatestBattery(JSON.parse(storedData));
//     }
//   }, []);

//   useEffect(() => {
//     async function getLatestBatteryData() {
//       try {
//         const response = await fetch(apiUrl, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + access_token,
//           },
//         });
//         const data = await response.json();
//         console.log('view_batteries', data);
//         setLatestBattery(data);
//         localStorage.setItem('batteryTables', JSON.stringify(data));
//       } catch (error) {
//         console.error('Error fetching latest Battery:', error);
//       }
//     }
//     getLatestBatteryData();
//   }, []);

//   const handleDelete = (batteryId) => {
//     const batteryInfo = latestBattery.find((battery) => battery.batteryId === batteryId);
//     if (!batteryInfo) {
//       console.error('Battery not found');
//       return;
//     }

//     fetch('http://avasol.ameyalabs.com:5000/delete-battery', {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${access_token}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(batteryInfo),
//     })
//       .then((response) => {
//         if (response.ok) {
//           console.log('DELETE request successful.');
//           alert('Deleted Successfully');
//           navigate('/userMyBatteries');
//         } else {
//           console.error('DELETE request failed.');
//         }
//       })
//       .catch((error) => {
//         console.error('Error occurred during DELETE request:', error);
//       });
//   };

//   const handleEdit = (battery) => {
//     setSelectedBattery(battery);
//     setIsOpen(true);
//     // Set the form data for editing
//     setFormData({
//       ...formData,
//       batteryCapacity: battery.batteryCapacity,
//       batteryVoltage: battery.batteryVoltage,
//       batteryCurrent: battery.batteryCurrent,
//       make: battery.make,
//       model: battery.model,
//       dealerId: battery.dealerId,
//       invoice: battery.invoice,
//       invoiceNumber: battery.invoiceNumber,
//       invoiceUploaded: battery.invoiceUploaded,
//       principalId: battery.principalId,
//       purchaseDate: battery.purchaseDate,
//       warranty: battery.warranty,
//       status: battery.status,
//     });
//   };

//   const handleUpdateBattery = () => {
//     fetch(`http://avasol.ameyalabs.com:5000/update-battery`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${access_token}`,
//       },
//       body: JSON.stringify({
//         batteryId: selectedBattery.batteryId,
//         ...formData,
//         status: 0,
//         username: selectedBattery.username,
//       }),
//     })
//       .then((response) => {
//         if (response.ok) {
//           console.log('PUT request successful.');
//           alert('Updated Successfully');
//           setSelectedBattery(null);
//           setIsOpen(false);
//           // Update the latestBattery array with the updated data
//           setLatestBattery((prevLatestBattery) =>
//             prevLatestBattery.map((battery) =>
//               battery.batteryId === selectedBattery.batteryId
//                 ? { ...battery, ...formData }
//                 : battery
//             )
//           );
//           navigate('/userMyBatteries');
//         } else {
//           console.error('PUT request failed:', response.status);
//         }
//       })
//       .catch((error) => {
//         console.error('Error occurred during PUT request:', error);
//       });
//   };

//   const togglePopup = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div>
       
//             <Container>
//         <table className="table caption-top  table-hover rounded mt-3 px-3" style={{ backgroundColor: '#BFCAD1' }}>
//           <thead>
//             <tr>
//               <th scope="col">Battery Name</th>
//               <th scope="col">Battery Number</th>
//               <th scope="col">Battery Make</th>
//               <th scope="col">Battery Model</th>
//               <th scope="col">Warrenty</th>
//               <th scope="col">Status</th>
//               <th scope="col">Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {latestBattery.map((record) => (
//               <tr key={record.batteryId}>
//                 <th scope="row">{record.BatteryName}</th>
//                 <td>
//                   <Button
//                     variant="success"
//                     className="btn-sm"
//                     onClick={() => handleEdit(record)}
//                   >
//                     {record.batteryId}
//                   </Button>
//                 </td>
//                 <td>{record.make}</td>
//                 <td>{record.model}</td>
//                 <td>{record.warranty}</td>
//                 <td>{record.status}</td>
//                 <td>
//                   <a
//                     href="#"
//                     className="text-decoration-none"
//                     onClick={() => handleDelete(record.batteryId)}
//                   >
//                     Delete
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </Container>

//       {selectedBattery && isOpen && (
//         <div className="popup-container">
//           <Popup
//           content={
//             <Container>
//             <div className="bg-primary rounded mb-3 text-white m-2 p-2 px-3">
//               <header>Edit Battery Details</header>
//             </div>
//             <Card className="shadow p-3 mb-5 bg-body-tertiary rounded">
//               <Col className="m-3 mt-2 col">
//                 <Row className="mb-2">
//                   <Col>
//                     <Form.Label>Username</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={selectedBattery.username}
//                       readOnly
//                     />
//                   </Col>
//                   <Col>
//                     <Form.Label>Battery ID</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={selectedBattery.batteryId}
//                       readOnly
//                     />
//                   </Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col>
//                     <Form.Label>Battery Capacity</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={formData.batteryCapacity} 
//                       onChange={(e) => setFormData({ ...formData, batteryCapacity: e.target.value })}
//                     />
//                   </Col>
//                   <Col>
//                     <Form.Label>Battery Voltage</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={formData.batteryVoltage} 
//                       onChange={(e) => setFormData({ ...formData, batteryVoltage: e.target.value })}
//                     />
//                   </Col>
//                   <Col>
//                     <Form.Label>Battery Current</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={formData.batteryCurrent} 
//                       onChange={(e) => setFormData({ ...formData, batteryCurrent: e.target.value })}
//                     />
//                   </Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col>
//                     <Form.Label>Dealer ID</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={selectedBattery.dealerId}
//                       readOnly
//                     />
//                   </Col>
//                   <Col>
//                     <Form.Label>Principal ID</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={selectedBattery.principalId}
//                       readOnly
//                     />
//                   </Col>
//                 </Row>
//                 <Row className="mb-2" >
//                   <Col>
//                     <Form.Label>Invoice Number</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={selectedBattery.invoiceNumber}
//                       readOnly
//                     />
//                   </Col>
//                   <Col>
//                     <Form.Label>Invoice Uploaded</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={selectedBattery.invoiceUploaded}
//                       readOnly
//                     />
//                   </Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col>
//                     <Form.Label>Make</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={formData.make} 
//                       onChange={(e) => setFormData({ ...formData, make: e.target.value })}
//                     />
//                   </Col>
//                   <Col>
//                     <Form.Label>Model</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={formData.model} 
//                       onChange={(e) => setFormData({ ...formData, model: e.target.value })}
//                     />
//                   </Col>
//                 </Row>
//                 <Row className="mb-2" >
//                   <Col>
//                     <Form.Label>PurchaseDate</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={selectedBattery.purchaseDate}
//                       readOnly
//                     />
//                   </Col>
//                   <Col>
//                     <Form.Label>Warrenty</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={selectedBattery.warranty}
//                       readOnly
//                     />
//                   </Col>
//                   <Col>
//                     <Form.Label>Status</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={selectedBattery.status}
//                       readOnly
//                     />
//                   </Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col md={6} className="d-flex mt-4">
//                     <Col>
//                       <Button variant="success" type="submit" onClick={handleUpdateBattery}>
//                         Update
//                       </Button>
//                     </Col>
//                     <Col>
//                       <Button
//                         variant="danger"
//                         onClick={() => handleDelete(selectedBattery.batteryId)}
//                       >
//                         Delete Battery
//                       </Button>
//                     </Col>
//                   </Col>
//                 </Row>
//               </Col>
//             </Card>
//           </Container>
//         }
//         handleClose={togglePopup}
//   />
//         </div>
//       )}
//     </div>
//   );
// }

// export default DisplayBattery;

// import React, { useState, useEffect } from 'react';
// import { Button, Container, Form, Row, Col, Card } from 'react-bootstrap';
// import Popup from './Popup';
// import { useNavigate } from 'react-router-dom';
// import { GetToken } from './Api/auth';

// const apiUrl = 'http://avasol.ameyalabs.com:5000/latest-service-requests';
// const access_token = GetToken();

// function DisplayDetails() {
//   const navigate = useNavigate();
//   const [latestBattery, setLatestBattery] = useState([]);
//   const [selectedBattery, setSelectedBattery] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
  
//   useEffect(() => {
//     const storedData = localStorage.getItem('batteryData');
//     if (storedData) {
//       setLatestBattery(JSON.parse(storedData));
//     }
//   }, []);

//   // Save the latestBattery data to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('batteryData', JSON.stringify(latestBattery));
//   }, [latestBattery]);

  // const [assignedBy, setAssignBy] = useState('');
  // const [assignedDate, setAssignDate] = useState('');
  // const [noteToServiceEngineer, setNoteToServiceEngineer] = useState('');
  // const [payerId, setPayerId] = useState('');
  // const [openDate, setOpenDate] = useState('');
  // const [serviceEngineerId, setServiceEngineerId] = useState('');
  // const [serviceEngineerNotes,setServiceEngineerNotes] = useState('');
  // const [shortDescription, setShortDescription] = useState('');
  // const [transactionId, setTranscationId] = useState('');
  // const [purchaseDate, setPurchaseDate] = useState('');
  // const [warranty, setwarranty] = useState('');
  // const [status, setStatus]=useState('')
  // const [attendedDate, setAttendedDate]=useState('')
  // const [amount, setamount]=useState('')
  // const [otpId, setOtpId]=useState('')
  // const [requestId, setRequestId]=useState('')



//   useEffect(() => {
//     async function getLatestBattery() {
//       try {
//         const response = await fetch(apiUrl, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + access_token,
//           },
//         });
//         const data = await response.json();
//         setLatestBattery(data);
//         localStorage.setItem('batteryTables', JSON.stringify(data));
//       } catch (error) {
//         console.error('Error fetching latest Battery:', error);
//       }
//     }
//     getLatestBattery();
//   }, []);
//   console.log("battery",selectedBattery)


//   const handleDelete = (input_value) =>{
//     let batteryInfo;
//     let batteryId = input_value;
//     for(let i=0; i<latestBattery.length ; i++){
//       if(batteryId === latestBattery[i].batteryId){
//          batteryInfo = latestBattery[i]
//         latestBattery.pop(batteryInfo);
//       }

//     }
    
//     fetch("http://avasol.ameyalabs.com:5000/delete-service-request",{
//       method : "DELETE",
//       headers : {
//         'Authorization':`Bearer ${access_token}`,
//         'Content-Type' : 'application/json',
//       },
//       body: JSON.stringify(batteryInfo),
//     }).then(response => {
//       if (response.ok) {
//         console.log('DELETE request successful.');
//         alert("Deleted Succesfully")
//         navigate('/latest_serv_request')
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

//   const FormatDate = (dateString)=>{
//     const dateObject = new Date(dateString);
//     const formattedDate = dateObject.toLocaleString("en-US",{
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "numeric",
//       minute: "numeric",
//       second: "numeric",
//       // timeZoneName: "short",
//     });
//     return formattedDate;

//   }


//   const handleEdit = (battery) => {
//     setSelectedBattery(battery);
//     setIsOpen(true);
//     // Set the state values for editing
    // setAssignBy(battery.assignedBy);
    // setAssignDate(battery.assignedDate);
    // setNoteToServiceEngineer(battery.noteToServiceEngineer);
    // setPayerId(battery.payerId);
    // setOpenDate(battery.openDate);
    // setServiceEngineerId(battery.serviceEngineerId)
    // setServiceEngineerNotes(battery.serviceEngineerNotes)
    // setShortDescription(battery.shortDescription)
    // setTranscationId(battery.transactionId)
    // setwarranty(battery.warranty)
    // setPurchaseDate(battery.purchaseDate)
    // setStatus(battery.status)
    // setAttendedDate(battery.attendedDate)
    // setamount(battery.amount)
    // setOtpId(battery.otpId)
    // setRequestId(battery.requestId)


//   };

  
//   // let item=[assignedBy,assignedDate,noteToServiceEngineer,
//   //   payerId,openDate,serviceEngineerId,serviceEngineerNotes,shortDescription,
//   //   transactionId,warranty,purchaseDate]


//   const handleUpdateBattery = () => {
//     const updatedBatteryData={
//       batteryId: selectedBattery.batteryId,
//       assignedBy:assignedBy,
//       assignedDate:assignedDate,
//       attendedDate:attendedDate,
//       noteToServiceEngineer:noteToServiceEngineer,
//       payerId:payerId,
//       openDate:openDate,
//       serviceEngineerId:serviceEngineerId,
//       serviceEngineerNotes:serviceEngineerNotes,
//       shortDescription:shortDescription,
//       transactionId:1,
//       status:6,
//       otpId:0,
//       purchaseDate:purchaseDate,
//       warranty:warranty,
//       status:0, 
//       requestId:0,
//       username:selectedBattery.username,
//       amount:amount
      
//     }
  
//     fetch(`http://avasol.ameyalabs.com:5000/update-service-request`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${access_token}`,
//       },
//       body: JSON.stringify(updatedBatteryData),
//     })
//       .then(async (response) => {
//         if (response.ok) {
//           console.log('PUT request successful.');
//           alert('Updated Successfully');
//           setSelectedBattery(null);
//           setIsOpen(false);
  
//           // Update the latestBattery array with the updated data
//           setLatestBattery((prevLatestBattery) =>
//             prevLatestBattery.map((battery) =>
//               battery.batteryId === selectedBattery.batteryId
//                 ? { ...battery, ...updatedBatteryData }
//                 : battery
//             )
//           );
  
//           navigate('/latest_serv_request');
//         } else {
//           const errorResponse = await response.json();
//           console.error('PUT request failed:', errorResponse);
//           alert('Update failed. Please check the console for details.');
//         }
//       })
//       .catch((error) => {
//         console.error('Error occurred during PUT request:', error);
//         alert('Update failed. Please check the console for details.');
//       });
//   };

//   // const handleUpdateBattery = () => {
//     // const updateServiceData={
//     //   batteryId: selectedBattery.batteryId,
//     //   assignedBy:assignedBy,
//     //   assignedDate:assignedDate,
//     //   attendedDate:attendedDate,
//     //   noteToServiceEngineer:noteToServiceEngineer,
//     //   payerId:payerId,
//     //   openDate:openDate,
//     //   serviceEngineerId:serviceEngineerId,
//     //   serviceEngineerNotes:serviceEngineerNotes,
//     //   shortDescription:shortDescription,
//     //   transactionId:1,
//     //   status:6,
//     //   otpId:0,
//     //   purchaseDate:purchaseDate,
//     //   warranty:warranty,
//     //   status:0, 
//     //   requestId:0,
//     //   username:selectedBattery.username,
//     //   amount:amount
      
//     // }
//   //   fetch(`http://avasol.ameyalabs.com:5000/update-service-request`, {
//   //     method: 'PUT',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //       'Authorization': `Bearer ${access_token}`,
//   //     },
//   //     body: JSON.stringify(updateServiceData),
//   //   })
//   //     .then(async(response) => {
//   //       if (response.ok) {
//   //         console.log('PUT request successful.');
//   //         alert('Updated Successfully');
//   //         setSelectedBattery(null);
//   //         setIsOpen(false);
//   //         // Update the latestBattery array with the updated data
//   //         setLatestBattery((prevLatestBattery) =>
//   //           prevLatestBattery.map((battery) =>
//   //             battery.batteryId === selectedBattery.batteryId
//   //               ? {...battery, ...updateServiceData}
//   //               : battery
//   //           )
//   //         );
//   //         navigate('/latest_serv_request')
//   //       } else {
//   //         const errorResponse = await response.json();
//   //         console.error('PUT request failed:', errorResponse);
//   //         alert('Update failed. Please check the console for details.');
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error occurred during PUT request:', error);
//   //       alert('Update failed. Please check the console for details.');
//   //     });
//   // };

//   const togglePopup = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
    // <div>
    //   <Container>
    //     <table className="table caption-top  table-hover rounded mt-3 px-3" style={{ backgroundColor: '#FAFAFA' }}>
    //       <thead>
    //          <tr>
    //            <th scope="col">Description</th>
    //          <th scope="col">Open Date</th>
    //          <th scope="col">Service Location</th>
    //         <th scope="col">SE Name</th>
    //            <th scope="col">SE Contact</th>
    //            <th scope="col">SE Notes</th>
    //            <th scope="col">Target Service Date</th>
    //            <th scope="col">Status</th>
    //           <th scope="col">Delete</th>
    //           </tr>
    //       </thead>
    //       <tbody>
    //         {latestBattery.map((record) => (
    //           <tr>
    //             {/* <th scope="row">{record.shortDescription}</th> */}
    //             <td>
    //               <Button
    //                 style={{backgroundColor:'lightseagreen',border:'none'}}
    //                 className="btn-sm"
    //                 onClick={() => handleEdit(record)}
    //               >
    //                 {record.shortDescription}
    //               </Button>
    //             </td>
    //             <td>{FormatDate(record.openDate)}</td>
    //             <td>{FormatDate(record.assignedDate)}</td>
    //             <td>Service location</td>
    //             <td>SE Name</td>
    //             <td>{record.serviceEngineerNotes}</td>
    //             <td>target ServiceDate</td>
    //             <td>{record.status}</td>
    //             <td>
    //               <a
    //                 href="#"
    //                 className="text-decoration-none"
    //                 onClick={() => handleDelete(record.batteryId)}
    //               >
    //                 Delete
    //               </a>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </Container>

    //   {selectedBattery && isOpen && (
    //     <Popup
    //       content={
    //         <Container>
    //           {/* <h3 className='text-dark'>Edit Service Details</h3> */}
    //           <div className="bg-primary rounded mb-3 text-white m-2 p-2 px-3">
    //             <header>Edit Service Details</header>
    //         </div>
    //             <Card className="shadow p-3 mb-5 bg-body-tertiary rounded">
    //               <Col className="m-3 mt-2 col">
    //                 <Row className="mb-2">
    //                   <Col>
    //                     <Form.Label>Username</Form.Label>
    //                     <Form.Control
    //                       type="text"
    //                       value={selectedBattery.username}
    //                       readOnly
    //                     />
    //                   </Col>
    //                   <Col>
    //                     <Form.Label>Battery ID</Form.Label>
    //                     <Form.Control
    //                       type="text"
    //                       value={selectedBattery.batteryId}
    //                       readOnly
    //                     />
    //                   </Col>
    //                 </Row>
    //                 <Row className="mb-2">
    //                   <Col>
    //                     <Form.Label>Assigned By</Form.Label>
    //                     <Form.Control
    //                       type="text"
    //                       value={assignedBy}
    //                       onChange={(e) => setAssignBy(e.target.value)}
    //                     />
    //                   </Col>
    //                   <Col>
    //                     <Form.Label>Assigned Date</Form.Label>
    //                     <Form.Control
    //                       type="text"
    //                       value={assignedDate}
    //                       onChange={(e) => setAssignDate(e.target.value)}
    //                     />
    //                   </Col>
    //                   <Col>
    //                     <Form.Label>ServiceEngineer Notes</Form.Label>
    //                     <Form.Control
    //                       type="text"
    //                       value={serviceEngineerNotes}
    //                       onChange={(e) =>setNoteToServiceEngineer(e.target.value)}
    //                     />
    //                   </Col>
    //                 </Row>
    //                 <Row className="mb-2">
    //                   <Col>
    //                     <Form.Label>Service_Engg ID</Form.Label>
    //                     <Form.Control
    //                       type="text"
    //                       value={serviceEngineerId}
    //                       readOnly
    //                     />
    //                   </Col>
    //                   <Col>
    //                     <Form.Label>Short Description</Form.Label>
    //                     <Form.Control
    //                       type="text"
    //                       value={shortDescription}
    //                       onChange={(e) => setShortDescription(e.target.value)}
                          
    //                     />
    //                   </Col>
    //                 </Row>
    //                 <Row className="mb-2" >
    //                       <Col>
    //                           <Form.Label>Transaction_Id</Form.Label>
    //                           <Form.Control type="text" value={transactionId} readOnly  ></Form.Control>
    //                       </Col>
    //                       <Col>
    //                           <Form.Label>Warranty</Form.Label>
    //                           <Form.Control type="text" value={warranty} readOnly ></Form.Control>
    //                       </Col>
    //                   </Row>
                    
    //                 <Row className="mb-2" >
    //                       <Col>
    //                           <Form.Label>PurchaseDate</Form.Label>
    //                           <Form.Control type="text" value={FormatDate(purchaseDate)} readOnly ></Form.Control>
    //                       </Col>
    //                       <Col>
    //                           <Form.Label>Status</Form.Label>
    //                           <Form.Control type="text" value={status} readOnly ></Form.Control>
    //                       </Col>
    //                   </Row>
    //                 <Row className="mb-2">
    //                   <Col md={6} className="d-flex mt-4">
    //                     <Col>
    //                       <Button variant="success" type="submit" onClick={handleUpdateBattery}>
    //                         Update
    //                       </Button>
    //                     </Col>
    //                     <Col>
    //                       <Button
    //                         variant="danger"
    //                         onClick={() => handleDelete(selectedBattery.batteryId)}
    //                       >
    //                         Delete Battery
    //                       </Button>
    //                     </Col>
    //                   </Col>
    //                 </Row>
    //               </Col>
    //             </Card>
              
    //         </Container>
    //       }
    //       handleClose={togglePopup}
    //     />
    //   )}
    // </div>
//   );
// }

// export default DisplayDetails;
