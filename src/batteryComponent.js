import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Row, Col, Card } from 'react-bootstrap';
import Popup from './Popup';
import { useNavigate } from 'react-router-dom';
import { GetToken } from './Api/auth';

const apiUrl = 'http://100.20.33.222:5000/user/get-battery-list';
const access_token = GetToken();

function DisplayBattery() {
  const navigate = useNavigate();
  const [latestBattery, setLatestBattery] = useState([]);
  const [selectedBattery, setSelectedBattery] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('batteryData');
    if (storedData) {
      setLatestBattery(JSON.parse(storedData));
    }
  }, []);

  // Save the latestBattery data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('batteryData', JSON.stringify(latestBattery));
  }, [latestBattery]);

  const [batteryCapacity, setBatteryCapacity] = useState('');
  const [batteryVoltage, setBatteryVoltage] = useState('');
  const [batteryCurrent, setBatteryCurrent] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [dealerId, setDealerId] = useState('');
  const [invoice,setInvoice] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceUploaded, setInvoiceUploaded] = useState('');
  const [principalId, setPrincipalId] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [warranty, setwarranty] = useState('');
  const [status, setStatus]=useState('')

  useEffect(() => {
    async function getLatestBattery() {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
          },
        });
        const data = await response.json(); 
        console.log("view_batteries",data)
        setLatestBattery(data);
        localStorage.setItem('batteryTables', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching latest Battery:', error);
      }
    }
    getLatestBattery();
  }, []);
  console.log("battery",selectedBattery)


  const handleDelete = (input_value) =>{
    let batteryInfo;
    let batteryId = input_value;
    for(let i=0; i<latestBattery.length ; i++){
      if(batteryId === latestBattery[i].batteryId){
         batteryInfo = latestBattery[i]
        latestBattery.pop(batteryInfo);
      }

    }
    

    fetch("http://100.20.33.222:5000/user/delete-battery",{
      method : "DELETE",
      headers : {
        'Authorization':`Bearer ${access_token}`,
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(batteryInfo),
    }).then(response => {
      if (response.ok) {
        console.log('DELETE request successful.');
        alert("Deleted Succesfully")
        navigate('/userMyBatteries')
        // Handle success or update the UI accordingly
      } else {
        console.error('DELETE request failed.');
        // Handle error or update the UI accordingly
      }
    })
    .catch(error => {
      console.error('Error occurred during DELETE request:', error);
      // Handle error or update the UI accordingly
    });
  }

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


  const handleEdit = (battery) => {
    setSelectedBattery(battery);
    setIsOpen(true);
    // Set the state values for editing
    setBatteryCapacity(battery.batteryCapacity);
    setBatteryVoltage(battery.batteryVoltage);
    setBatteryCurrent(battery.batteryCurrent);
    setMake(battery.make);
    setModel(battery.model);
    setDealerId(battery.dealerId)
    setInvoice(battery.invoice)
    setInvoiceNumber(battery.invoiceNumber)
    setInvoiceUploaded(battery.invoiceUploaded)
    setPrincipalId(battery.principalId)
    setwarranty(battery.warranty)
    setPurchaseDate(battery.purchaseDate)
    setStatus(battery.status)


  };

  

  const handleUpdateBattery = () => {
    const updatedBatteryData = {
      batteryId: selectedBattery.batteryId,
      batteryCapacity: batteryCapacity,
      batteryVoltage: batteryVoltage,
      batteryCurrent: batteryCurrent,
      make: make,
      model: model,
      dealerId: dealerId,
      invoice: invoice,
      invoiceNumber: invoiceNumber,
      invoiceUploaded: invoiceUploaded,
      principalId: principalId,
      purchaseDate: purchaseDate,
      warranty: warranty,
      status: status,
      username: selectedBattery.username,
    };
  
    fetch('http://100.20.33.222:5000/user/update-battery', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
      body: JSON.stringify(updatedBatteryData),
    })
      .then(async (response) => {
        if (response.ok) {
          console.log('PUT request successful.');
          alert('Updated Successfully');
          setSelectedBattery(null);
          setIsOpen(!isOpen);
          navigate('/userMyBatteries');
          // Update the latestBattery array with the updated data
          setLatestBattery((prevLatestBattery) =>
            prevLatestBattery.map((battery) =>
              battery.batteryId === selectedBattery.batteryId
                ? { ...battery, ...updatedBatteryData }
                : battery
            )
          );
  
          
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
      {/* backgroundColor: '#BFCAD1' */}
        <table className="table caption-top  table-hover rounded mt-3 px-3" style={{ backgroundColor: '#FAFAFA' }}>
          <thead>
            <tr>
              <th scope="col">Battery Name</th>
              <th scope="col">Battery Number</th>
              <th scope="col">Battery Make</th>
              <th scope="col">Battery Model</th>
              <th scope="col">Warrenty</th>
              <th scope="col">Status</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {latestBattery.map((record) => (
              <tr key={record.batteryId}>
                <th scope="row">{record.batteryName}</th>
                <td>
                  <Button
                    variant="success"
                    className="btn-sm"
                    onClick={() => handleEdit(record)}
                  >
                    {record.batteryId}
                  </Button>
                </td>
                <td>{record.make}</td>
                <td>{record.model}</td>
                <td>{record.warranty}</td>
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

      {(selectedBattery && isOpen)?(
        <div className='popup-container'>
        <Popup
          content={
            <Container>
              {/* <h3 className='text-dark'>Edit Battery Details</h3> */}
              <div className="bg-primary rounded mb-3 text-white m-2 p-2 px-3">
                <header>Edit Battery Details</header>
            </div>
                <Card className="shadow p-3 mb-5 bg-body-tertiary rounded">
                  <Col className="m-3 mt-2 col">
                    <Row className="mb-2">
                      <Col>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          value={selectedBattery.username}
                          readOnly
                        />
                      </Col>
                      <Col>
                        <Form.Label>Battery ID</Form.Label>
                        <Form.Control
                          type="text"
                          value={selectedBattery.batteryId}
                          readOnly
                        />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>
                        <Form.Label>Battery Capacity</Form.Label>
                        <Form.Control
                          type="text"
                          value={batteryCapacity}
                          onChange={(e) => setBatteryCapacity(e.target.value)}
                        />
                      </Col>
                      <Col>
                        <Form.Label>Battery Voltage</Form.Label>
                        <Form.Control
                          type="text"
                          value={batteryVoltage}
                          onChange={(e) => setBatteryVoltage(e.target.value)}
                        />
                      </Col>
                      <Col>
                        <Form.Label>Battery Current</Form.Label>
                        <Form.Control
                          type="text"
                          value={batteryCurrent}
                          onChange={(e) => setBatteryCurrent(e.target.value)}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>
                        <Form.Label>Dealer ID</Form.Label>
                        <Form.Control
                          type="text"
                          value={dealerId}
                          readOnly
                        />
                      </Col>
                      <Col>
                        <Form.Label>Principal ID</Form.Label>
                        <Form.Control
                          type="text"
                          value={principalId}
                          readOnly
                        />
                      </Col>
                    </Row>
                    <Row className="mb-2" >
                          <Col>
                              <Form.Label>Invoice Number</Form.Label>
                              <Form.Control type="text" value={invoiceNumber} readOnly  ></Form.Control>
                          </Col>
                          <Col>
                              <Form.Label>Invoice Uploaded</Form.Label>
                              <Form.Control type="text" value={invoiceUploaded} readOnly ></Form.Control>
                          </Col>
                      </Row>
                    <Row className="mb-2">
                      <Col>
                        <Form.Label>Make</Form.Label>
                        <Form.Control
                          type="text"
                          value={make}
                          onChange={(e) => setMake(e.target.value)}
                        />
                      </Col>
                      <Col>
                        <Form.Label>Model</Form.Label>
                        <Form.Control
                          type="text"
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-2" >
                          <Col>
                              <Form.Label>PurchaseDate</Form.Label>
                              <Form.Control type="text" value={FormatDate(purchaseDate)} readOnly ></Form.Control>
                          </Col>
                          <Col>
                              <Form.Label>Warrenty</Form.Label>
                              <Form.Control type="text" value={warranty} readOnly ></Form.Control>
                          </Col>
                          <Col>
                              <Form.Label>Status</Form.Label>
                              <Form.Control type="text" value={status} readOnly ></Form.Control>
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
        </div>
      ):("")}
    </div>
  );
}

export default DisplayBattery;

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
  //       <div className="popup-container">
  //         <Popup
  //         content={
  //           <Container>
  //           <div className="bg-primary rounded mb-3 text-white m-2 p-2 px-3">
  //             <header>Edit Battery Details</header>
  //           </div>
  //           <Card className="shadow p-3 mb-5 bg-body-tertiary rounded">
  //             <Col className="m-3 mt-2 col">
  //               <Row className="mb-2">
  //                 <Col>
  //                   <Form.Label>Username</Form.Label>
  //                   <Form.Control
  //                     type="text"
  //                     value={selectedBattery.username}
  //                     readOnly
  //                   />
  //                 </Col>
  //                 <Col>
  //                   <Form.Label>Battery ID</Form.Label>
  //                   <Form.Control
  //                     type="text"
  //                     value={selectedBattery.batteryId}
  //                     readOnly
  //                   />
  //                 </Col>
  //               </Row>
  //               <Row className="mb-2">
  //                 <Col>
  //                   <Form.Label>Battery Capacity</Form.Label>
  //                   <Form.Control
  //                     type="text"
  //                     value={formData.batteryCapacity} 
  //                     onChange={(e) => setFormData({ ...formData, batteryCapacity: e.target.value })}
  //                   />
  //                 </Col>
  //                 <Col>
  //                   <Form.Label>Battery Voltage</Form.Label>
  //                   <Form.Control
  //                     type="text"
  //                     value={formData.batteryVoltage} 
  //                     onChange={(e) => setFormData({ ...formData, batteryVoltage: e.target.value })}
  //                   />
  //                 </Col>
  //                 <Col>
  //                   <Form.Label>Battery Current</Form.Label>
  //                   <Form.Control
  //                     type="text"
  //                     value={formData.batteryCurrent} 
  //                     onChange={(e) => setFormData({ ...formData, batteryCurrent: e.target.value })}
  //                   />
  //                 </Col>
  //               </Row>
  //               <Row className="mb-2">
  //                 <Col>
  //                   <Form.Label>Dealer ID</Form.Label>
  //                   <Form.Control
  //                     type="text"
  //                     value={selectedBattery.dealerId}
  //                     readOnly
  //                   />
  //                 </Col>
  //                 <Col>
  //                   <Form.Label>Principal ID</Form.Label>
  //                   <Form.Control
  //                     type="text"
  //                     value={selectedBattery.principalId}
  //                     readOnly
  //                   />
  //                 </Col>
  //               </Row>
  //               <Row className="mb-2" >
  //                 <Col>
  //                   <Form.Label>Invoice Number</Form.Label>
  //                   <Form.Control
  //                     type="text"
  //                     value={selectedBattery.invoiceNumber}
  //                     readOnly
  //                   />
  //                 </Col>
  //                 <Col>
  //                   <Form.Label>Invoice Uploaded</Form.Label>
  //                   <Form.Control
  //                     type="text"
  //                     value={selectedBattery.invoiceUploaded}
  //                     readOnly
  //                   />
  //                 </Col>
  //               </Row>
  //               <Row className="mb-2">
  //                 <Col>
  //                   <Form.Label>Make</Form.Label>
  //                   <Form.Control
  //                     type="text"
  //                     value={formData.make} 
  //                     onChange={(e) => setFormData({ ...formData, make: e.target.value })}
  //                   />
  //                 </Col>
  //                 <Col>
  //                   <Form.Label>Model</Form.Label>
  //                   <Form.Control
  //                     type="text"
  //                     value={formData.model} 
  //                     onChange={(e) => setFormData({ ...formData, model: e.target.value })}
  //                   />
  //                 </Col>
  //               </Row>
  //               <Row className="mb-2" >
  //                 <Col>
  //                   <Form.Label>PurchaseDate</Form.Label>
  //                   <Form.Control
  //                     type="text"
  //                     value={selectedBattery.purchaseDate}
  //                     readOnly
  //                   />
  //                 </Col>
  //                 <Col>
  //                   <Form.Label>Warrenty</Form.Label>
  //                   <Form.Control
  //                     type="text"
  //                     value={selectedBattery.warranty}
  //                     readOnly
  //                   />
  //                 </Col>
  //                 <Col>
  //                   <Form.Label>Status</Form.Label>
  //                   <Form.Control
  //                     type="text"
  //                     value={selectedBattery.status}
  //                     readOnly
  //                   />
  //                 </Col>
  //               </Row>
  //               <Row className="mb-2">
  //                 <Col md={6} className="d-flex mt-4">
  //                   <Col>
  //                     <Button variant="success" type="submit" onClick={handleUpdateBattery}>
  //                       Update
  //                     </Button>
  //                   </Col>
  //                   <Col>
  //                     <Button
  //                       variant="danger"
  //                       onClick={() => handleDelete(selectedBattery.batteryId)}
  //                     >
  //                       Delete Battery
  //                     </Button>
  //                   </Col>
  //                 </Col>
  //               </Row>
  //             </Col>
  //           </Card>
  //         </Container>
  //       }
  //       handleClose={togglePopup}
  // />
//         </div>
//       )}
//     </div>
//   );
// }

// export default DisplayBattery;
