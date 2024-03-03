const express = require('express');
const {getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../controllers/productsContollers');
const { isAuth } = require('../middlewares/isAuth');

const productsRouter = express.Router();


productsRouter.get('/',getAllProducts)
productsRouter.get('/:id',getProductById)
productsRouter.post('/',isAuth,addProduct)
productsRouter.patch('/:id',isAuth,updateProduct)
productsRouter.delete('/:id',isAuth,deleteProduct)



module.exports = productsRouter;