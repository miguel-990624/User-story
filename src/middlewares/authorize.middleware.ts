import { type NextFunction, type Response } from "express";
import { type AuthRequest } from "./auth.middleware.ts";

const authorize = (roles: ("admin" | "analyst")[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if ( !req.user ) {
            return res.status(401).json({ error: "Unauthorized"});
        };

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Forbidden: insufficient role" });
        };

        next();
    };
};

export {authorize}