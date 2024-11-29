import React, { useState, useEffect, useRef } from 'react';
import AxiosClient from '../../../config/http-gateway/http-client';
import { SelectButton } from 'primereact/selectbutton';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup'; // To use <ConfirmPopup> tag
import { confirmPopup } from 'primereact/confirmpopup';
import { Messages } from 'primereact/messages';
import EditMem from './components/EditMem';

const Membresias = () => {
    const [value, setValue] = useState(1);
    const [data, setData] = useState([]); // Datos originales de la API
    const [showDialog, setShowDialog] = useState(false); // Controla la ventana emergente
    const messages = useRef(null); // Usar useRef para la referencia de Messages
    const [selectedMem, setSelectedMem] = useState([{
        nombre: "",
        descripcion: "",
        status: "",
        precio: 0,
        precioOriginal:0,
    }]);
    const [showEditDialog, setShowEditDialog] = useState(false);


    const getDatos = async () => {
        try {
            const response = await AxiosClient({
                url: "/membresia/",
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

    useEffect(() => {
        if (value === 1) { // Si se selecciona "Anual"
            setData(prevData => prevData.map(membresia => ({
                ...membresia,
                precio: membresia.precio * 12,
            })));
        } else if (value === 3) {
            getDatos();
        }
    }, [value]);

    const items = [
        { name: 'Anual', value: 1 },
        { name: 'Mensual', value: 3 }
    ]


    const changeStatus = async (rowData) => {
        console.log(rowData);

        try {
            const response = await AxiosClient({
                url: "/membresia/status/" + rowData.id,
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

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN', // Moneda en pesos mexicanos
        }).format(amount);
    };

    const goEdit = (rowData) => {
        setSelectedMem(rowData);
        setShowEditDialog(true);
    }
    return (
        <div className="card flex flex-column align-items-center">
      <Messages ref={messages} />
            <div className='shadow-4'>
                <SelectButton
                    value={value}
                    onChange={(e) => setValue(e.value)}
                    optionLabel="name"
                    options={items}
                />
            </div>

            <div className="mt-3 w-full text-center">
                <div className="grid">
                    {data.map((membresia, index) => (
                        <div key={index} className="col">
                            <div className="card flex justify-content-center ">
                                <Card
                                    header={<h1 className="text-center">{membresia.nombre}</h1>}
                                    title={formatCurrency(membresia.precioOriginal)}
                                    footer={actionsBodyTemplate(membresia)}
                                    className={`col ${index === 1 ? 'bg-blue-900 md:w-25rem shadow-5 text-color-secondary ' : 'md:w-25rem shadow-5'}`}
                                >
                                    <div className='text-justify'>
                                        <ul className="list-disc">
                                            {membresia.descripcion}
                                        </ul>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <EditMem 
            abrir={showEditDialog} 
            onHide={() => setShowEditDialog(false)}
            getData={getDatos}
            messages={messages}
            dataUser={selectedMem} 
            />
        </div>
    );
}

export default Membresias;
