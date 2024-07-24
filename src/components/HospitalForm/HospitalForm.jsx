import React, { useContext, useState } from 'react';
import './HospitalForm.css';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

const HospitalForm = () => {

  const { isAuthenticated, user } = useContext(AuthContext);

  const [hospitalData, setHospitalData] = useState({
    name: '',
    city: '',
    image: '',
    speciality: [],
    rating: '',
    authorId: '',
  });
  const [newSpeciality, setNewSpeciality] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHospitalData({ ...hospitalData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHospitalData({ ...hospitalData, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSpecialityChange = (e) => {
    setNewSpeciality(e.target.value);
  };

  const handleAddSpeciality = () => {
    if (newSpeciality && !hospitalData.speciality.includes(newSpeciality)) {
      setHospitalData((prevData) => ({
        ...prevData,
        speciality: [...prevData.speciality, newSpeciality],
      }));
      setNewSpeciality('');
    }
  };

  const handleRemoveSpeciality = (index) => {
    setHospitalData((prevData) => ({
      ...prevData,
      speciality: prevData.speciality.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    hospitalData.authorId  = user;

    axios.post('http://localhost:5000/api/v1/hospitals/create', hospitalData)
      .then((response) => {
        navigate(`/hospitals/profile/${response.data._id}`);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(hospitalData);
  };

  return (
    <>
      {isAuthenticated ? <form className="hospital-form" onSubmit={handleSubmit}>
        <h2>Add a New Hospital</h2>
        <div className="form-group">
          <label htmlFor="name">Hospital Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={hospitalData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={hospitalData.city}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image Upload</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          {/* {imagePreview && (
        <img src={imagePreview} alt="Preview" className="image-preview" />
      )} */}
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating (1-5)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={hospitalData.rating}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Specialities</label>
          <div className="speciality-inputs">
            <input
              type="text"
              value={newSpeciality}
              onChange={handleSpecialityChange}
              placeholder="Enter a speciality"
            />
            <button type="button" onClick={handleAddSpeciality}>
              Add Speciality
            </button>
          </div>
          <ul className="speciality-list">
            {hospitalData.speciality.map((speciality, index) => (
              <li key={index}>
                {speciality}
                <button
                  type="button"
                  className="remove-speciality"
                  onClick={() => handleRemoveSpeciality(index)}
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Submit</button>
      </form> : <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ textAlign: 'center', padding: '30px' }}>Login/SignUp to Create Hospital</h1>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap: '1rem'}}>
          <button style={{width:'10%'}} className="auth-button">
            <NavLink to="/auth/login">Login</NavLink>
          </button>
          <button style={{width:'10%'}} className="auth-button register-button">
            <NavLink to="/auth/signup">Register</NavLink>
          </button>
        </div>
      </div>}
    </>
  );
};

export default HospitalForm;
