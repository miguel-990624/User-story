import type { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Validation error",
        details: result.error.issues.map(issue => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    req.body = result.data;
    next();
  };
