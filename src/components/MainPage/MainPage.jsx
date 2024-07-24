import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MainPage.css'; // Create a CSS file for styling

const MainPage = () => {
  const [hospital, setHospital] = useState(null); // Initialize state as null
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/hospitals/hospitalProfile/${id}`)
      .then((response) => {
        setHospital(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert('Error fetching hospital details');
      });
  }, [id]);

  if (!hospital) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hospital-profile">
      <h1>{hospital.name}</h1>
      <img width={400} height={400} src={hospital.image} alt={hospital.name} className="hospital-image" />
      <p><strong>City:</strong> {hospital.city}</p>
      <p><strong>Rating:</strong> {hospital.rating}</p>
      <div>
        <strong>Specialities:</strong>
        {hospital.speciality.length > 0 ? (
          <ul>
            {hospital.speciality.map((speciality, index) => (
              <li key={index}>{speciality}</li>
            ))}
          </ul>
        ) : (
          <p>No specialities listed</p>
        )}
      </div>
      <div>
        <strong>Images:</strong>
        {hospital.images.length > 0 ? (
          <div className="image-gallery">
            {hospital.images.map((img, index) => (
              <img key={index} src={img} alt={`Hospital Image ${index + 1}`} className="gallery-image" />
            ))}
          </div>
        ) : (
          <p>No additional images</p>
        )}
      </div>
    </div>
  );
}

export default MainPage;
