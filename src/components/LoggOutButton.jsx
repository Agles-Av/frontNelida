import React, { useContext } from 'react'
import { Button } from 'primereact/button'
import AuthContext from '../config/context/auth-context'
import { useNavigate } from 'react-router-dom'
const LoggOutButton = () => {
    const navigate = useNavigate();
    const {user , dispatch} = useContext(AuthContext);

    const handleCerrarSesion = () => {
        dispatch({ type: "SIGNOUT" });
        localStorage.removeItem('user');
        localStorage.removeItem('roleUser');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        
        navigate('/');
    }
  return (
    <div>
        <Button
        label="Cerrar sesión"
        className="p-button-secondary"
        onClick={handleCerrarSesion}
        />
    </div>
  )
}

export default LoggOutButton