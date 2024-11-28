import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FileUpload } from "primereact/fileupload";

const TablaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([
    {
      nombre: "Agles",
      correo: "agles@gmmail.com",
      telefono: "7305477760",
      rol: "Cliente",
      suscripcion: "Six-Pack",
      avatar: "src/assets/usuario.png",
    },
    {
      nombre: "David",
      correo: "david@gmmail.com",
      telefono: "7305477761",
      rol: "Cliente",
      suscripcion: "Express",
      avatar: "src/assets/usuario.png",
    },
  ]);
  const [showDialog, setShowDialog] = useState(false); // Controla la ventana emergente
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    rol: "",
    suscripcion: "",
    avatar: "",
  });

  const avatarBodyTemplate = (rowData) => (
    <Avatar
      image={rowData.avatar}
      shape="circle"
      style={{ marginRight: "0.5rem" }}
    />
  );

  const actionsBodyTemplate = () => (
    <>
      <Button icon="pi pi-pencil" className="p-button-rounded p-button-text" />
      <Button icon="pi pi-trash" className="p-button-rounded p-button-text" />
    </>
  );

  const agregarUsuario = () => {
    setUsuarios([...usuarios, nuevoUsuario]);
    setNuevoUsuario({
      nombre: "",
      correo: "",
      telefono: "",
      rol: "",
      suscripcion: "",
      avatar: "",
    });
    setShowDialog(false); // Cerrar la ventana emergente
  };

  const onUpload = (e) => {
    const file = e.files[0];
    const imageUrl = URL.createObjectURL(file); // Convertir archivo en URL
    setNuevoUsuario({ ...nuevoUsuario, avatar: imageUrl });
  };

  return (
    <div className="card">
      <h1 className="text-6xl font-semibold text-left mb-4 text-primary">Usuarios</h1>

      {/* Botón para añadir usuario */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Button
    label="Añadir Usuario"
    icon="pi pi-plus"
    className="mb-3"
    onClick={() => setShowDialog(true)}
  />
</div>


      {/* Tabla de usuarios */}
      <DataTable value={usuarios} responsiveLayout="scroll">
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
        <Column header="Correo" field="correo" />
        <Column header="Teléfono" field="telefono" />
        <Column header="Rol" field="rol" />
        <Column header="Suscripción Actual" field="suscripcion" />
        <Column body={actionsBodyTemplate} style={{ textAlign: "center" }} />
      </DataTable>

      {/* Ventana emergente */}
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
              onChange={(e) =>
                setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })
              }
            />
          </div>
          <div className="field">
            <label htmlFor="correo">Correo</label>
            <InputText
              id="correo"
              value={nuevoUsuario.correo}
              onChange={(e) =>
                setNuevoUsuario({ ...nuevoUsuario, correo: e.target.value })
              }
            />
          </div>
          <div className="field">
            <label htmlFor="telefono">Teléfono</label>
            <InputNumber
              id="telefono"
              value={nuevoUsuario.telefono}
              onChange={(e) =>
                setNuevoUsuario({ ...nuevoUsuario, telefono: e.value })
              }
              useGrouping={false}
            />
          </div>
          <div className="field">
            <label htmlFor="rol">Rol</label>
            <InputText
              id="rol"
              value={nuevoUsuario.rol}
              onChange={(e) =>
                setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })
              }
            />
          </div>
          <div className="field">
            <label htmlFor="suscripcion">Suscripción</label>
            <InputText
              id="suscripcion"
              value={nuevoUsuario.suscripcion}
              onChange={(e) =>
                setNuevoUsuario({ ...nuevoUsuario, suscripcion: e.target.value })
              }
            />
          </div>
          <div className="field">
            <label htmlFor="avatar">Foto</label>
            <FileUpload
              mode="basic"
              name="avatar"
              accept="image/*"
              auto
              customUpload
              uploadHandler={onUpload}
              chooseLabel="Seleccionar Foto"
            />
          </div>
        </div>
        <div className="p-d-flex p-jc-end mt-3">
          <Button
            label="Cancelar"
            className="p-button-text"
            onClick={() => setShowDialog(false)}
          />
          <Button label="Añadir" className="p-button" onClick={agregarUsuario} />
        </div>
      </Dialog>
    </div>
  );
};

export default TablaUsuarios;