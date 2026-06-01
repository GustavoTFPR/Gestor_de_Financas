import { Router } from "express";
import { CategoriaController } from "../controller/categoriaController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const categoriaController = new CategoriaController();

router.use(authMiddleware); 

router.get("/", categoriaController.list);
router.post("/", categoriaController.create);
router.patch("/:id", categoriaController.update);
router.delete("/:id", categoriaController.delete);

export const categoriaRoutes = router;


