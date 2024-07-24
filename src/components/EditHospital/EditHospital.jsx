import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EditHospital.module.css';

const EditHospital = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    image: '',
    speciality: [],
    rating: '',
  });
  const [newSpeciality, setNewSpeciality] = useState('');

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/hospitals/update/${id}`);
        const hospitalData = response.data;
        setFormData(hospitalData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHospital();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSpecialityChange = (e) => {
    setNewSpeciality(e.target.value);
  };

  const handleAddSpeciality = () => {
    if (newSpeciality && !formData.speciality.includes(newSpeciality)) {
      setFormData((prevData) => ({
        ...prevData,
        speciality: [...prevData.speciality, newSpeciality],
      }));
      setNewSpeciality('');
    }
  };

  const handleRemoveSpeciality = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      speciality: prevData.speciality.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/v1/hospitals/update/${id}`, formData)
      .then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="hospital-form" onSubmit={handleSubmit}>
      <h2>Edit Hospital</h2>
      <div className="form-group">
        <label htmlFor="name">Hospital Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
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
      </div>
      <div className="form-group">
        <label htmlFor="rating">Rating (1-5)</label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="5"
          value={formData.rating}
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
          {formData.speciality.map((speciality, index) => (
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
      <button type="submit">Update Hospital</button>
    </form>
  );
};

export default EditHospital;
