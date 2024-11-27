import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { useTheme } from '../../context/ThemeContext';


const EmpleadoLandingPage = () => {

    const { toggleTheme } = useTheme();

    const items = [
        { label: 'Usuarios' },
        { label: 'Instalaciones' },
        { label: 'Promociones' },
        { label: 'Clases' }
    ];

    const end = (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Avatar
                image="src/assets/usuario.png"
                shape="circle"
            />
            <i
                className="pi pi-moon"
                style={{ fontSize: '1.5rem' }}
                onClick={() => toggleTheme()}
            />
            <Button
                label="Cerrar sesión"
                className="p-button-primary"
                style={{ marginLeft: '1rem' }}
            />
        </div>
    );

    return (
        <Menubar model={items} end={end} />
    );
};

export default EmpleadoLandingPage
