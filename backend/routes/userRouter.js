import express from 'express'
import { allproducts,productById,productByCatogary } from '../Controllers/publicController.js'
import {  getUserCart, removefromCart, updateCart } from '../Controllers/user/cartController.js'
import { getwishList,addTowishList, removefromwishList } from '../Controllers/user/wishListController.js'
import { verifyToken } from '../middlewares/verifyTokens.js'
import tryCatch from '../utils/tryCatch.js'
import { cancelOrder, getAllOrders, getoneOrder,  orderbycashondelvry, stripePayment, successStripe } from '../Controllers/user/orderController.js'

const router=express.Router()

router
.get('/products',tryCatch(allproducts))
.get('/product/:id',tryCatch(productById))
.get('/products/:category',tryCatch(productByCatogary))

.get('/cart',verifyToken,tryCatch(getUserCart))
.post('/cart',verifyToken,tryCatch(updateCart))
.delete('/cart',verifyToken,tryCatch(removefromCart))

.get('/wishlist',verifyToken,tryCatch(getwishList))
.post('/wishlist',verifyToken,tryCatch(addTowishList))
.delete('/wishlist',verifyToken,tryCatch(removefromwishList))

.get('/order',verifyToken,tryCatch(getAllOrders))
.get('/order/:orderId',verifyToken,tryCatch(getoneOrder))
.post('/order/cod',verifyToken,tryCatch(orderbycashondelvry))
.post('/order/stripe',verifyToken,tryCatch(stripePayment))
.put('/order/stripe/success/:sessionId',verifyToken,tryCatch(successStripe))
.patch('/order/cancel/:orderId',verifyToken,tryCatch(cancelOrder))


export default router
