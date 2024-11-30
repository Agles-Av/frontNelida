import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const ClasesSuscritas = () => {
    const [clasesSuscritas, setClasesSuscritas] = useState([]);
    const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;
    const userId = user?.userId.id;
    const toast = useRef(null);

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

    const confirmEliminar = (claseId) => {
        confirmDialog({
            message: '¿Seguro que desea desuscribirse de esta clase?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => handleEliminar(claseId),
            reject: () => {
                toast.current.show({ severity: 'info', summary: 'Cancelado', detail: 'No se eliminó la clase', life: 3000 });
            },
        });
    };

    const handleEliminar = async (claseId) => {
        try {
            await axios.patch(`${BASE_URL}/clase/delPart/${claseId}`, { userId }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setClasesSuscritas((prev) => prev.filter((clase) => clase.id !== claseId));
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Clase eliminada correctamente', life: 3000 });
        } catch (error) {
            console.error('Error al eliminar la suscripción:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al eliminar la clase. Inténtalo nuevamente.', life: 3000 });
        }
    };

    return (
        <div className="w-full mt-5">
            <Toast ref={toast} />
            <ConfirmDialog />
            <Card className="border-transparent shadow-none">
                <h1 className="text-6xl font-semibold text-left mb-4 text-primary">Mis Clases Suscritas</h1>
                {clasesSuscritas.length === 0 ? (
                    <p className="text-xl text-secondary">No estás suscrito a ninguna clase.</p>
                ) : (
                    <div className="grid">
                        {clasesSuscritas.map((clase, index) => (
                            <div key={index} className="col-12 md:col-4 mt-2">
                                <Card
                                    title={clase.nombre}
                                    subTitle={`Instructor: ${clase.instructor || 'No especificado'}`}
                                    className="relative"
                                >
                                    {/* Botón en la esquina superior derecha más grande */}
                                    <Button
                                        icon="pi pi-trash"
                                        className="p-button-danger absolute top-0 right-0 m-3 text-lg"
                                        style={{ width: '3rem', height: '3rem' }}
                                        onClick={() => confirmEliminar(clase.id)}
                                    />
                                    <img
                                        src={clase.foto && clase.foto.length > 5 ? clase.foto : 'src/assets/Cardio.jpg'}
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
