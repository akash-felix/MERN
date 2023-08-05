import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import StoryRoutes from './routes/stories.js';
import UserRoutes from './routes/users.js';
import dotenv from 'dotenv';
const app = express();

app.use(bodyParser.json({limit:"32mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"32mb",extended:true}));
app.use(cors());
app.use("/stories",StoryRoutes);
app.use("/user",UserRoutes);
dotenv.config();
const MONGO_URI=process.env.MONGO_URI;

const PORT = process.env.PORT || 5001;

const connectDB = async ()=>{
    try{
        await mongoose.connect(MONGO_URI);
        app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
    }
    catch(err){
        console.error("Connection to MONGODB failed",err.message);
    }
}

connectDB();
mongoose.connection.on("open",()=>console.log("Connection to DB established"));
mongoose.connection.on("error",(err)=>console.error(err));