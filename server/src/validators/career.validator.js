import { z } from 'zod';

export const createCareerSchema = z.object({
  title: z.string().min(2, 'Job title is required'),
  department: z.string().min(2, 'Department is required'),
  location: z.string().min(2, 'Location is required'),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship']),
  description: z.string().min(10, 'Description is required'),
  isActive: z.boolean().optional(),
});

export const updateCareerSchema = createCareerSchema.partial();
