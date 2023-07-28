// import livros from "../models/Livro.js";
import { livros } from "../models/index.js"; //validador global
import NaoEncontrado from "../erros/NaoEncontrado.js";

class LivroController {
    static listarLivros = async (req, res, next) => {
        try {
            const retorno = await livros.find().populate('autor');
            res.status(200).json(retorno);
        } catch(err) {
            next(err);
        };
    }

    // static listarLivrosPorEditora = async (req, res, next) => {
    //     try {
    //         const editora = req.query.editora;
    //         const retorno = await livros.find({'editora': editora}).populate('autor');
    //         res.status(200).json(retorno);
    //     } catch(err) {
    //         next(err);
    //     };
    // }

    static listarLivrosPorFiltro = async (req, res, next) => {
        try {
            const {editora, titulo} = req.query;

            //obriga passa os dois parâmetros na url
            // const retorno = await livros.find({
            //     editora: editora,
            //     titulo: titulo
            // }).populate('autor');

            //pode passar um ou ambos os parâmetros na url
            const busca = {};
            if (editora) {
                busca.editora = editora;
            }

            if (titulo) {
                busca.titulo = titulo;
            }

            const retorno = await livros.find(busca)
                .populate('autor');

            res.status(200).json(retorno);
        } catch(err) {
            next(err);
        };
    }

    static listarLivrosPorId = async (req, res, next) => {
        try {
            const {id} = req.params;
            const retorno = await livros.findById(id).populate('autor');

            if (retorno !== null) {
                res.status(200).json(retorno);
            } else {
                next(new NaoEncontrado('Livro não localizado.'));
            }
        } catch(err) {
            next(err);
        };
    }

    static cadastrarLivro = async (req, res, next) => {
        try {
            const livro = new livros(req.body);
            await livro.save();
            res.status(201).send(livro.toJSON());
        } catch(err) {
            next(err);
        };
    }

    static atualizarLivro = async (req, res, next) => {
        try {
            const {id} = req.params;
            const retorno = await livros.findByIdAndUpdate(id, req.body, {new: true});
            
            if (retorno !== null) {
                res.status(200).json(retorno);
            } else {
                next(new NaoEncontrado('Livro não localizado.'));
            }
        } catch(err) {
            next(err);
        };
    }

    static deletarLivros = async (req, res, next) => {
        try {
            const {id} = req.params;
            const retorno = await livros.findByIdAndDelete(id, req.body, {new: true});
            
            if (retorno !== null) {
                res.status(200).json(retorno);
            } else {
                next(new NaoEncontrado('Livro não localizado.'));
            }
        } catch(err) {
            next(err);
        };
    }
}

export default LivroController;