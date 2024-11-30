import React, { useRef, useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { FileUpload } from 'primereact/fileupload';
import AxiosCLient from '../../../../config/http-gateway/http-client';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';

const EditClass = ({ abrir, onHide, getData, messages, data }) => {

    const initialValues = {
        nombre: data.nombre,
        descripcion: data.descripcion,
        status: data.status,
        foto: null,
    };

    const convertirImagenBase64 = (archivo) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(archivo);
        });
    };

    const onUpload = async (e) => {
        const file = e.files[0];
        if (file) {
            try {
                const coso = await convertirImagenBase64(file);
                console.log(coso);
                setFieldValue({ ...initialValues, foto: coso });
            } catch (error) {
                console.error("Error al convertir la imagen:", error);
            }
        } else {
            console.error("No se ha seleccionado un archivo");
        }
    };

    const handleSubmit = async (values) => {
        try {
            if (values.foto === null) {
                values.foto = data.foto;
            }
            const response = await AxiosCLient({
                url: "/clase/"+data.id,
                method: "PUT",
                data: values,
            });

            if (!response.error) {
                getData();
                messages.current.show({
                    sticky: true,
                    severity: 'success',
                    summary: 'Éxito',
                    detail: `Se ha editado la clase con éxito`,
                    closable: true,
                });
                onHide();
            } else {
                console.error("Error al crear clase:", response.error);
                messages.current.show({
                    sticky: true,
                    severity: 'error',
                    summary: 'Error',
                    detail: `Error al crear el usuario`,
                    closable: true,
                });
            }
        } catch (error) {
            console.error("Error al manejar el envío del formulario:", error);
        }
    };

    const validationSchema = Yup.object({
        nombre: Yup.string()
            .required('El nombre es obligatorio')
            .max(45, 'El nombre no puede tener más de 45 caracteres')
            .matches(/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras'),
        descripcion: Yup.string()
            .required('El apellido paterno es obligatorio')
            .max(500, 'El apellido no puede tener más de 255 caracteres'),
    });


    return (
        <div className="card flex justify-content-center">
            <Dialog
                header="Actualizar Clase"
                visible={abrir}
                maximizable
                style={{ width: '40vw' }}
                onHide={onHide}
                position="top">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                    {({ handleSubmit, values, isValid, dirty }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="card flex justify-content-center">
                                <div className="grid">
                                    {/* Nombre */}
                                    <div className="col-6">
                                        <FloatLabel>
                                            <Field
                                                name="nombre"
                                                as={InputText}
                                                id="nombre"
                                                maxLength="45"
                                            />
                                            <label htmlFor="nombre">Nombre</label>
                                        </FloatLabel>
                                        <ErrorMessage name="nombre" component="small" className="p-error" />
                                    </div>
                                    {/* Apellido Paterno */}
                                    <div className="col-6">
                                        <FloatLabel>
                                            <Field
                                                name="descripcion"
                                                as={InputTextarea}
                                                id="descripcion"
                                                maxLength="45"
                                            />
                                            <label htmlFor="descripcion">Descripcion</label>
                                        </FloatLabel>
                                        <ErrorMessage name="descripcion" component="small" className="p-error" />
                                    </div>

                                    <div className="col-3">
                                        <label htmlFor="foto" className="p-label text-left">
                                            Sube tu foto
                                        </label>
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
                                                        values.foto = reader.result;
                                                        // Adicionalmente puedes realizar validaciones si es necesario
                                                    };
                                                    reader.onerror = () => console.error("Error al leer el archivo");
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="foto" component="small" className="p-error" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex pt-4 justify-content-between">
                                <Button
                                    label="Actualizar"
                                    icon="pi pi-check"
                                    iconPos="right"
                                    type="submit"
                                    disabled={!isValid}
                                />
                            </div>
                        </Form>
                    )}

                </Formik>

            </Dialog>
        </div>
    )
}


export default EditClass