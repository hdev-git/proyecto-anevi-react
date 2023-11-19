const { Router } = require("express");
const router = Router();

const {
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
  listConcept,
  listConceptId,
  delConcept,
  addScope,
  putScope,
  delScope,
  listScope,
  listScopeId,
  listConcepts,
  listScopes,
} = require("../controllers/services.controller");
/* --------------------------- Rutas de productos --------------------------- */
router.post("/", createProducts);
router.put("/putProduct", putProducts);
router.post("/delProduct", delProducts);
router.get("/", listProducts);
router.get("/:id", listProductsId);
/* --------------------------- Rutas de categoria --------------------------- */
router.post("/category", createCategory);
router.post("/subcategory", createSubCategory);
router.post("/addcategory", addCategoryProducts);
/* ----------------------------- RUTAS CONCEPTOS ---------------------------- */
router.post("/addConcept", addConcept);
router.post("/putConcept", putConcept);
router.post("/listConcept", listConcept);
router.post("/listConceptId", listConceptId);
router.post("/listConcepts", listConcepts);
router.post("/delConcept", delConcept);
/* ----------------------------- RUTAS ALCANCE ---------------------------- */
router.post("/addScope", addScope);
router.post("/putScope", putScope);
router.post("/delScope", delScope);
router.post("/listScope", listScope);
router.post("/listScopeId", listScopeId);
router.post("/listScopes", listScopes);

module.exports = router;
