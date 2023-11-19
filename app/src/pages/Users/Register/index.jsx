import React from 'react';
import Logo from '../../../images/Cliente/Logotipo_color_bnzero1.png'


export default function Register() {


  return (
    <>
      <div className="container login-custom-changed mt-5">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            { /* ------------------------------ <!-- Logo --> ----------------------------- */}
            <div className="app-brand justify-content-center mb-5">
              <span className="app-brand-logo demo">
                <img src={Logo} style={{ height: "40px", marginBottom: "50px" }} alt="" srcset="" />
              </span>
            </div>
            {/* ----------------------------- <!-- /Logo --> ----------------------------- */}

            {/* ---------------------------- <!-- Register --> --------------------------- */}
            <div className="card">
              <div className="card-body" style={{ paddingLeft: "100px", paddingRight: "100px" }}>
                <h1 className="mb-2 font-weight-bold" style={{ fontFamily: "Poppins", fontSize: "40px", marginTop: "10px", marginBottom: "20px", color: "#94D40B" }}>Registro</h1>
                {/* <p className="mb-4" style={{ fontFamily: "Poppins", fontSize: "16", color: "#B9B9B9", marginTop: "25px", marginBottom: "25px" }}>Ingresa a tus datos correspondientes</p> */}
                <form id="formAuthentication" className="mb-3 mt-3" method="POST">
                  <div className="mb-3">
                    <label for="firstName" className="form-label" style={{ textAlign: "center" }}>Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      placeholder="Julian Cortaza"
                      style={{ width: "400px", margin: "auto", textAlign: "center" }}
                      autofocus
                    />
                  </div>

                  <div className="mb-3">
                    <label for="email" className="form-label" style={{ textAlign: "center" }}>Numero celular</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email-username"
                      placeholder="(000)000 0000"
                      style={{ width: "400px", margin: "auto", textAlign: "center" }}
                      autofocus
                    />
                  </div>

                  <div className="mb-3">
                    <label for="email" className="form-label" style={{ textAlign: "center" }}>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email-username"
                      placeholder="JCortaza@ejemplo.com"
                      style={{ width: "400px", margin: "auto", textAlign: "center" }}
                      autofocus
                    />
                  </div>

                  <div className="mb-4 form-password-toggle">
                    <label className="form-label" for="password" style={{ textAlign: "center" }}>Contrasena</label>
                    {/* <div className="input-group input-group-merge"> */}
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      style={{ width: "400px", margin: "auto", textAlign: "center" }}
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      aria-describedby="password"
                    />
                    {/* <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                    </div> */}
                  </div>

                  {/* <div className="mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="remember-me" />
                      <label className="form-check-label" for="remember-me"> Remember Me </label>
                    </div>
                  </div> */}
                  <a
                    className="text-center ColorGradent"
                    style={{ fontFamily: "Poppins", fontSize: "16px" }}>
                    Ya tengo cuenta
                  </a>

                  <div className="mb-3">
                    <button className="btn btn-primary d-grid w-100 mt-4" type="submit">Registar</button>
                  </div>
                </form>
              </div>
            </div>
            {            /* --------------------------- <!-- /Register --> --------------------------- */}          </div>
        </div>
      </div>
    </>
  );
}