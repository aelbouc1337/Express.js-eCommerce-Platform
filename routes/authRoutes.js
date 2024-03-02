const express = require('express');
const { register, login ,getUserInfos , updateProfil ,deleteProfil} = require('../controllers/userControllers');
const upload = require('../middlewares/multer');
const { isAuth } = require('../middlewares/isAuth');

const authRouter = express.Router();

authRouter.post('/register',upload.single('profilPic'),register)
authRouter.post('/login',login)
authRouter.get('/profil' , isAuth,getUserInfos)
authRouter.patch('/profil',isAuth,updateProfil)
authRouter.delete('/profil',isAuth,deleteProfil)


module.exports = authRouter;
