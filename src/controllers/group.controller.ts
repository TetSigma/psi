import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getGroups = async (_req: Request, res: Response) => {
  const groups = await prisma.group.findMany({
    include: { members: { select: { id: true, email: true, name: true } }, posts: true }
  });
  res.json(groups);
};


export const getGroupById = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const group = await prisma.group.findUnique({
    where: { id },
    include: { members: { select: { id: true, email: true, name: true } }, posts: true }
  });

  if (!group) {
    res.status(404).json({ error: 'Group not found' });
    return;
  }

  res.json(group);
};


export const createGroup = async (req: Request, res: Response) => {
  const { name, description, memberIds } = req.body;
  const group = await prisma.group.create({
    data: {
      name,
      description,
      members: memberIds ? { connect: memberIds.map((id: number) => ({ id })) } : undefined,
    },
  });
  res.status(201).json(group);
};

export const updateGroup = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, description, memberIds } = req.body;
  const group = await prisma.group.update({
    where: { id },
    data: {
      name,
      description,
      members: memberIds ? { set: memberIds.map((id: number) => ({ id })) } : undefined,
    },
  });
  res.json(group);
};

export const deleteGroup = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.group.delete({ where: { id } });
  res.status(204).send();
};
