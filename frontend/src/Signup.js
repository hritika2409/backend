import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const navigate = useNavigate();

    const validateForm = (name, email, password) => {
        const newErrors = { name: '', email: '', password: '' };
        let isValid = true;

        if (!name) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

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
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
            isValid = false;
        }

        return { isValid, errors: newErrors };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        const { isValid, errors } = validateForm(name, email, password);
        
        if (!isValid) {
            console.log(errors); 
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/signup', {
                name,
                email,
                password
            });

            console.log('Signup successful:', response.data);

           
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (error) {
            console.error('Signup error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder='Enter your Name'
                            className='form-control'
                            required
                        />
                    </div>
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
                    </div>
                    <button type="submit" className="btn btn-success w-100"><strong>Sign up</strong></button>
                    <div className='mt-3'>
                        <Link
                            to="/"
                            className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
