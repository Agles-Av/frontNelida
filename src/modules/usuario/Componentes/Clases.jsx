import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';

const Clases = () => {
    const [clases, setClases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedClass, setSelectedClass] = useState(null); // Clase seleccionada
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState(null);
    const [showDialog, setShowDialog] = useState(false);

    // URL base desde el archivo .env
    const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;

    // Token de autenticación
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjYWZhdG9mb2ZvQGdtYWlsLmNvbSIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XSwiaWF0IjoxNzMyNjc2NzMzLCJleHAiOjE3MzMyODE1MzN9.UA4u-1R62TdlRibwaNZyahkZIWYMyEXrKOCqRCoZ9MQ';

    useEffect(() => {
        const fetchClases = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/clase/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data.data;
                setClases(data);
            } catch (error) {
                console.error('Error fetching clases:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClases();
    }, [BASE_URL, token]);

    const handleSuscribirse = (clase) => {
        setSelectedClass(clase);
        setShowDialog(true);
    };

    const handleConfirm = () => {
        console.log('Email:', email);
        console.log('Fecha:', fecha);
        console.log('Clase:', selectedClass);

        // Aquí podrías realizar una petición al backend para registrar la suscripción
        // axios.post(`${BASE_URL}/suscripcion`, { email, fecha, claseId: selectedClass.id });

        setShowDialog(false);
        setEmail('');
        setFecha(null);
    };

    const handleCancel = () => {
        setShowDialog(false);
        setEmail('');
        setFecha(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full mt-5">
            <Card className="border-transparent shadow-none">
                <h1 className="text-6xl font-semibold text-left mb-4 text-primary">Clases</h1>
                <div className="grid">
                    {clases.map((clase, index) => (
                        <div key={index} className="col-12 md:col-4 mt-2">
                            <Card
                                title={clase.nombre}
                                subTitle="Instructor: Juan Perez"
                                footer={
                                    <Button
                                        label="Suscríbete"
                                        icon="pi pi-arrow-right"
                                        onClick={() => handleSuscribirse(clase)}
                                    />
                                }
                            >
                                <img
                                    src={clase.foto} // Ajusta esta línea si necesitas transformar la URL de la imagen.
                                    alt={clase.nombre}
                                    className="w-full max-h-10rem md:max-w-full md:max-h-10rem object-cover border-round"
                                />
                                <p className="p-m-0">{clase.descripcion}</p>
                            </Card>
                        </div>
                    ))}
                </div>
            </Card>

            <Dialog
                visible={showDialog}
                header={`Suscribirse a ${selectedClass?.nombre}`}
                onHide={handleCancel}
                style={{ width: '30vw' }}
            >
                <div className="field">
                    <label htmlFor="email">Correo electrónico</label>
                    <InputText
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingresa tu correo"
                        className="w-full"
                    />
                </div>
                <div className="field mt-3">
                    <label htmlFor="fecha">Fecha</label>
                    <Calendar
                        id="fecha"
                        value={fecha}
                        onChange={(e) => setFecha(e.value)}
                        dateFormat="dd/mm/yy"
                        className="w-full"
                    />
                </div>
                <div className="mt-4 flex justify-content-end gap-2">
                    <Button label="Cancelar" className="p-button-text" onClick={handleCancel} />
                    <Button label="Confirmar" className="p-button-primary" onClick={handleConfirm} />
                </div>
            </Dialog>
        </div>
    );
};

export default Clases;
