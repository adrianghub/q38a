import { z } from "zod";

export const questionsSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});
