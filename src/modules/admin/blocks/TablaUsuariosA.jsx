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

const TablaUsuarios = () => {
  const [data, setData] = useState([]); // Datos originales de la API
  const [showDialog, setShowDialog] = useState(false); // Controla la ventana emergente
  const [roles, setRoles] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
      apPaterno:"",
      apMaterno:"",
      email: "",
      edad:"",
      telefono: "",
      contrasena: "",
      foto: null,
      role: null,
  });
  const messages = useRef(null); // Usar useRef para la referencia de Messages

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
        reject: () => {}
      });
    };

    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-text"
          onClick={() => console.log('Editar', rowData)}
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

  const agregarUsuario = async () => {
    try {
      const usuarioConFotoBase64 = {
        ...nuevoUsuario,
        //foto: nuevoUsuario.foto ? await convertirImagenBase64(nuevoUsuario.foto) : null, // Convertir a base64
        role: { id: nuevoUsuario.rol.id }
      };
  
      console.log(usuarioConFotoBase64); // Verifica que la foto esté en Base64
  
      const response = await AxiosClient({
        url: "/usuario/",
        method: "POST",
        data: usuarioConFotoBase64, // Enviar los datos con la foto convertida
      });
  
      if (!response.error) {
        getDatos(); // Actualiza la tabla
        setNuevoUsuario({
          nombre: "",
          apPaterno: "",
          apMaterno: "",
          email: "",
          edad: "",
          telefono: "",
          contrasena: "",
          foto: null,
          role: null,
        });
        setShowDialog(false); // Cierra el diálogo
        messages.current.show({
          severity: 'success',
          summary: 'Usuario agregado',
          detail: `El usuario ${nuevoUsuario.nombre} fue añadido exitosamente.`,
        });
      }
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      messages.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo agregar el usuario.',
      });
    }
  };

  const convertirImagenBase64 = (archivo) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result); // El resultado será un string en base64
      };
      reader.onerror = reject; // En caso de error
      reader.readAsDataURL(archivo); // Convierte la imagen a base64
    });
  };
  
  const onUpload = async (e) => {
    const file = e.files[0];
  
    if (file) {
      try {
        // Esperar a que la imagen se convierta a base64
        const coso = await convertirImagenBase64(file);
        console.log(coso); // Verifica que `coso` ahora contiene el base64
  
        // Asignar el valor base64 a la propiedad 'foto'
        setNuevoUsuario({ ...nuevoUsuario, foto: coso });
      } catch (error) {
        console.error("Error al convertir la imagen:", error);
      }
    } else {
      console.error("No se ha seleccionado un archivo");
    }
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

      <ConfirmPopup />

      <Dialog
        header="Añadir Nuevo Usuario"
        visible={showDialog}
        style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
        onHide={() => setShowDialog(false)}
      >
        <div className="p-fluid">
          <div className="field">
            <label htmlFor="nombre">Nombre</label>
            <InputText
              id="nombre"
              value={nuevoUsuario.nombre}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="apPaterno">Apellido Paterno</label>
            <InputText
              id="apPaterno"
              value={nuevoUsuario.apPaterno}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, apPaterno: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="apMaterno">Apellido Materno</label>
            <InputText
              id="apMaterno"
              value={nuevoUsuario.apMaterno}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, apMaterno: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              value={nuevoUsuario.email}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="edad">Edad</label>
            <InputNumber
              id="edad"
              value={nuevoUsuario.edad}
              onValueChange={(e) => setNuevoUsuario({ ...nuevoUsuario, edad: e.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="telefono">Teléfono</label>
            <InputNumber
              id="telefono"
              value={nuevoUsuario.telefono}
              onValueChange={(e) => setNuevoUsuario({ ...nuevoUsuario, telefono: e.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="contraseña">Contraseña</label>
            <InputText
              id="contraseña"
              type="password"
              value={nuevoUsuario.contrasena}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, contrasena: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="rol">Rol</label>
            <Dropdown
              id="rol"
              value={nuevoUsuario.rol}
              options={roles}
              optionLabel="nombre"
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.value })}
              placeholder="Seleccione un rol"
            />
          </div>
          <div className="field">
            <label htmlFor="foto">Foto</label>
            <FileUpload
              mode="basic"
              name="file"
              accept="image/*"
              onSelect={onUpload}
            />
          </div>
          <Button label="Guardar" icon="pi pi-save" onClick={agregarUsuario} />
        </div>
      </Dialog>
    </Card>
  );
};

export default TablaUsuarios;
