import express from "express";
import { verifyMeet } from "../Middlewares/MeetMiddeware.js";
import { verifyUser } from "../Middlewares/AuthMiddleware.js";
import { getMeet } from "../Controllers/MeetController.js";
const router = express.Router({caseSensitive : true,strict : true});

router.get("/:id",verifyUser, verifyMeet,getMeet);

export {router};