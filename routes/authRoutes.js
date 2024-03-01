const express = require('express');
const { register, login } = require('../controllers/userControllers');

const authRouter = express.Router();

authRouter.post('/register',register)
authRouter.post('/login',login)


module.exports = authRouter;