import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import HospitalForm from './components/HospitalForm/HospitalForm';
import FindHospital from './components/FindHospital/FindHospital';
import HospitalDetails from './components/HospitalDetails/HospitalDetails';
import Signup from './components/Auth/Signup/Signup';
import Login from './components/Auth/Login/Login';
import AuthProvider from './AuthContext';
import EditHospital from './components/EditHospital/EditHospital';
import MainPage from './components/MainPage/MainPage';
function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/api/v1/hospitals/create' element={<HospitalForm />} />
                    <Route path='/api/v1/hospitals' element={<FindHospital />} />
                    <Route path='/api/v1/hospitals/update' element={<HospitalDetails />} />
                    <Route path='/hospitals/profile/:id' element={<MainPage />} />
                    <Route path='/hospitals/edit/:id' element={<EditHospital />} />
                    <Route path='/auth/login' element={<Login />} />
                    <Route path='/auth/signup' element={<Signup />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
