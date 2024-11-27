import express from 'express'
import { allproducts,productById,productByCatogary } from '../Controllers/productController.js'
import { getUserCart, removefromCart, updateCart } from '../Controllers/cartController.js'
import { verifyToken } from '../middlewares/verifyTokens.js'
import tryCatch from '../utils/trycatch.js'

const router=express.Router()

router
.get('/products',tryCatch(allproducts))
.get('/product/:id',tryCatch(productById))
.get('/products/:category',tryCatch(productByCatogary))

.get('/cart',verifyToken,tryCatch(getUserCart))
.post('/cart',verifyToken,tryCatch(updateCart))
.delete('/cart',verifyToken,tryCatch(removefromCart))

export default router
