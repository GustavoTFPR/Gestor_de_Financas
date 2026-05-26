// src/routes/userRoutes.ts
import { Router } from "express";
import { UserController } from "../controller/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const userControler = new UserController();

router.use(authMiddleware); 

router.get("/", userControler.list);
router.post("/", userControler.create);
router.patch("/:id", userControler.update);
router.delete("/:id", userControler.delete);

export const userRoutes = router;