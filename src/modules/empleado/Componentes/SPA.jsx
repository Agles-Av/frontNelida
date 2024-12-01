import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import axios from "axios";

const SPA = () =>{
    const [visible, setVisible] = useState(false); // Controla si el diálogo está visible
    const [correo, setCorreo] = useState(""); // Correo del usuario
    const [fecha, setFecha] = useState(null); // Fecha de la cita
    const [loading, setLoading] = useState(false); // Controla el estado de carga

    // Dirección base del servidor
    const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;

    // Manejador para agendar la cita
    const handleAgendar = async () => {
        if (!correo || !correo.includes("@")) {
            alert("Por favor ingresa un correo válido.");
            return;
        }

        if (!fecha) {
            alert("Por favor selecciona una fecha.");
            return;
        }

        setLoading(true);

        try {
            const payload = { correo, fecha };
            const response = await axios.post(`${BASE_URL}/spa/agendar`, payload);
            console.log("Cita agendada con éxito:", response.data);

            alert("Cita agendada exitosamente.");
            setVisible(false); // Cierra el diálogo
            setCorreo(""); // Limpia el campo de correo
            setFecha(null); // Limpia la fecha
        } catch (error) {
            console.error("Error al agendar la cita:", error);
            alert("Hubo un problema al agendar la cita. Intenta más tarde.");
        } finally {
            setLoading(false);
        }
    };

    // Pie del diálogo
    const dialogFooter = (
        <>
            <Button
                label={loading ? "Agendando..." : "Confirmar"}
                icon="pi pi-check"
                onClick={handleAgendar}
                className="p-button-primary"
                disabled={loading} // Desactiva el botón si está cargando
            />
            <Button
                label="Cancelar"
                icon="pi pi-times"
                onClick={() => setVisible(false)}
                className="p-button-secondary"
                disabled={loading}
            />
        </>
    );

    return (
        <div style={{ display: "flex", alignItems: "center", padding: "20px", maxWidth: "1750px", margin: "0 auto" }}>
            {/* Imagen a la izquierda */}
            <div style={{ flex: "1", marginRight: "20px" }}>
                <img
                    alt="Beneficios del Spa"
                    src="src/assets/Spa.jpg"
                    style={{ width: "100%", borderRadius: "10px", height: "auto" }}
                />
            </div>

            {/* Contenido a la derecha */}
            <div style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h1 className="text-5xl font-semibold text-left mb-4 text-primary">Conoce los beneficios del Spa</h1>
                <h3 className="text-1xl font-semibold text-left mb-4 text-primary">
                    Incluir una visita al spa después de entrenar no solo maximiza los beneficios físicos del ejercicio,
                    sino que también promueve el bienestar emocional. Es una inversión en tu salud que te ayudará a
                    recuperarte más rápido, reducir el estrés y mantenerte motivado para seguir con tus objetivos de
                    fitness. ¡Tu cuerpo y mente te lo agradecerán!
                </h3>
                <Button
                    label="Agendar lugar"
                    icon="pi pi-calendar"
                    className="p-button-primary"
                    style={{ alignSelf: "flex-start" }}
                    onClick={() => setVisible(true)}
                />
            </div>

            {/* Diálogo para agendar */}
            <Dialog
                visible={visible}
                header="Agendar lugar para el Spa"
                style={{ width: "30vw" }}
                footer={dialogFooter}
                onHide={() => setVisible(false)}
            >
                <div className="field">
                    <label htmlFor="correo">Correo electrónico</label>
                    <InputText
                        id="correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
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
            </Dialog>
        </div>
    );
};


export default SPA

