import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  content: z.string().min(20, 'Content is required'),
  excerpt: z.string().min(10, 'Excerpt is required'),
  tags: z.array(z.string()).optional(),
  category: z.string().min(2, 'Category is required'),
  isPublished: z.boolean().optional(),
});

export const updateBlogSchema = createBlogSchema.partial();
