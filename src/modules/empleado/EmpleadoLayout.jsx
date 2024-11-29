import React from 'react';
import EmpleadoLandingPage from './Componentes/EmpleadoLandingPage'
import CarruselEmpleado from './Componentes/CarruselEmpleado';
import TablaUsuarios from './Componentes/TablaUsuarios';
import SPA from './Componentes/SPA';
import EmpleadoFooter from './Componentes/EmpleadoFooter';
import EmpleadoClases from './Componentes/EmpleadoClases';
import PromocionesEmpleado from './Componentes/PromocionesEmpleado';


const EmpleadoLayout = () => {

    return(
        <>
        <EmpleadoLandingPage/>
        <CarruselEmpleado/>
        <TablaUsuarios/>
        <SPA/>
        <EmpleadoClases/>
        <PromocionesEmpleado/>
        <EmpleadoFooter/>




        </>
    )

  };
  
  
export default EmpleadoLayout