import autores from "../models/Autor.js";

class AutorController {
    static listarAutores = async (req, res) => {
        try {
            const retorno = await autores.find();
            res.status(200).json(retorno);
        } catch(err) {
            console.error(err);
            res.status(500).json({
                error: 'Falha ao buscar os autores.'
            });
        };
    }

    static listarAutoresPorId = async (req, res) => {
        var retorno = undefined;
        try {
            const {id} = req.params;
            retorno = await autores.findById(id);
            res.status(200).json(retorno);
        } catch(err) {
            console.error(err);
            // if (err instanceof Error.CastError) {
            //     return res.status(400).json({err: 'autor não encontrado.'});
            // }
            if (retorno == undefined) {
                return res.status(400).json({err: 'autor não encontrado.'});
            }

            res.status(500).json({
                error: 'Falha ao buscar autor.'
            });
        };
    }

    static cadastrarAutor = async (req, res) => {
        try {
            const autor = new autores(req.body);
            await autor.save();
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