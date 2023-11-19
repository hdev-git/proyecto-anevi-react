const { Router } = require("express");
const router = Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  accountBlocking,
} = require("../controllers/user.controller");

const { verifyToken } = require("../middlewares/authJwt")

router.get("/", [verifyToken], getUsers);
router.post("/", [verifyToken], createUser);
router.post("/get", [verifyToken], getUserById);
router.post("/update/:id", [verifyToken], updateUser);
router.post("/blocking/:id", [verifyToken], accountBlocking);

module.exports = router;
