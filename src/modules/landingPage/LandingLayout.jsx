import React from 'react'
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';

const LandingLayout = () => {
    const items = [
        {
            label: 'Instalaciones',
            icon: 'pi pi-home',

        },
        {
            label: 'Planes',
            icon: 'pi pi-star',
        },
        {
            label: 'Conócenos',
            icon: 'pi pi-info-circle'
        },
        {
            label: 'Contáctanos',
            icon: 'pi pi-user'
        },
        {
            icon: 'pi pi-palette',
        }
    ];
    const end = (
        <div className="flex align-items-center gap-2">
            <Button label="Inicia sesión" className="p-button-text" />
            <Button label="Registrate" className="p-button-primary" />
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