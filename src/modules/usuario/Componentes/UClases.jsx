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
    const [selectedClass, setSelectedClass] = useState(null);
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState(new Date());
    const [showDialog, setShowDialog] = useState(false);

    const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;

    // Obtener datos del usuario desde localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;
    const userId = user?.userId.id;
    console.log('User:', user.userId.id);
    console.log('Email', user.userId.email);
    
    

    useEffect(() => {
        if (!token) {
            console.error('No token found in localStorage');
            return;
        }
        const fetchClases = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/clase/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setClases(response.data.data);
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
        setEmail(user?.userId.email || '');
        setShowDialog(true);
    };

    const handleConfirm = async () => {
        if (!selectedClass || !selectedClass.id) {
            alert('Por favor, selecciona una clase válida.');
            return;
        }
        if (!userId) {
            alert('Usuario no válido. Por favor, inicia sesión nuevamente.');
            return;
        }
        if (!fecha) {
            alert('Por favor selecciona una fecha antes de confirmar.');
            return;
        }

        const payload = {
            userId: userId, // ID del usuario desde localStorage
        };

        try {
            await axios.patch(`${BASE_URL}/clase/newPart/${selectedClass.id}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('¡Suscripción exitosa!');
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response);
                if (error.response.status === 400) {
                    alert('Datos inválidos. Revisa la información enviada.');
                } else if (error.response.status === 401) {
                    alert('No autorizado. Por favor, inicia sesión nuevamente.');
                } else {
                    alert('Error del servidor. Intenta más tarde.');
                }
            } else if (error.request) {
                console.error('Error request:', error.request);
                alert('No se pudo conectar al servidor. Verifica tu conexión.');
            } else {
                console.error('Error general:', error.message);
                alert('Error desconocido. Intenta nuevamente.');
            }
        } finally {
            setShowDialog(false);
            setEmail('');
            setFecha(new Date());
        }
    };

    const handleCancel = () => {
        setShowDialog(false);
        setEmail('');
        setFecha(new Date());
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
                                    src={clase.foto.length >5 || 'src/assets/Cardio.jpg'}
                                    alt={clase.nombre}
                                    className="w-full max-h-10rem md:max-w-full md:max-h-10rem object-cover border-round"
                                />
                                <p>{clase.descripcion}</p>
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
                        disabled
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
