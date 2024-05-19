import { prismaClient } from '../database/PrismaClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class LoginController {
	async sign(req, res) {
		const { email, senha } = req.body;

		try {
			const user = await prismaClient.usuarios.findUnique({
				where: {
					email,
				},
				include: {
					cargo: true
				}
			});

			if (!user) {
				return res.status(404).json({ message: 'Usuário não encontrado.' });
			}

			const verifyPassword = bcrypt.compareSync(senha, user.senha);

			if (!verifyPassword) {
				return res.status(404).json({ message: 'Senha incorreta.' });
			}

			const token = jwt.sign(
				{
					userId: user.id,
					name: user.nome,
					role: user.cargo,
					isAdmin: user.isAdmin
				},
				process.env.SECRET_JWT,
				{ expiresIn: '4h' },
			);

			return res
				.status(200)
				.json({ id: user.id, name: user.nome, role: user.cargo, isAdmin: user.isAdmin, token: token });
		} catch (error) {
			console.log(error.message)
			return res.status(500).json({error: 'Erro ao realizar login.'});
		}
	}
}
