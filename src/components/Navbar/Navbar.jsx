import React, { useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import './Navbar.css';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';

const Navbar = () => {
  const location = useLocation();
  const { city } = queryString.parse(location.search);
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(AuthContext);
  const navigate = useNavigate()

  const logout = () => {
    axios.get('http://localhost:5000/auth/logout')
        .then(() => {
            localStorage.removeItem('accessToken');
            setIsAuthenticated(false);
            setUser(null);
            navigate('/auth/login');
        })
        .catch(err => console.log(err));
};

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Hospital Management</h1>
      </div>
      <div className="navbar-links">
        <ul>
          <li><NavLink to="/" className="nav-link">Home</NavLink></li>
          <li><NavLink to="/api/v1/hospitals/create" className="nav-link">Create Hospital</NavLink></li>
          <li><NavLink to={`/api/v1/hospitals?city=${city || ''}`} className="nav-link">Find Hospital</NavLink></li>
          {isAuthenticated && <li><NavLink to={`/api/v1/hospitals/update`} className="nav-link">Edit Hospital</NavLink></li>}
          <li><NavLink to="/about" className="nav-link">About</NavLink></li>
        </ul>
      </div>
      <div className="navbar-auth">
        {!isAuthenticated ? (
          <>
            <button className="auth-button">
              <NavLink to="/auth/login">Login</NavLink>
            </button>
            <button className="auth-button register-button">
              <NavLink to="/auth/signup">Register</NavLink>
            </button>
          </>
        ) : (
          <button className="auth-button" onClick={logout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
