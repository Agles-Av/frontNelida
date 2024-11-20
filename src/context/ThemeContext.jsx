import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('mira'); // Tema inicial: 'mira' (claro)

    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === 'mira' ? 'lara-dark-indigo' : 'mira'
        );
    };

    useEffect(() => {
        // Cambiar dinámicamente el archivo CSS cargado
        const themeLink = document.getElementById('theme-link');

        if (themeLink) {
            themeLink.href = `node_modules/primereact/resources/themes/${theme}/theme.css`;
        }
    }, [theme]); // Ejecutar cada vez que el tema cambie

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
