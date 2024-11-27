import express from 'express'
import { allproducts,productById,productByCatogary } from '../Controllers/productController.js'
import tryCatch from '../utils/trycatch.js'

const router=express.Router()

router
.get('/products',tryCatch(allproducts))
.get('/product/:id',tryCatch(productById))
.get('/products/:category',tryCatch(productByCatogary))

export default router
