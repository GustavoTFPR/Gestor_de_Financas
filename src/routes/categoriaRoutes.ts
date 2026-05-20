// src/routes/categorias.ts

import { Router } from "express";
import { getRepository } from "typeorm";
import { Categoria } from "..//entity/Categoria";

const router = Router();

// CREATE - RF05 (categorização de transações)
router.post("/", async (req, res) => {
  const repo = getRepository(Categoria);
  const categoria = repo.create(req.body);
  await repo.save(categoria);
  return res.status(201).json(categoria);
});

// READ - listar todas categorias
router.get("/", async (req, res) => {
  const repo = getRepository(Categoria);
  const categorias = await repo.find();
  return res.json(categorias);
});

// UPDATE - editar categoria
router.put("/:id", async (req, res) => {
  const repo = getRepository(Categoria);
  const categoria = await repo.findOneBy({ id_categoria: parseInt(req.params.id) });
  if (!categoria) return res.status(404).json({ message: "Categoria não encontrada" });

  repo.merge(categoria, req.body);
  await repo.save(categoria);
  return res.json(categoria);
});

// DELETE - excluir categoria
router.delete("/:id", async (req, res) => {
  const repo = getRepository(Categoria);
  const result = await repo.delete(req.params.id);
  if (result.affected === 0) return res.status(404).json({ message: "Categoria não encontrada" });
  return res.status(204).send();
});

export default router;
