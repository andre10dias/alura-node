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
        enum: {
            values: ["Casa do código", "Alura"],
            message: "A editora {VALUE} não é um valor permitido."
        }
    },
    numeroPaginas: {
        type: Number,
        validate: {
            validator: (valor) => {
                return valor >= 10 && valor <= 5000;
            },
            message: "Valor fornecido {VALUE}. O número de páginas deve estar entre 10 e 5000."
        }
        // min: [10, "Valor fornecido {VALUE}. O número de páginas deve ser de no mínimo 10"],
        // max: [5000, "Valor fornecido {VALUE}. O número de páginas deve ser de no máximo 5000"]
    },
});

const livros = mongoose.model('livros', livroSchema);

export default livros;