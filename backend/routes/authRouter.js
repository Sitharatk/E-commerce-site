import express from 'express'
import { loginUser,registerUser,adminLogin, refreshToken, logout } from '../Controllers/authController.js'
import tryCatch from '../utils/trycatch.js'

const userRouter=express.Router()
userRouter
.post('/register',registerUser)
.post('/login',loginUser)
.post('/admin',adminLogin)
.post('/refreshtoken',tryCatch(refreshToken))
.post('/logout',tryCatch(logout))

export default userRouter