import React, { useState } from 'react';
import { SelectButton } from 'primereact/selectbutton';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const Membresias = () => {
    const [value, setValue] = useState(1);
    const items = [
        { name: 'Anual ', value: 1 },
        { name: 'Mensual', value: 3 }
    ];

    const header = (
        <h1 className="text-center">Fit Exprés</h1>
    );
    const header2 = (
        <h1 className="text-center">Six Pack</h1>
    );
    const header3 = (
        <h1 className="text-center">Plan Élite</h1>
    );
    const footer = (
        <>
            <div className='w-full'>
                <Button label="Suscribirse" />
            </div>

        </>
    );

    const membresias = [
        {
            name: 'Fit Exprés',
            price: '$1000',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!'
        },
        {
            name: 'Six Pack',
            price: '$2000',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!'
        },
        {
            name: 'Plan Élite',
            price: '$31000',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!'
        }

    ]

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

            {/* Renderizado condicional con operador ternario */}
            <div className="mt-3 w-full text-center">
                {value === 1 ? (
                    <div class="grid">
                        <div class="col" >
                            <div className="card flex justify-content-center">
                                <Card header={header} title={membresias[0].price} subTitle={membresias[0].price} footer={footer} className="md:w-25rem shadow-5 ">
                                    <div className='text-justify'>
                                        <ul class="list-disc">
                                            <li>Lorem ipsum dolor sit amet...</li>
                                            <li>Vitae sapien pellentesque habitant...</li>
                                            <li>Maecenas pharetra convallis posuere morbi leo urna molestie.</li>
                                        </ul>
                                    </div>
                                </Card>
                            </div>
                        </div>
                        <div class="col" >
                            <div className="card flex justify-content-center">
                                <Card header={header2} title={membresias[0].price} subTitle={membresias[1].price} footer={footer} className="md:w-25rem shadow-5 ">
                                    <div className='text-justify'>
                                        <ul class="list-disc">
                                            <li>Lorem ipsum dolor sit amet...</li>
                                            <li>Vitae sapien pellentesque habitant...</li>
                                            <li>Maecenas pharetra convallis posuere morbi leo urna molestie.</li>
                                        </ul>
                                    </div>
                                </Card>
                            </div>
                        </div>
                        <div class="col" >
                            <div className="card flex justify-content-center">
                                <Card header={header3} title={membresias[0].price} subTitle={membresias[2].price} footer={footer} className="md:w-25rem shadow-5 ">
                                    <div className='text-justify'>
                                        <ul class="list-disc">
                                            <li>Lorem ipsum dolor sit amet...</li>
                                            <li>Vitae sapien pellentesque habitant...</li>
                                            <li>Maecenas pharetra convallis posuere morbi leo urna molestie.</li>
                                        </ul>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div class="grid">
                        <div class="col" >
                            <div className="card flex justify-content-center">
                                <Card header={header} title={membresias[0].price} subTitle={membresias[0].price} footer={footer} className="md:w-25rem shadow-5 ">
                                    <div className='text-justify'>
                                        <ul class="list-disc">
                                            <li>Lorem ipsum dolor sit amet...</li>
                                            <li>Vitae sapien pellenJOELELELLELitant...</li>
                                            <li>Maecenas pharetra convallis posuere morbi leo urna molestie.</li>
                                        </ul>
                                    </div>
                                </Card>
                            </div>
                        </div>
                        <div class="col" >
                            <div className="card flex justify-content-center">
                                <Card header={header2} title={membresias[0].price} subTitle={membresias[1].price} footer={footer} className="md:w-25rem shadow-5 ">
                                    <div className='text-justify'>
                                        <ul class="list-disc">
                                            <li>Lorem ipsum dolor sit amet...</li>
                                            <li>Vitae sapien pellentesque habitant...</li>
                                            <li>Maecenas pharetra convallis posuere morbi leo urna molestie.</li>
                                        </ul>
                                    </div>
                                </Card>
                            </div>
                        </div>
                        <div class="col" >
                            <div className="card flex justify-content-center">
                                <Card header={header3} title={membresias[0].price} subTitle={membresias[2].price} footer={footer} className="md:w-25rem shadow-5 ">
                                    <div className='text-justify'>
                                        <ul class="list-disc">
                                            <li>Lorem ipsum dolor sit amet...</li>
                                            <li>Vitae sapien pellentesque habitant...</li>
                                            <li>Maecenas pharetra convallis posuere morbi leo urna molestie.</li>
                                        </ul>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Membresias;
