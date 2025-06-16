import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({ select: { id: true, email: true, name: true } });
  res.json(users);
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true }
  });

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json(user);
};
export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  const updatedUser = await prisma.user.update({
    where: { id },
    data: { name },
    select: { id: true, email: true, name: true },
  });
  res.json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.user.delete({ where: { id } });
  res.status(204).send();
};
