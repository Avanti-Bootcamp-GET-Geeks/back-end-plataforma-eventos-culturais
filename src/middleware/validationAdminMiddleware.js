import jwt from 'jsonwebtoken';

export default function(req, res, next) {
    // Obtém o token JWT do cabeçalho 'Authorization' da requisição
    const token = req.header('Authorization')?.replace('Bearer ', ''); 

    if (!token) { // Verifica se o token foi fornecido 
        return res.status(401).send({ message: "Token não fornecido!" }); 
    }

    try {
        // Verifica e decodifica o token usando a chave secreta
        const decoded = jwt.verify(token, process.env.SECRET_JWT); 
        req.user = decoded;  // Armazena os dados decodificados do token no objeto `req.user`
         
        // Verifica se o usuário decodificado tem a propriedade `isAdmin` definida como `true`
        if (!req.user.isAdmin) { 
            return res.status(403).send({ message: "Acesso negado! Apenas administradores podem realizar esta requisição." }); 
            // Se não for um administrador, retorna uma resposta 403 (Proibido) com uma mensagem de erro
        }

        return next(); 
    } catch (error) {
        // Se o token estiver expirado ou for inválido), retorna uma resposta 401 (Não Autorizado) com uma mensagem de erro
        res.status(401).send({ message: "Token inválido!" }); 
    }
}