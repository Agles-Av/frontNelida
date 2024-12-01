import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";



const EmpleadoClases = ()=>{

    const [clases, setClases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedClase, setSelectedClase] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [fecha, setFecha] = useState(new Date());
    const [email, setEmail] = useState("");
    

    const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;

    // Obtener datos del usuario desde localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    // Obtener las clases
    useEffect(() => {
        if (!token) {
            console.error("No token found in localStorage");
            return;
        }

        const fetchClases = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/clase/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setClases(response.data.data);
            } catch (error) {
                console.error("Error fetching clases:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchClases();
    }, [BASE_URL, token]);

    const handleSuscribirse = (clase) => {
        setSelectedClase(clase); 
        setEmail(""); 
        setShowDialog(true); 
    };
    
    const handleConfirm = async () => {
        if (!selectedClase || !selectedClase.id) {
            toast.current.show({
                severity: "warn",
                summary: "Advertencia",
                detail: "Selecciona una clase válida.",
                life: 3000,
            });
            return;
        }
    
        if (!email || !email.includes("@")) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Ingresa un correo válido.",
                life: 3000,
            });
            return;
        }
    
        try {
    
            const userResponse = await axios.get(`${BASE_URL}/usuario/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const users = userResponse.data.data; // Asegúrate de que esta sea la estructura de los datos
            const targetUser = users.find((u) => u.email === email);
    
            if (!targetUser) {
                toast.current.show({
                    severity: "warn",
                    summary: "Advertencia",
                    detail: "El correo ingresado no está registrado.",
                    life: 3000,
                });
                return;
            }
    
            // Construir el payload con el ID del usuario encontrado
            const payload = {
                userId: targetUser.id,
            };
    
            // Hacer la solicitud para inscribir al usuario en la clase
            await axios.patch(`${BASE_URL}/clase/newPart/${selectedClase.id}`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
    
            toast.current.show({
                severity: "success",
                summary: "Éxito",
                detail: `El usuario con correo ${email} fue inscrito correctamente.`,
                life: 3000,
            });
        } catch (error) {
            if (error.response) {
                const { status } = error.response;
                if (status === 400) {
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: "Datos inválidos.",
                        life: 3000,
                    });
                } else if (status === 401) {
                    toast.current.show({
                        severity: "error",
                        summary: "No autorizado",
                        detail: "Inicia sesión nuevamente.",
                        life: 3000,
                    });
                } else {
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: "Error del servidor. Intenta más tarde.",
                        life: 3000,
                    });
                }
            } else {
                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: "No se pudo conectar al servidor.",
                    life: 3000,
                });
            }
        } finally {
            setShowDialog(false); 
            setEmail(""); 
        }
    };

    const handleCancel = () => {
        setShowDialog(false);
        setFecha(new Date());
        setEmail("");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full mt-5">
            <Card className="border-transparent shadow-none">
                <h1 className="text-6xl font-semibold text-left mb-4 text-primary">Clases Disponibles</h1>
                <div className="grid">
                    {clases.map((clase, index) => (
                        <div key={index} className="col-12 md:col-4 mt-2">
                            <Card
                                title={clase.nombre}
                                footer={
                                    <Button
                                        label="Inscribirse"
                                        icon="pi pi-arrow-right"
                                        onClick={() => handleSuscribirse(clase)}
                                    />
                                }
                            >
                                <img
                                    src={clase.foto || "src/assets/default.jpg"}
                                    alt={clase.nombre}
                                    className="w-full max-h-10rem md:max-w-full object-cover border-round"
                                />
                                <p>{clase.descripcion}</p>
                            </Card>
                        </div>
                    ))}
                </div>
            </Card>

            <Dialog
                visible={showDialog}
                header={`Inscribirse a ${selectedClase?.nombre}`}
                onHide={handleCancel}
                style={{ width: "30vw" }}
            >
                <div className="field">
                    <label htmlFor="email">Correo electrónico</label>
                    <InputText
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingresa el correo del usuario"
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

export default EmpleadoClases