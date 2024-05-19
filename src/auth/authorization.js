import jwt from 'jsonwebtoken';

export default async function (req, res, next) {
	const { authorization } = req.headers; // Extrai o cabeçalho de autorização da requisição.

	if (!authorization) { // Verifica se o cabeçalho de autorização está ausente.
		return res.status(401).json({ message: 'Acesso não autorizado. Cabeçalho de autorização ausente.'});
	}

	// Remove o prefixo 'Bearer' e quaisquer espaços em branco do token.
	const token = authorization.replace('Bearer ', '').trim(); 

	try {
		 // Tenta extrair a propriedade em questão do token JWT decodificado
		const {role} = jwt.verify(token, process.env.SECRET_JWT);
	
		if(!role) {
			return res.status(403).json({ message: 'Acesso não autorizado.' });
		}

		// Se todas as verificações passarem, chama o próximo middleware.
		return next();
	} catch (error) {
		console.log(error.message)
		res.status(500).json({ error: 'Erro ao autenticar.' });
	}
};
