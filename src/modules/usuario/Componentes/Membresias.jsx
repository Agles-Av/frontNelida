import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SelectButton } from 'primereact/selectbutton';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const Membresias = () => {
    const [value, setValue] = useState(1);
    const [membresias, setMembresias] = useState([]);
    const [loading, setLoading] = useState(true);

    // URL base desde .env
    const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;

    // Token de autenticación (puedes reemplazarlo dinámicamente según tu flujo)
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjYWZhdG9mb2ZvQGdtYWlsLmNvbSIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XSwiaWF0IjoxNzMyNjc2NzMzLCJleHAiOjE3MzMyODE1MzN9.UA4u-1R62TdlRibwaNZyahkZIWYMyEXrKOCqRCoZ9MQ';

    useEffect(() => {
        const fetchMembresias = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/membresia/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data.data;
                setMembresias(data);
            } catch (error) {
                console.error('Error fetching membresías:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMembresias();
    }, [BASE_URL, token]);

    const items = [
        { name: 'Anual', value: 1 },
        { name: 'Mensual', value: 3 }
    ];

    const footer = (
        <div className='w-full'>
            <Button label="Suscribirse" />
        </div>
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card flex flex-column align-items-center">
            <div className='shadow-4'>
                <SelectButton
                    value={value}
                    onChange={(e) => setValue(e.value)}
                    optionLabel="name"
                    options={items}
                />
            </div>

            <div className="mt-3 w-full text-center">
                <div className="grid">
                    {membresias.map((membresia, index) => (
                        <div key={index} className="col">
                            <div className="card flex justify-content-center">
                                <Card
                                    header={<h1 className="text-center">{membresia.nombre}</h1>}
                                    title={`$${membresia.precio}`}
                                    subTitle={membresia.descripcion}
                                    footer={footer}
                                    className={`col ${index === 1 ? 'bg-blue-900 md:w-25rem shadow-5 text-color-secondary ' : 'md:w-25rem shadow-5'}`}
                                >
                                    <div className='text-justify'>
                                        <ul className="list-disc">
                                            {membresia.promos.map((promo, i) => (
                                                <li key={i}>{promo.nombre} - {promo.descripcion}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Membresias;
