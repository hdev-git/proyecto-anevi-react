import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styleLayout.css";

import Logo from "../../images/Home/Frame 2.png";
import LogoHome from "../../images/Home/bx_bx-home-alt.svg";
import LogoUser from "../../images/Home/mdi_account-circle-outline.png";
import LogoSellerAdd from "../../images/Home/seller_add.svg";
import LogoClients from "../../images/Home/mdi_account-group-outline.png";
import LogoQuotes from "../../images/Home/mdi_file-document-multiple-outline.png";

export default function Dashboard({ setmodalNav, userRole, clearUser }) {
  function disableHam() {
    setmodalNav(false);
  }

  function clearDataUser() {
    clearUser();
  };

  return (
    <div className="mr-[150px]">
      <aside
        id="layout-menu"
        className="fixed top-0 z-50 h-full menu-vertical menu w-[150px]"
        style={{
          backgroundColor: "#F4F4F4",
        }}>
        <div
          className="demo py-3 pl-2">
          <div
            className="app-brand-link cursor-pointer"
            onClick={() => disableHam()}>
            <img src={Logo} className="w-14 mx-auto" alt="Logo" />
          </div>
        </div>

        <ul className="pt-2 max-w-[100px] px-3">
          {/* --------------------------- <!-- Dashboard --> --------------------------- */}
          <li
            className="pt-3 pb-3 mx-2"
            style={{
              textDecoration: "none",
              listStyle: "none",
            }}>
            <Link className="flex flex-row items-center justify-between" to="/">
              <img src={LogoHome} className="w-6 mr-2" alt="" />
              <p className="text-xs">Inicio</p>
            </Link>
          </li>

          <li
            className="pt-3 pb-3 mx-2"
            style={{
              textDecoration: "none",
              listStyle: "none",
            }}>
            <Link className="flex flex-row items-center justify-between" to="/profile">
              <img src={LogoUser} className="w-6 mr-2" alt="" />
              <p className="text-xs">Perfil</p>
            </Link>
          </li>

          {userRole === 3 && (
            <li
              className="pt-3 pb-3 mx-2"
              style={{
                textDecoration: "none",
                listStyle: "none",
              }}>
              <Link className="flex flex-row items-center justify-between" to="/products">
                <img src={LogoQuotes} className="w-6 mr-2" alt="" />
                <p className="text-xs">Crear Conceptos</p>
              </Link>
            </li>
          )}

          {userRole === 3 && (
            <li
              className="pt-3 pb-3 mx-2"
              style={{
                textDecoration: "none",
                listStyle: "none",
              }}>
              <Link className="flex flex-row items-center justify-between" to="/pdfSettings">
                <img src={LogoQuotes} className="w-6 mr-2" alt="" />
                <p className="text-xs">Configuración de PDF</p>
              </Link>
            </li>
          )}

          {userRole === 3 && (
            <li
              className="pt-3 pb-3 mx-2"
              style={{
                textDecoration: "none",
                listStyle: "none",
              }}>
              <Link className="flex flex-row items-center justify-between" to="/createSeller">
                <img src={LogoSellerAdd} className="w-6 mr-2" alt="" />
                <p className="text-xs">Panel Auditor</p>
              </Link>
            </li>
          )}

          {userRole === 3 && (
            <li
              className="pt-3 pb-3 mx-2"
              style={{
                textDecoration: "none",
                listStyle: "none",
              }}>
              <Link className="flex flex-row items-center justify-between" to="/TermsAndConditions">
                <img src={LogoQuotes} className="w-6 mr-2" alt="" />
                <p className="text-xs">Términos y condiciones</p>
              </Link>
            </li>
          )}


          <li
            className="pt-3 pb-3 mx-2"
            style={{
              textDecoration: "none",
              listStyle: "none",
            }}>
            <Link className="flex flex-row items-center justify-between" to="/clients">
              <img src={LogoClients} className="w-6 mr-2" alt="" />
              <p className="text-xs">Clientes</p>
            </Link>
          </li>

          <li
            className="pt-3 pb-3 mx-2"
            style={{
              textDecoration: "none",
              listStyle: "none",
            }}>
            <Link className="flex flex-row items-center justify-between" to="/quotes">
              <img src={LogoQuotes} className="w-6 mr-2" alt="" />
              <p className="text-xs">Cotización</p>
            </Link>
          </li>

          <li
            className="w-[100px] pt-3 pb-3"
            style={{
              textDecoration: "none",
              listStyle: "none",
            }}>
            <a href='/'
                style={{
                  color: '#FF5242'
                }}
                onClick={clearDataUser} className="w-[100px] flex flex-row items-center justify-center text-center">
              <p className="text-xs text-danger">Cerrar sesión</p>
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
}
