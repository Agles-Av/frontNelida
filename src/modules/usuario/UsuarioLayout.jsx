import React from 'react'
import Carrusel from './Componentes/UCarrusel'
import Membresias from './Componentes/UMembresias'
import Clases from './Componentes/UClases'
import LandingFooter from './Componentes/ULandingFooter'
import LandingLayout from './Componentes/ULandingLayout'
import ClasesSuscritas from './Componentes/UClasesSuscritas'
import OfertasMembresias from './Componentes/ofertaMembresias'
import LandingPage from './Componentes/ULandingPage'

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
                <div id='clasesSuscritas'>
                    <ClasesSuscritas />
                </div>
                <div id='Clases'>
                    <Clases />
                </div>
                <div id='Ofertas'>
                    <OfertasMembresias />
                </div>
            </div>
            <div id='footer'>
                 <LandingFooter/>
            </div>
           
        </>
  );
};

export default UsuarioLayout