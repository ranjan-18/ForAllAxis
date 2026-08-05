import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().min(10, 'Description is required'),
  shortDescription: z.string().min(10, 'Short description is required'),
  client: z.string().optional(),
  category: z.enum(['web-development', 'mobile-app', 'ui-ux', 'branding', 'digital-marketing']),
  technologies: z.array(z.string()).optional(),
  liveUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().optional(),
  status: z.enum(['completed', 'in-progress']).optional(),
  order: z.number().optional(),
});

export const updateProjectSchema = createProjectSchema.partial();
