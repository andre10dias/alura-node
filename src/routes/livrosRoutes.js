import express from "express";
import LivroController from "../controllers/livrosController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
    // .get("/livros", LivroController.listarLivros)
    .get("/livros", LivroController.listarLivros, paginar)
    // .get("/livros/busca", LivroController.listarLivrosPorEditora)
    .get("/livros/busca", LivroController.listarLivrosPorFiltro, paginar)
    .get("/livros/:id", LivroController.listarLivrosPorId)
    .post("/livros", LivroController.cadastrarLivro)
    .put("/livros/:id", LivroController.atualizarLivro)
    .delete("/livros/:id", LivroController.deletarLivros)

export default router;