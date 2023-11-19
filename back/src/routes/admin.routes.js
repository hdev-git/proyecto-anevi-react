const multer = require("multer");
const { Router } = require("express");
const router = Router();

const {
  getTermsAndConditions,
  addTermsAndConditions,
  editTermsAndConditions,
  deleteTermsAndConditions,
  getCoverPhoto,
  addCoverPhoto,
  delCoverPhoto,
  setMainCoverPhoto,
} = require("../controllers/admin.controller");

const { verifyToken } = require("../middlewares/authJwt");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, process.cwd() + "/files");
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}.${file.mimetype.split("/")[1]}`);
  },
});

let upload = multer({
  storage: storage,
  limits: { fileSize: 4 * 1024 * 1024 },
});

// TERMINOS Y CONDICIONES
router.post("/terms-and-conditions/get", [verifyToken], getTermsAndConditions);
router.post("/terms-and-conditions/add", [verifyToken], addTermsAndConditions);
router.post(
  "/terms-and-conditions/update",
  [verifyToken],
  editTermsAndConditions
);
router.post(
  "/terms-and-conditions/delete",
  [verifyToken],
  deleteTermsAndConditions
);

// COVER PHOTO
router.post("/getCoverPhoto", [verifyToken], getCoverPhoto);
router.post("/addCoverPhoto", upload.single("picture"), addCoverPhoto);
router.post("/delCoverPhoto", [verifyToken], delCoverPhoto);
router.post("/setMainCoverPhoto", [verifyToken], setMainCoverPhoto);

module.exports = router;
