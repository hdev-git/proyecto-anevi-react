const { Router } = require("express");
const router = Router();

const {
  listProjectClientId,
  listProjectId,
  addProject,
  putProject,
  deleteProject
} = require("../controllers/project.controller");
const {
  verifyToken,
  isModerator,
  isAdmin,
  isVendor,
} = require("../middlewares/authJwt");

router.post("/", [verifyToken], listProjectId);
router.post("/client", [verifyToken], listProjectClientId);
router.post("/add", [verifyToken], addProject);
router.post("/put", [verifyToken], putProject);
router.post("/delete", [verifyToken], deleteProject)
// router.post("/:id", listQuotesId);

module.exports = router;
