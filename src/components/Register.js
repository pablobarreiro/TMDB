import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

import useInput from '../hooks/useInput'

const Register = ()=>{
    const navigate = useNavigate()
    const username = useInput()
    const email = useInput()
    const password = useInput()

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('/api/register', {
            username:username.value,
            email:email.value,
            password:password.value
        })
        .then(res => res.data)
        .then((user) => {
            if(typeof user === 'string') alert(user)
            else navigate('/login')
        })
    }

    return (
        <>
        <h1 className='login-title'>Crear nuevo usuario</h1>
        <form className='login-form' onSubmit={handleSubmit}>
            <div className='login-label-input'>
                <label className='login-label'>Usuario: </label>
                <input 
                className='login-input'
                type="text"
                placeholder="Nombre de usuario"
                onChange={username.onChange} 
                value={username.value}
                />
            </div>
            <div className='login-label-input'>
                <label className='login-label'>Email: </label>
                <input 
                className='login-input'
                type="text"
                placeholder="email@email.com"
                onChange={email.onChange} 
                value={email.value}
                />
            </div>
            <div className='login-label-input'>
                <label className='login-label'>Contraseña: </label>
                <input 
                className='login-input'
                type="password"
                placeholder="ingrese su contraseña"
                onChange={password.onChange}
                value={password.value}
                />
            </div>
            <button className='register-button'>Registrarse</button>
        </form>
        <div className='login-label'>
            <p>¿Ya tenes usuario? <Link className='link' to='/login'>Log in</Link></p>
        </div>
        </>
    )
}


export default Register