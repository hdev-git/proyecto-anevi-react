const { response } = require("express");
const { pool } = require("../database");

const listQuotes = async (req, res) => {
  const response = await pool.query(`SELECT * FROM "Quotes"
  LEFT JOIN "Fees" ON "Quotes"."id" = "Fees"."quoteId" LIMIT 2`);
  res.status(200).json(response.rows);
};

/* ---------------------------- PRODUCTOS POR ID ---------------------------- */

async function getDataQuotesFromIdProjects(req, res) {
  try {
    let { projects } = req.body;
    if (!projects)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error no sé pudo obtener la información.",
      });
    let dataQuotes = {};
    for (let project of projects) {
      let response = await pool.query(
        `
      SELECT * FROM "Quotes"
      LEFT JOIN "Fees"
      ON "Quotes"."id" = "Fees"."quoteId"
      WHERE "Quotes"."projectId" = $1
      ORDER BY "Quotes"."createDate" ASC
      LIMIT 2`,
        [project.id]
      );
      let data = [];
      response.rows.map((pro) => {
        pro.data = JSON.parse(pro.data);
        data.push(pro);
      });
      dataQuotes[project.id] = [...data];
    }
    res.status(200).json({ ...dataQuotes });
  } catch (error) {
    console.log(error);
  }
}

async function listQuotesId(req, res) {
  try {
    let { id } = req.body;
    if (id === 0) {
      let Quotes = await pool.query(`
      SELECT * FROM "Quotes"
      LEFT JOIN "Fees"
      ON "Quotes"."id" = "Fees"."quoteId"
      `);
      let listQuotesWithDataParse = [];
      Quotes.rows.map((quote) => {
        quote.data = JSON.parse(quote.data);
        listQuotesWithDataParse.push(quote);
      });
      res.status(200).json({ Quotes: listQuotesWithDataParse });
    } else {
      let Quotes = await pool.query(
        `SELECT * FROM "Quotes"
        LEFT JOIN "Fees"
        ON "Quotes"."id" = "Fees"."quoteId"
        WHERE "Quotes"."hubspotOwnerId" = $1`,
        [id]
      );
      let listQuotesWithDataParse = [];
      Quotes.rows.map((quote) => {
        quote.data = JSON.parse(quote.data);
        listQuotesWithDataParse.push(quote);
      });
      res.status(200).json({ Quotes: listQuotesWithDataParse });
    }
  } catch (error) {
    console.log(error);
  }
}

async function getQuotesByClientId(req, res) {
  try {
    let { idClient, userID, userRole } = req.body;
    if (!idClient)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error no sé pudo obtener la información.",
      });
    if (!userID)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error no sé pudo obtener la información.",
      });
    if (!userRole)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error no sé pudo obtener la información.",
      });
    if (userRole === 3) {
      let quotes = await pool.query(
        `SELECT * FROM "Quotes"
        LEFT JOIN "Fees"
        ON "Quotes"."id" = "Fees"."quoteId"
        WHERE "Quotes"."idClient" = $1`,
        [idClient]
      );
      let listQuotesWithDataParse = [];
      quotes.rows.map((quote) => {
        quote.data = JSON.parse(quote.data);
        listQuotesWithDataParse.push(quote);
      });
      res.status(200).json({ Quotes: listQuotesWithDataParse });
    } else {
      let quotes = await pool.query(
        `SELECT * FROM "Quotes"
        LEFT JOIN "Fees"
        ON "Quotes"."id" = "Fees"."quoteId"
        WHERE "Quotes"."idClient" = $1 AND "Quotes"."hubspotOwnerId" = $2`,
        [idClient, userID]
      );
      let listQuotesWithDataParse = [];
      quotes.rows.map((quote) => {
        quote.data = JSON.parse(quote.data);
        listQuotesWithDataParse.push(quote);
      });
      res.status(200).json({ Quotes: listQuotesWithDataParse });
    }
  } catch (error) {
    console.log(error);
  }
}

async function getQuotesHistory(req, res) {
  try {
    let { idClient, idProject } = req.body;
    if (!idClient)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error no sé pudo obtener la información.",
      });
    if (!idProject)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error no sé pudo obtener la información.",
      });

    let quotes = await pool.query(
      `SELECT * FROM "Quotes"
      WHERE "Quotes"."idClient" = $1 AND "Quotes"."projectId" = $2
      ORDER BY "Quotes"."createDate" DESC`,
      [idClient, idProject]
    );
    res.status(200).json(quotes.rows);
  } catch (error) {
    console.log(error);
  }
}

