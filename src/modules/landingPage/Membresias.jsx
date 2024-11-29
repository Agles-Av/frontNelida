import React, { useEffect, useState } from 'react';
import { SelectButton } from 'primereact/selectbutton';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import AxiosCLient from '../../config/http-gateway/http-client';

const Membresias = ({ register, onSelectMemberShip }) => {
    const [value, setValue] = useState(1);
    const [membresias, setMembresia] = useState([]); // Inicializar como un array vacío

    const items = [
        { name: 'Anual', value: 1 },
        { name: 'Mensual', value: 3 }
    ];

    const membresiasBack = async () => {
        try {
            const response = await AxiosCLient({
                method: 'GET',
                url: '/membresia/',
            });
            if (response.data && Array.isArray(response.data)) { // Verificar si es un array
                setMembresia(response.data); // Actualizar el estado solo si es un array
            } else {
                console.error('La respuesta no contiene un array válido');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        membresiasBack();
    }, []); // Ejecutar solo una vez al montar el componente

    const footer = (
        <div className="w-full">
            <Button label="Suscribirse" />
        </div>
    );

    const footerRegister = (
        <div className="w-full">
            <Button
                label="Elige"
                onClick={() => onSelectMemberShip(membresias)} // Aquí deberías pasar la membresía seleccionada
            />
        </div>
    );

    return (
        <div className="card flex flex-column align-items-center">
            {register ? (
                <div className="w-full text-center">
                    <div>
                        <SelectButton
                            value={value}
                            onChange={(e) => setValue(e.value)}
                            optionLabel="name"
                            options={items}
                        />
                    </div>
                    <div className="mt-3 grid">
                        {membresias.map((membresia, index) => (
                            <div key={membresia.id} className="col">
                                <div className="card flex justify-content-center">
                                    <Card
                                        header={<h1 className="text-center">{membresia.nombre}</h1>}
                                        title={`$${membresia.precio}`}
                                        subTitle={membresia.descripcion}
                                        footer={footer}
                                        className={`col ${
                                            index === 1
                                                ? 'bg-blue-900 md:w-25rem shadow-5 text-color-secondary'
                                                : 'md:w-25rem shadow-5'
                                        }`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mt-3 w-full text-center">
                    <div className="grid">
                        {membresias.map((membresia, index) => (
                            <div key={membresia.id} className="col">
                                <div className="card flex justify-content-center select-none">
                                    <Card
                                        header={<h1 className="text-center">{membresia.nombre}</h1>}
                                        title={`$${membresia.precio}`}
                                        onClick={() => onSelectMemberShip(membresia)} // Enviar membresía seleccionada
                                        className={`col ${
                                            index === 1
                                                ? 'bg-blue-900 md:w-2rem shadow-5 text-color-secondary'
                                                : 'md:w-2rem shadow-5 transition-all transition-duration-300 surface-card shadow-2 hover:shadow-4 hover:transform hover:scale-105'
                                        }`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Membresias;
