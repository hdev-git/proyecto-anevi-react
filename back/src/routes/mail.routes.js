const { Router } = require("express");
const router = Router();

const { listMail } = require("../controllers/mail.controller");

router.post("/", listMail);

module.exports = router;
