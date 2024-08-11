import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import classRoomRoutes from "./routes/classRoomRoutes.js";
import timeTableRoutes from "./routes/timeTableRoutes.js";
import UsersRoutes from "./routes/UsersRoute.js";
const app = express();
dotenv.config();

main().catch(err=>{
    console.log(err)
})

async  function main (){
    await mongoose.connect(process.env.MONGO_URL)

}
mongoose.connection.on("disconnected" , ()=>{
    console.log("mongoDB disconnected")
})
mongoose.connection.on("connected", ()=>{
    console.log("mongoDB connected")
})
app.use(express.json())
app.use(cors());

app.use('/backend/auth',authRoutes);
app.use('/backend/users',UsersRoutes);
app.use('/backend/classroom',classRoomRoutes);
app.use('/backend/timetable',timeTableRoutes);
app.listen(8800,()=>{
    console.log("connected to backend");
})