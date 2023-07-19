import mongoose from "mongoose";
import autores from "../models/Autor.js";

class AutorController {
    static listarAutores = async (req, res) => {
        try {
            const retorno = await autores.find();

            if (retorno !== null) {
                res.status(200).json(retorno);
            } else {
                res.status(200).send({message: 'Não existem autores cadastrados.'});
            }
        } catch(err) {
            res.status(500).json({
                message: 'Falha ao buscar os autores.'
            });
        };
    }

    static listarAutoresPorId = async (req, res) => {
        try {
            const {id} = req.params;
            const retorno = await autores.findById(id);
            res.status(200).json(retorno);
        } catch(err) {
            if (err instanceof mongoose.Error.CastError) {
                res.status(400).send({message: 'Os dados fornecidos estão incorretos.'});
            } else {
                res.status(500).send({message: `${err.message} - Falha ao listar os autores.`});
            }
        };
    }

    static cadastrarAutor = async (req, res) => {
        try {
            const autor = new autores(req.body);
            const retorno = await autor.save();
            res.status(201).send(autor.toJSON());
        } catch(err) {
            console.error(err);
            res.status(501).send({
                message: `${err.message} - Falha ao cadastrar autor.`
            });
        };
    }

    static atualizarAutor = async (req, res) => {
        try {
            const {id} = req.params;
            const retorno = await autores.findByIdAndUpdate(id, req.body, {new: true});
            res.status(200).json(retorno);
            //res.status(200).send({message: "Autor atualizado com sucesso."});
        } catch(err) {
            console.error(err);
            res.status(500).send({
                message: `${err.message} - Falha ao atualizar autor.`
            });
        };
    }

    static deletarAutores = async (req, res) => {
        try {
            const {id} = req.params;
            //const id = req.params.id;
            const retorno = await autores.findByIdAndDelete(id, req.body, {new: true});
            res.status(200).json(retorno);
        } catch(err) {
            console.error(err);
            res.status(500).send({
                message: `${err.message} - Falha ao excluir autor.`
            });
        };
    }
}

export default AutorController;