export default function pagination(req, res, next) {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    // Operador condicional ternário: Caso não seja informado um valor (na requisição), os valores abaixo são setados como default
    !limit ? limit = 10 : null; // Total de registros a serem retornados -> por default serão 10
    !offset ? offset = 0 : null; // Início da leitura dos dados retornados -> por default inicia no item 0

    req.query.limit = limit;
    req.query.offset = offset;

    return next();
};