import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
    try {
        //1 -> crescente, -1 -> decrescente
        // let { limite = 2, pagina = 1, campoOrdem = "_id", ordem = -1 } = req.query;
        let { limite = 2, pagina = 1, ordenacao = "_id:-1" } = req.query;

        let [campoOrdem, ordem] = ordenacao.split(":");

        limite = parseInt(limite);
        pagina = parseInt(pagina);
        ordem = parseInt(ordem);

        const resultado = req.resultado;

        if (limite > 0 && pagina > 0) {
            const retorno = await resultado.find()
                .sort({[campoOrdem]: ordem}) 
                .skip((pagina - 1) * limite)
                .limit(limite);
                // .exec(); exec é opcional quando se usa o async await

            res.status(200).json(retorno);
        } else {
            next(new RequisicaoIncorreta());
        }
    } catch (error) {
        next(error);
    }
}

export default paginar;