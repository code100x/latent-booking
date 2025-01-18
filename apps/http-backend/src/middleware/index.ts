import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const middleware = (...secrets: string[]) => (req: Request, res: Response, next: NextFunction) => {
    for (const secret of secrets) {
        if (req.headers.authorization) {
            const tokenVerified = verifyToken(req, res, secret);
            if (tokenVerified) {
                console.log("next called")
                next()
                return;
            }
        }
    }
    console.log("401")
    res.status(401).json({
        message: "Unauthorized"
    })
}

export function verifyToken(req: Request, res: Response, secret: string): boolean {
    const token = req.headers.authorization;

    console.log("token is " + token);
    console.log("secret is " + secret);
    if (!token) {
        return false
    }

    try {
        const decoded = jwt.verify(token, secret);
        console.log("decoded is ")
        console.log(decoded)
        if (typeof decoded === "string") {
            return false;
        }
        req.userId = decoded.userId;
    } catch(e) {
        return false;
    }
    console.log("returned true")
    return true;
}