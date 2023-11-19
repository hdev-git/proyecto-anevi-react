const { pool, numeroHash } = require("../database");

const listProject = async (req, res) => {
  const response = await pool.query(`SELECT * FROM "Projects"`);
  res.status(200).json(response.rows);
};

/* ---------------------------- PRODUCTOS POR ID ---------------------------- */
const listProjectId = async (req, res) => {
  try {
    const { idProject } = req.body;
    let id = parseInt(idProject);
    if (id === 0) {
      const response = await pool.query(`SELECT * FROM "Projects"`);
      res.status(200).json(response.rows);
    } else {
      const response = await pool.query(
        `SELECT * FROM "Projects" WHERE id = $1`,
        [id]
      );
      res.json(response.rows[0]);
    }
  } catch (error) {
    console.log(error);
  }
};

async function listProjectClientId(req, res) {
  try {
    let { idClient } = req.body;
    let id = parseInt(idClient);
    let response = await pool.query(
      `SELECT * FROM "Projects"
    WHERE "clientId" = $1`,
      [id]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
  }
}

async function addProject(req, res) {
  try {
    let {
      clientId,
      contactId,
      reference,
      review,
      title,
      m2,
      location,
      description,
      scope,
    } = req.body;

    if (!clientId)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error, no sé pudo registrar el proyecto.",
      });
    if (!contactId)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error, no sé pudo registrar el proyecto.",
      });
    if (!reference)
      return res
        .status(200)
        .json({ error: true, message: "Debe ingresar una referencia." });
    if (!review)
      return res
        .status(200)
        .json({ error: true, message: "Debe ingresar la revisión." });
    if (!title)
      return res
        .status(200)
        .json({
          error: true,
          message: "Debe ingresar el nombre del proyecto.",
        });
    if (!m2)
      return res
        .status(200)
        .json({ error: true, message: "Debe ingresar el M2." });
    if (!location)
      return res
        .status(200)
        .json({ error: true, message: "Debe ingresar una ubicación." });
    if (!description)
      return res
        .status(200)
        .json({ error: true, message: "Debe ingresar una descripción." });
    if (!scope)
      return res
        .status(200)
        .json({ error: true, message: "Debe ingresar el alcancé." });

    let projectRes = await pool.query(
      `INSERT INTO "Projects"
      ("clientId","contactId","reference","review","title","m2","location","description","scope")
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        clientId,
        contactId,
        reference,
        review,
        title,
        m2,
        location,
        description,
        scope,
      ]
    );

    if (!projectRes.rowCount)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error, no sé pudo agregar el proyecto.",
      });

    res.status(200).json({ message: "Se ha creado el proyecto correctamente" });
  } catch (error) {
    console.log(error);
  }
}

async function putProject(req, res) {
  try {
    let { id, ref, review, title, m2, location, description, scope } = req.body;
    if (!id)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error, no sé pudo actualizar el proyecto.",
      });
    if (!ref)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error, no sé pudo actualizar el proyecto.",
      });
    if (!review)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error, no sé pudo actualizar el proyecto.",
      });
    if (!title)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error, no sé pudo actualizar el proyecto.",
      });
    if (!m2)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error, no sé pudo actualizar el proyecto.",
      });
    if (!location)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error, no sé pudo actualizar el proyecto.",
      });
    if (!description)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error, no sé pudo actualizar el proyecto.",
      });
    if (!scope)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error, no sé pudo actualizar el proyecto.",
      });
    let response = await pool.query(
      `UPDATE "Projects"
      SET "reference" = $1, "review" = $2, "title" = $3, "m2" = $4, "location" = $5, "description" = $6, "scope" = $7
      WHERE "id" = $8`,
      [ref, review, title, m2, location, description, scope, id]
    );
    if (!response.rowCount)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error, no sé pudo actualizar el proyecto.",
      });
    res
      .status(200)
      .json({ message: "Se ha actualizado correctamente el proyecto." });
  } catch (error) {
    console.log(error);
  }
}

async function deleteProject(req, res) {
  try {
    let { id } = req.body;
    if (!id)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error, no sé pudo eliminar el proyecto.",
      });
    let projectRes = await pool.query(
      `DELETE FROM "Projects" WHERE "id" = $1`,
      [id]
    );
    if (!projectRes.rowCount)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error, no sé pudo eliminar el proyecto.",
      });
    await pool.query(`DELETE FROM "Quotes" WHERE "projectId" = $1`, [id]);
    await pool.query(`DELETE FROM "Fees" WHERE "projectId" = $1`, [id]);
    res
      .status(200)
      .json({ message: "Se ha eliminado correctamente el proyecto." });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listProjectClientId,
  listProjectId,
  addProject,
  putProject,
  deleteProject,
};
