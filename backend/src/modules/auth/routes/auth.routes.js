const express = require("express")
const { validateRegister, validateLogin } = require("../validators/auth.validator")
const { register, login } = require("../controllers/auth.controller")
const router = express.Router()

router.post("/register", validateRegister, register)
router.post("/login", validateLogin, login)
module.exports = router 