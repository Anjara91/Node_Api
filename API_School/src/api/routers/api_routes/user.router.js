const express = require("express");
const router = express.Router();
const {addUser, getUsers, updateUsers, deleteUsers, register, login, getProfile, registerUpload} = require('../../controllers/user.controller');
const {checkToken} = require("../../middleware/auth");
const upload = require("../../middleware/upload.file");

router.post("/add", addUser);
router.get("/listusers", getUsers);
router.put("/update/:id", updateUsers);
router.delete("/delete/:id", deleteUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/profile", checkToken, getProfile);
router.post("/uploadFile", upload.single("image"), registerUpload);

//router.post("/guadarProyecto", middleGuarfoto , guardarProyecto);

//cloudinary

module.exports = router;


