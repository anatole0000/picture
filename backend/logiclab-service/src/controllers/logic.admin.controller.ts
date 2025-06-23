import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

export const createExercise = async (req: Request, res: Response) => {
  const {
    title,
    question,
    options,
    answer,
    score,
    difficulty,
    tags
  } = req.body;

  const newExercise = await prisma.logicExercise.create({
    data: {
      title,
      question,
      options,
      answer,
      score: parseInt(score),          // <-- thêm điểm
      difficulty,      // <-- mức độ
      tags             // <-- tags logic, math,...
    },
  });

  res.status(201).json(newExercise);
};


export const updateExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, question, options, answer } = req.body;

  const updated = await prisma.logicExercise.update({
    where: { id },
    data: { title, question, options, answer },
  });

  res.json(updated);
};

export const deleteExercise = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.logicExercise.delete({ where: { id } });

  res.status(204).send();
};
