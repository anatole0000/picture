import { z } from 'zod';

export const CreateCommentSchema = z.object({
  exerciseId: z.string().uuid(),
  content: z.string().min(1, 'Nội dung không được để trống'),
  parentId: z.string().uuid().nullable().optional(),
});

export type CreateCommentInput = z.infer<typeof CreateCommentSchema>;
