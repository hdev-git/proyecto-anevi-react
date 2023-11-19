const { pool } = require("../database");
const path = require("path");
const fs = require("fs");

async function getTermsAndConditions(req, res) {
  try {
    let request = await pool.query(`SELECT * FROM "TermsAndConditions"`);
    request.rows.sort((a, b) => a.idOrder - b.idOrder);
    res.status(200).json(request.rows);
  } catch (err) {
    console.log(err);
  }
}

async function addTermsAndConditions(req, res) {
  try {
    let { idOrder, description } = req.body;
    if (!idOrder)
      return res.status(400).json({
        error:
          "Ha ocurrido un error no sé pudo obtener la información necesaria.",
      });
    if (!description)
      return res.status(400).json({
        error:
          "Ha ocurrido un error no sé pudo obtener la información necesaria.",
      });
    let request = await pool.query(
      `INSERT INTO "TermsAndConditions" ("idOrder", "description") VALUES ($1, $2)`,
      [idOrder, description]
    );
    if (request.rowCount)
      res.status(200).json({
        message: "Se ha creado correctamente un nuevo termino y condición.",
      });
    else res.status(400).json({ error: "Ha ocurrido un error." });
  } catch (error) {
    console.log(error);
  }
}

async function editTermsAndConditions(req, res) {
  try {
    let { id, idOrder, description } = req.body;
    if (!id)
      return res.status(400).json({
        error:
          "Ha ocurrido un error no sé pudo obtener la información necesaria.",
      });
    if (!idOrder)
      return res.status(400).json({
        error:
          "Ha ocurrido un error no sé pudo obtener la información necesaria.",
      });
    if (!description)
      return res.status(400).json({
        error:
          "Ha ocurrido un error no sé pudo obtener la información necesaria.",
      });
    let request = await pool.query(
      `UPDATE "TermsAndConditions" SET "idOrder" = $1, "description" = $2 WHERE "TermsAndConditions"."id" = $3`,
      [idOrder, description, id]
    );
    if (request.rowCount)
      res.status(200).json({
        message: "Se ha actualizado correctamente el termino y condición.",
      });
    else res.status(400).json({ error: "Ha ocurrido un error." });
  } catch (error) {
    console.log(error);
  }
}

async function deleteTermsAndConditions(req, res) {
  try {
    let { id } = req.body;
    if (!id)
      return res.status(400).json({
        error:
          "Ha ocurrido un error no sé pudo obtener la información necesaria.",
      });
    let request = await pool.query(
      `DELETE FROM "TermsAndConditions" WHERE "TermsAndConditions"."id" = $1`,
      [id]
    );
    if (request.rowCount)
      res.status(200).json({
        message: "Se ha eliminado correctamente el termino y condición.",
      });
    else res.status(400).json({ error: "Ha ocurrido un error." });
  } catch (error) {
    console.log(error);
  }
}

async function getCoverPhoto(req, res) {
  try {
    let responseCover = await pool.query(
      `SELECT * FROM "coverPhotoPdf" ORDER BY "active" DESC`
    );
    responseCover.rows.map((data, index) => {
      let pathImage = path.resolve(`${data.url}`);
      data.path = pathImage;
    });
    console.log(responseCover.rows);
    res.status(200).json(responseCover.rows);
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: "Ha ocurrido un error." });
  }
}

async function addCoverPhoto(req, res) {
  try {
    let filePicture = req.file;
    let { type } = req.body;
    if (!filePicture) {
      throw new Error();
    }
    let picture = `./files/${req.file.filename}`;

    let status;

    const coverPhotoStatus = await pool.query(
      `SELECT * FROM "coverPhotoPdf" WHERE active = $1`,
      [true]
    );

    if (coverPhotoStatus.rows[0]) {
      status = false;
      let idStatus = coverPhotoStatus.rows[0].id;
      await pool.query(`UPDATE "coverPhotoPdf" SET active = $1 WHERE id = $2`, [
        status,
        idStatus,
      ]);
    }
    // let pathImage = path.resolve(picture);

    await pool.query(
      `INSERT INTO "coverPhotoPdf"
      (url, type) 
      VALUES ($1, $2)`,
      [picture, type]
    );
    res.status(200).json({
      message: "Imagen agregada satifastoriamente",
      url: picture,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: "Ha ocurrido un error." });
  }
}

async function delCoverPhoto(req, res) {
  try {
    let { id } = req.body;
    if (!id)
      return res.status(200).json({
        error:
          "Ha ocurrido un error no sé pudo obtener la información necesaria.",
      });
    await pool.query(`DELETE FROM "coverPhotoPdf" WHERE id = $1`, [id]);
    let pathImage = path.resolve(`${data.url}`);
    fs.unlink(pathImage, (err) => {
      if (err) {
        res.status(200).json(res, "No existe esa imagen.");
      }
    });
    res.status(200).json({
      message: "Se ha eliminado correctamente la imagen.",
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: "Ha ocurrido un error." });
  }
}

async function setMainCoverPhoto(req, res) {
  try {
    let { id, type } = req.body;
    if (!id)
      return res.status(200).json({
        error:
          "Ha ocurrido un error no sé pudo obtener la información necesaria.",
      });
    let status;

    const coverPhotoStatus = await pool.query(
      `SELECT * FROM "coverPhotoPdf" WHERE active = $1`,
      [true]
    );

    if (coverPhotoStatus.rows[0]) {
      status = false;
      let idStatus = coverPhotoStatus.rows[0].id;
      await pool.query(`UPDATE "coverPhotoPdf" SET active = $1 WHERE id = $2 AND type = $3`, [
        status,
        idStatus,
        type
      ]);
    }

    const coverPhoto = await pool.query(
      `SELECT * FROM "coverPhotoPdf" WHERE id = $1`,
      [id]
    );

    if (coverPhoto.rows[0].active === false) {
      status = true;
    }

    await pool.query(`UPDATE "coverPhotoPdf" SET active = $1 WHERE id = $2 AND type = $3`, [
      status,
      id,
      type
    ]);

    res.status(200).json({
      message: "Se ha establesido correctamente la imagen como principal.",
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: "Ha ocurrido un error." });
  }
}

module.exports = {
  getTermsAndConditions,
  addTermsAndConditions,
  editTermsAndConditions,
  deleteTermsAndConditions,
  getCoverPhoto,
  addCoverPhoto,
  delCoverPhoto,
  setMainCoverPhoto,
};
