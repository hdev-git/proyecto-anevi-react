const { Router } = require("express");
const router = Router();

const {
  listQuotes,
  listQuotesId,
  addQuotes,
  getQuotesHistory,
  getDataQuotesFromIdProjects,
  getQuotesByClientId,
  updateQuotes,
  updateStatus,
  deleteQuotes,
  listFees,
} = require("../controllers/quotes.controller");
const {
  verifyToken,
  isModerator,
  isAdmin,
  isVendor,
} = require("../middlewares/authJwt");

router.post("/", [verifyToken], listQuotesId);
router.post("/fees", [verifyToken], listFees);
router.post("/add", [verifyToken], addQuotes);
router.post("/getDataQuotesFromIdProjects", [verifyToken], getDataQuotesFromIdProjects);
router.post("/getQuotesHistory", [verifyToken], getQuotesHistory)
router.post("/getQuoteByClientId", [verifyToken], getQuotesByClientId)
router.post("/update", [verifyToken], updateQuotes);
router.post("/updateState", [verifyToken], updateStatus);
router.post("/delete", [verifyToken], deleteQuotes);
// router.post("/:id", [verifyToken],listQuotesId);

module.exports = router;
