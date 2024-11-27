import React, { useEffect,useContext } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import AdminLayout from '../modules/admin/AdminLayout'
import EmpleadoLayout from '../modules/empleado/EmpleadoLayout'
import UsuarioLayout from '../modules/usuario/UsuarioLayout'
import LandingPage from '../modules/landingPage/LandingPage'
import LandingLayout from '../modules/landingPage/LandingLayout'
import AuthContext from '../config/context/auth-context'

export default function AppRouter() {
    const { user } = useContext(AuthContext);
    const [role, setRole] = React.useState(user?.roleUser || localStorage.getItem('roleUser'));

    useEffect(() => {
        setRole(user?.roleUser || localStorage.getItem('roleUser'));
    }, [user]);
    

    const paths = (role) => {
        switch (role) {
            case 'EMPLEADO':
                return <Route path='/empleado' element={<EmpleadoLayout />} />;
            case 'ADMIN':
                return <Route path='/admin' element={<AdminLayout />} />;
            case 'CLIENTE':
                return <Route path='/usuario' element={<UsuarioLayout />} />;
            default:
                return <Route path='/' element={<LandingPage />} />;
        }
    };

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                {/* Ruta pública */}
                <Route path='/' element={<LandingPage />} />

                {/* Rutas protegidas */}
                {user?.signed ? paths(role) : <Route path="/*" element={<LandingPage />} />}
            </>
        )
    );

    return <RouterProvider router={router} />;
}
