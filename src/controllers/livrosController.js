// import livros from "../models/Livro.js";
import { autores, livros } from "../models/index.js"; //validador global
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

    //Usando regex para consulta por filtro digitando apenas parte to parâmetro
    static listarLivrosPorFiltro = async (req, res, next) => {
        try {
            const busca = await processaBusca(req.query);
            if (busca != null) {
                const retorno = await livros.find(busca).populate('autor');
                res.status(200).json(retorno);
            }
            else {
                res.status(200).send([]);
            }
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

//Função criada fora da classe para que ela não seja exportada
async function processaBusca(params) {
    const {editora, titulo, minPaginas, maxPaginas, nomeAutor} = params;
    // const regex = new RegExp(titulo, "i");

    //obriga passa os dois parâmetros na url
    // const retorno = await livros.find({
    //     editora: editora,
    //     titulo: titulo
    // }).populate('autor');

    //pode passar um ou ambos os parâmetros na url
    let busca = {};

    if (editora) {
        busca.editora = editora;
    }

    if (titulo) {
        // busca.titulo = regex;
        busca.titulo = { $regex: titulo, $options: "i" }; //Outra forma de usar o regex
    }

    if (minPaginas || maxPaginas) {
        busca.numeroPaginas = {};
    }

    // gte -> Maior ou igual a
    if (minPaginas) {
        // busca.numeroPaginas = { $gte: minPaginas};
        busca.numeroPaginas.$gte = minPaginas; // Uma forma melhor de codificar para um objeto não sobreescrever o outro
    }

    // lte -> Menor ou igual a
    if (maxPaginas) {
        // busca.numeroPaginas = { $lte: maxPaginas};
        busca.numeroPaginas.$lte = maxPaginas; // Uma forma melhor de codificar para um objeto não sobreescrever o outro
    }

    if (nomeAutor) {
        const autor = await autores.findOne({ nome: nomeAutor });

        if (autor !== null) {
            const autorId = autor._id;
            busca.autor = autorId;
        }
        else {
            busca = null;
        }

    }

    return busca;
}

export default LivroController;