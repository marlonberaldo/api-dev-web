import { Request, Response } from "express";
import User from "../models/User";
import { Op } from "sequelize";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários." });
  }
};

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id: id } })

    if (!user) {
      return res.status(404).json({ error: "Person not found", message: `Nenhuma pessoa encontrada com o ID: ${id}` });
    }

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuário." });

  }
}

export const getUserByName = async (req: Request, res: Response): Promise<Response> => {
  const { term } = req.query;

  if (!term || (term as string).length < 3) {
    return res.status(400).json({ message: "A busca deve ter no mínimo 3 caracteres" });
  }

  try {
    const pessoa = await User.findAll({
      where: {
        name: {
          [Op.like]: `%${term}%`
        }
      }
    })

    if (pessoa.length === 0) {
      return res.status(404).json({ message: `Nenhuma pessoa com o nome: "${term}" encontrado` });
    }
    return res.status(200).json(pessoa)
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const createUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const deletedUser = await User.destroy({ where: { id } });

    if (deletedUser === 0) {
      return res.status(404).json({ message: `Usuário com o ID "${id}" não encontrado` });
    }

    return res.status(200).json({ message: `Usuário com o ID "${id}" deletado com sucesso` });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao deletar o usuário" });
  }
};
