const { Pool } = require("pg");
const { URI, DB, ADMIN_USER, ADMIN_PASSWORD } = require("./keys");

try {
  const pool = new Pool({
    host: URI,
    user: ADMIN_USER,
    password: ADMIN_PASSWORD,
    database: DB,
    port: "5432",
  });
  const numeroHash = 13;
  module.exports = {
    pool,
    numeroHash,
  };
  console.log("Base de datos Conectada");
} catch (error) {
  console.log(error.message);
}
