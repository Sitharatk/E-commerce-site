import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './Config/mongodb.js'
import connectCloudinary from './Config/cloudinary.js'
import userRouter from './routes/userRouter.js'
dotenv.config()

const app=express()
const port =process.env.PORT || 3000
connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())
app.use('/auth',userRouter)

app.get('/',(req,res)=>{
    res.send("api working")
})
app.listen(port,()=>console.log("server started on PORT :"+port))