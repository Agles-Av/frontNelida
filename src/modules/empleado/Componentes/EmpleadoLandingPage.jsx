import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import { scroller } from 'react-scroll';
import { useTheme } from '../../../context/ThemeContext';
import LoggOutButton from '../../../components/LoggOutButton';




const EmpleadoLandingPage = () => {

    const { toggleTheme } = useTheme();

    const items = [
        {
            label: 'Instalaciones',
            icon: 'pi pi-home',
            command: () => scroller.scrollTo('Carrusel', { smooth: true, duration: 500, offset: -70 }),
        },
        {
            label: 'Usuarios',
            icon: 'pi pi-user',
            command: () => scroller.scrollTo('Usuarios', { smooth: true, duration: 500, offset: -70 }),
        },
        {
            label: 'Promociones',
            icon: 'pi pi-tag',
            command: () => scroller.scrollTo('Promociones', { smooth: true, duration: 500, offset: -70 }),
        },
        {
            label: 'Clases',
            icon: 'pi pi-calendar',
            command: () => scroller.scrollTo('Clases', { smooth: true, duration: 500, offset: -70 }),
        },
        {
            label: 'Contáctanos',
            icon: 'pi pi-phone',
            command: () => scroller.scrollTo('Footer', { smooth: true, duration: 500, offset: -70 }),
        },
    ];


const start = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Avatar
            image="src/assets/usuario.png"
            shape="circle"
        />
        <div>
            <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>Cristian</div>
            <div style={{ color: '#888', fontSize: '0.85rem' }}>Empleado</div>
        </div>
        <i
            className="pi pi-moon"
            style={{ fontSize: '1.5rem' }}
            onClick={() => toggleTheme()}
        />
    </div>
);


const end = (
    <div className="flex align-items-center gap-2">
        <LoggOutButton />
    </div>
);


return (
    <div className="card shadow-1">
        <Menubar start={start} model={items} end={end} />
    </div>
);
};

export default EmpleadoLandingPage
