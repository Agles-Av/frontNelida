import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import 'primereact/resources/primereact.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <PrimeReactProvider>
  
      <App />
    
  </PrimeReactProvider>
)
