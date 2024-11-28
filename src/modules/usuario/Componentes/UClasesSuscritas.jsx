import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const ClasesSuscritas = () => {
    const [clasesSuscritas, setClasesSuscritas] = useState([]);
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
        try {
            await axios.patch(`${BASE_URL}/clase/delPart/${claseId}`, { userId }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setClasesSuscritas((prev) => prev.filter((clase) => clase.id !== claseId));
            alert('Clase eliminada correctamente');
        } catch (error) {
            console.error('Error al eliminar la suscripción:', error);
            alert('Error al eliminar la clase. Inténtalo nuevamente.');
        }
    };

    return (
        <div className="w-full mt-5">
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
                                    footer={
                                        <Button
                                            icon="pi pi-trash"
                                            className="p-button-danger"
                                            onClick={() => handleEliminar(clase.id)}
                                        />
                                    }
                                >
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
