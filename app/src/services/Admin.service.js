import axios from "axios";
import { getToken } from "../utils/localuser";
import http from "./../utils/http";
const url = "https://bnzeroapp.com";
// const url = "http://localhost:4000";

/* -------------------------------- PRODUCTOS ------------------------------- */
export function getProducts() {
  return http.get(`${url}/api/services`);
}

export function getProductId(id) {
  return http.get(
    `${url}/api/services/${id}`,
    JSON.stringify({ idProject: id })
  );
}

export function addProducts(data) {
  return http.post(`${url}/api/services`, JSON.stringify({ ...data }));
}

export function putProducts(data) {
  return http.put(
    `${url}/api/services/putProduct`,
    JSON.stringify({ ...data })
  );
}

export function delProducts(id) {
  return http.post(`${url}/api/services/delProduct`, JSON.stringify({ id }));
}

/* -------------------------------- CONCEPTOS ------------------------------- */

export function getConcept(id) {
  return http.post(`${url}/api/services/listConcept`, JSON.stringify({ id }));
}

export function getConceptId(id) {
  return http.post(`${url}/api/services/listConceptId`, JSON.stringify({ id }));
}

export function getConcepts(id) {
  return http.post(`${url}/api/services/listConcepts`, JSON.stringify({ id }));
}

export function addConcept(data) {
  return http.post(
    `${url}/api/services/addConcept`,
    JSON.stringify({ ...data })
  );
}

export function putConcept(data) {
  return http.post(
    `${url}/api/services/putConcept`,
    JSON.stringify({ ...data })
  );
}

export function delConcept(id) {
  return http.post(`${url}/api/services/delConcept`, JSON.stringify({ id }));
}

export function getTermsAndConditions() {
  return http.post(`${url}/api/admin/terms-and-conditions/get`);
}

export function addTermsAndConditions(data) {
  return http.post(
    `${url}/api/admin/terms-and-conditions/add`,
    JSON.stringify({ ...data })
  );
}

export function updateTermsAndConditions(data) {
  return http.post(
    `${url}/api/admin/terms-and-conditions/update`,
    JSON.stringify({ ...data })
  );
}

export function deleteTermsAndConditions(id) {
  return http.post(
    `${url}/api/admin/terms-and-conditions/delete`,
    JSON.stringify({ id })
  );
}

/* ----------------------------- ALCANCES RUTAS ----------------------------- */
export function getScope(id) {
  return http.post(`${url}/api/services/listScope`, JSON.stringify({ id }));
}

export function getScopes(id) {
  return http.post(`${url}/api/services/listScopes`, JSON.stringify({ id }));
}

export function getScopeId(id) {
  return http.post(`${url}/api/services/listScopeId`, JSON.stringify({ id }));
}

export function addScope(data) {
  return http.post(`${url}/api/services/addScope`, JSON.stringify({ ...data }));
}

export function putScope(data) {
  return http.post(`${url}/api/services/putScope`, JSON.stringify({ ...data }));
}

export function delScope(id) {
  return http.post(`${url}/api/services/delScope`, JSON.stringify({ id }));
}

/* ----------------------------- PDF COVER PHOTO ---------------------------- */

export function addCover(data) {
  return axios.post(`${url}/api/admin/addCoverPhoto`, data, {
    headers: {
      Authorization: `${getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });
}

export function getCover(id) {
  return http.post(`${url}/api/admin/getCoverPhoto`, JSON.stringify({ id }));
}

export function delCover(id) {
  return http.post(`${url}/api/admin/delCoverPhoto`, JSON.stringify({ id }));
}

export function setCover(id, type) {
  return http.post(
    `${url}/api/admin/setMainCoverPhoto`,
    JSON.stringify({ id, type })
  );
}
