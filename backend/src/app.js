import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app=express();
app.use(cors({
    origin:process.env.CORS_ORIGIN ,
    credentials:true,

}))
 // Handles preflight requests for all routes

app.use(express.json({limit:"20 kb"}))
app.use(express.urlencoded({extended:true,limit:"16 kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//payment



//import routes
import userRoutes from './routes/user.routes.js'
import productRoutes from './routes/product.routes.js'

//routes declaration
app.use("/api/v1/users",userRoutes)
app.use('/api/products', productRoutes);

export {app};