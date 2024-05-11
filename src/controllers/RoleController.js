import { prismaClient } from "../database/PrismaClient.js";

const findById = async (id) => await prismaClient.cargos.findUnique({ where: { id } });

const findRoleByNome = async (nome) =>
	await prismaClient.cargos.findFirst({ where: { nome: nome } });

export class RoleController {
  async findAllRoles(req, res) {
    try {
      const roles = await prismaClient.cargos.findMany();
      res.status(200).json(roles);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Erro ao buscar cargos.' });
    }
  };

  async findRoleById(req, res) {
    const { id } = req.params;
    try {

      const role = await findById(id);

      if (!role) {
        return res.status(404).json({ message: 'Cargo não encontrado.' });
      };

      res.status(200).json(role);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Erro ao buscar cargo.' });
    }
  };

  async createRole(req, res) {
    try {
      const { nome } = req.body

      const roleFound = await findRoleByNome(nome.toLowerCase());

			if (roleFound) return res.status(409).json({ message: 'Cargo já cadastrado!' });

      res.status(201).json(await prismaClient.cargos.create({data: { nome: nome.toLowerCase() }}));
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Erro ao criar cargo.' });
    }
  };

  async updateRole(req, res) {
    const { id } = req.params;

    try {
      const roleFound = await findById(id);

      if (!roleFound) {
        return res.status(404).json({ message: 'Cargo não encontrado.' });
      };

      res.status(200).json(await prismaClient.cargos.update({where: { id }, data: { nome: req.body.nome }}));  

    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Erro ao atualizar cargo.' });
    }
  };

  async deleteRole(req, res) {
    const { id } = req.params;
    try {
      const roleFound = await findById(id);

      if (!roleFound) {
        return res.status(404).json({ message: 'Cargo não encontrado.' });
      };

      await prismaClient.cargos.delete({ where: { id } });

      res.status(204).send();

    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Erro ao excluir cargo.' });
    }
  };
}