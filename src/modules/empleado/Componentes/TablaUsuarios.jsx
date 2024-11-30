import React, { useState, useEffect, useRef } from 'react';
import AxiosClient from '../../../config/http-gateway/http-client';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { FileUpload } from 'primereact/fileupload';
import { Card } from 'primereact/card';
import { ConfirmPopup } from 'primereact/confirmpopup'; // To use <ConfirmPopup> tag
import { confirmPopup } from 'primereact/confirmpopup';
import { Messages } from 'primereact/messages';
import { Dropdown } from 'primereact/dropdown';
import * as Yup from 'yup';
import { Formik } from 'formik';
import CrearUsuarioEmp from './CrearUsuarioEmp';
import EditUsuarioEmp from './EditUsuarioEmp';


import { set } from 'react-hook-form';

const TablaUsuarios = () => {
  const [data, setData] = useState([]); // Datos originales de la API
  const [showDialog, setShowDialog] = useState(false); // Controla la ventana emergente
  const [roles, setRoles] = useState([]);
  const messages = useRef(null); // Usar useRef para la referencia de Messages
  const [selectedUser, setSelectedUser] = useState([{
    id: 0,
    nombre: '',
    apPaterno: '',
    apMaterno: '',
    email: '',
    telefono: '',
    contrasena: '',
    edad: '',
    role: '',
    foto: null,
  }]);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const getRoles = async () => {
    try {
      const response = await AxiosClient({
        url: "/role/",
        method: "GET",
      });

      if (!response.error) {
        setRoles(response.data); // Establecer los roles
      }
    } catch (error) {
      console.error('Error al obtener los roles:', error);
    }
  }

  const getDatos = async () => {
    try {
      const response = await AxiosClient({
        url: "/usuario/",
        method: "GET",
      });

      if (!response.error) {
        const usuariosFiltrados = response.data.filter(
          (usuario) => usuario.role && usuario.role.nombre !== 'ADMIN'
        );
        setData(usuariosFiltrados); // Guarda solo los usuarios no admin
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    } finally {
    }
  };

  const changeStatus = async (rowData) => {
    console.log(rowData);

    try {
      const response = await AxiosClient({
        url: "/usuario/status/" + rowData.id,
        method: "PATCH",
      });

      if (!response.error) {
        getDatos();
        messages.current.show({
          sticky: true,
          severity: 'success',
          summary: 'Éxito',
          detail: `El estado de ${rowData.nombre} se ha cambiado correctamente.`,
          closable: true,
        });
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
      // Agregar un mensaje de error si la solicitud falla
      messages.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo cambiar el estado del usuario.',
      });
    }
  };

  useEffect(() => {
    getDatos();
    getRoles();
  }, []);

  const avatarBodyTemplate = (rowData) => (
    <Avatar
      image={rowData.foto}
      shape="circle"
      style={{ marginRight: '0.5rem' }}
    />
  );

  const actionsBodyTemplate = (rowData) => {
    // Función para abrir el popup de confirmación antes de cambiar el estado
    const handleStatusChange = () => {
      confirmPopup({
        target: document.activeElement,
        message: `¿Estás seguro de que quieres ${rowData.status ? 'desactivar' : 'activar'} al usuario ${rowData.nombre}?`,
        header: 'Confirmar Acción',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sí',
        rejectLabel: 'No',
        accept: () => changeStatus(rowData),
        reject: () => { }
      });
    };

    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-text"
          onClick={() => goEdit(rowData)}
        />
        {rowData.status ? (
          <Button
            icon="pi pi-ban" // Icono de desactivar
            className="p-button-rounded p-button-danger"
            onClick={handleStatusChange} // Mostrar el popup de confirmación
          />
        ) : (
          /* Si el usuario está inactivo (status === false) */
          <Button
            icon="pi pi-check" // Icono de activar
            className="p-button-rounded p-button-success"
            onClick={handleStatusChange} // Mostrar el popup de confirmación
          />
        )}
      </>
    );
  };

  // Muestra solo la última suscripción del arreglo
  const suscripcionBodyTemplate = (rowData) => {
    const suscripciones = rowData.suscripciones || []; // Asegúrate de que sea un arreglo
    if (suscripciones.length > 0) {
      const ultimaSuscripcion = suscripciones[suscripciones.length - 1]; // Toma la última suscripción
      return ultimaSuscripcion.membresia.nombre; // Devuelve el nombre de la membresía
    }
    return 'Sin suscripción'; // Si no hay suscripciones
  };

  const goEdit = (rowData) => {
    setSelectedUser(rowData);
    setShowEditDialog(true);
  };

  return (
    <Card className='border-transparent shadow-none '>
      <h1 className="text-5xl font-semibold text-left mb-4 text-primary">Usuarios</h1>

      <Messages ref={messages} />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          label="Añadir Usuario"
          icon="pi pi-plus"
          className="mb-3"
          onClick={() => setShowDialog(true)}
        />
      </div>


      <DataTable
        value={data}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 20]}
        responsiveLayout="scroll"
      >
        <Column
          header="Nombre"
          field="nombre"
          body={(rowData) => (
            <div className="p-d-flex p-ai-center">
              {avatarBodyTemplate(rowData)}
              {rowData.nombre}
            </div>
          )}
        />
        <Column header="Correo" field="email" />
        <Column header="Teléfono" field="telefono" />
        <Column header="Rol" field="role.nombre" />
        <Column
          header="Suscripción Actual"
          body={suscripcionBodyTemplate}
        />
        <Column body={actionsBodyTemplate} style={{ textAlign: 'center' }} />
      </DataTable>

      <CrearUsuarioEmp
        abrir={showDialog}
        onHide={() => setShowDialog(false)}
        getUser={getDatos}
        messages={messages}
      />

      <EditUsuarioEmp
        abrir={showEditDialog}
        onHide={() => setShowEditDialog(false)}
        getUser={getDatos}
        messages={messages}
        dataUser={selectedUser}
        roles={roles}
      />



      <ConfirmPopup />
    </Card>
  );
};


export default TablaUsuarios;