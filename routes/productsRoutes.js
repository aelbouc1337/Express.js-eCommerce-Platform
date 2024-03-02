const express = require('express');
const { test } = require('../controllers/productsContollers');

const productsRouter = express.Router();


productsRouter.get('/products',)
productsRouter.get('/:id',test)
productsRouter.post('/products',)
productsRouter.put('products/:id',)
productsRouter.delete('products/:id',)













module.exports = productsRouter;