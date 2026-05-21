import { Router } from "express";
import { CategoriaController } from "../controller/categoriaController";

const router = Router();
const categoriaController = new CategoriaController();

router.get("/", categoriaController.list);
router.post("/", categoriaController.create);
router.patch("/:id", categoriaController.update);
router.delete("/:id", categoriaController.delete);

export const categoriaRoutes = router;


