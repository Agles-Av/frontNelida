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

const EditUser = ({ abrir, onHide, getUser, messages, dataUser }) => {
    const stepperRef = useRef(null);
    const [roles, setRoles] = useState([]);
    const[selectedRole, setSelectedRole] = useState(dataUser.role);
    useEffect(() => {
        if (dataUser && dataUser.role) {
            setSelectedRole(dataUser.role); // Asignamos el rol del usuario
        }
    }, [dataUser]);
    console.log(selectedRole);
    

    const getRoles = async () => {
        try {
            const response = await AxiosCLient({
                url: "/role/",
                method: "GET",
            });

            if (!response.error) {
                setRoles(response.data); // Establecer los roles
            }
        } catch (error) {
            console.error('Error al obtener los roles:', error);
        }
    }

    useEffect(() => {
        getRoles();
    }, []);

    const initialValues = {
        nombre: dataUser.nombre,
        apPaterno: dataUser.apPaterno,
        apMaterno: dataUser.apMaterno,
        email: dataUser.email,
        telefono: dataUser.telefono,
        contrasena: dataUser.contrasena,
        contrasenaRepetir: dataUser.contrasena,
        edad: dataUser.edad,
        foto: null,
        role: dataUser.role,
    };
    const handleRoleChange = (e) => {
        setSelectedRole(e.value);
        initialValues.role = e.value;
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
            console.log("Formulario enviado:", values);
            if (values.foto === null) {
                values.foto = dataUser.foto;
            }
            values.role = selectedRole;
            const response = await AxiosCLient({
                url: "/usuario/"+dataUser.id,
                method: "PUT",
                data: values,
            });

            if (!response.error) {
                console.log("Usuario creado con éxito:", response.data);
                getUser();
                messages.current.show({
                    sticky: true,
                    severity: 'success',
                    summary: 'Éxito',
                    detail: `Se ha editado al usuario con éxito`,
                    closable: true,
                });
                onHide();
            } else {
                console.error("Error al crear usuario:", response.error);
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
        apPaterno: Yup.string()
            .required('El apellido paterno es obligatorio')
            .matches(/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras')
            .max(45, 'El apellido no puede tener más de 45 caracteres'),
        apMaterno: Yup.string()
            .matches(/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras')
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
    });


    return (
        <div className="card flex justify-content-center">
            <Dialog
                header="Actualizar usuario"
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
                                    <div className="col-4 mt-4">
                                        <FloatLabel>

                                            <Dropdown
                                                id="role"
                                                name="role"
                                                value={selectedRole}
                                                onChange={handleRoleChange}
                                                options={roles}n
                                                optionLabel="nombre"
                                                placeholder="Seleccione un rol"
                                            />
                                            <label htmlFor="role">Rol</label>
                                        </FloatLabel>
                                        <ErrorMessage name="role" component="small" className="p-error" />
                                    </div>

                                    <div className="col-12 mt-4">
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

export default EditUser