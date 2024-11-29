import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const OfertasMembresias = () => {
    const [promociones, setPromociones] = useState([]);
    const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;

    useEffect(() => {
        const fetchPromociones = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/promo/`);
                setPromociones(response.data.data);
            } catch (error) {
                console.error('Error al obtener las promociones:', error);
            }
        };

        fetchPromociones();
    }, [BASE_URL]);

    return (
        <div className="w-full mt-5">
            <Card className="border-transparent shadow-none">
                <h1 className="text-6xl font-semibold text-left mb-4 text-primary">Ofertas en Membresías</h1>
                {promociones.length === 0 ? (
                    <p className="text-xl text-secondary">No hay ofertas disponibles en este momento.</p>
                ) : (
                    <div className="grid">
                        {promociones.map((promo, index) => (
                            <div key={index} className="col-12 md:col-4 mt-2">
                                <Card
                                    title={promo.nombre}
                                    subTitle={`Hasta ${promo.porcentaje}% de descuento`}
                                >
                                    <img
                                        src={promo.imagen && promo.imagen.length > 5 ? promo.imagen : 'src/assets/pm1.jpg'}
                                        alt={promo.nombre}
                                        className="w-full max-h-12rem object-cover border-round"
                                    />
                                    <p className="mt-2">{promo.descripcion}</p>
                                    <ul className="list-none p-0">
                                        {promo.membresia.map((membresia, i) => (
                                            <li key={i} className="mt-2">
                                                <strong>{membresia.nombre}</strong>: {membresia.descripcion} - 
                                                <span className="text-primary font-semibold ml-1">${membresia.precio}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-sm mt-2">
                                        Válido del {new Date(promo.fechaInicio).toLocaleDateString()} al {new Date(promo.fechaFin).toLocaleDateString()}
                                    </p>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default OfertasMembresias;
