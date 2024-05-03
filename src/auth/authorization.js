import { prismaClient } from '../database/PrismaClient.js';
import jwt from 'jsonwebtoken';

const verificarUsuario = async (id) =>
	await prismaClient.cargos.findUnique({
		where: {
			id,
		},
	});

export default async function (req, res, next) {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ message: 'Acesso não autorizado.' });
	}

	const token = authorization.replace('Bearer', '').trim();

	try {
		const { role } = jwt.verify(token, process.env.SECRET_JWT);

		const { id } = await verificarUsuario(role);

		if (id === process.env.VISITANTE) {
			//Acesso publico
			return res.status(401).json({ message: 'Acesso não autorizado.' });
		}
		//Verificação se foi setado o token
		if (!role) {
			return res.status(403).json({ message: 'Acesso negado.' });
		}

		return next();
	} catch (error) {
		res.status(500).json({ message: 'Erro ao autenticar.' });
	}
}
