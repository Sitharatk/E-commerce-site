import express from 'express'
import { verifyToken } from '../middlewares/verifyTokens.js'
import tryCatch from '../utils/trycatch.js'
import { getAllusers } from '../Controllers/admin/userController.js'

const admin=express.Router()

admin
.get('/users',tryCatch(getAllusers))

export default admin