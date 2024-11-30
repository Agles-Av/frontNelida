import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";



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
    const userId = user?.userId.id;

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
        setShowDialog(true);
    };

    const handleConfirm = async () => {
        if (!selectedClase || !selectedClase.id) {
            alert("Por favor selecciona una clase válida.");
            return;
        }
        if (!email || !email.includes("@")) {
            alert("Por favor ingresa un correo válido.");
            return;
        }
        if (!fecha) {
            alert("Por favor selecciona una fecha.");
            return;
        }

        const payload = { email, userId };

        try {
            await axios.patch(
                `${BASE_URL}/clase/newPart/${selectedClase.id}`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("¡Inscripción exitosa!");
        } catch (error) {
            if (error.response) {
                alert(`Error: ${error.response.data.message || "No se pudo completar la inscripción"}`);
            } else {
                alert("Error desconocido. Inténtalo más tarde.");
            }
        } finally {
            setShowDialog(false);
            setFecha(new Date());
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
                                subTitle="Instructor: Juan Perez"
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