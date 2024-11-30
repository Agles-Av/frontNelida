import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { scroller } from 'react-scroll';
import { useTheme } from '../../context/ThemeContext';
import LoggOutButton from '../../components/LoggOutButton';
import AxiosCLient from '../../config/http-gateway/http-client';

const AdminLayout = () => {
  const [visible, setVisible] = useState(false); // Estado para la visibilidad del modal
  const [visibleR, setVisibleR] = useState(false); // Estado para la visibilidad del modal

  
  const { toggleTheme } = useTheme();
  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user?.userId?.nombre || 'Usuario';
  const userPhoto = user?.userId?.foto || null; // Suponiendo que la foto está en este campo
  const userROL = user?.userId?.role.nombre || null; // Suponiendo que la foto está en este campo
  

  const items = [
    {
      label: 'Instalaciones',
      icon: 'pi pi-home',
      command: () => {
        scroller.scrollTo('Carrusel', {
          smooth: true,
          duration: 500,
          offset: -70,
        });
      },
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-home',
      command: () => {
        scroller.scrollTo('Usuarios', {
          smooth: true,
          duration: 500,
          offset: -70,
        });
      },
    },
    {
      label: 'Promociones',
      icon: 'pi pi-star',
      command: () => {
        scroller.scrollTo('Promociones', {
          smooth: true,
          duration: 500,
          offset: -70,
        });
      },
    },
    {
      label: 'Clases',
      icon: 'pi pi-info-circle',
      command: () => {
        scroller.scrollTo('Clases', {
          smooth: true,
          duration: 500,
          offset: -70,
        });
      },
    },
    {
      icon: 'pi pi-palette',
      command: () => {
        toggleTheme();
      },
    },
  ];

  const end = (
      <div className="flex align-items-center gap-2">
          <LoggOutButton/>
      </div>
  );

  const start = (
    <div className="flex align-items-center gap-3">
        <Avatar image={userPhoto || 'src/assets/default-avatar.png'} size="large" shape="circle" />
        <div>
            <h4 className="m-0">{userName}</h4>
            <p className="m-0 text-sm text-secondary">{userROL}</p>
        </div>
    </div>
);

  return (
      <div className="card shadow-1">
          <Menubar start={start} model={items} end={end} />
      </div>
  );
}

export default AdminLayout