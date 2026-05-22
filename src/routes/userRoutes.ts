import { Router } from "express";
import { UserController } from "../controller/userController";

const router = Router();
const userControler = new UserController();

router.get("/", userControler.list);
router.post("/", userControler.create);
router.patch("/:id",userControler.update);
router.delete("/:id", userControler.delete);

export const userRoutes = router;