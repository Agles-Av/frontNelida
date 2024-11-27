import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';




const EmpleadoClases = ()=>{
    const footer = (
        <>
            <Button label="Inscribete" icon="pi pi-arrow-right" />
        </>
    );

    const clases = [
        {
            nombre: 'Zumba',
            descripcion: '"¡Bienvenidos a nuestra clase de Zumba! Prepárense para disfrutar una hora llena de energía, música y movimientos divertidos. No importa tu nivel, lo importante es moverte, sonreír y disfrutar.',
            imagen: 'src/assets/Zumba.jpg'
        },
        {
            nombre: 'Yoga',
            descripcion: 'Bienvenidos a nuestra clase de yoga! Este es un espacio para conectar contigo mismo, relajar la mente y fortalecer el cuerpo. Respira profundamente, suelta las tensiones y prepárate para encontrar equilibrio y tranquilidad.',
            imagen: 'src/assets/Yoga.jpg'
        },
        {
            nombre: 'GAP',
            descripcion: '¡Bienvenidos a nuestra clase de GAP! Hoy trabajaremos glúteos, abdominales y piernas con ejercicios efectivos para tonificar y fortalecer. Prepárense para moverse, sudar y superar sus límites. ¡Comencemos con toda la energía!',
            imagen: 'src/assets/Gap.jpg'
        },
        {
            nombre: 'Levantamiento de pesas',
            descripcion: '¡Bienvenidos a nuestra sesión de levantamiento de pesas! Hoy nos enfocaremos en la técnica, la fuerza y el control para alcanzar tus metas. Recuerda escuchar a tu cuerpo, mantener la postura correcta y dar lo mejor de ti.',
            imagen: 'src/assets/Pesas.jpg'
        },
        {
            nombre: 'Cardio',
            descripcion: '¡Bienvenidos a nuestra clase de cardio! Prepárense para una sesión llena de energía, movimientos dinámicos y mucha diversión. Nuestro objetivo es aumentar el ritmo cardíaco, quemar calorías ',
            imagen: 'src/assets/Cardio.jpg'
        },
        {
            nombre: 'Otros ejercicios',
            descripcion: 'Proximamente.....',
            imagen: 'src/assets/Otro.jpg'
        },
    ];

    return (
        <div className="w-full mt-5">
            <Card className='border-transparent shadow-none '>
                <h1 className="text-5xl font-semibold text-left mb-4 text-primary">Sabes los beneficios de los ejercicios?</h1>
                <p className="text-1xl font-semibold text-left mb-4 text-primary">Has click en Inscríbete para entrar a una clase</p>
                <div className="grid">
                    {clases.map((clase, index) => (
                        <div key={index} className="col-12 md:col-4 mt-2">
                                <img src={clase.imagen} alt={clase.nombre} className="w-full max-h-10rem  md:max-w-full md:max-h-10rem object-cover border-round" />
                                <Card title={clase.nombre} subTitle="Instructor: Juan Perez" footer={footer} >
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