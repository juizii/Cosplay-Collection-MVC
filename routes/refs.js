const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const refsController = require("../controllers/refs");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//ref Routes - simplified for now
router.post("/createRef", upload.single("file"), refsController.createRef);

// router.delete("/deleteRef/:id", refsController.deleteRef);

module.exports = router;