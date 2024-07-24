import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import './HospitalDetails.css';

const HospitalDetails = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [hospitals, setHospitals] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/api/v1/hospitals/${user}`)
        .then((response) => {
          console.log(response.data);
          setHospitals(response.data);
        })
        .catch((error) => {
          setError(error.response.data);
          console.error(error);
        });
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/hospitals/delete/${id}`)
        .then((response) => {
          console.log(response);
          setHospitals(hospitals.filter((hospital) => hospital._id !== id));
        });
    } catch (error) {
      console.error(error);
    }
  };

  if (!hospitals) {
    return <div>Loading...</div>;
  }


  return (
    <>
      {isAuthenticated ? (
        <div className="hospital-container">
          {error}
          {hospitals.map((hospital) => (
            <div className='hospital' key={hospital._id}>
              <h1>{hospital.name}</h1>
              <button><Link to={`/hospitals/edit/${hospital._id}`}>Edit Hospital</Link></button>
              <button onClick={() => handleDelete(hospital._id)}>Delete Hospital</button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ textAlign: 'center', padding: '30px' }}>
            Login/SignUp to Create Hospital
          </h1>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem'
            }}
          >
            <button style={{ width: '10%' }} className="auth-button">
              <NavLink to="/auth/login">Login</NavLink>
            </button>
            <button style={{ width: '10%' }} className="auth-button register-button">
              <NavLink to="/auth/signup">Register</NavLink>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HospitalDetails;
