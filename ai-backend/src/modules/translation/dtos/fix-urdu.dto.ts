import { z } from 'zod';

export const fixUrduSchema = z.object({
  text: z
    .string()
    .min(1, 'Input text cannot be empty')
    .max(500, 'Text exceeds maximum length of 500 characters')
    .trim(),
});

export type FixUrduDto = z.infer<typeof fixUrduSchema>;
