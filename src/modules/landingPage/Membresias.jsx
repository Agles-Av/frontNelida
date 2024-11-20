import React, { useState } from 'react';
import { SelectButton } from 'primereact/selectbutton';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const Membresias = () => {
    const [value, setValue] = useState(1);

    const items = [
        { name: 'Anual', value: 1 },
        { name: 'Mensual', value: 3 }
    ];

    const membresias = [
        {
            name: 'Fit Exprés',
            price: '$1000',
            description: [
                'Lorem ipsum dolor sit amet...',
                'Vitae sapien pellentesque habitant...',
                'Maecenas pharetra convallis posuere morbi leo urna molestie.'
            ]
        },
        {
            name: 'Six Pack',
            price: '$2000',
            description: [
                'Lorem ipsum dolor sit amet...',
                'Vitae sapien pellentesque habitant...',
                'Maecenas pharetra convallis posuere morbi leo urna molestie.'
            ]
        },
        {
            name: 'Plan Élite',
            price: '$31000',
            description: [
                'Lorem ipsum dolor sit amet...',
                'Vitae sapien pellentesque habitant...',
                'Maecenas pharetra convallis posuere morbi leo urna molestie.'
            ]
        }
    ];

    const footer = (
        <div className='w-full'>
            <Button label="Suscribirse" />
        </div>
    );

    return (
        <div className="card flex flex-column align-items-center">
            <div className='shadow-4'>
                <SelectButton
                    value={value}
                    onChange={(e) => setValue(e.value)}
                    optionLabel="name"
                    options={items}
                />
            </div>

            {/* Renderizado dinámico usando .map */}
            <div className="mt-3 w-full text-center">
                <div className="grid">
                    {membresias.map((membresia, index) => (
                        <div key={index} className="col">
                            <div className="card flex justify-content-center">
                                <Card
                                    header={<h1 className="text-center">{membresia.name}</h1>}
                                    title={membresia.price}
                                    subTitle={membresia.price}
                                    footer={footer}
                                    className="md:w-25rem shadow-5"
                                >
                                    <div className='text-justify'>
                                        <ul className="list-disc">
                                            {membresia.description.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Membresias;
