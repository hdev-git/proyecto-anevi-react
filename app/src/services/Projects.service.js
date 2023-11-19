import http from "./../utils/http";
const url = "https://bnzeroapp.com";
// const url = "http://localhost:4000";

export function getProjectId(id) {
  return http.post(`${url}/api/project`, JSON.stringify({ idProject: id }));
}

export function getProjectClientId(id) {
  return http.post(
    `${url}/api/project/client`,
    JSON.stringify({ idClient: id })
  );
}

export function addProjectId(obj) {
  return http.post(`${url}/api/project/add`, JSON.stringify(obj));
}

export function putProjectId(id, data) {
  return http.post(`${url}/api/project/put`, JSON.stringify({ id, ...data }));
}

export function deleteProjectId(id) {
  return http.post(`${url}/api/project/delete`, JSON.stringify({ id }));
}
