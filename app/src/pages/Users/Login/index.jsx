import React, { useState } from 'react';
//import { useNavigate, Link } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from '../../../images/Cliente/Logotipo_color_bnzero1.png';
import { login } from '../../../services/Auth.service';
import messageBox from '../../../utils/messagebox';


export default function Login({ setUser }) {
  //let navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  async function _login(e) {
    e.preventDefault();
    await login(userName, password).then(({ data }) => {
      if (data.error) {
        messageBox.Simple(data.message, 'error');
      } else {
        messageBox.Simple(data.message, 'success');
        delete data.message;
        setUser(data);
        setTimeout(() => window.location = '/', 1000);
      }
    })
  }


  return (
    <div className="LoginBackground py-6">
      <div className="container login-custom-changed mt-5">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            { /* ------------------------------ <!-- Logo --> ----------------------------- */}
            <div className="app-brand justify-content-center mb-5">
              <span className="app-brand-logo demo">
                <img src={Logo} style={{ height: "40px", marginBottom: "50px" }} alt="" srcSet="" />
              </span>
            </div>
            {/* ----------------------------- <!-- /Logo --> ----------------------------- */}

            {/* ---------------------------- <!-- Register --> --------------------------- */}
            <div className="card rounded-3xl">
              <div className="card-body lg:px-28 md:px-28 px-10">
                <h1 className="mb-2 font-weight-bold" style={{ fontFamily: "Poppins", fontSize: "3.25em", fontWeight: "800", color: "#00A297" }}>Ingreso</h1>
                <p className="mb-4" style={{ fontFamily: "Poppins", fontSize: "1em", color: "#B9B9B9", margin: '40px 0' }}>Ingresa tus datos correspondientes</p>
                <form className="mb-3" onSubmit={(e) => _login(e)}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label" style={{ textAlign: "center" }}>Usuario ó Correo electrónico</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email-username"
                      id='email'
                      placeholder="Usuario/email"
                      onChange={e => setUserName(e.target.value)}
                      style={{ width: "200px", margin: "auto", textAlign: "center" }}
                      autoFocus
                    />
                  </div>
                  <div className="mb-4 form-password-toggle">
                    <label className="form-label" htmlFor="password" style={{ textAlign: "center" }}>Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id='password'
                      onChange={e => setPassword(e.target.value)}
                      style={{ width: "200px", margin: "auto", textAlign: "center" }}
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      aria-describedby="password"
                    />
                  </div>
                  <Link
                    to='/forgot-password'
                    className="text-center"
                    style={{ fontFamily: "Poppins", fontSize: "16px", color: '#00A297' }}
                  >
                    Olvidé mi contraseña
                  </Link>
                  <div className="mb-3">
                    <button className="btn ColorButtonMainInv rounded-2xl d-grid mx-auto w-40 mt-4" type="submit">Ingresar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}