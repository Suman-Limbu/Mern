import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getUser);


export default router;



