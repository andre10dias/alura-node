import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    id: {type: String},
    titulo: {
        type: String, 
        require: [true, "O campo 'TÍTULO' é obrigatório!"],
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'autores', 
        require: [true, "O campo 'AUTOR' é obrigatório!"],
    },
    editora: {
        type: String, 
        require: [true, "O campo 'EDITORA' é obrigatório!"],
    },
    numeroPaginas: {type: Number},
});

const livros = mongoose.model('livros', livroSchema);

export default livros;