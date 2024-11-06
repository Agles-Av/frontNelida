import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/mira/theme.css'
import 'primereact/resources/primereact.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

//primereact/resources/themes/lara-dark-indigo/theme.css OBSCURO
//primereact/resources/themes/mira/theme.css CLARO
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <PrimeReactProvider>
  
      <App />
    
  </PrimeReactProvider>
)
