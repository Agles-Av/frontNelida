import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import { scroller } from 'react-scroll';
import { useTheme } from '../../../context/ThemeContext';
import LoggOutButton from '../../../components/LoggOutButton';

const LandingLayout = () => {
    const { toggleTheme } = useTheme();

    // Obtener datos del usuario desde localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const userName = user?.userId?.nombre || 'Usuario';
    const userPhoto = user?.userId?.foto || null; // Suponiendo que la foto está en este campo
    const suscripciones = user?.userId?.suscripciones || [];
    const membresiaActual = suscripciones.length
        ? suscripciones.sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio))[0]?.membresia?.nombre
        : 'Sin membresía activa';

    const items = [
        {
            label: 'Máquinas',
            icon: 'pi pi-cog', // Icono de engranaje para representar maquinaria
            command: () => {
                scroller.scrollTo('Carrusel', {
                    smooth: true,
                    duration: 500,
                    offset: -70,
                });
            },
        },
        {
            label: 'Membresías',
            icon: 'pi pi-id-card', // Icono de tarjeta para membresías
            command: () => {
                scroller.scrollTo('Membresias', {
                    smooth: true,
                    duration: 500,
                    offset: -70,
                });
            },
        },
        {
            label: 'Tus Clases',
            icon: 'pi pi-calendar', // Icono de calendario para clases programadas
            command: () => {
                scroller.scrollTo('TusClases', {
                    smooth: true,
                    duration: 500,
                    offset: -70,
                });
            },
        },
        {
            label: 'Clases',
            icon: 'pi pi-users', // Icono de usuarios para clases grupales
            command: () => {
                scroller.scrollTo('Clases', {
                    smooth: true,
                    duration: 500,
                    offset: -70,
                });
            },
        },
        {
            label: 'Ofertas',
            icon: 'pi pi-tag', // Icono de etiqueta para ofertas
            command: () => {
                scroller.scrollTo('Ofertas', {
                    smooth: true,
                    duration: 500,
                    offset: -70,
                });
            },
        },
        {
            icon: 'pi pi-palette', // Icono de paleta para cambiar tema
            tooltip: 'Cambiar tema',
            command: () => {
                toggleTheme();
            },
        },
    ];

    const end = (
        <div className="flex align-items-center gap-2">
            <LoggOutButton />
        </div>
    );

    const start = (
        <div className="flex align-items-center gap-3">
            <Avatar image={userPhoto || 'src/assets/default-avatar.png'} size="large" shape="circle" />
            <div>
                <h4 className="m-0">{userName}</h4>
                <p className="m-0 text-sm text-secondary">{membresiaActual}</p>
            </div>
        </div>
    );

    return (
        <div className="card shadow-1">
            <Menubar start={start} model={items} end={end} />
        </div>
    );
};

export default LandingLayout;
