import { Router } from "express";
import { AuthController } from "../controller/authController.js";

const router = Router();
const authController = new AuthController();

//router.post("/registro", authController.registro);

router.post("/login", authController.login);

export const authRoutes = router;
