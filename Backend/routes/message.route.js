import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessages, getUsersForSidebar, sendMessages } from '../controllers/message.controller.js'

const router = express.Router();


router.get("/user",protectRoute, getUsersForSidebar)
router.get("/:id",protectRoute,getMessages)//getting the message from the user


router.post("/send/:id",protectRoute,sendMessages)

export default router