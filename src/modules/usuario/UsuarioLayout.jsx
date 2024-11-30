import React from 'react'
import Carrusel from './Componentes/UCarrusel'
import Membresias from './Componentes/UMembresias'
import Clases from './Componentes/UClases'
import LandingFooter from './Componentes/ULandingFooter'
import LandingLayout from './Componentes/ULandingLayout'
import ClasesSuscritas from './Componentes/UClasesSuscritas'
import OfertasMembresias from './Componentes/ofertaMembresias'
import LandingPage from './Componentes/ULandingPage'
import Spa from './Componentes/USPA'
import RestringirContenido from './Componentes/RestringirContenido'


const restricciones = {
    'Fit Express': ['Carrusel'],
    'Six Pack': ['Carrusel', 'Clases', 'TusClases'],
    'Full Body': ['Carrusel', 'Clases', 'TusClases', 'Spa'],
};


const UsuarioLayout = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const membresiaActual = user?.userId?.suscripciones?.sort(
        (a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio)
    )[0]?.membresia?.nombre || 'Sin membresía activa';

    const tieneAcceso = (componente) => {
        return restricciones[membresiaActual]?.includes(componente) || false;
    };
    
    return (
        <>
            <LandingLayout />
            <div className="p-5">
                <RestringirContenido 
                    hasAccess={tieneAcceso('Carrusel')} 
                    mensaje="Actualiza a Six Pack para acceder al Carrusel."
                >
                    <div id="Carrusel">
                        <Carrusel />
                    </div>
                </RestringirContenido>
                <div id="Membresias">
                    <Membresias />
                </div>
                <RestringirContenido 
                    hasAccess={tieneAcceso('Spa')} 
                    mensaje="Actualiza a Full Body para acceder al Spa."
                >
                    <div id="Spa">
                        <Spa />
                    </div>
                </RestringirContenido>
                <RestringirContenido 
                    hasAccess={tieneAcceso('TusClases')} 
                    mensaje="Actualiza a Six Pack para acceder a Tus Clases."
                >
                    <div id="TusClases">
                        <ClasesSuscritas />
                    </div>
                </RestringirContenido>
                <RestringirContenido 
                    hasAccess={tieneAcceso('Clases')} 
                    mensaje="Actualiza a Six Pack para acceder a Clases."
                >
                    <div id="Clases">
                        <Clases />
                    </div>
                </RestringirContenido>
                <div id="Ofertas">
                    <OfertasMembresias />
                </div>
            </div>
            <div id="footer">
                <LandingFooter />
            </div>
        </>
    );
};

export default UsuarioLayout;