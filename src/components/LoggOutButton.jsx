import React, { useContext } from 'react';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import AuthContext from '../config/context/auth-context';
import { useNavigate } from 'react-router-dom';

const LoggOutButton = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const handleCerrarSesion = () => {
        dispatch({ type: 'SIGNOUT' });
        localStorage.removeItem('user');
        localStorage.removeItem('roleUser');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
    };

    const confirmCerrarSesion = () => {
        confirmDialog({
            message: '¿Estás seguro de que deseas cerrar sesión?',
            header: 'Confirmar cierre de sesión',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, cerrar sesión',
            rejectLabel: 'Cancelar',
            acceptClassName: 'p-button-danger',
            accept: handleCerrarSesion,
            reject: () => {}, // No hacemos nada al cancelar
        });
    };

    return (
        <div>
            <ConfirmDialog />

            <Button
                label="Cerrar sesión"
                className="p-button-secondary"
                onClick={confirmCerrarSesion}
            />
        </div>
    );
};

export default LoggOutButton;
