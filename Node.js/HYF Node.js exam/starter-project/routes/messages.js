import express, { json } from "express";
import { getAllMessages, sendMessage, updateMessage, deleteMessage} from "../controllers/messagesController.js";
const messagesRouter = express.Router();


// TODO: Add routes
messagesRouter.get("/", getAllMessages);

messagesRouter.post("/", sendMessage);

messagesRouter.patch("/:id", updateMessage);

messagesRouter.delete("/:id", deleteMessage)

export default messagesRouter;
