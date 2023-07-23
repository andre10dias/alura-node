import NaoEncontrado from "../erros/NaoEncontrado.js";
import autores from "../models/Autor.js";

class AutorController {
    static listarAutores = async (req, res, next) => {
        try {
            const retorno = await autores.find();

            if (retorno !== null) {
                res.status(200).json(retorno);
            } else {
                res.status(200).send({message: 'Não existem autores cadastrados.'});
            }
        } catch(err) {
            next(err);
        };
    }

    static listarAutoresPorId = async (req, res, next) => {
        try {
            const {id} = req.params;
            const retorno = await autores.findById(id);
            
            if (retorno !== null) {
                res.status(200).json(retorno);
            } else {
                next(new NaoEncontrado('Autor não localizado.'));
            }
        } catch(err) {
            next(err);
        };
    }

    static cadastrarAutor = async (req, res, next) => {
        try {
            const autor = new autores(req.body);
            const retorno = await autor.save();
            res.status(201).send(autor.toJSON());
        } catch(err) {
            next(err);
        };
    }

    static atualizarAutor = async (req, res, next) => {
        try {
            const {id} = req.params;
            const retorno = await autores.findByIdAndUpdate(id, req.body, {new: true});
            if (retorno !== null) {
                res.status(200).json(retorno);
                //res.status(200).send({message: "Autor atualizado com sucesso."});
            } else {
                next(new NaoEncontrado('Autor não localizado.'));
            }
        } catch(err) {
            next(err);
        };
    }

    static deletarAutores = async (req, res, next) => {
        try {
            const {id} = req.params;
            //const id = req.params.id;
            const retorno = await autores.findByIdAndDelete(id, req.body, {new: true});
            if (retorno !== null) {
                res.status(200).json(retorno);
            } else {
                next(new NaoEncontrado('Autor não localizado.'));
            }
        } catch(err) {
            next(err);
        };
    }
}

export default AutorController;