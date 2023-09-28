import React, { useState, useEffect } from 'react';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input, Typography, FormControl, Select, MenuItem, FormHelperText, Button, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetToken } from './Api/auth';
import SERVER_URL from './Server/Server';

const authToken = GetToken();

const validationSchema = Yup.object().shape({
  status: Yup.string().required('Status is required'),
  payinfo: Yup.string().required('Payment is required'),
  amount: Yup.number().required('Amount is required'),
  attendedDate: Yup.date().required('Attended Date is required'),
  otp: Yup.number().required('Perf Otp is required'),
});

const SampleTicketPage = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const details = location.state.updateArray;

  const lat = details.customerDetails.latitude;
  const long = details.customerDetails.longitude;

  const locationUrl = `https://google.com/maps?q=${lat},${long}`;

  useEffect(() => {
    setValue(details.serviceEngineerNotes || ''); // Initialize value with existing value
  }, [details.serviceEngineerNotes]);

  const handleSubmit = (values) => {
    const requestData = {
      requestId: details.requestId,
      batteryId: details.batteryId,
      status: values.status,
      serviceEngineerId: details.serviceEngineerId,
      serviceEngineerNotes: details.serviceEngineerNotes,
      paymentRequest: values.payinfo,
      amount: values.amount,
      username: details.customerDetails.username,
      transactionId: values.payinfo,
      shortDescription: details.shortDescription,
      selfDeclaration: true,
      assignedBy: details.assignedBy,
      assignedDate: details.assignedDate,
      attendedDate: values.attendedDate,
      noteToServiceEngineer: value,
      openDate: details.openDate,
      otpId: Number(values.otp),
      payerId: 'payerId',
    };

    fetch(`${SERVER_URL}admin/update-ticket`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Formik
      initialValues={{
        status: '',
        payinfo: '',
        amount: '',
        attendedDate: '',
        otp: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange }) => (
        <Form>
          {/* Your form fields go here */}
          <div>
            <label>Status:</label>
            <Field as={Select} name="status" value={values.status} onChange={handleChange}>
              <MenuItem value={1}>InProgress</MenuItem>
              <MenuItem value={5}>Re Open</MenuItem>
              <MenuItem value={9}>Completed</MenuItem>
              <MenuItem value={14}>Closed</MenuItem>
            </Field>
            <ErrorMessage name="status" component="div" className="error" />
          </div>

          <div>
            <label>Payment:</label>
            <Field as={Select} name="payinfo" value={values.payinfo} onChange={handleChange}>
              <MenuItem value={1}>Raised</MenuItem>
              <MenuItem value={2}>Yet to be Paid</MenuItem>
              <MenuItem value={3}>Paid</MenuItem>
            </Field>
            <ErrorMessage name="payinfo" component="div" className="error" />
          </div>

          <div>
            <label>Amount:</label>
            <Field as={Input} type="number" name="amount" value={values.amount} onChange={handleChange} />
            <ErrorMessage name="amount" component="div" className="error" />
          </div>

          <div>
            <label>Attended Date:</label>
            <Field as={Input} type="date" name="attendedDate" value={values.attendedDate} onChange={handleChange} />
            <ErrorMessage name="attendedDate" component="div" className="error" />
          </div>

          <div>
            <label>Perf Otp:</label>
            <Field as={Input} type="number" name="otp" value={values.otp} onChange={handleChange} />
            <ErrorMessage name="otp" component="div" className="error" />
          </div>

          {/* Other form fields go here */}

          <Box display="flex" justifyContent="space-between" size="large" sx={{ mb: '100px', mt: '50px' }}>
            <Button variant="contained" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="success">
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SampleTicketPage;