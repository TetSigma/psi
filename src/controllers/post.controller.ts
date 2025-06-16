import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getPosts = async (_req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    include: { author: { select: { id: true, email: true, name: true } }, group: true }
  });
  res.json(posts);
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: { select: { id: true, email: true, name: true } }, group: true }
  });

  if (!post) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }

  res.json(post);
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content, authorId, groupId } = req.body;
  const post = await prisma.post.create({
    data: { title, content, authorId, groupId }
  });
  res.status(201).json(post);
};

export const updatePost = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;
  const updatedPost = await prisma.post.update({
    where: { id },
    data: { title, content }
  });
  res.json(updatedPost);
};

export const deletePost = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.post.delete({ where: { id } });
  res.status(204).send();
};
