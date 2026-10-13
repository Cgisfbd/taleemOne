import { z } from 'zod';

export const translateDescriptionSchema = z.object({
  text: z
    .string()
    .min(1, 'Input text cannot be empty')
    .max(3000, 'Description exceeds maximum limit of 3000 characters')
    .trim(),
});

export type TranslateDescriptionDto = z.infer<
  typeof translateDescriptionSchema
>;