async function addQuotes(req, res) {
  try {
    let {
      clientId,
      projectId,
      userOwnerID,
      dataClient,
      dataProject,
      Title,
      fees,
    } = req.body;

    if (!clientId)
      return res.status(200).json({
        error: true,
        message: "Hacen falta datos para registrar la cotización.",
      });
    if (!projectId)
      return res.status(200).json({
        error: true,
        message: "Hacen falta datos para registrar la cotización.",
      });
    if (!userOwnerID)
      return res.status(200).json({
        error: true,
        message: "Hacen falta datos para registrar la cotización.",
      });
    if (!dataProject)
      return res.status(200).json({
        error: true,
        message: "Hacen falta datos para registrar la cotización.",
      });
    if (!Title)
      return res.status(200).json({
        error: true,
        message: "Hacen falta datos para registrar la cotización.",
      });
    if (!fees)
      return res.status(200).json({
        error: true,
        message: "Hacen falta datos para registrar la cotización.",
      });

    let priceFull = 0;
    fees.map((fee) => (priceFull += Number(fee.imported)));

    let responseQuote = await pool.query(
      `INSERT INTO "Quotes" 
          ("title","hubspotOwnerId","status","createDate","idClient","projectId","price","reference","scope")
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      [
        Title,
        userOwnerID,
        "PE",
        new Date(),
        clientId,
        projectId,
        priceFull,
        dataProject.reference,
        dataProject.scope,
      ]
    );

    if (!responseQuote.rowCount)
      return res.status(200).json({
        error: true,
        message:
          "Ha ocurrido un error al momento de guardar la cotización en la base de datos.",
      });

    let idInsert = responseQuote.rows[0].id;

    let responseFees = await pool.query(
      `INSERT INTO "Fees"
          ("data", "clientId", "projectId", "quoteId")
          VALUES ($1, $2, $3, $4)`,
      [JSON.stringify(fees), clientId, projectId, idInsert]
    );

    if (!responseFees.rowCount)
      return res.status(200).json({
        error: true,
        message:
          "Ha ocurrido un error al momento de guardar los conceptos en la base de datos.",
      });

    res
      .status(200)
      .json({ message: "Se ha creado correctamente la cotización." });
  } catch (error) {
    console.log(error);
  }
}

async function updateQuotes(req, res) {
  try {
    let { quoteId, fees } = req.body;
    if (!quoteId)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error, no sé pudo actualizar la cotización.",
      });
    if (!fees)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error, no sé pudo actualizar la cotización.",
      });
    let quotesRes = await pool.query(
      `UPDATE "Fees" SET "data" = $1 WHERE "quoteId" = $2`,
      [JSON.stringify(fees), quoteId]
    );
    if (!quotesRes.rowCount)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error, no sé pudo actualizar la cotización.",
      });
    res.status(200).json({
      message: "Se ha actualizado correctamente la cotización del proyecto.",
    });
  } catch (error) {
    console.log(error);
  }
}

async function updateStatus(req, res) {
  try {
    let { id, status } = req.body;
    if (!id)
      return res.status(200).json({
        error: true,
        message:
          "Ha ocurrido un error, no sé pudo actualizar el estado de la cotización.",
      });
    if (!status)
      return res.status(200).json({
        error: true,
        message:
          "Ha ocurrido un error, no sé pudo actualizar el estado de la cotización.",
      });
    let quotesRes = await pool.query(
      `UPDATE "Quotes" SET "status" = $1 WHERE "id" = $2`,
      [status, id]
    );
    if (!quotesRes.rowCount)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error, no sé pudo eliminar la cotización.",
      });
    res.status(200).json({
      message: "Se ha actualizado correctamente el estado del proyecto.",
    });
  } catch (error) {
    console.log(error);
  }
}

async function deleteQuotes(req, res) {
  try {
    let { id } = req.body;
    if (!id)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error, no sé pudo eliminar la cotización.",
      });
    let quotesRes = await pool.query(`DELETE FROM "Quotes" WHERE "id" = $1`, [
      id,
    ]);
    if (!quotesRes.rowCount)
      return res.status(200).json({
        error: true,
        message: "Ha ocurrido un error, no sé pudo eliminar la cotización.",
      });
    await pool.query(`DELETE FROM "Fees" WHERE "quoteId" = $1`, [id]);
    res
      .status(200)
      .json({ message: "Se ha eliminado correctamente el proyecto." });
  } catch (error) {
    console.log(error);
  }
}

async function listFees(req, res) {
  try {
    let { id } = req.body;
    let Quotes = await pool.query(
      `
        SELECT * FROM "Fees"
        WHERE "quoteId" = $1`,
      [id]
    );
    let listQuotesWithDataParse = [];
    Quotes.rows.map((quote) => {
      quote.data = JSON.parse(quote.data);
      listQuotesWithDataParse.push(quote);
    });
    res.status(200).json({ Quotes: listQuotesWithDataParse });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listFees,
  listQuotes,
  getDataQuotesFromIdProjects,
  listQuotesId,
  getQuotesHistory,
  getQuotesByClientId,
  addQuotes,
  updateQuotes,
  updateStatus,
  deleteQuotes,
};
