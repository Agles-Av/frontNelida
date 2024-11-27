import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { useNavigate } from 'react-router-dom';
import AxiosCLient from '../../../config/http-gateway/http-client';
import AuthContext from '../../../config/context/auth-context';

const ModalLog = ({ abrir, onHide }) => {
    const navigate = useNavigate();
    const {user, dispatch} =  useContext(AuthContext);
    // Esquema de validación usando Yup
    const validationSchema = Yup.object({
        email: Yup.string()
            .required('El correo es obligatorio')
            .max(64, 'El correo no puede tener más de 64 caracteres')
            .email('Correo no válido, ingrese un formato válido, ej. user@gmail.com')
        ,

        password: Yup.string()
            .min(6, 'La contraseña debe tener al menos 8 caracteres')
            .required('La contraseña es obligatoria'),
    });

    // Manejo del envío del formulario
    const onSubmit = async (values) => {
        const data = {
            email: values.email,
            password: values.password,
        };
        try {
            const response = await AxiosCLient({
                method: 'POST',
                url: '/auth/signin',
                data: data,
            });
    
            const userData = {
                token: response.data.token,
                roleUser: response.data.role.nombre,
                signed: true,
            };
    
            // Actualizar contexto y localStorage
            dispatch({ type: "SIGNIN", payload: userData });
            localStorage.setItem('roleUser', response.data.role.nombre);
            localStorage.setItem('user', JSON.stringify(userData));
    
            console.log('Respuesta:', response);
    
            // Redirigir a la ruta correspondiente
            navigate(`/${response.data.role.nombre.toLowerCase()}`);
        } catch (error) {
            console.log('Error:', error);
        }
    };
    

    return (
        <div className="card flex justify-content-center">
            <Dialog
                header="Inicia sesión"
                visible={abrir}
                maximizable
                style={{ width: '50vw' }}
                onHide={onHide}
                position="top"
            >
                {/* Formulario con Formik */}
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ handleSubmit, isValid, dirty }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="grid mt-5">
                                {/* Campo Email */}
                                <div className="col">
                                    <FloatLabel>
                                        <Field
                                            name="email"
                                            as={InputText}
                                            id="email"
                                            className={({ field }) =>
                                                field && field.touched && field.error ? 'p-invalid' : ''
                                            }
                                            maxLength="64"
                                        />
                                        <label htmlFor="email">Email</label>
                                    </FloatLabel>
                                    <ErrorMessage
                                        name="email"
                                        component="small"
                                        className="p-error"
                                    />
                                </div>
                                <div className="col-2">
                                    <i className="pi pi-user"></i>
                                </div>

                                {/* Campo Contraseña */}
                                <div className="col">
                                    <FloatLabel>
                                        <Field
                                            name="password"
                                            as={InputText}
                                            type="password"
                                            id="password"
                                            className={({ field }) =>
                                                field && field.touched && field.error ? 'p-invalid' : ''
                                            }
                                            maxLength="32"
                                        />
                                        <label htmlFor="password">Contraseña</label>
                                    </FloatLabel>
                                    <ErrorMessage
                                        name="password"
                                        component="small"
                                        className="p-error"
                                    />
                                </div>
                                <div className="col-2">
                                    <i className="pi pi-lock"></i>
                                </div>
                            </div>

                            {/* Botón de enviar */}
                            <div className="flex justify-content-end mt-4">
                                <Button label="Iniciar sesión" icon="pi pi-sign-in" type="submit" disabled={!(isValid && dirty)} />
                            </div>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </div>
    );
};

export default ModalLog;
