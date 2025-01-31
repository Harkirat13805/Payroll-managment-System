import React, { useState } from 'react'
import './Style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [values, setValues] = useState({
      email: '',
      password: ''
    })
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    
    axios.defaults.withCredentials = true;
    
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!termsAccepted) {
            setError("Please accept the Terms and Conditions")
            return
        }
        axios.post('http://localhost:3000/auth/adminlogin', values)
        .then(result => { 
            if (result.data.loginStatus) {
                navigate('/dashboard')
            } else {
                setError(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }

    const handleInputChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleCheckboxChange = (e) => {
        setTermsAccepted(e.target.checked)
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-danger'>
                    {error && error}
                </div>
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            name='email' 
                            autoComplete='off' 
                            placeholder='Enter Email' 
                            onChange={handleInputChange} 
                            className='form-control rounded-0'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            name='password' 
                            autoComplete='off' 
                            placeholder='Enter Password' 
                            onChange={handleInputChange}  
                            className='form-control rounded-0'
                        />
                    </div>
                    <div className='mb-3'>
                        <input 
                            type="checkbox" 
                            id="terms" 
                            checked={termsAccepted}
                            onChange={handleCheckboxChange}
                            className='me-2' 
                        />
                        <label htmlFor="terms">
                            <strong>I agree to the Terms and Conditions</strong>
                        </label>
                    </div>
                    <button 
                        type="submit" 
                        className='btn btn-success w-100 rounded-0 mb-2'
                        disabled={!termsAccepted}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login