import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import AxiosCLient from '../../config/http-gateway/http-client';

const Clases = () => {
    const [clases, setClases] = useState([]); // Usar un estado llamado 'clases' para evitar confusión

    const footer = (clase) => (
        <Button label="Suscribete" icon="pi pi-arrow-right" onClick={() => handleSuscribirse(clase.id)} />
    );

    const handleClases = async () => {
        try {
            const response = await AxiosCLient({
                method: 'GET',
                url: '/clase/',
            });
            if (response.data && Array.isArray(response.data)) {
                setClases(response.data); // Guardar los datos en el estado
                console.log('Clases:', response.data);
            } else {
                console.error('La respuesta no contiene un array válido');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSuscribirse = (id) => {
        console.log(`Suscribiéndose a la clase con ID: ${id}`);
        // Aquí puedes implementar la lógica para suscribirse a una clase
    };

    useEffect(() => {
        handleClases(); // Cargar las clases desde el backend al montar el componente
    }, []);

    return (
        <div className="w-full mt-5">
            <Card className="border-transparent shadow-none">
                <h1 className="text-6xl font-semibold text-left mb-4 text-primary">Clases</h1>
                <div className="grid">
                    {clases.map((clase) => (
                        <div key={clase.id} className="col-12 md:col-4 mt-2">
                            <Card
                                title={clase.nombre}
                                subTitle={`Instructor: ${clase.participantes.length > 0 ? clase.participantes[0].nombre : 'N/A'}`}
                                footer={footer(clase)}
                            >
                                <img
                                    src={clase.foto.length > 5 || 'src/assets/Cardio.jpg'} // Imagen predeterminada si no hay foto
                                    alt={clase.nombre}
                                    className="w-full max-h-10rem md:max-w-full md:max-h-10rem object-cover border-round"
                                />
                                <p className="p-m-0">{clase.descripcion}</p>
                            </Card>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Clases;
