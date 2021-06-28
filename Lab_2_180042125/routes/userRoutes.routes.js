const express = require("express");
const router = express.Router();
const userController= require('../controllers/userController.controller');

router.get('/login',userController.getLoginPage)

router.get('/register', userController.getRegisterPage)

router.post('/register', userController.postRegisterPage)

router.post('/login', userController.postLoginPage)

module.exports = router;