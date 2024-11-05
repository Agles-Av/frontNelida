import React from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import AdminLayout from '../modules/admin/AdminLayout'
import EmpleadoLayout from '../modules/empleado/EmpleadoLayout'
import UsuarioLayout from '../modules/usuario/UsuarioLayout'

export default function AppRouter() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                {/** Admin */}
                <Route path='/admin' element={<AdminLayout />}>

                </Route>

                {/** empleado */}
                <Route path='/empleado' element={<EmpleadoLayout/> }>

                </Route>

                {/** Usuario */}
                <Route path='/usuario' element={ <UsuarioLayout/> }>

                </Route>
            </>
        )
    )

    return <RouterProvider router={router} />;
}
