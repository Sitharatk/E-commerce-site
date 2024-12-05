import express from 'express'
import { verifyToken } from '../middlewares/verifyTokens.js'
import tryCatch from '../utils/trycatch.js'
import { blockUser, getAllusers, getUserById } from '../Controllers/admin/userController.js'
import { allproducts, productByCatogary, productById } from '../Controllers/publicController.js'
import upload from '../middlewares/multer.js'
import { createProduct, deleteProduct, updateProduct } from '../Controllers/admin/productController.js'

const admin=express.Router()

admin
.get('/users',tryCatch(getAllusers))
.get('/user/:id',tryCatch(getUserById))
.patch('/users/:id',tryCatch(blockUser))

.get('/products',tryCatch(allproducts))
.get('/product/:id',tryCatch(productById))
.get('/products/:category',tryCatch(productByCatogary))

.post('/products',verifyToken,upload.single("image"),tryCatch(createProduct))
.put('/products/:id',verifyToken,upload.single("image"),tryCatch(updateProduct))
.delete('/products/:id',verifyToken,tryCatch(deleteProduct))

export default admin