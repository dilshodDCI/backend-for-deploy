import express from "express";
import { userSignup } from "../controllers/userController.js";

const router = express.Router();

//POSt request
router.post("/signup", userSignup);

export default router;
