import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './FindHospital.css'
import axios from 'axios';

const FindHospital = () => {

    const [hospitals, setHospitals] = useState(null);
    const [city, setCity] = useState('');
    const [citySubmit, setcitySubmit] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/hospitals?city=${city}`)
        .then(res => {
            setHospitals(res.data)
            setCity('')
        })
        .catch(err => {
            setError(err.message)
        })
    },[citySubmit])

    const changeHandler = (e) => {
        setCity(e.target.value)
    }

    const submitHandler = () => {
        setcitySubmit(city);
    }

    if(!hospitals){
        return <h1>Loading...</h1>
    }

  return (
    <div className='findHospitalCon'>
        <h1>Find Nearby Hospitals</h1>
        <div className='searchHospital'>
            <input type='text' onChange={changeHandler} placeholder='Search for hospital' value={city}/>
            <button onClick={submitHandler}>Search</button>
        </div>
        <div className='hospital'>
            {hospitals.map((hospital) => <div key={hospital._id} className='hospitaldetails'>
                <div className='hospitalLogo'>
                    <img src={hospital.image} alt='hospitalimg' />
                </div>
                <div className='hospitaldes'>
                    <h1>{hospital.name}</h1>
                    <p>{hospital.description ? hospital.description : 'A state-of-the-art facility offering comprehensive healthcare services with a dedicated team of specialists and advanced medical technology, ensuring the best patient care in the heart of the city.' }</p>
                    {hospital.speciality.length != 0 && <div className='specialities'>
                        <h2>Specialities</h2>
                        <div className='specitalityTab'>
                        {hospital.speciality ? hospital.speciality.map((speciality) => <div className='speciality'>
                            <span>{speciality}</span>
                        </div>
                        ) : " "}
                        </div>
                    </div>}
                    <p>Rating : {hospital.rating}</p>
                    <button className='btn'>
                        <Link to={`/hospitals/profile/${hospital._id}`}>Check More Details</Link>
                    </button>
                </div>
            </div>)}
        </div>
    </div>
  )
}

export default FindHospital