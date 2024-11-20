import { Card } from 'primereact/card';
import React from 'react';

const LandingFooter = () => {
    return (
        <div className="grid border-t-1 border-primary py-5 bg-gray-100">

           
            <div className="col-12 md:col-4 text-center">
                <Card className="shadow-none border-none bg-transparent">
                    <p className="text-primary text-xl font-semibold mb-3">Redes Sociales</p>
                    <div className="flex justify-content-center">
                        <i className="pi pi-youtube mx-2" style={{ fontSize: '2.5rem' }}></i>
                        <i className="pi pi-facebook mx-2" style={{ fontSize: '2.5rem' }}></i>
                        <i className="pi pi-instagram mx-2" style={{ fontSize: '2.5rem' }}></i>
                        <i className="pi pi-twitter mx-2" style={{ fontSize: '2.5rem' }}></i>
                    </div>
                </Card>
            </div>

            
            <div className="col-12 md:col-4 text-left">
                <Card className="shadow-none border-none bg-transparent">
                    <p className="text-primary text-xl font-semibold mb-3">Establecimiento</p>
                    <ul className="list-none p-0 m-0">
                        <li className="mb-2">Fotos</li>
                        <li className="mb-2">Membresías</li>
                        <li className="mb-2">Ofertas</li>
                        <li className="mb-2">Clases</li>
                        <li>Ubicación</li>
                    </ul>
                </Card>
            </div>

            
            <div className="col-12 md:col-4 text-left">
                <Card className="shadow-none border-none bg-transparent">
                    <p className="text-primary text-xl font-semibold mb-3">Contacto</p>
                    <p>Teléfono: +1 (555) 123-4567</p>
                    <p>Email: contacto@ejemplo.com</p>
                    <p>Horario: Lunes a Viernes 8:00am - 8:00pm</p>
                </Card>
            </div>
        </div>
    );
};

export default LandingFooter;
