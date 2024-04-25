import { prismaClient } from "../database/PrismaClient.js";

export class LocalController {
    async findAllLocals(req, res) {
      try {
        const locals = await prismaClient.locais.findMany();
        res.status(200).json(locals);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar locais.' });
      }
    }
  
    async findLocalById(req, res) {
      const { id } = req.params;
      try {
        const local = await prismaClient.locais.findUnique({
          where: { id },
        });
        if (!local) {
          return res.status(404).json({ error: 'Local não encontrado.' });
        }
        res.status(200).json(local);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar local.' });
      }
    }
  
    async createLocal(req, res) {
      const { nome, endereco, cidade, estado, pais } = req.body;
      try {
        const local = await prismaClient.locais.create({
          data: { nome, endereco, cidade, estado, pais },
        });
        res.status(201).json(local);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar local.' });
      }
    }
  
    async updateLocal(req, res) {
      const { id } = req.params;
      const { nome, endereco, cidade, estado, pais } = req.body;
      try {
        const local = await prismaClient.locais.update({
          where: { id },
          data: { nome, endereco, cidade, estado, pais },
        });
        res.status(200).json(local);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar local.' });
      }
    }
  
    async deleteLocal(req, res) {
      const { id } = req.params;
      try {
        
        const eventos = await prismaClient.eventos.findMany({
          where: { local_id: id }
        });
        
        
        if (eventos.length > 0) {
          return res.status(400).json({ error: 'Este local está associado a eventos e não pode ser excluído.' });
        }
        
        
        await prismaClient.locais.delete({ where: { id } });
        res.status(204).send();
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir local.' });
      }
    }
}