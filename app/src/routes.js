import React from "react";

/* ----------------------- IMPORTACIÓN DEL COMPONENTE ----------------------- */
/* ---------------------------------- USER ---------------------------------- */
import Home from "./pages/index";
import Login from "./pages/Users/Login";
import ProfileSettings from "./pages/Users/Profile/Settings";

/* ------------------------------ COtizaciones ------------------------------ */
import Quotes from "./pages/Quotes/Quotes";
import GeneratePdf from "./pages/Quotes/GeneratePdf";
import QuotesHistory from "./pages/Quotes/QuotesHistory/QuotesHistory";
/* -------------------------------- Clientes -------------------------------- */
import Clients from "./pages/ClientsView";
import ClientDetails from "./pages/ClientsView/ClientDetails";
import ClientQuotes from "./pages/ClientsView/ClientQuotes";
//import { UserProvider, UserContext } from "./context/UserContext";
import CreateSeller from "./pages/Admin/CreateSeller";
import Products from "./pages/Admin/Produtcs";
import Concepts from "./pages/Admin/Concepts";
import Scopes from "./pages/Admin/Scopes";
import TermsAndConditions from "./pages/Admin/TermsAndConditions";
import Pdf from './pages/Admin/Pdf'

const routes = [
  {
    path: "/",
    exact: true,
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <ProfileSettings />,
  },

  /* --------------------------- COTIZACIONES RUTAS --------------------------- */
  {
    path: "/quotesHistory",
    element: <QuotesHistory />
  },
  {
    path: "/quotes",
    element: <Quotes />,
  },
  {
    path: "/quotePdf",
    element: <GeneratePdf />,
  },

  /* ----------------------------- CLIENTES ROUTES ---------------------------- */
  {
    path: "/clients",
    element: <Clients />,
  },
  {
    path: "/clientQuotes",
    element: <ClientQuotes />,
  },
  {
    path: "/clientDetails",
    element: <ClientDetails />,
  },

  /* ----------------------------- ADMIN ROUTES ---------------------------- */

  {
    path: "/createSeller",
    element: <CreateSeller />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/concepts",
    element: <Concepts />,
  },
  {
    path: "/scopes",
    element: <Scopes />,
  },
  {
    path: 'TermsAndConditions',
    element: <TermsAndConditions />
  },
  {
    path: 'pdfSettings',
    element: <Pdf />
  }
];

export default routes;
