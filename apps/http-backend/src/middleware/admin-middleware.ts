import { NextFunction, Request, Response } from "express";
import { JWT_PASSWORD } from "../config";
import jwt from "jsonwebtoken";


export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
    const headerToken = req.headers.authorization;
    const token = headerToken?.split(" ")[1];
    if (!token) {
        res.status(403).json({ msg: "Unauthorized" });
        return;
    }

    try {
        const decode = jwt.verify(token, JWT_PASSWORD) as { userId: string, role: string };
        if (decode.role != "Admin") {
            res.status(403).json({ msg: "Unauthorized" });
            return;
        }
        req.userId = decode.userId;
        next();
    } catch (e) {
        res.status(403).json({ msg: "Unauthorized" });
        return;
    }
}    