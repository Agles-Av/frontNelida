import React from 'react';
import EmpleadoLandingPage from './EmpleadoLandingPage'
import CarruselEmpleado from './CarruselEmpleado';
import TablaUsuarios from './TablaUsuarios';
import SPA from './SPA';
import EmpleadoFooter from './EmpleadoFooter';
import EmpleadoClases from './EmpleadoClases';
import PromocionesEmpleado from './PromocionesEmpleado';


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