const { Router } = require("express");
const router = Router();

const {
  getAllClients,
  listClientQuotes,
} = require("../controllers/client.controller");

router.post("/", getAllClients);
router.post("/quotes", listClientQuotes);

module.exports = router;
