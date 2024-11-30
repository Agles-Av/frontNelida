import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { FileUpload } from 'primereact/fileupload';
import { FloatLabel } from 'primereact/floatlabel';
import AxiosCLient from '../../../../config/http-gateway/http-client';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';

const Editpromo = ({ abrir, onHide, getPromotions, messages, data }) => {
    const [membresias, setMembresias] = useState([data.membeasia]); // Para cargar las opciones de membresías
    const [selectedMembresias, setSelectedMembresias] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);

    useEffect(() => {
        if (data.membresia) {
            setSelectedMembresias(data.membresia); // Inicializa las membresías seleccionadas
        }
    }, [data.membresia]);

    useEffect(() => {
        const getMembresias = async () => {
            try {
                const response = await AxiosCLient({
                    url: "/membresia/",
                    method: "GET",
                });
                if (!response.error) {
                    setMembresias(response.data);
                }
            } catch (error) {
                console.error("Error al obtener membresías:", error);
            }
        };
        getMembresias();
    }, []);

    // Valores iniciales del formulario
    const initialValues = {
        nombre: data.nombre,
        descripcion: data.descripcion,
        porcentaje: data.porcentaje,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        imagen: null,
        membresia: data.membresia,
    };

    // Esquema de validación con Yup
    const validationSchema = Yup.object({
        nombre: Yup.string()
            .required('El nombre es obligatorio')
            .max(100, 'El nombre no puede tener más de 100 caracteres'),
        descripcion: Yup.string()
            .required('La descripción es obligatoria')
            .max(500, 'La descripción no puede tener más de 500 caracteres'),
        porcentaje: Yup.number()
            .required('El porcentaje es obligatorio')
            .min(1, 'El porcentaje debe ser mayor a 0')
            .max(100, 'El porcentaje no puede ser mayor a 100'),
        fechaInicio: Yup.date()
            .required('La fecha de inicio es obligatoria')
            .typeError('Fecha inválida'),
        fechaFin: Yup.date()
            .required('La fecha de fin es obligatoria')
            .min(Yup.ref('fechaInicio'), 'La fecha de fin debe ser posterior a la de inicio')
            .typeError('Fecha inválida'),
        membresia: Yup.array().required('Debes seleccionar al menos una membresía'),
    });

    // Manejar el envío del formulario
    const handleSubmit = async (values) => {
        if(values.imagen===null){
            values.imagen = data.imagen;
        }
        
        try {
            const response = await AxiosCLient({
                url: '/promo/'+data.id,
                method: 'PUT',
                data: { ...values},
            });

            if (!response.error) {
                console.log('Promoción actualizada:', response.data);                
                setSelectedMembresias([]); // Limpiar las membresías seleccionadas
                getPromotions();
                messages.current.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'La promoción se ha actualizado correctamente',
                });
                onHide();
            } else {
                throw new Error(response.error);
            }
        } catch (error) {
            console.error('Error al crear promoción:', error);
            messages.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Ocurrió un error al registrar la promoción',
            });
        }
    };

    return (
        <div className="card flex justify-content-center">
            <Dialog
                header="Actualizar promoción"
                visible={abrir}
                maximizable
                style={{ width: '50vw' }}
                onHide={onHide}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                    {({ handleSubmit, values, isValid }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="grid">
                                {/* Nombre */}
                                <div className="col-6">
                                    <FloatLabel htmlFor="nombre" placeholder="Nombre">
                                        <Field name="nombre" as={InputText} id="nombre" />
                                        <label htmlFor="nombre">Nombre</label>
                                        <ErrorMessage name="nombre" component="small" className="p-error" />
                                    </FloatLabel>
                                </div>
                                {/* Descripción */}
                                <div className="col-6">
                                    <FloatLabel htmlFor="descripcion" placeholder="Descripción">
                                        <Field name="descripcion" as={InputTextarea} rows="3" id="descripcion" />
                                        <label htmlFor="descripcion">Descripción</label>
                                        <ErrorMessage name="descripcion" component="small" className="p-error" />
                                    </FloatLabel>
                                </div>
                                {/* Porcentaje */}
                                <div className="col-6">
                                    <FloatLabel htmlFor="porcentaje" placeholder="Porcentaje">
                                        <Field name="porcentaje" as={InputText} id="porcentaje" type="number" />
                                        <label htmlFor="porcentaje">Porcentaje</label>
                                        <ErrorMessage name="porcentaje" component="small" className="p-error" />
                                    </FloatLabel>
                                </div>
                                <div className="col-6">
                                    <Field name="membresia">
                                        {({ field, form }) => (
                                            <>
                                                <MultiSelect
                                                    id="membresia"
                                                    value={selectedMembresias} // Vinculado al estado local
                                                    options={membresias} // Las opciones disponibles
                                                    onChange={(e) => {
                                                        setSelectedMembresias(e.value); // Actualizar estado local
                                                        form.setFieldValue("membresia", e.value); // Actualizar Formik
                                                    }}
                                                    optionLabel="nombre" // Campo a mostrar en el dropdown
                                                    placeholder="Selecciona membresías"
                                                    display="chip" // Muestra las membresías seleccionadas como chips
                                                />
                                                <ErrorMessage name="membresia" component="small" className="p-error" />
                                            </>
                                        )}
                                    </Field>
                                </div>
                                {/* Fecha de inicio */}
                                <div className="col-6">
                                    <FloatLabel htmlFor="fechaInicio" placeholder="Fecha de inicio">
                                        <Field name="fechaInicio">
                                            {({ field, form }) => (
                                                <Calendar
                                                    id="fechaInicio"
                                                    value={field.value} // Este es el valor actual de Formik
                                                    onChange={(e) => form.setFieldValue("fechaInicio", e.value)} // Actualiza el campo con Formik
                                                    showIcon
                                                />
                                            )}
                                        </Field>
                                        <label htmlFor="fechaInicio">Fecha de inicio</label>
                                        <ErrorMessage name="fechaInicio" component="small" className="p-error" />
                                    </FloatLabel>
                                </div>
                                {/* Fecha de fin */}
                                <div className="col-6">
                                    <FloatLabel htmlFor="fechaFin" placeholder="Fecha de fin">
                                        <Field name="fechaFin">
                                            {({ field, form }) => (
                                                <Calendar
                                                    id="fechaFin"
                                                    value={field.value} // Este es el valor actual de Formik
                                                    onChange={(e) => form.setFieldValue("fechaFin", e.value)} // Actualiza el campo con Formik
                                                    showIcon
                                                />
                                            )}
                                        </Field>
                                        <label htmlFor="fechaFin">Fecha de fin</label>
                                        <ErrorMessage name="fechaFin" component="small" className="p-error" />
                                    </FloatLabel>
                                </div>
                                {/* Imagen */}
                                <div className="col-12">
                                    <label htmlFor="imagen">Subir imagen</label>
                                    <FileUpload
                                        mode="basic"
                                        name="file"
                                        accept="image/*"
                                        onSelect={(e) => {
                                            const file = e.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = () => {
                                                    // Aquí replicamos el comportamiento que usas en los inputs
                                                    data.imagen = reader.result;
                                                    // Adicionalmente puedes realizar validaciones si es necesario
                                                };
                                                reader.onerror = () => console.error("Error al leer el archivo");
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                    <ErrorMessage name="imagen" component="small" className="p-error" />
                                </div>
                            </div>
                            {/* Botón de enviar */}
                            <div className="flex justify-content-end mt-4">
                                <Button
                                    label="Actualizar"
                                    icon="pi pi-check"
                                    type="submit"
                                    disabled={!isValid}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </div>
    );
};

export default Editpromo