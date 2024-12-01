import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SelectButton } from 'primereact/selectbutton';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

const Membresias = () => {
    const [value, setValue] = useState('monthly'); // Default mensual
    const [membresias, setMembresias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAnnual, setIsAnnual] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        fecha: new Date(),
        membresiaActual: '',
        membresiaNueva: '',
        membresiaNuevaNombre: '',
        precioNueva: 0,
    });
    const toast = React.useRef(null);

    const items = [
        { name: 'Anual', value: 'annual' },
        { name: 'Mensual', value: 'monthly' },
    ];

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;
    const suscripciones = user?.userId.suscripciones || [];
    const membresiaActual = suscripciones.length
        ? suscripciones.sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio))[0]?.membresia.nombre
        : 'Sin membresía activa';

    const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;

    useEffect(() => {
        const fetchMembresias = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/membresia/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // Guardar precioBase para cálculos
                const membresiasConPrecioBase = response.data.data.map((membresia) => ({
                    ...membresia,
                    precioBase: membresia.precioOriginal,
                }));
                setMembresias(membresiasConPrecioBase);
            } catch (error) {
                console.error('Error fetching membresías:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMembresias();
    }, [BASE_URL, token]);

    const handlePriceChange = (type) => {
        setIsAnnual(type === 'annual');
        setMembresias((prevMembresias) =>
            prevMembresias.map((membresia) => ({
                ...membresia,
                precioOriginal:
                    type === 'annual'
                        ? membresia.precioBase * 12 // Cálculo anual
                        : membresia.precioBase, // Regreso al precio base mensual
            }))
        );
    };

    const handleSuscribirse = (membresiaNueva) => {
        setFormData({
            email: user?.userId.email || '',
            fecha: new Date(),
            membresiaActual: membresiaActual || 'Sin membresía activa',
            membresiaNueva: membresiaNueva.id,
            membresiaNuevaNombre: membresiaNueva.nombre,
            precioNueva: membresiaNueva.precioOriginal,
        });
        setShowForm(true);
    };

    const handleConfirmar = async () => {
        try {
            const fechaInicio = formData.fecha;
            const fechaFin = new Date(fechaInicio);
            fechaFin.setMonth(fechaFin.getMonth() + 2);

            await axios.post(
                `${BASE_URL}/suscripcion/`,
                {
                    usuario: { id: user?.userId.id },
                    membresia: { id: formData.membresiaNueva },
                    fechaInicio: fechaInicio.toISOString(),
                    fechaFin: fechaFin.toISOString(),
                    status: true,
                    precio: formData.precioNueva,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const updatedUser = {
                ...user,
                userId: {
                    ...user.userId,
                    suscripciones: [
                        {
                            membresia: { nombre: formData.membresiaNuevaNombre },
                            fechaInicio: fechaInicio.toISOString(),
                        },
                    ],
                },
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Membresía actualizada correctamente',
                life: 3000,
            });

            setShowForm(false);

            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error) {
            console.error('Error actualizando la membresía:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo actualizar la membresía',
                life: 3000,
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card flex flex-column align-items-center">
            <Toast ref={toast} />
            <div className="shadow-4 mt-4">
                <SelectButton
                    value={value}
                    onChange={(e) => {
                        setValue(e.value);
                        handlePriceChange(e.value);
                    }}
                    optionLabel="name"
                    options={items}
                />
            </div>
            <div className="mt-3 w-full text-center">
                <div className="grid">
                    {membresias.map((membresia, index) => (
                        <div key={index} className="col">
                            <div className="card flex justify-content-center">
                                <Card
                                style={{minHeight:'18rem', maxHeight:'24rem'}}
                                    header={<h1 className="text-center">{membresia.nombre}</h1>}
                                    title={`$${membresia.precioOriginal}`}
                                    subTitle={membresia.descripcion}
                                    footer={
                                        <Button
                                            label="Suscribirse"
                                            onClick={() => handleSuscribirse(membresia)}
                                        />
                                    }
                                    className={`col ${index === 1 ? 'bg-blue-900 md:w-25rem shadow-5 text-color-secondary ' : 'md:w-25rem shadow-5'}`}
                                ></Card>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Dialog
                header="Actualizar Membresía"
                visible={showForm}
                style={{ width: '30vw' }}
                modal
                onHide={() => setShowForm(false)}
            >
                <div className="field mt-3">
                    <label htmlFor="email">Correo Electrónico</label>
                    <InputText id="email" value={formData.email} disabled />
                </div>
                <div className="field mt-3">
                    <label htmlFor="fecha">Fecha</label>
                    <Calendar
                        id="fecha"
                        value={formData.fecha}
                        onChange={(e) => setFormData({ ...formData, fecha: e.value })}
                        dateFormat="dd/mm/yy"
                        className="w-full"
                    />
                </div>
                <div className="field mt-3">
                    <label htmlFor="membresiaActual">Membresía Actual</label>
                    <InputText id="membresiaActual" value={formData.membresiaActual} disabled />
                </div>
                <div className="field mt-3">
                    <label htmlFor="membresiaNueva">Nueva Membresía</label>
                    <InputText id="membresiaNueva" value={formData.membresiaNuevaNombre} disabled />
                </div>
                <div className="field mt-3">
                    <label htmlFor="precio">Precio Nueva Membresía</label>
                    <InputText id="precio" value={`$${formData.precioNueva}`} disabled />
                </div>
                <div className="flex justify-content-between mt-3">
                    <Button label="Cancelar" onClick={() => setShowForm(false)} className="p-button-secondary" />
                    <Button label="Confirmar" onClick={handleConfirmar} />
                </div>
            </Dialog>
        </div>
    );
};

export default Membresias;
