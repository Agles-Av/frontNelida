import React from 'react'
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { scroller } from 'react-scroll';
import { useTheme } from '../../../context/ThemeContext';

const LandingLayout = () => {
    const { toggleTheme } = useTheme();
    const items = [
        {
            label: 'Instalaciones',
            icon: 'pi pi-home',
            command: () => {
                scroller.scrollTo('Carrusel', {
                    smooth: true,
                    duration: 500,
                    offset: -70 
                });
            }

        },
        {
            label: 'Maquinas',
            icon: 'pi pi-star',
            command: () => {
                scroller.scrollTo('membresias', {
                    smooth: true,
                    duration: 500,
                    offset: -70 
                });
            }
            
        },
        {
            label: 'Clases',
            icon: 'pi pi-info-circle',
            command: () => {
                scroller.scrollTo('Clases', {
                    smooth: true,
                    duration: 500,
                    offset: -70 
                });
            }
        },
        {
            icon: 'pi pi-palette',
            command: () => {
                toggleTheme();
            }
        }
    ];
    const end = (
        <div className="flex align-items-center gap-2">
            <Button label="Cerrar sesión" className="p-button-primary" />
        </div>
    );

    const start = (
        <Avatar image='src/assets/logo.png'  size='xlarge' />
    );
    return (
        <div className="card shadow-1 ">
            <Menubar start={start} model={items} end={end}/>
        </div>
    )
}

export default LandingLayout