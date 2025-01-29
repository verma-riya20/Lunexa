import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app=express();
app.use(cors({
    origin:process.env.CORS_ORIGIN ||'https://print-ease1.vercel.app',
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],

}))

app.use(express.json({limit:"20 kb"}))
app.use(express.urlencoded({extended:true,limit:"16 kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//payment



//import routes
import userRoutes from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users",userRoutes)
export {app};