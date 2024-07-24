import React from 'react';
import { NavLink } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to Hospital Management System</h1>
        <p>
            Hospitals can register and manage their details seamlessly. Users can easily find hospitals, check their specialties, and get all the necessary information.
        </p>
        <div className='landingPage-Btns'>
        <NavLink to="/api/v1/hospitals/create" className="cta-button">Register New Hospital</NavLink>
        <NavLink to="/api/v1/hospitals?city=" className="cta-button">Find Hospital</NavLink>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
