import { prismaClient } from '../database/PrismaClient.js';
import bcrypt from "bcryptjs";

const findUserByEmail = async (email) => await prismaClient.usuarios.findFirst({ where: { email: email } });

export class UserController {

	async findAllUsers(req, res) {
		const { roleId } = req.query;

		try {
			let users = roleId ? await prismaClient.usuarios.findMany({
				where: {
					cargo_id: roleId
				},
				select: {
					id: true,
					nome: true,
					email: true,
					telefone: true,
					cargo_id: true
				}
			}) : await prismaClient.usuarios.findMany({
				select: {
					id: true,
					nome: true,
					email: true,
					telefone: true,
					cargo_id: true
				}
			});

			res.status(200).json(users);

		} catch (error) {
			console.log(error.message);
			return res.status(500).json({ error: 'Erro ao listar usuários.' });
		}
	};


	async findUserById(req, res) {
		const { id } = req.params;

		try {
			const user = await prismaClient.usuarios.findUnique({
				where: { id },
				include: {
					cargo: true,
					evento: true
				}
			});

			if (user !== null) {
				// formata a exibição do user
				const formattedUser = {
					id: user.id,
					nome: user.nome,
					email: user.email,
					telefone: user.telefone,
					cargo: user.cargo,
					eventos: user.evento,
					data_criacao: user.data_criacao
				};

				return res.status(200).json(formattedUser);
			};

			res.status(404).json({ message: 'Usuário não localizado!' });
		} catch (error) {
			console.log(error.message);
			return res.status(500).json({ error: 'Erro ao buscar usuário.' });
		}
	};

	async createUser(req, res) {
		const { nome, email, telefone, senha, cargo_id } = req.body;

		try {
			const userFound = await findUserByEmail(email);

			if (userFound)
				return res.status(409).json({ message: "E-mail já cadastrado!" });

			// Criptografa a senha antes de mandar para o banco
			const hashPass = bcrypt.hashSync(senha, 10);

			const user = await prismaClient.usuarios.create({
				data: { nome, email, telefone, senha: hashPass, cargo_id },
				select: {
					id: true,
					nome: true,
					email: true,
					telefone: true,
					cargo_id: true
				}
			});

			return res.status(201).json(user);
		} catch (error) {
			console.log(error.message);
			return res.status(500).json({ error: 'Erro ao cadastrar usuário. Tente novamente!' });
		}
	};


	async updateUser(req, res) {
		const { id } = req.params;
		const { nome, email, telefone, senha, cargo_id } = req.body;

		try {
			const userFound = await findUserByEmail(email);

			if (userFound !== null) {
				// Criptografa a senha antes de mandar para o banco
				const hashPass = bcrypt.hashSync(senha, 10);

				const user = await prismaClient.usuarios.update({
					where: {
						id
					},
					data: { nome, email, telefone, senha: hashPass, cargo_id },
					select: {
						id: true,
						nome: true,
						email: true,
						telefone: true,
						cargo_id: true
					}
				});

				return res.status(200).json(user);
			}

			res.status(500).json({ message: 'Usuário não localizado!' });
		} catch (error) {
			console.log(error.message);
			return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
		};
	};

	async deleteUser(req, res) {
		const { id } = req.params;

		try {
			const userFound = await prismaClient.usuarios.findUnique({where: { id }});

			if (userFound !== null) {
				await prismaClient.usuarios.delete({
					where: { id },
				});

				return res.status(204).send();
			}

			res.status(404).json({ message: 'Usuário não localizado!' });
		} catch (error) {
			console.log(error.message);
			return res.status(500).json({ error: 'Erro ao excluir usuário.' });
		}
	};

};