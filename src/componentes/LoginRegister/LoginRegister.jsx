import React, { useState } from 'react';
import './LoginRegister.css';
import { FaUserAlt, FaLock, FaEnvelope, FaGoogle } from 'react-icons/fa';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';

const LoginRegister = () => {
  const [action, setAction] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const registerLink = () => {
    setAction(' active');
  };

  const loginLink = () => {
    setAction('');
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User Info:', result.user);
      navigate('/stream'); // Redirige a la página de stream después del inicio de sesión exitoso
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    // Lógica para manejar el registro de usuario
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setLoginError('Por favor complete todos los campos');
      return;
    }
    // Lógica para manejar el inicio de sesión
  };

  return (
    <div className={`wrapper${action}`}>
      <div className='form-box login'>
        <form onSubmit={handleSubmitLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUserAlt className='icon' />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className='icon' />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Recordarme
            </label>
            <span> Olvidaste la contraseña</span>
          </div>
          {loginError && <p className="error">{loginError}</p>}
          <button type='submit'>Login</button>
          <div className="register-link">
            <p>O inicia sesión con </p>
          </div>
          <button type="button" onClick={handleLogin}><FaGoogle /> Continua con Google </button>
          <div className="register-link">
            <p>No tienes una cuenta? <span onClick={registerLink}>Registrate</span></p>
          </div>
        </form>
      </div>

      <div className='form-box register'>
        <form onSubmit={handleSubmitRegister}>
          <h1>Registro</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUserAlt className='icon' />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaEnvelope className='icon' />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className='icon' />
          </div>
          <div className="remember-forgot">
            <label> <input type="checkbox" />Aceptas los terminos & condiciones</label>
          </div>
          <button type='submit'>Registrarse</button>
          <div className="register-link">
            <p> Ya tienes una cuenta? <span onClick={loginLink}>Login</span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
