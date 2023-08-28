import * as z from "zod";

export const createChatbotValidator = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters.")
    .max(32, "Slug must be at most 32 characters."),
  slug: z
    .string({ required_error: "Slug is required" })
    .min(1, "Slug is required")
    .min(2, "Slug must be at least 2 characters.")
    .max(32, "Slug must be at most 32 characters.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invlid slug"),
});

export const createQuickPromptValidator = z.object({
  chatbotId: z.string(),
  title: z.string().max(80),
  prompt: z.string().max(500),
});

export const updateQuickPromptValidator = z.object({
  id: z.string(),
  title: z.string().optional(),
  prompt: z.string().optional(),
});
