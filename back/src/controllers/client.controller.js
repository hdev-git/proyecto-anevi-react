const { pool, numeroHash } = require("../database");

/* -------------------------------------------------------------------------- */
/*                   VISUALIZA LOS CLIENTES POR ID (Vendor)                   */
/* -------------------------------------------------------------------------- */

async function getAllClients(req, res) {
  try {
    let { id } = req.body;
    if (id) {
      let response = await pool.query(
        'SELECT * FROM "Clients" WHERE "id" = $1',
        [id]
      );
      if (response.rowCount) res.status(200).json(response.rows[0]);
      else res.status(200).json({ error: "No encontramos ese usuario." });
    } else {
      let response = await pool.query('SELECT * FROM "Clients"');
      res.status(200).json(response.rows);
    }
  } catch (error) {
    console.log(error);
  }
}

const listClient = async (req, res) => {};

/* -------------------------------------------------------------------------- */
/*            VISUALIZA LAS COTIZACIONES DE CLIENTE POR ID (Vendor)           */
/* -------------------------------------------------------------------------- */
const listClientQuotes = async (req, res) => {
  try {
    const { id } = req.body;
    let idP = parseInt(id);
    if (idP === 0) {
      const response = await pool.query(`SELECT * FROM "Quotes" `);
      let data = response.rows;
      if (data) res.status(200).json(data);
      else res.status(400).json({ mensaje: "Error el id no es correcto" });
    } else {
      const response = await pool.query(
        `SELECT * FROM "Quotes" WHERE id = $1`,
        [id]
      );
      let data = response.rows[0];
      if (data) res.status(200).json(data);
      else res.status(400).json("Error el id no es correcto");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllClients,
  listClient,
  listClientQuotes,
};
