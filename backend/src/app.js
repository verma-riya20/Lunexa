// MUST BE AT THE VERY TOP (before any other imports)
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'


import { sessionConfig } from './config/session.config.js';
const app=express();
app.use(cors({
    origin:process.env.CORS_ORIGIN ,
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.options('*', cors()); // Handle preflight requests for all routes


 // Handles preflight requests for all routes
 // Handle preflight requests
app.options('*', cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));

app.use(express.json({limit:"20 kb"}))
app.use(express.urlencoded({extended:true,limit:"16 kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//payment
// 2. Then set up session middleware
app.use(sessionConfig);



//import routes
import userRoutes from './routes/user.routes.js'
import productRoutes from './routes/product.routes.js'
import aiRoutes from './routes/ai.routes.js'


//routes declaration
app.use("/api/v1/users",userRoutes)
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/ai', aiRoutes);

export {app};