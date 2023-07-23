import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
    constructor(err) {
        const msg = Object.values(err.errors)
            .map(err => err.message)
            .join("; ");

        super(`${msg}`);
    }
}

export default ErroValidacao;