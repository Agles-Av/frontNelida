import React from 'react';
import EmpleadoLandingPage from './Componentes/EmpleadoLandingPage'
import CarruselEmpleado from './Componentes/CarruselEmpleado';
import TablaUsuarios from './Componentes/TablaUsuarios';
import SPA from './Componentes/SPA';
import EmpleadoFooter from './Componentes/EmpleadoFooter';
import EmpleadoClases from './Componentes/EmpleadoClases';
import PromocionesEmpleado from './Componentes/PromocionesEmpleado';


const EmpleadoLayout = () => {

  return (
    <>

      <EmpleadoLandingPage />

      <div id='Carrusel'>
        <CarruselEmpleado />
      </div>
      <div id='Usuarios'>
      <TablaUsuarios />
      </div>
      <SPA />
      <div id='Clases'>
      <EmpleadoClases />
      </div>
      <div id='Promociones'>
      <PromocionesEmpleado />
      </div>
      <div id='Footer'>
      <EmpleadoFooter />
      </div>
    </>
  )

};

  
export default EmpleadoLayout