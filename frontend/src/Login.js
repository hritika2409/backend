import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(''); // Optional: To show success message

    const validateForm = (email, password) => {
        const newErrors = { email: '', password: '' };
        let isValid = true;

        if (!email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        }

        return { isValid, errors: newErrors };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        const { isValid, errors } = validateForm(email, password);
        if (!isValid) {
            setErrors(errors);
            setSubmitError(''); // Clear previous error messages
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/login', { email, password });
            
            // Handle success
            setSubmitSuccess('Login successful! Redirecting...');
            setSubmitError(''); // Clear previous error messages

            // Optionally redirect after a delay
            setTimeout(() => {
                window.location.href = '/dashboard'; // Redirect to a different page on successful login
            }, 2000);
            
        } catch (error) {
            // Handle error
            setSubmitError('An error occurred during login. Please try again.');
            setSubmitSuccess(''); // Clear previous success messages
            console.error('Login error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Log In</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Enter Email'
                            className='form-control'
                            required
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder='Password'
                            className='form-control'
                            required
                        />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                    <button type="submit" className="btn btn-success w-100"><strong>Log in</strong></button>
                    {submitError && <div className="text-danger mt-3">{submitError}</div>}
                    {submitSuccess && <div className="text-success mt-3">{submitSuccess}</div>}
                    <div className='mt-3'>
                        <Link
                            to="/signup"
                            className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
                            Create Account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
