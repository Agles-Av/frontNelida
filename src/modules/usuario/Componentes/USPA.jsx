import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

const SPA = () => {
    const [clases, setClases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedClass, setSelectedClass] = useState(null);
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState(new Date());
    const [showDialog, setShowDialog] = useState(false);
    const toast = useRef(null);

    const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;
    const userId = user?.userId.id;

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
            toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Selecciona una clase válida.', life: 3000 });
            return;
        }

        if (!userId) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Usuario no válido. Por favor, inicia sesión nuevamente.', life: 3000 });
            return;
        }

        if (!fecha) {
            toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Selecciona una fecha.', life: 3000 });
            return;
        }

        const payload = {
            userId: userId,
        };

        try {
            await axios.patch(`${BASE_URL}/clase/newPart/${selectedClass.id}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.current.show({ severity: 'success', summary: 'Éxito', detail: '¡Suscripción exitosa!', life: 3000 });

            // Recargar la página después de un breve retraso
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            const { status } = error.response || {};
            if (status === 400) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Datos inválidos.', life: 3000 });
            } else if (status === 401) {
                toast.current.show({ severity: 'error', summary: 'No autorizado', detail: 'Inicia sesión nuevamente.', life: 3000 });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error del servidor. Intenta más tarde.', life: 3000 });
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

    const spaClases = clases.filter((clase) => clase.nombre.toLowerCase() === 'spa');

    return (
        <div className="w-full mt-5">
            <Toast ref={toast} />
            <Card className="border-transparent shadow-none">
                <h1 className="text-6xl font-semibold text-left mb-4 text-primary">SPA</h1>
                <div className="grid">
                    {spaClases.length > 0 ? (
                        spaClases.map((clase, index) => (
                            <div key={index} className="col-12 md:col-4 mt-2">
                                <Card
                                    title={clase.nombre}
                                    footer={
                                        <Button
                                            label="Suscríbete"
                                            icon="pi pi-arrow-right"
                                            onClick={() => handleSuscribirse(clase)}
                                        />
                                    }
                                >
                                    <img
                                        src={clase.foto.length > 5 || 'src/assets/Spa.jpg'}
                                        alt={clase.nombre}
                                        className="w-full max-h-10rem md:max-w-full md:max-h-10rem object-cover border-round"
                                    />
                                    <p>{clase.descripcion}</p>
                                </Card>
                            </div>
                        ))
                    ) : (
                        <p>No hay clases disponibles en la categoría SPA en este momento.</p>
                    )}
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

export default SPA;
