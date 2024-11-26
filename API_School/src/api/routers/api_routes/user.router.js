const express = require("express");
const router = express.Router();
const {addUser, getUsers, updateUsers, deleteUsers, register, login} = require('../../controllers/user.controller');

router.post("/add", addUser);
router.get("/listusers", getUsers);
router.put("/update/:id", updateUsers);
router.delete("/delete/:id", deleteUsers);
router.post("/register", register);
router.post("/login", login);

module.exports = router;

