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
        

const EditMem = ({ abrir, onHide, getData, messages, dataUser }) => {
    
    const stepperRef = useRef(null);
    const [descripcion, setDescripcion] = useState('');
    useEffect(() => {
        setDescripcion(dataUser.descripcion);
    }, [dataUser]);

    const initialValues = {
        nombre: dataUser.nombre,
        descripcion: dataUser.descripcion,
        precio: dataUser.precio,
        promos: dataUser.promos,
        status: dataUser.status
    };

    const handleSubmit = async (values) => {
        values.descripcion = descripcion;
        try {
            const response = await AxiosCLient({
                url: "/membresia/" + dataUser.id,
                method: "PUT",
                data: values,
            });

            if (!response.error) {
                console.log("Membresia editada con éxito:", response.data);
                
                getData();
                messages.current.show({
                    sticky: true,
                    severity: 'success',
                    summary: 'Éxito',
                    detail: `Se ha editado la membresia con éxito`,
                    closable: true,
                });
                onHide();
            } else {
                console.error("Error al crear usuario:", response.error);
                messages.current.show({
                    sticky: true,
                    severity: 'error',
                    summary: 'Error',
                    detail: `Error al editar la membresia`,
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
        precio: Yup.number()
            .required('La edad es obligatoria')
    });


    return (
        <div className="card flex justify-content-center">
            <Dialog
                header="Actualizar membresia"
                visible={abrir}
                maximizable
                style={{ width: '70vw' }}
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
                                    <div className="col-4">
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
                                    <div className="col-4">
                                        <FloatLabel>
                                            <InputTextarea
                                                name="descripcion"    
                                                as={InputTextarea}
                                                value={descripcion}
                                                onChange={(e) => setDescripcion(e.target.value)}
                                                id="descripcion"
                                                maxLength="255"
                                            />
                                            <label htmlFor="descripcion">Descripcion</label>
                                        </FloatLabel>
                                        <ErrorMessage name="descripcion" component="small" className="p-error" />
                                    </div>
                                    {/* Apellido Materno */}
                                    <div className="col-4">
                                        <FloatLabel>
                                            <Field
                                                name="precio"
                                                as={InputText}
                                                id="precio"
                                                type="number"
                                                onInput={(e) => {
                                                    if (e.target.value.length > 3) {
                                                        e.target.value = e.target.value.slice(0, 3); // Limitar a 3 caracteres
                                                    }
                                                }}
                                            />
                                            <label htmlFor="precio">Precio Original</label>
                                        </FloatLabel>
                                        <ErrorMessage name="precio" component="small" className="p-error" />
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

export default EditMem