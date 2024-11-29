import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Form.css';

function Form({ callback, setiduser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const res = await fetch('https://free-backend-sandy.vercel.app/v1/signos/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.usuario === 'user') {
        setiduser(data.id);
        callback('user');
        navigate('/userHome');
      } else if (data.usuario === 'admin') {
        callback('admin');
        navigate('/adminHome');
      } else {
        setError('Usuario o contraseña inválidos');
      }
    } catch (error) {
      console.error('Error al validar el usuario:', error);
      setError('Error de conexión');
    }
  };

  return (
    <div className="login-container bg-blue-100">
      <div className="login-box bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="login-header text-center mb-8">
          <svg className="logo w-16 h-16 mx-auto text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
            <path d="M10 8l6 4-6 4V8z"></path>
          </svg>
          <h2 className="login-title text-3xl font-bold text-blue-800 mt-4">YouTv</h2>
          <p className="login-subtitle text-blue-600 mt-2">Inicia sesión en tu cuenta</p>
        </div>
        <form className="login-form space-y-6" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="sr-only">
              Nombre de usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="form-input w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre de usuario"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="form-input w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="error-message text-red-600 text-center">{error}</p>}

          <button type="submit" className="btn btn-primary w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Iniciar sesión
          </button>
        </form>

        <div className="additional-actions mt-8 space-y-4">
          <button
            type="button"
            className="btn btn-ghost w-full text-blue-600 flex items-center justify-center space-x-2 hover:bg-blue-50 py-2 rounded-md transition duration-300"
            onClick={() => navigate('/registro')}
          >
            <svg className="icon w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            <span>Registrarse</span>
          </button>
          <button
            type="button"
            className="btn btn-ghost w-full text-blue-600 flex items-center justify-center space-x-2 hover:bg-blue-50 py-2 rounded-md transition duration-300"
            onClick={() => navigate('/restablecer')}
          >
            <svg className="icon w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Restablecer contraseña</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;

