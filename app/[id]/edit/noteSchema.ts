import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  summary: z.string().min(1),
  tags: z.array(z.string()).optional(),
});

export type NoteFormData = z.infer<typeof noteSchema>;
