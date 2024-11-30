import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const SPA = () =>{
    const [visible, setVisible] = useState(false); // Controla si el diálogo está visible
    const [correo, setCorreo] = useState(""); // Correo del usuario
    const [fecha, setFecha] = useState(""); // Fecha de la cita

    // Pie del diálogo
    const dialogFooter = (
        <>
            <Button
                label="Agendar"
                icon="pi pi-check"
                onClick={() => {
                    setVisible(false);
                    console.log("Lugar agendado:", { correo, fecha });
                }}
                className="p-button-primary"
            />
            <Button
                label="Cancelar"
                icon="pi pi-times"
                onClick={() => setVisible(false)}
                className="p-button-secondary"
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
                    onClick={() => setVisible(true)} // Abre el diálogo al hacer clic
                />
            </div>

            {/* Diálogo para agendar lugar */}
            <Dialog
                header="Agendar lugar para el Spa"
                visible={visible}
                style={{ width: "350px" }}
                footer={dialogFooter}
                onHide={() => setVisible(false)} // Cierra el diálogo
            >
                <div className="field">
                    <label htmlFor="correo">Correo</label>
                    <InputText
                        id="correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        placeholder="Escribe tu correo"
                        className="w-full"
                    />
                </div>
                <div className="field">
                    <label htmlFor="fecha">Fecha</label>
                    <InputText
                        id="fecha"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        placeholder="DD/MM/AAAA"
                        className="w-full"
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default SPA

