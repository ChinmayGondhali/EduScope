import { z } from 'zod';
import { ValidationError } from '../errors';

/**
 * Standardized error response format for validation errors
 */
export interface ValidationErrorResponse {
  success: false;
  error: string;
  details?: Record<string, string[] | undefined>;
}

/**
 * Reusable validation helper that throws a ValidationError on failure
 */
export async function validateData<T>(
  schema: z.ZodType<T, any, any>,
  data: unknown
): Promise<T> {
  const result = await schema.safeParseAsync(data);

  if (!result.success) {
    const flattenedErrors = result.error.flatten().fieldErrors;
    throw new ValidationError('Validation failed', flattenedErrors);
  }

  return result.data;
}

/**
 * Common validation schemas
 */

// 1. Auth Schemas
export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// 2. College Query Schemas
export const collegeQuerySchema = z.object({
  search: z.string().optional(),
  location: z.string().optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  minFees: z.coerce.number().min(0).optional(),
  maxFees: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  sortBy: z.enum(['name', 'fees', 'rating', 'placement_rate', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// 3. Compare Schema
export const compareQuerySchema = z.object({
  ids: z.string().transform((val) => val.split(',')).pipe(
    z.array(z.string().uuid()).min(1, "At least one college ID is required").max(3, "You can compare a maximum of 3 colleges at once")
  )
});

// 4. Save College Schema
export const saveCollegeSchema = z.object({
  collegeId: z.string().uuid('Invalid college ID format'),
});

// 5. General UUID Params
export const uuidParamSchema = z.object({
  id: z.string().uuid('Invalid ID format'),
});

// Types
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CollegeQueryInput = z.infer<typeof collegeQuerySchema>;
export type SaveCollegeInput = z.infer<typeof saveCollegeSchema>;
