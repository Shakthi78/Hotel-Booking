import React, { useContext, useState } from 'react'
import './login.css'
import { AuthContext } from '../../context/AuthContext'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    })

    const { loading, error, dispatch } = useContext(AuthContext)

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try {
            const res = await axios.post('http://localhost:8800/api/auth/login', {
                username: credentials.username,
                password: credentials.password
            })
            dispatch({type: "LOGIN_SUCCESS", payload: res.data.details})
            navigate("/")
        } catch (err) {
            console.log(err);
            dispatch({type: "LOGIN_FAILURE", payload: err})
        }
    }

    return (
    <div className='login'>
        <div className="lContainer">
            <input type="text" placeholder='username' id='username' name='username' onChange={handleChange} className='lInput' />
            <input type="password" placeholder='password' id='password' name='password' onChange={handleChange} className='lInput' />
            <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
            {error && <span>{error.message}</span> }
        </div>
    </div>
  )
}

export default Login
