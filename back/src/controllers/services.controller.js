const { pool, numeroHash } = require("../database");

/* -------------------------------------------------------------------------- */
/*                           CREAR PRODUCTOS(ADMIN)                           */
/* -------------------------------------------------------------------------- */
async function createProducts(req, res) {
  try {
    const { ref, title, concept, price, amount, duration, facturation } =
      req.body;
    const validation = await pool.query(
      `SELECT * FROM "Products" WHERE "ref" = $1`,
      [ref]
    );
    if (validation.rows > 0)
      return res.status(400).json({
        message: "Producto ya se encuentra registrado en la base de datos",
      });
    const response = await pool.query(
      `INSERT INTO "Products" ("ref","title", "concept", "price", "amount", "duration", "facturation" )
          VALUES($1, $2, $3, $4, $5, $6, $7)`,
      [ref, title, concept, price, amount, duration, facturation]
    );
    console.log(response, "data");
    res.status(200).json({
      message: "Product Added successfully",
    });
  } catch (error) {
    console.log(error);
  }
}

/* -------------------------------------------------------------------------- */
/*                         ACTUALIZAR PRODUCTO (ADMIN)                        */
/* -------------------------------------------------------------------------- */
async function putProducts(req, res) {
  try {
    const id = parseInt(req.body.id);
    const { ref, concept, price, amount, duration, facturation, title } =
      req.body;
    const validation = await pool.query(
      `SELECT * FROM "Products" WHERE "ref" = $1`,
      [ref]
    );
    if (!validation)
      return res.status(400).json({
        message: "Producto no se encuentra registrado en la base de datos",
      });
    const response = await pool.query(
      `UPDATE "Products" 
        SET "ref" = $1, "concept" = $2, "price" = $3 , "amount" = $4, "duration" = $5, "facturation" = $6, "title" = $7
        WHERE "id" = $8`,
      [ref, concept, price, amount, duration, facturation, title, id]
    );
    if (!response)
      return res.status(400).json({
        message: "Producto no se puede actualizar",
      });
    res
      .status(200)
      .json({ message: "El producto ha sido actualziado satifastoriamente" });
  } catch (error) {
    console.log(error);
  }
}

/* -------------------------------------------------------------------------- */
/*                          ELIMINAR PRODUCTO (ADMIN)                         */
/* -------------------------------------------------------------------------- */
async function delProducts(req, res) {
  const id = parseInt(req.body.id);
  console.log(id);
  const response = await pool.query(`DELETE FROM "Products" WHERE id = $1`, [
    id,
  ]);
  if (!response)
    return res.status(400).json({
      message: "Producto no se puede elminar",
    });
  res.status(200).json(`EL producto se ha Eliminado satifastoriamente`);
  try {
  } catch (error) {
    console.log(error);
  }
}

/* -------------------------------------------------------------------------- */
/*                         VER PRODUTOS(ADMIN, VENDOR)                        */
/* -------------------------------------------------------------------------- */

/* --------------------------- PRODUCTOS GENERALES -------------------------- */
async function listProducts(req, res) {
  try {
    const response = await pool.query(`SELECT * FROM "Products"`);
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
  }
}

