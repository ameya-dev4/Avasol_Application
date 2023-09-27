import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
const NetworkErrorPage =(props)=>  {
  return (
    <div className="container mt-5 ">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="text-center">
            <h1 className="display-4 ">Network Error</h1>
            <p className="lead">Sorry, we couldn't connect to the server. Please check your internet connection and try again.</p>
            {/* You can add custom styling, images, and other elements here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkErrorPage;
