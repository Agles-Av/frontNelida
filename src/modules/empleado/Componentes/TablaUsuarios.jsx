import React, { useState, useEffect, useRef } from 'react';
import AxiosClient from '../../../config/http-gateway/http-client';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete'; 
import { Card } from 'primereact/card';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { confirmPopup } from 'primereact/confirmpopup';
import { Messages } from 'primereact/messages';
import CrearUsuarioEmp from './CrearUsuarioEmp';
import EditUsuarioEmp from './EditUsuarioEmp';
import { Dropdown } from 'primereact/dropdown';

const TablaUsuarios = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); 
  const [emailSuggestions, setEmailSuggestions] = useState([]); 
  const [searchValue, setSearchValue] = useState(''); 
  const [roles, setRoles] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [userType, setUserType] = useState('');
  const messages = useRef(null);

  const userTypeOptions = [
    { label: 'Todos', value: '' },
    { label: 'Clientes', value: 'CLIENTE' },
    { label: 'Empleados', value: 'EMPLEADO' },
  ];

  const getRoles = async () => {
    try {
      const response = await AxiosClient({ url: "/role/", method: "GET" });
      if (!response.error) setRoles(response.data);
    } catch (error) {
      console.error('Error al obtener los roles:', error);
    }
  };

  const getDatos = async () => {
    try {
      const response = await AxiosClient({ url: "/usuario/", method: "GET" });
      if (!response.error) {
        const usuariosFiltrados = response.data.filter(
          (usuario) => usuario.role && usuario.role.nombre !== 'ADMIN'
        );
        setData(usuariosFiltrados);
        setFilteredData(usuariosFiltrados); 
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {
    getDatos();
    getRoles();
  }, []);

  // Lógica para filtrar por tipo y búsqueda
  useEffect(() => {
    const filteredByType = data.filter((usuario) =>
      userType ? usuario.role.nombre === userType : true
    );
    const filteredBySearch = filteredByType.filter((usuario) =>
      usuario.email.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filteredBySearch);
  }, [data, searchValue, userType]);

  const searchEmails = (event) => {
    const query = event.query.toLowerCase();
    const suggestions = data
      .map((usuario) => usuario.email)
      .filter((email) => email.toLowerCase().includes(query));
    setEmailSuggestions(suggestions);
  };

  const onSearchChange = (value) => {
    setSearchValue(value);
  };

  const avatarBodyTemplate = (rowData) => (
    <Avatar image={rowData.foto} shape="circle" style={{ marginRight: '0.5rem' }} />
  );

  const actionsBodyTemplate = (rowData) => {
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
          onClick={() => goEdit(rowData)}
        />
        <Button
          icon={rowData.status ? "pi pi-ban" : "pi pi-check"}
          className={`p-button-rounded ${rowData.status ? "p-button-danger" : "p-button-success"}`}
          onClick={handleStatusChange}
        />
      </>
    );
  };

  const goEdit = (rowData) => {
    setSelectedUser(rowData);
    setShowEditDialog(true);
  };

  return (
    <Card className='border-transparent shadow-none '>
      <h1 className="text-5xl font-semibold text-left mb-4 text-primary">Usuarios</h1>

      <Messages ref={messages} />

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <Dropdown
          value={userType}
          options={userTypeOptions}
          onChange={(e) => setUserType(e.value)}
          placeholder="Filtrar por tipo"
          style={{ width: '200px' }}
        />
        <AutoComplete
          value={searchValue}
          suggestions={emailSuggestions}
          completeMethod={searchEmails}
          onChange={(e) => onSearchChange(e.value)}
          placeholder="Buscardor por correo"
          field="email"
          style={{ width: '100%' }}
        />
      </div>

      <DataTable
        value={filteredData}
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

export default TablaUsuarios;
