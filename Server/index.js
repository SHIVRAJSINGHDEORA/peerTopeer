import express from "express";
import { Server } from "socket.io";
import {createServer} from 'http';
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const httpServer = createServer(app);

const frontend_url = process.env.FRONTEND_URL;

const io = new Server(httpServer,{cors : {
  credentials : true,
  origin : [`${frontend_url}`]
}});

ragisterSocketHandlers(io);

const port = process.env.PORT;

httpServer.listen(port, () => {
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
  origin : [`${frontend_url}`],
  methods : ['GET', 'POST'],
  credentials : true,
}));

import {router as AuthRouter} from "./Routes/AuthRouter.js";
import {router as MeetRouter} from "./Routes/MeetRouter.js";
import { ragisterSocketHandlers } from "./Sockets/index.js";


app.use("/",AuthRouter);
app.use("/video-call/",MeetRouter);