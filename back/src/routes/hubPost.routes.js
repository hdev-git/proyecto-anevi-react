const { Router } = require("express");
const router = Router();

const {
  listClient,
  createClient,
  listQuotes,
  createQuote,
  listDeal,
  listProperties,
  sendEmail,
} = require("../controllers/hubPost.controller");
const {
  verifyToken,
  isModerator,
  isAdmin,
  isVendor,
} = require("../middlewares/authJwt");

router.get("/client", listClient);
router.get("/properties", listProperties);
router.get("/deal", [verifyToken], listDeal);
// router.post("/client", createClient);
router.get("/quotes", listQuotes);
router.post("/quotes", createQuote);
router.post("/sendEmail", sendEmail);

module.exports = router;
