import React from 'react'
import Carrusel from './Componentes/Carrusel'
import Membresias from './Componentes/Membresias'
import Clases from './Componentes/Clases'
import LandingFooter from './Componentes/LandingFooter'
import LandingLayout from './Componentes/LandingLayout'
import LandingPage from './Componentes/LandingPage'

const UsuarioLayout = () => {
  return (
    <>
            <LandingLayout />
            <div className='p-5'>
                <div id='Carrusel'>
                    <Carrusel />
                </div>
                <div id='membresias'>
                    <Membresias />
                </div>
                <div id='Clases'>
                    <Clases />
                </div>
            </div>
            <div id='footer'>
                 <LandingFooter/>
            </div>
           
        </>
  );
};

export default UsuarioLayout