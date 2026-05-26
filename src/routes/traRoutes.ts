import { Router } from "express";
import { TraController } from "../controller/traController";
import { authMiddleware } from "../middlewares/authMiddleware";


const router = Router();
const traController = new TraController();

router.use(authMiddleware); 

router.get("/", traController.list);
router.post("/", traController.create);
router.patch("/:id",traController.update);
router.delete("/:id", traController.delete);
router.get("/saldo/:id", traController.saldo);

export const traRoutes = router;