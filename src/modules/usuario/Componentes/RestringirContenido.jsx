import React from 'react';
import './Restringir.css';

const RestringirContenido = ({ children, hasAccess, mensaje }) => {
    return (
        <div className="restricted-wrapper">
            <div className={`restricted-content ${hasAccess ? '' : 'blurred'}`}>
                {children}
            </div>
            {!hasAccess && (
                <div className="overlay">
                    <p>{mensaje}</p>
                </div>
            )}
        </div>
    );
};
export default RestringirContenido;
