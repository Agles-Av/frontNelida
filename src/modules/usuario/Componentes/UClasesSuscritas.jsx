import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog'; // Removemos ConfirmDialog de aquí

const ClasesSuscritas = () => {
    const [clasesSuscritas, setClasesSuscritas] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const toast = useRef(null); // Referencia para Toast
    const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;
    const userId = user?.userId.id;

    useEffect(() => {
        const fetchSuscripciones = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/clase/usuario/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setClasesSuscritas(response.data.data);
            } catch (error) {
                console.error('Error al obtener las clases suscritas:', error);
            }
        };
        fetchSuscripciones();
    }, [BASE_URL, userId, token]);

    const handleEliminar = async (claseId) => {
        if (isProcessing) return;
        setIsProcessing(true);
        try {
            await axios.patch(`${BASE_URL}/clase/delPart/${claseId}`, { userId }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setClasesSuscritas((prev) => prev.filter((clase) => clase.id !== claseId));
            toast.current.show({ severity: 'success', summary: 'Clase eliminada', detail: 'La clase se eliminó exitosamente.', life: 3000 });
        } catch (error) {
            console.error('Error al eliminar la suscripción:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la clase.', life: 3000 });
        } finally {
            setIsProcessing(false);
        }
    };

    const confirmEliminarClase = (claseId) => {
        confirmDialog({
            message: '¿Estás seguro de que deseas eliminar esta clase?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, eliminar',
            rejectLabel: 'Cancelar',
            acceptClassName: 'p-button-danger',
            accept: () => handleEliminar(claseId),
        });
    };

    return (
        <div className="w-full mt-5">
            <Toast ref={toast} />
            <Card className="border-transparent shadow-none">
                <h1 className="text-6xl font-semibold text-left mb-4 text-primary">Mis Clases Suscritas</h1>
                {clasesSuscritas.length === 0 ? (
                    <p className="text-xl text-secondary">No estás suscrito a ninguna clase.</p>
                ) : (
                    <div className="grid">
                        {clasesSuscritas.map((clase) => (
                            <div key={clase.id} className="col-12 md:col-4 mt-2">
                                <Card title={clase.nombre} className="relative">
                                    <Button
                                        icon="pi pi-trash"
                                        className="p-button-danger absolute top-0 right-0 m-3 text-lg"
                                        style={{ width: '3rem', height: '3rem' }}
                                        onClick={() => confirmEliminarClase(clase.id)}
                                    />
                                    <img
                                        src={clase.foto}
                                        alt={clase.nombre}
                                        className="w-full max-h-10rem md:max-w-full md:max-h-10rem object-cover border-round"
                                    />
                                    <p>{clase.descripcion}</p>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ClasesSuscritas;
