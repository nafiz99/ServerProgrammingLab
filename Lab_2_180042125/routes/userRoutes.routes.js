const express = require("express");
const router = express.Router();
const userController= require('../controllers/userController.controller');
const loginChecker= require("../middleware/auth.middleware")

router.get('/login',userController.getLoginPage)

router.get('/register', userController.getRegisterPage)

router.post('/register', userController.postRegisterPage)

router.post('/login', userController.postLoginPage)

router.get('/dashboard', loginChecker, userController.getDashboardPage)

module.exports = router;
//done