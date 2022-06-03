import axios from 'axios';
import '../styles/Login.css'
import { useNavigate, Link } from 'react-router-dom'
import { useContext, useEffect } from 'react';

import useInput from '../hooks/useInput'
import { AuthContext } from '../contexts/authContext'

const Login = ()=>{
    const navigate = useNavigate()
    const email = useInput()
    const password = useInput()
    const {toggleAuth,isAuthenticated} = useContext(AuthContext)

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('/api/login',{ email:email.value, password:password.value })
            .then((res)=> res.data)
            .then(user =>{
                toggleAuth(user)
            })
            .then(()=> navigate(`/search`))
                
        .catch(()=>alert('Incorrect email or password'))
    }
    useEffect(()=>{
        if(isAuthenticated) navigate('/search')
    })

    return (
        <>
            <h1 className='login-title'>Login</h1>
            <form className='login-form' onSubmit={handleSubmit}>
                <div className='login-label-input'>
                    <label className='login-label'>Email: </label>
                    <input 
                    className='login-input'
                    type="text"
                    placeholder="mail@mail.com"
                    onChange={email.onChange} 
                    value={email.value}
                    />
                </div>
                <div className='login-label-input'>
                    <label className='login-label'>Password: </label>
                    <input 
                    className='login-input'
                    type="password"
                    placeholder="Password"
                    onChange={password.onChange}
                    value={password.value}
                    />
                </div>
                <button className='login-button'>Login</button>
            </form>
            <div className='login-label'>
                <p>¿Todavia no tenes usuario? Haz <Link className='link' to='/register'>Click aqui</Link> para registrarte</p>
            </div>
        </>
    )
}


export default Login