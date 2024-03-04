const express = require('express');
const {getAllProducts, getProductById, addProduct, updateProduct, deleteProduct, handleQueries, getStats } = require('../controllers/productsContollers');
const { isAuth } = require('../middlewares/isAuth');
const upload = require('../middlewares/multer');

const productsRouter = express.Router();


productsRouter.get('/',handleQueries);
productsRouter.get('/stats',getStats)
productsRouter.get('/:id',getProductById)
productsRouter.post('/',isAuth,upload.array('images'),addProduct)
productsRouter.patch('/:id',isAuth,upload.array('images'),updateProduct)
productsRouter.delete('/:id',isAuth,deleteProduct)


module.exports = productsRouter;