import React, { useEffect, useState } from "react";
import { createUser, updateUser } from "../../services/Users.service";
import messageBox from "../../utils/messagebox";

function ModalCreateSeller({ setActiveModal, dataUserUpdate, setDataUserUpdate }) {

  let [firstName, setFirstName] = useState(dataUserUpdate ? dataUserUpdate.firstName : '');
  let [lastName, setLastName] = useState(dataUserUpdate ? dataUserUpdate.lastName : '');
  let [userName, setUserName] = useState(dataUserUpdate ? dataUserUpdate.userName : '');
  let [email, setEmail] = useState(dataUserUpdate ? dataUserUpdate.email : '');
  let [password, setPassword] = useState('');
  let [rePassword, setRePassword] = useState('');
  let [role, setRole] = useState(dataUserUpdate ? dataUserUpdate.role : 1);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  });

  async function CreateSeller(e) {
    e.preventDefault();
    await createUser({ firstName, lastName, userName, email, password, rePassword, role })
      .then(({ data }) => {
        if (data.error) {
          messageBox.Simple(data.message, "error");
        } else {
          messageBox.Simple(data.message, "success");
          setActiveModal(false);
          setTimeout(() => window.location.reload(), 2000);
        }
      })
      .catch((err) => messageBox.Simple(err, "error"));
  }

  async function UpdateAccount(e) {
    e.preventDefault();
    let haveChanges = false;
    if (dataUserUpdate.firstName !== firstName.toUpperCase())
      haveChanges = true;
    if (dataUserUpdate.lastName !== lastName.toUpperCase()) haveChanges = true;
    if (dataUserUpdate.userName !== userName) haveChanges = true;
    if (dataUserUpdate.email !== email) haveChanges = true;
    if (dataUserUpdate.role !== role) haveChanges = true;
    if (password || rePassword) haveChanges = true;
    if (haveChanges) {
      await updateUser(dataUserUpdate.id, {
        firstName: firstName.toUpperCase(),
        lastName: lastName.toUpperCase(),
        userName,
        email,
        password,
        rePassword,
        role
      })
        .then(({ data }) => {
          if (data.error) {
            messageBox.Simple(data.message, "error");
          } else {
            setActiveModal(false);
            messageBox.Simple(data.message, "success");
            setTimeout(() => window.location.reload(), 2000);
          }
        })
        .catch((err) => messageBox.Simple(err, "error"));
    } else {
      setActiveModal(false);
      setDataUserUpdate(undefined);
    }
  }

  return (
    <>
      <div tabIndex="-1" aria-hidden="true" className="content-modal">
        <form
          onSubmit={(e) =>
            dataUserUpdate ? UpdateAccount(e) : CreateSeller(e)
          }>
          <div
            className="col p-5"
            style={{
              backgroundColor: "#F4F4F4",
              borderRadius: "25px",
              position: "relative",
            }}>
            <div className="mx-auto mt-2">
              <h4
                style={{
                  color: "#004750",
                  fontSize: "32px",
                  fontWeight: "700",
                }}>
                {dataUserUpdate
                  ? `Actualizando cuenta`
                  : "Crear cuenta de nuevo vendedor"}
              </h4>
            </div>
            <div className="block p-4">
              <div className="lg:grid lg:grid-cols-2 grid-rows-1 lg:gap-3">
                <div>
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ margin: "auto", textAlign: "center" }}
                  />
                </div>
                <div>
                  <label className="form-label">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{ margin: "auto", textAlign: "center" }}
                  />
                </div>
              </div>
              <div className="mt-3">
                <div>
                  <label className="form-label">Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    style={{ margin: "auto", textAlign: "center" }}
                  />
                </div>
              </div>
              <div className="mt-3">
                <div>
                  <label className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ margin: "auto", textAlign: "center" }}
                  />
                </div>
              </div>
              <div className="mt-2 lg:grid lg:grid-cols-2 grid-rows-1 lg:gap-3">
                <div>
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ margin: "auto", textAlign: "center" }}
                  />
                </div>
                <div>
                  <label className="form-label">Confirmar contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    style={{ margin: "auto", textAlign: "center" }}
                  />
                </div>
              </div>
              <div className="mt-3">
                <label htmlFor="select-rol" className="form-label">Rol</label>
                <div className="select">
                  <select value={role} id="select-rol" onChange={e => setRole(e.target.value)}>
                    <option value='1'>Vendedor Junior</option>
                    <option value='2'>Vendedor Senior</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="lg:flex block ">
              <div className="lg:flex block">
                <div className="block mx-auto">
                  <div className="lg:flex block mb-2 lg:ml-60 px-4">
                    <button
                      type="button"
                      className="btn rounded-pill ColorButtonMain mt-3 w-75 w-100"
                      onClick={() => {
                        setActiveModal(false);
                        dataUserUpdate && setDataUserUpdate();
                      }}>
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn rounded-pill ColorButtonMainInv mt-3 w-75 lg:ml-4 w-100">
                      {dataUserUpdate ? "Guardar" : "Registrar"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              style={{
                position: "absolute",
                top: "2rem",
                right: "2rem",
              }}
              onClick={() => {
                setActiveModal(false);
                dataUserUpdate && setDataUserUpdate(undefined);
              }}
              title="Cerrar"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm dark:hover:bg-gray-600 dark:hover:text-white">
              <svg className="w-5 h-5 " fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ModalCreateSeller;
