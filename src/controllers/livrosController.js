import livros from "../models/Livro.js";

class LivroController {
    static listarLivros = async (req, res) => {
        try {
            const retorno = await livros.find().populate('autor');
            res.status(200).json(retorno);
        } catch(err) {
            console.error(err);
            res.status(500).json({
                error: 'Falha ao buscar os livros.'
            });
        };
    }

    static listarLivrosPorId = async (req, res) => {
        var retorno = undefined;
        try {
            const {id} = req.params;
            retorno = await livros.findById(id).populate('autor');
            res.status(200).json(retorno);
        } catch(err) {
            console.error(err);
            // if (err instanceof Error.CastError) {
            //     return res.status(400).json({err: 'Livro não encontrado.'});
            // }
            if (retorno == undefined) {
                return res.status(400).json({err: 'Livro não encontrado.'});
            }

            res.status(500).json({
                error: 'Falha ao buscar livro.'
            });
        };
    }

    static cadastrarLivro = async (req, res) => {
        try {
            const livro = new livros(req.body);
            await livro.save();
            res.status(201).send(livro.toJSON());
        } catch(err) {
            console.error(err);
            res.status(501).send({
                message: `${err.message} - Falha ao cadastrar livro.`
            });
        };
    }

    static atualizarLivro = async (req, res) => {
        try {
            const {id} = req.params;
            const retorno = await livros.findByIdAndUpdate(id, req.body, {new: true});
            res.status(200).json(retorno);
        } catch(err) {
            console.error(err);
            res.status(500).send({
                message: `${err.message} - Falha ao atualizar livro.`
            });
        };
    }

    static deletarLivros = async (req, res) => {
        try {
            const {id} = req.params;
            const retorno = await livros.findByIdAndDelete(id, req.body, {new: true});
            res.status(200).json(retorno);
        } catch(err) {
            console.error(err);
            res.status(500).send({
                message: `${err.message} - Falha ao excluir livro.`
            });
        };
    }
}

export default LivroController;