import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { scroller } from 'react-scroll';
import { useTheme } from '../../context/ThemeContext';
import LoggOutButton from '../../components/LoggOutButton';

const AdminLayout = () => {
  const [visible, setVisible] = useState(false); // Estado para la visibilidad del modal
  const [visibleR, setVisibleR] = useState(false); // Estado para la visibilidad del modal
  const { toggleTheme } = useTheme();

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

  const start = <Avatar image="src/assets/logo.png" size="xlarge" />;

  return (
      <div className="card shadow-1">
          <Menubar start={start} model={items} end={end} />
      </div>
  );
}

export default AdminLayout