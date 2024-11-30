import React, { useState, useEffect, useRef } from 'react';
import AxiosClient from '../../../config/http-gateway/http-client';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup'; // To use <ConfirmPopup> tag
import { confirmPopup } from 'primereact/confirmpopup';
import { Messages } from 'primereact/messages';


const EmpleadoClases = () => {
    const [data, setData] = useState([]); // Datos originales de la API
    const [showDialog, setShowDialog] = useState(false); // Controla la ventana emergente
    const messages = useRef(null); // Usar useRef para la referencia de Messages
    const [selectedClass, setSelectedClass] = useState([{
        id: "",
        nombre: "",
        descripcion: "",
        foto: "",
        status: "",
        participantes: [],
    }]);
    const [showEditDialog, setShowEditDialog] = useState(false);

    const actionsBodyTemplate = (rowData) => {
        const handleStatusChange = () => {
            confirmPopup({
                target: document.activeElement,
                message: `¿Estás seguro de que quieres ${rowData.status ? 'desactivar' : 'activar'} la clase ${rowData.nombre}?`,
                header: 'Confirmar Acción',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Sí',
                rejectLabel: 'No',
                accept: () => changeStatus(rowData),
                reject: () => { }
            });
        };

        return (
            <>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-text"
                    onClick={() => goEdit(rowData)}
                />
                {rowData.status ? (
                    <Button
                        icon="pi pi-ban" // Icono de desactivar
                        className="p-button-rounded p-button-danger"
                        onClick={handleStatusChange} // Mostrar el popup de confirmación
                    />
                ) : (
                    /* Si el usuario está inactivo (status === false) */
                    <Button
                        icon="pi pi-check" // Icono de activar
                        className="p-button-rounded p-button-success"
                        onClick={handleStatusChange} // Mostrar el popup de confirmación
                    />
                )}
            </>
        );
    };

    const goEdit = (rowData) => {
        setSelectedClass(rowData);
        setShowEditDialog(true);
    }

    const getDatos = async () => {
        try {
            const response = await AxiosClient({
                url: "/clase/",
                method: "GET",
            });

            if (!response.error) {
                setData(response.data);
            }
        } catch (error) {
            console.error('Error al obtener datos:', error);
        } finally {
        }
    };

    useEffect(() => {
        getDatos();
    }, []);

    const clases = [
        {
            nombre: 'Zumba',
            descripcion: '"¡Bienvenidos a nuestra clase de Zumba! Prepárense para disfrutar una hora llena de energía, música y movimientos divertidos. No importa tu nivel, lo importante es moverte, sonreír y disfrutar.',
            imagen: 'src/assets/Zumba.jpg'
        },
        {
            nombre: 'Yoga',
            descripcion: 'Bienvenidos a nuestra clase de yoga! Este es un espacio para conectar contigo mismo, relajar la mente y fortalecer el cuerpo. Respira profundamente, suelta las tensiones y prepárate para encontrar equilibrio y tranquilidad.',
            imagen: 'src/assets/Yoga.jpg'
        },
        {
            nombre: 'GAP',
            descripcion: '¡Bienvenidos a nuestra clase de GAP! Hoy trabajaremos glúteos, abdominales y piernas con ejercicios efectivos para tonificar y fortalecer. Prepárense para moverse, sudar y superar sus límites. ¡Comencemos con toda la energía!',
            imagen: 'src/assets/Gap.jpg'
        },
        {
            nombre: 'Levantamiento de pesas',
            descripcion: '¡Bienvenidos a nuestra sesión de levantamiento de pesas! Hoy nos enfocaremos en la técnica, la fuerza y el control para alcanzar tus metas. Recuerda escuchar a tu cuerpo, mantener la postura correcta y dar lo mejor de ti.',
            imagen: 'src/assets/Pesas.jpg'
        },
        {
            nombre: 'Cardio',
            descripcion: '¡Bienvenidos a nuestra clase de cardio! Prepárense para una sesión llena de energía, movimientos dinámicos y mucha diversión. Nuestro objetivo es aumentar el ritmo cardíaco, quemar calorías ',
            imagen: 'src/assets/Cardio.jpg'
        },
        {
            nombre: 'Otros ejercicios',
            descripcion: 'Proximamente.....',
            imagen: 'src/assets/Otro.jpg'
        },
    ];


    const changeStatus = async (rowData) => {
        console.log(rowData);

        try {
            const response = await AxiosClient({
                url: "/clase/status/" + rowData.id,
                method: "PATCH",
            });

            if (!response.error) {
                getDatos();
                messages.current.show({
                    sticky: true,
                    severity: 'success',
                    summary: 'Éxito',
                    detail: `El estado de ${rowData.nombre} se ha cambiado correctamente.`,
                    closable: true,
                });
            }
        } catch (error) {
            console.error('Error al obtener datos:', error);
            // Agregar un mensaje de error si la solicitud falla
            messages.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo cambiar el estado del usuario.',
            });
        }
    };



    return (
        <div className="w-full mt-5">
            <Messages ref={messages} />
            <Card className='border-transparent shadow-none '>
                <h1 className="text-5xl font-semibold text-left mb-4 text-primary">Sabes los beneficios de los ejercicios?</h1>
                <p className="text-1xl font-semibold text-left mb-4 text-primary">Has click en Inscríbete para entrar a una clase</p>
                <div className="grid">
                    {data.map((clase, index) => (
                        <div key={index} className="col-12 md:col-4 mt-2">
                            <img src={clase.imagen} alt={clase.nombre} className="w-full max-h-10rem  md:max-w-full md:max-h-10rem object-cover border-round" />
                            <Card title={clase.nombre} subTitle="Instructor: Juan Perez" footer={actionsBodyTemplate(clase)} >
                                <p className="p-m-0">{clase.descripcion}</p>
                            </Card>
                        </div>
                    ))}
                </div>

            </Card>

        </div>
    );


}

export default EmpleadoClases