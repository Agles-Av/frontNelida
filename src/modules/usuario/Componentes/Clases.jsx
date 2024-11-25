import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const Clases = () => {
    const footer = (
        <>
            <Button label="Suscribete" icon="pi pi-arrow-right" />
        </>
    );

    const clases = [
        {
            nombre: 'Clase 1',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
            imagen: 'src/assets/gym1.jpg'
        },
        {
            nombre: 'Clase 2',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
            imagen: 'src/assets/gym1.jpg'
        },
        {
            nombre: 'Clase 3',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
            imagen: 'src/assets/gym1.jpg'
        },
        {
            nombre: 'Clase 4',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
            imagen: 'src/assets/gym1.jpg'
        },
    ];

    return (
        <div className="w-full mt-5">
            <Card className='border-transparent shadow-none '>
                <h1 className="text-6xl font-semibold text-left mb-4 text-primary">Clases</h1>
                <div className="grid">
                    {clases.map((clase, index) => (
                        <div key={index} className="col-12 md:col-4 mt-2">
                            <Card title={clase.nombre} subTitle="Instructor: Juan Perez" footer={footer} >
                                <img src={clase.imagen} alt={clase.nombre} className="w-full max-h-10rem  md:max-w-full md:max-h-10rem object-cover border-round" />
                                <p className="p-m-0">{clase.descripcion}</p>
                            </Card>
                        </div>
                    ))}
                </div>

            </Card>

        </div>
    );
};

export default Clases;
