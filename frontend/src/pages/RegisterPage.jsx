import React from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register</h2>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
