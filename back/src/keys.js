const { config } = require("dotenv");
config();

const URI = process.env.URI || "localhost";
const PORT = process.env.PORT || 4000;
const SECRET = "@=0mt8'V/?kOZ%memv?c/_?_j](,Xi";
const DB = process.env.DB || "bnzero";
const hapikey = "";
const TOKEN_ACCESS = "pat-na1-c2cd8fd5-a73d-42ad-8b6b-63d2740fd0e2";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@localhost";
const ADMIN_USER = process.env.ADMIN_USER || "postgres";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "a12345678";

module.exports = {
  URI,
  PORT,
  SECRET,
  DB,
  ADMIN_EMAIL,
  ADMIN_USER,
  ADMIN_PASSWORD,
  hapikey,
  TOKEN_ACCESS,
};
