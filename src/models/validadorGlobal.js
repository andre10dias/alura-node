import mongoose from "mongoose";

//verifica se algum campo do tipo string recebeu um valor vazio.
mongoose.Schema.Types.String.set("validate", {
    validator: (valor) => valor.trim() !== "",
    message: ({ path }) => `O campo ${path} foi fornecido em branco.`
    // message: "Um campo em branco foi fornecido." 
});