import React, { useEffect } from 'react'
import Carrusel from './blocks/CarruselA'
import EmpleadoClases from './blocks/ClasesA'
import Finanzas from './blocks/Finanzas'
import EmpleadoFooter from './blocks/Footer'
import Membresias from './blocks/MembresiasA'
import PromocionesEmpleado from './blocks/PromocionesA'
import TablaUsuarios from './blocks/TablaUsuariosA'
import AdminLayout from './AdminLayout'
import AxiosCLient from '../../config/http-gateway/http-client'

const AdminPage = () => {
    
        return (
            <>
            <AdminLayout />
                <div className='p-5'>
                    <div id='Carrusel'>
                        <Carrusel />
                    </div>
                    <div id='Usuarios'>
                        <TablaUsuarios />
                    </div>
                    <div id='Finanzas'>
                        <Finanzas />
                    </div>
                    <div id='membresias'>
                        <Membresias />
                    </div>
                    <div id='Clases'>
                        <EmpleadoClases />
                    </div>
                    <div id='Promociones'>
                        <PromocionesEmpleado />
                    </div>
                </div>
                <div id='footer'>
                    <EmpleadoFooter />
                </div>
    
            </>
    
        )
    
    }

    export default AdminPage