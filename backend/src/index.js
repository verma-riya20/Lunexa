import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import {app} from './app.js';
import connectDB from "./db/db.js";



connectDB()
.then(()=>{ 
    app.listen(process.env.PORT || 8000,()=>{
        console.log(` Server is running on port ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log("error",err)}
    )