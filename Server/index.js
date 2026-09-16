import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server listening on port ", port);
});

const mongoUrl = process.env.MONGO_URL;

main().then(()=>{
  console.log("Database is Connected");
}).catch((err)=>{
  console.log(err.message);
})

async function main(){
  await mongoose.connect(mongoUrl);
}

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin : ['http://localhost:5173'],
  methods : ['GET', 'POST'],
  credentials : true,
}));

import {router as AuthRouter} from "./Routes/AuthRouter.js";


app.use("/",AuthRouter);