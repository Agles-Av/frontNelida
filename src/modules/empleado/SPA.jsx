import React from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const SPA = () =>{
    return (
        <div style={{ display: 'flex', alignItems: 'center', padding: '20px', maxWidth: '1750px', margin: '0 auto' }}>
            {/* Imagen a la izquierda */}
            <div style={{ flex: '1', marginRight: '20px' }}>
                <img
                    alt="Beneficios del Spa"
                    src="src/assets/Spa.jpg" 
                    style={{ width: '100%', borderRadius: '10px', height: 'auto' }}
                />
            </div>

            {/* Contenido a la derecha */}
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h1 className="text-5xl font-semibold text-left mb-4 text-primary">Conoce los beneficios del Spa</h1>
                <descripcion className="text-1xl font-semibold text-left mb-4 text-primary">
                    Body text for your whole article or post. We'll put in some lorem ipsum to show how a filled-out page might look. Body text for your whole article or postsafhkjashdjkfkjdshfjkhasdjfkhsjkadfjfd.
                </descripcion>
                <Button
                    label="Agendar lugar"
                    icon="pi pi-calendar"
                    className="p-button-primary"
                    style={{ alignSelf: 'flex-start' }}
                />
            </div>
        </div>
    );
}

export default SPA

