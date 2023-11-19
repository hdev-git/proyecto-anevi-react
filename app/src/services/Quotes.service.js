import http from "./../utils/http";
const url = "https://bnzeroapp.com";
// const url = "http://localhost:4000";

export function getQuotes(id) {
  return http.post(`${url}/api/quotes`, JSON.stringify({ id }));
}

export function getQuotesFromProjectsId(projects) {
  return http.post(
    `${url}/api/quotes/getDataQuotesFromIdProjects`,
    JSON.stringify({ projects })
  );
}

export function getFees(id) {
  return http.post(`${url}/api/quotes/fees`, JSON.stringify({ id }));
}

export function getQuotesHistory(idClient, idProject) {
  return http.post(
    `${url}/api/quotes/getQuotesHistory`,
    JSON.stringify({ idClient, idProject })
  );
}

export function getQuoteByClientId(idClient, userID, userRole) {
  return http.post(
    `${url}/api/quotes/getQuoteByClientId`,
    JSON.stringify({ idClient, userID, userRole })
  );
}

export function addQuotes(obj) {
  return http.post(`${url}/api/quotes/add`, JSON.stringify(obj));
}

export function updateQuotes(data) {
  return http.post(`${url}/api/quotes/update`, JSON.stringify({ ...data }));
}

export function updateQuoteStatus(id, status) {
  return http.post(
    `${url}/api/quotes/updateState`,
    JSON.stringify({ id, status })
  );
}

export function deleteQuotes(id) {
  return http.post(`${url}/api/quotes/delete`, JSON.stringify({ id }));
}
