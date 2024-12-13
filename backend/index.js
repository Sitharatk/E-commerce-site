import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './Config/mongodb.js'
// import connectCloudinary from './Config/cloudinary.js'

import userRouter from './routes/authRouter.js'
import router from './routes/userRouter.js'
import errorHandler from './middlewares/errorHandler.js'
import admin from './routes/adminRoute.js'
import { connectCloudinary } from './Config/cloudinary.js'
dotenv.config()

const app=express()
const port =process.env.PORT || 3000
connectDB()
// connectCloudinary()
connectCloudinary()

app.use(express.json())
app.use(cors())
app.use('/auth',userRouter)
app.use('/user',router)
app.use('/admin',admin)

app.get('/',(req,res)=>{
    res.send("api working")
})

app.use(errorHandler)

app.listen(port,()=>console.log("server started on PORT :"+port))

