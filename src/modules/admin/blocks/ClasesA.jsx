import React, { useState, useEffect, useRef } from 'react';
import AxiosClient from '../../../config/http-gateway/http-client';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup'; // To use <ConfirmPopup> tag
import { confirmPopup } from 'primereact/confirmpopup';
import { Messages } from 'primereact/messages';
import CreateClass from './components/CreateClass';
import EditClass from './components/EditClass';


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
                message: `¿Estás seguro de que quieres ${rowData.status ? 'desactivar' : 'activar'} la membresia ${rowData.nombre}?`,
                header: 'Confirmar Acción',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Sí',
                rejectLabel: 'No',
                accept: () => changeStatus(rowData),
                reject: () => { }
            });
        };

        return (
            <div className='flex justify-content-between'>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-text"
                    onClick={() => goEdit(rowData)}
                    tooltip="Editar" tooltipOptions={{ showDelay: 1000, hideDelay: 50, position: 'top' }}
                />
                {rowData.status ? (
                    <Button
                        icon="pi pi-ban" // Icono de desactivar
                        className="p-button-rounded p-button-danger"
                        onClick={handleStatusChange} // Mostrar el popup de confirmación
                        tooltip="Desactivar" tooltipOptions={{ showDelay: 1000, hideDelay: 50, position: 'top' }}
                    />
                ) : (
                    /* Si el usuario está inactivo (status === false) */
                    <Button
                        icon="pi pi-check" // Icono de activar
                        className="p-button-rounded p-button-success"
                        onClick={handleStatusChange} // Mostrar el popup de confirmación
                        tooltip="Reactivar" tooltipOptions={{ showDelay: 1000, hideDelay: 50, position: 'top' }}
                    />
                )}
            </div>
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
            <CreateClass abrir={showDialog} onHide={() => setShowDialog(false)} getData={getDatos} messages={messages} />
            <EditClass abrir={showEditDialog} onHide={() => setShowEditDialog(false)} getData={getDatos} messages={messages} data={selectedClass} />
            <Card className='border-transparent shadow-none '>
                <h1 className="text-5xl font-semibold text-left mb-4 text-primary">Sabes los beneficios de los ejercicios?</h1>
                <Messages ref={messages} />

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        label="Añadir Clase"
                        icon="pi pi-plus"
                        className="mb-3"
                        onClick={() => setShowDialog(true)}
                    />
                </div>
                <div className="grid">
                    {data.map((clase, index) => (
                        <div key={index} className="col-12 md:col-4 mt-2">
                            <img src={clase.foto} alt={clase.nombre} className="w-full max-h-10rem  md:max-w-full md:max-h-10rem object-cover border-round" />
                            <Card title={clase.nombre} footer={actionsBodyTemplate(clase)} style={{minHeight:'18rem', maxHeight:'20rem'}}>
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