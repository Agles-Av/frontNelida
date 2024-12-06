import React, { useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import Membresias from './Membresias';
import { FileUpload } from 'primereact/fileupload'
import AxiosCLient from '../../config/http-gateway/http-client';
import { Messages } from 'primereact/messages';

const ModaLogin = ({ abrir, onHide }) => {
    const [altCerrarModal, setAltCerrarModal] = useState(false);

    const messages = useRef(null); // Referencia al componente Messages
    const stepperRef = useRef(null);

    const [membershipSelected, setMembershipSelected] = useState(null);
    const [datos, setDatos] = useState(null);

    const handleMembershipSelect = (membership) => {
        setMembershipSelected(membership); // Guardar la membresía seleccionada
        setDatos(membership); // Actualizar 'datos' con la membresía seleccionada
        stepperRef.current.nextCallback(); // Avanza al siguiente StepperPanel
    };

    const initialValues = {
        nombre: '',
        apPaterno: '',
        apMaterno: '',
        email: '',
        telefono: '',
        contrasena: '',
        contrasenaRepetir: '',
        edad: '',
        tarjeta: '',
        vencimiento: '',
        cvv: '',
    };

    const handleSubmit = async (values,{resetForm}) => {
        const data = {
            nombre: values.nombre,
            apPaterno: values.apPaterno,
            apMaterno: values.apMaterno,
            email: values.email,
            edad: values.edad,
            telefono: values.telefono,
            contrasena: values.contrasena,
            foto: values.foto,
            role: { id: 2 },
        };

        try {
            const response = await AxiosCLient({
                method: 'POST',
                url: `/usuario/nuevo/${datos.id}/${true}`,
                data: data,
            });
            if (response.status === 'CREATED') {
                if (messages.current) {
                    messages.current.show({
                        severity: 'success',
                        summary: 'Registro exitoso',
                        detail: response.message || 'El usuario se registró correctamente.',
                        life: 5000,
                    });
                }
                onHide();
            resetForm();   
            }
        } catch (error) {
            console.log('Error:', error);
            
            if (messages.current) {
                messages.current.show({
                    severity: 'error',
                    summary: 'Error en el registro',
                    detail:   error.response?.data?.message || 'El correo ya pertenece a una cuenta.' ,
                    life: 5000,
                });
            }
        }
    };



    const validationSchema = Yup.object({
        nombre: Yup.string()
            .required('El nombre es obligatorio')
            .max(45, 'El nombre no puede tener más de 45 caracteres')
            .matches(/^[a-zA-ZñÑ\s]+$/, 'El nombre solo puede contener letras'),
        apPaterno: Yup.string()
            .required('El apellido paterno es obligatorio')
            .matches(/^[a-zA-ZñÑ\s]+$/, 'El apellido paterno solo puede contener letras')
            .max(45, 'El apellido no puede tener más de 45 caracteres'),
        apMaterno: Yup.string()
            .matches(/^[a-zA-ZñÑ\s]+$/, 'El apellido materno solo puede contener letras')
            .max(45, 'El apellido no puede tener más de 45 caracteres'),
        email: Yup.string()
            .email('Correo electrónico inválido')
            .required('El correo es obligatorio')
            .max(45, 'El correo no puede tener más de 45 caracteres'),
        telefono: Yup.string()
            .required('El teléfono es obligatorio')
            .matches(/^\d{10}$/, 'El teléfono debe tener 10 dígitos'),
        contrasena: Yup.string()
            .required('La contraseña es obligatoria')
            .min(6, 'La contraseña debe tener al menos 6 caracteres'),
        contrasenaRepetir: Yup.string()
            .required('La contraseña es obligatoria')
            .oneOf([Yup.ref('contrasena'), null], 'Las contraseñas deben coincidir'),
        edad: Yup.number()
            .required('La edad es obligatoria')
            .min(18, 'Debes ser mayor de 18 años'),
        tarjeta: Yup.string()
            .required('El número de tarjeta es obligatorio')
            .matches(/^\d{16}$/, 'El número de tarjeta debe tener 16 dígitos'),
        vencimiento: Yup.string()
            .required('La fecha de vencimiento es obligatoria')
            .matches(/^\d{2}\/\d{2}$/, 'El formato debe ser MM/YY, ej. 12/23'),
        cvv: Yup.string()
            .required('El código CVV es obligatorio')
            .matches(/^\d{3}$/, 'El CVV debe tener 3 dígitos'),
    });
    

    return (
        <div className="card flex justify-content-center">
            <Messages ref={messages} />
            <Dialog
                header="Regístrate"
                visible={abrir}
                maximizable
                style={{ width: '70vw' }}
                onHide={onHide}
                position="top"
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >   
                    {({ handleSubmit, values, isValid, dirty, resetForm }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="card flex justify-content-center">
                                <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
                                    {/* Tus StepperPanels anteriores */}

                                    {/* Selección de Membresía */}
                                    <StepperPanel header="Membresía">
                                        <div className="flex flex-column h-12rem">
                                            <Membresias onSelectMemberShip={handleMembershipSelect} />
                                        </div>
                                        <div className="flex pt-4 justify-content-center mt-5">
                                            <h1>¡Elige el mejor plan para ti!</h1>
                                        </div>
                                    </StepperPanel>

                                    {/* Datos Personales */}
                                    <StepperPanel header="Datos personales">
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
                                                    <Field
                                                        name="apPaterno"
                                                        as={InputText}
                                                        id="apPaterno"
                                                        maxLength="45"
                                                    />
                                                    <label htmlFor="apPaterno">Apellido Paterno</label>
                                                </FloatLabel>
                                                <ErrorMessage name="apPaterno" component="small" className="p-error" />
                                            </div>
                                            {/* Apellido Materno */}
                                            <div className="col-4">
                                                <FloatLabel>
                                                    <Field
                                                        name="apMaterno"
                                                        as={InputText}
                                                        id="apMaterno"
                                                        maxLength="45"
                                                    />
                                                    <label htmlFor="apMaterno">Apellido Materno</label>
                                                </FloatLabel>
                                                <ErrorMessage name="apMaterno" component="small" className="p-error" />
                                            </div>
                                            {/* Teléfono */}
                                            <div className="col-4 mt-4">
                                                <FloatLabel>
                                                    <Field
                                                        name="telefono"
                                                        as={InputText}
                                                        id="telefono"
                                                        type="number"
                                                        onInput={(e) => {
                                                            e.target.value = e.target.value.replace(/[^0-9]/g, ''),
                                                                e.target.value = e.target.value.slice(0, 10);
                                                            // Permitir solo números
                                                        }}
                                                    />
                                                    <label htmlFor="telefono">Teléfono</label>
                                                </FloatLabel>
                                                <ErrorMessage name="telefono" component="small" className="p-error" />
                                            </div>
                                            {/* Email */}
                                            <div className="col-4 mt-4">
                                                <FloatLabel>
                                                    <Field
                                                        name="email"
                                                        as={InputText}
                                                        id="email"
                                                        maxLength="65"
                                                    />
                                                    <label htmlFor="email">Email</label>
                                                </FloatLabel>
                                                <ErrorMessage name="email" component="small" className="p-error" />
                                            </div>
                                            {/* Contraseña */}
                                            <div className="col-4 mt-4">
                                                <FloatLabel>
                                                    <Field
                                                        name="contrasena"
                                                        as={InputText}
                                                        id="contrasena"
                                                        type="password"
                                                        maxLength="16"
                                                    />
                                                    <label htmlFor="contrasena">Contraseña</label>
                                                </FloatLabel>
                                                <ErrorMessage name="contrasena" component="small" className="p-error" />
                                            </div>
                                            {/* Contraseña repetir */}
                                            <div className="col-4 mt-4">
                                                <FloatLabel>
                                                    <Field
                                                        name="contrasenaRepetir"
                                                        as={InputText}
                                                        id="contrasenaRepetir"
                                                        type="password"
                                                        maxLength="16"
                                                    />
                                                    <label htmlFor="contrasenaRepetir">Confirma la contraseña</label>
                                                </FloatLabel>
                                                <ErrorMessage name="contrasenaRepetir" component="small" className="p-error" />
                                            </div>
                                            {/* Edad */}
                                            <div className="col-4 mt-4">
                                                <FloatLabel>
                                                    <Field
                                                        name="edad"
                                                        as={InputText}
                                                        id="edad"
                                                        type="number"
                                                        onInput={(e) => {
                                                            if (e.target.value.length > 3) {
                                                                e.target.value = e.target.value.slice(0, 3); // Limitar a 3 caracteres
                                                            }
                                                        }}
                                                    />
                                                    <label htmlFor="edad">Edad</label>
                                                </FloatLabel>
                                                <ErrorMessage name="edad" component="small" className="p-error" />
                                            </div>

                                            <div className="col-12 mt-4">
                                                <label htmlFor="foto" className="p-label text-left">
                                                    Sube tu foto
                                                </label>
                                                <FileUpload
                                                    name="foto"
                                                    id="foto"
                                                    accept="image/*" // Permitir solo imágenes
                                                    maxFileSize={1000000} // Tamaño máximo permitido (1 MB en este caso)
                                                    multiple={false} // Permitir solo un archivo

                                                    customUpload
                                                    uploadHandler={(event) => {
                                                        const file = event.files[0]; // Obtenemos el archivo cargado
                                                        if (file) {
                                                            // Validar el tipo de archivo
                                                            if (!file.type.startsWith('image/')) {
                                                                console.error('Solo se permiten imágenes');
                                                                return;
                                                            }

                                                            // Convertir el archivo a base64 y asignarlo al campo "foto"
                                                            const reader = new FileReader();
                                                            reader.onload = () => {
                                                                // Usar Formik para asignar el valor
                                                                values.foto = reader.result; // Actualizamos el campo foto
                                                                setFieldValue('foto', reader.result); // Guardamos en Base64
                                                            };
                                                            reader.readAsDataURL(file); // Convierte a Base64
                                                        }
                                                    }}
                                                    emptyTemplate={
                                                        <p className="m-0">
                                                            Arrastra y suelta una imagen aquí o haz clic para seleccionarla.
                                                        </p>
                                                    }
                                                    chooseLabel="Seleccionar Imagen"
                                                    cancelLabel="Cancelar"
                                                />

                                                <ErrorMessage name="foto" component="small" className="p-error" />
                                            </div>
                                        </div>

                                        <div className="flex pt-4 justify-content-between">
                                            <Button
                                                label="Atrás"
                                                severity="secondary"
                                                icon="pi pi-arrow-left"
                                                onClick={() => stepperRef.current.prevCallback()}
                                            />
                                            <Button
                                                label="Siguiente"
                                                icon="pi pi-arrow-right"
                                                iconPos="right"
                                                onClick={() => stepperRef.current.nextCallback()}
                                            />
                                        </div>
                                    </StepperPanel>

                                    {/* Datos de Tarjeta */}
                                    <StepperPanel header="Datos de tarjeta">
                                        <div className="grid">
                                            {/* Número de Tarjeta */}
                                            <div className="col-6">
                                                <FloatLabel>
                                                    <Field
                                                        name="tarjeta"
                                                        as={InputText}
                                                        id="tarjeta"
                                                        maxLength="3"
                                                        type="number"
                                                        onInput={(e) => {
                                                            e.target.value = e.target.value.replace(/[^0-9]/g, ''),
                                                                e.target.value = e.target.value.slice(0, 16);
                                                            // Permitir solo números
                                                        }}
                                                    />
                                                    <label htmlFor="tarjeta">Número de Tarjeta</label>
                                                </FloatLabel>
                                                <ErrorMessage name="tarjeta" component="small" className="p-error" />
                                            </div>
                                            {/* Fecha de Vencimiento */}
                                            <div className="col-3">
                                                <FloatLabel>
                                                    <Field
                                                        name="vencimiento"
                                                        as={InputText}
                                                        id="vencimiento"
                                                        placeholder="MM/YY"
                                                        onInput={(e) => {
                                                            e.target.value = e.target.value.replace(/[^0-9/]/g, ''),
                                                                e.target.value = e.target.value.slice(0, 5);
                                                            // Permitir solo números
                                                        }}
                                                    />
                                                    <label htmlFor="vencimiento">Vencimiento</label>
                                                </FloatLabel>
                                                <ErrorMessage name="vencimiento" component="small" className="p-error" />
                                            </div>
                                            {/* CVV */}
                                            <div className="col-3">
                                                <FloatLabel>
                                                    <Field
                                                        name="cvv"
                                                        as={InputText}
                                                        id="cvv"
                                                        onInput={(e) => {
                                                            e.target.value = e.target.value.replace(/[^0-9]/g, ''),
                                                                e.target.value = e.target.value.slice(0, 3);
                                                            // Permitir solo números
                                                        }}
                                                    />
                                                    <label htmlFor="cvv">CVV</label>
                                                </FloatLabel>
                                                <ErrorMessage name="cvv" component="small" className="p-error" />
                                            </div>
                                        </div>
                                        <div className="flex pt-4 justify-content-between">
                                            <Button
                                                label="Atrás"
                                                severity="secondary"
                                                icon="pi pi-arrow-left"
                                                onClick={() => stepperRef.current.prevCallback()}
                                            />
                                            <Button
                                                label="Siguiente"
                                                icon="pi pi-arrow-right"
                                                iconPos="right"
                                                onClick={() => stepperRef.current.nextCallback()}
                                            />
                                        </div>
                                    </StepperPanel>
                                    {/* Resumen */}
                                    <StepperPanel header="Resumen">
                                        <div className="flex flex-column">
                                            <div className="surface-border border-round surface-ground p-4">
                                                <h2 className="text-center mb-4">Resumen de tu Información</h2>
                                                <ul className="list-none p-0 m-0">
                                                    {/* Datos personales */}
                                                    <li><strong>Nombre:</strong> {values.nombre || "No ingresado"}</li>
                                                    <li><strong>Apellido Paterno:</strong> {values.apPaterno || "No ingresado"}</li>
                                                    <li><strong>Apellido Materno:</strong> {values.apMaterno || "No ingresado"}</li>
                                                    <li><strong>Email:</strong> {values.email || "No ingresado"}</li>
                                                    <li><strong>Teléfono:</strong> {values.telefono || "No ingresado"}</li>
                                                    <li><strong>Edad:</strong> {values.edad || "No ingresado"}</li>
                                                    <li>
                                                        <strong>Foto:</strong>
                                                        {values.foto ? (
                                                            <img src={values.foto} alt="Foto seleccionada" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                                        ) : (
                                                            "No seleccionada"
                                                        )}
                                                    </li>
                                                    {/* Membresía seleccionada */}
                                                    <li><strong>Membresía Seleccionada:</strong> {membershipSelected?.nombre || "No seleccionada"}</li>
                                                    <li><strong>Precio Membresía:</strong> {membershipSelected?.precio || "No disponible"}</li>

                                                    {/* Datos de tarjeta */}
                                                    <li>
                                                        <strong>Número de Tarjeta:</strong> {values.tarjeta ? `**** **** **** ${String(values.tarjeta).slice(-4)}` : "No ingresado"}
                                                    </li>

                                                    <li><strong>Vencimiento:</strong> {values.vencimiento || "No ingresado"}</li>
                                                    <li><strong>CVV:</strong> ***</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="flex pt-4 justify-content-between">
                                            <Button
                                                label="Atrás"
                                                severity="secondary"
                                                icon="pi pi-arrow-left"
                                                onClick={() => stepperRef.current.prevCallback()}
                                            />
                                            <Button
                                                label="Registrarse"
                                                icon="pi pi-check"
                                                iconPos="right"
                                                type="submit"
                                                disabled={!(isValid && dirty)}
                                            />
                                        </div>
                                    </StepperPanel>
                                </Stepper>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </div>
    );
};

export default ModaLogin;
