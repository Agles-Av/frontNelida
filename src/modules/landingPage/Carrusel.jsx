import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';

const Carrusel = () => {
    const [products, setProducts] = useState([]);
    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 2,
            numScroll: 1
        }
    ];

    const sampleProducts = [
        { id: 1, name: 'Producto 1', image: 'src/assets/gym1.jpg' },
        { id: 2, name: 'Producto 2', image: 'src/assets/gym2.avif' },
        { id: 3, name: 'Producto 3', image: 'src/assets/gym1.jpg' },
        { id: 4, name: 'Producto 4', image: 'src/assets/gym1.jpg' },
        { id: 5, name: 'Producto 5', image: 'src/assets/gym1.jpg' },
        { id: 6, name: 'Producto 6', image: 'src/assets/gym1.jpg' }
    ];

    useEffect(() => {
        setProducts(sampleProducts);
    }, []);

    const productTemplate = (product) => {
        return (
            <div className="p-col flex justify-content-center align-items-center p-2">
                <div className="p-shadow-4 border-round p-p-2" style={{ width: '100%', maxWidth: '1500px', height: '500px' }}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full  object-cover border-round"
                    />
                </div>
            </div>
        );
    };
    
    return (
        <div className="card text-center p-mt-4">
            <Carousel
                value={products}
                numVisible={2}
                numScroll={1}
                circular
                responsiveOptions={responsiveOptions}
                itemTemplate={productTemplate}
                autoplayInterval={3000}
            />
        </div>
    );
    
    
};

export default Carrusel;
