const { Router } = require("express");
const router = Router();

const { Login } = require("../controllers/auth.controller");

router.post("/", Login);

module.exports = router;
