import { Router } from "express";
import { TraController } from "../controller/traController";

const router = Router();
const traController = new TraController();

router.get("/", traController.list);
router.post("/", traController.create);
router.patch("/:id",traController.update);
router.delete("/:id", traController.delete);

export const traRoutes = router;