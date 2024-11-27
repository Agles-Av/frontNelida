import React, { useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';

const ModaLogin = ({ abrir, onHide }) => {
    const stepperRef = useRef(null);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm(); // Usa el hook `useForm` para manejar el formulario
    const onSubmit = (data) => {
        console.log('Datos del formulario:', data);     // Muestra los datos del formulario en la consola
    };

    return (
        <div className="card flex justify-content-center">
            <Dialog
                header="Regístrate"
                visible={abrir} // Usa la prop `abrir` para mostrar/ocultar el modal
                maximizable
                style={{ width: '50vw' }}
                onHide={onHide} // Llama a la función `onHide` cuando se cierra el modal
                position='top'
            >
                <div className="card flex justify-content-center">
                    <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
                        <StepperPanel header="Datos personales">
                            <div className="flex flex-column h-12rem">
                                <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content I</div>
                            </div>
                            <div className="flex pt-4 justify-content-end">
                                <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                            </div>
                        </StepperPanel>
                        <StepperPanel header="Datos de tarjeta">
                            <div className="flex flex-column h-12rem">
                                <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content II</div>
                            </div>
                            <div className="flex pt-4 justify-content-between">
                                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                                <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                            </div>
                        </StepperPanel>
                        <StepperPanel header="Resumen">
                            <div className="flex flex-column h-12rem">
                                <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content III</div>
                            </div>
                            <div className="flex pt-4 justify-content-start">
                                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                            </div>
                        </StepperPanel>
                    </Stepper>
                </div>
            </Dialog>
        </div>
    );
};

export default ModaLogin;
