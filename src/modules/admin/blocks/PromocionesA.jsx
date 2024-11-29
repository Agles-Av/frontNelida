import React from 'react';
import { Card } from 'primereact/card';


const PromocionesEmpleado = () =>{
    const promociones = [
        {
            nombre: '',
            descripcion: '20% descuento inscripción en local',
            imagen: 'src/assets/pm1.jpg'
        },
        {
            nombre: '',
            descripcion: '20% descuento en tienda al ser miembro six pack en local',
            imagen: 'src/assets/pm2.jpg'
        },
        {
            nombre: '',
            descripcion: '2x1 solo el 16/12/2024',
            imagen: 'src/assets/pm3.jpg'
        },
        {
            nombre: '',
            descripcion: 'Si haces 200 lagartijas 30% descuento en tu siguiente pago (solo local)',
            imagen: 'src/assets/pm4.jpg'
        }
    ];

    return (
        <div className="w-full mt-5">
            <Card className='border-transparent shadow-none '>
                <h1 className="text-5xl font-semibold text-left mb-4 text-primary">Promociones</h1>
                <p className="text-1xl font-semibold text-left mb-4 text-primary">Por tiempo limitado</p>
                <div className="grid">
                    {promociones.map((clase, index) => (
                        <div key={index} className="col-12 md:col-3 mt-2">
                                <img src={clase.imagen} alt={clase.nombre} className="w-full max-h-10rem  md:max-w-full md:max-h-10rem object-cover border-round" />
                                <Card title={clase.nombre}>
                                <p className="p-m-0">{clase.descripcion}</p>
                            </Card>
                        </div>
                    ))}
                </div>

            </Card>

        </div>
    );

}

export default PromocionesEmpleado