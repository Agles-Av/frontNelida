import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import { ThemeProvider } from './context/ThemeContext';
import App from './App.jsx';

// Importa estilos globales y no específicos del tema
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <StrictMode>
            <PrimeReactProvider>
                <App />
            </PrimeReactProvider>
        </StrictMode>
    </ThemeProvider>
);