/* ---------------------------- PRODUCTOS POR ID ---------------------------- */
async function listProductsId(req, res) {
  try {
    const id = parseInt(req.body.id);
    const response = await pool.query(
      `SELECT * FROM "Products" WHERE id = $1`,
      [id]
    );
    if (!response)
      return res.status(400).json({
        message: "Producto no se puede listar",
      });
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
}

/* -------------------------------------------------------------------------- */
/*                            CREAR CATEGORIA(ADMIN)                          */
/* -------------------------------------------------------------------------- */
async function createCategory(req, res) {
  try {
    const {
      serviceName,
      subServiceName,
      serviceVariable,
      fixedPriceX,
      variablePriceY,
      quantity,
      fixedPrice,
      variablePrice,
      discount,
      fullPrice,
      paymentsDistribution,
    } = req.body;
    const validation = await pool.query(
      `SELECT * FROM "Category" WHERE "title" = $1`,
      [title]
    );
    if (validation)
      return res.status(400).json({
        message: "Producto ya se encuentra registrado en la base de datos",
      });
    const response = await pool.query(
      `INSERT INTO "Category" (
      "serviceName",
      "subServiceName",
      "serviceVariable",
      "fixedPriceX",
      "variablePriceY",
      "quantity",
      "fixedPrice",
      "variablePrice",
      "discount",
      "fullPrice",
      "paymentsDistribution",)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        serviceName,
        subServiceName,
        serviceVariable,
        fixedPriceX,
        variablePriceY,
        quantity,
        fixedPrice,
        variablePrice,
        discount,
        fullPrice,
        paymentsDistribution,
      ]
    );
    res.status(200).json({
      message: "User Added successfully",
    });
  } catch (error) {
    console.log(error);
  }
}

/* -------------------------------------------------------------------------- */
/*                         CREAR SUBCATEGORIA    (ADMIN)                      */
/* -------------------------------------------------------------------------- */
async function createSubCategory(req, res) {
  try {
    const { nameSubService, fixedPrice, variablePrice, quantity, fullPrice } =
      req.body;
    const validation = await pool.query(
      `SELECT * FROM "Category" WHERE "title" = $1`,
      [title]
    );
    if (validation)
      return res.status(400).json({
        message: "Producto ya se encuentra registrado en la base de datos",
      });
    const response = await pool.query(
      `INSERT INTO "Category" (
        "nameSubService", "fixedPrice", "variablePrice", "quantity", "fullPrice" 
      )
          VALUES($1, $2, $3, $4, $5)`,
      [nameSubService, fixedPrice, variablePrice, quantity, fullPrice]
    );
    res.status(200).json({
      message: "User Added successfully",
    });
  } catch (error) {
    console.log(error);
  }
}

/* -------------------------------------------------------------------------- */
/*                   AGREGAR CATEGRORIA AL PRODUCTO (ADMIN)                   */
/* -------------------------------------------------------------------------- */
async function addCategoryProducts(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { category } = req.body;
    const response = await pool.query(
      `UPDATE "Products" 
        SET "category" = $1
        WHERE "id" = $2`,
      [category, id]
    );
    if (!response)
      return res.status(400).json({
        message: "Producto no se puede actualizar",
      });
    res
      .status(200)
      .json({ message: "El producto ha sido actualziado satifastoriamente" });
  } catch (error) {
    console.log(error);
  }
}

/* -------------------------------------------------------------------------- */
/*                  CREAR CONCEPTOS DE LOS PRODUCTOS (ADMIN)                  */
/* -------------------------------------------------------------------------- */
/* --------------- AGREGAR CONCEPTOS A LOS PRODUCTOS  (ADMIN) --------------- */
async function addConcept(req, res) {
  try {
    const { title, productId } = req.body;
    const response = await pool.query(
      `INSERT INTO "Concept" ("title", "productId")
          VALUES($1, $2)`,
      [title, productId]
    );
    res.status(200).json({
      message: "Product Added successfully",
    });
  } catch (error) {
    console.log(error);
  }
}

/* -------------- ACTUALIZAR CONCEPTOS DE OS PRODUCTOS  (ADMIN) ------------- */
async function putConcept(req, res) {
  try {
    const { title, id } = req.body;
    const response = await pool.query(
      `UPDATE "Concept" 
        SET "title" = $1
        WHERE "id" = $2`,
      [title, id]
    );
    if (!response)
      return res.status(400).json({
        message: "Concepto no se puede actualizar",
      });
    res
      .status(200)
      .json({ message: "El concepto ha sido actualziado satifastoriamente" });
  } catch (error) {
    console.log(error);
  }
}

/* --------------- ELIMINAR CONCEPTOS DE LOS PRODUCTOS (ADMIN) -------------- */
async function delConcept(req, res) {
  try {
    const id = parseInt(req.body.id);
    const response = await pool.query(`DELETE FROM "Concept" WHERE id = $1`, [
      id,
    ]);
    if (!response)
      return res.status(400).json({
        message: "Concepto no se puede elminar",
      });
    res.status(200).json(`EL concepto se ha Eliminado satifastoriamente`);
  } catch (error) {
    console.log(error);
  }
}

/* --------------------- VER TODOS LOS PRODUCTO (ADMIN) --------------------- */
async function listConcept(req, res) {
  try {
    const productId = parseInt(req.body.id);
    const response = await pool.query(
      `SELECT * FROM "Concept" WHERE "productId" = $1`,
      [productId]
    );
    if (!response)
      return res.status(400).json({
        message: "Productos no se puede listar",
      });
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
  }
}

/* ---------------------- VER PRODTUCTO POR ID (ADMIN) ---------------------- */
async function listConceptId(req, res) {
  try {
    const id = parseInt(req.body.id);
    const response = await pool.query(`SELECT * FROM "Concept" WHERE id = $1`, [
      id,
    ]);
    if (!response)
      return res.status(400).json({
        message: "Producto no se puede listar",
      });
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
}

async function listConcepts(req, res) {
  try {
    const response = await pool.query(`SELECT * FROM "Concept"`);
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
  }
}

/* ----------------------------- AGREGAR ALCANCE ---------------------------- */
async function addScope(req, res) {
  try {
    const { title, productId } = req.body;
    await pool.query(
      `INSERT INTO "Scope" ("title", "productId")
          VALUES($1, $2)`,
      [title, productId]
    );
    res.status(200).json({
      message: "Alcance agregado correctamente",
    });
  } catch (error) {
    console.log(error);
  }
}

/* -------------- ACTUALIZAR CONCEPTOS DE OS PRODUCTOS  (ADMIN) ------------- */
async function putScope(req, res) {
  try {
    const { title, id } = req.body;
    await pool.query(
      `UPDATE "Scope" 
        SET "title" = $1
        WHERE "id" = $2`,
      [title, id]
    );
    res
      .status(200)
      .json({ message: "El concepto ha sido actualziado satifastoriamente" });
  } catch (error) {
    console.log(error);
  }
}

/* --------------- ELIMINAR CONCEPTOS DE LOS PRODUCTOS (ADMIN) -------------- */
async function delScope(req, res) {
  try {
    const id = parseInt(req.body.id);
    await pool.query(`DELETE FROM "Scope" WHERE id = $1`, [id]);
    res.status(200).json(`EL concepto se ha Eliminado satifastoriamente`);
  } catch (error) {
    console.log(error);
  }
}

/* --------------------- VER TODOS LOS PRODUCTO (ADMIN) --------------------- */
async function listScope(req, res) {
  try {
    const productId = parseInt(req.body.id);
    const response = await pool.query(
      `SELECT * FROM "Scope" WHERE "productId" = $1`,
      [productId]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
  }
}

async function listScopes(req, res) {
  try {
    const response = await pool.query(`SELECT * FROM "Scope"`);
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
  }
}

/* ---------------------- VER PRODTUCTO POR ID (ADMIN) ---------------------- */
async function listScopeId(req, res) {
  try {
    const id = parseInt(req.body.id);
    const response = await pool.query(`SELECT * FROM "Scope" WHERE id = $1`, [
      id,
    ]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createProducts,
  putProducts,
  listProducts,
  listProductsId,
  delProducts,
  createCategory,
  createSubCategory,
  addCategoryProducts,
  addConcept,
  putConcept,
  delConcept,
  listConcept,
  listConceptId,
  addScope,
  putScope,
  delScope,
  listScope,
  listScopeId,
  listConcepts,
  listScopes,
};
