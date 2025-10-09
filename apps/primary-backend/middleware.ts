import type { NextFunction, Response, Request } from "express";
import  jwt  from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next:NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({message: "missing token"})
        return;
    }

    const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY!, {
        algorithms: ["RS256"]
    });
    if (!decoded) {
        res.json(401).json({message: "Unauthorized token"})
        return; 
    }

    const userId = (decoded as any).payload.sub;
    
    if (!userId) {
        res.json(401).json({message: "Unauthorized token"})
        return;
    }

    req.userId = userId;
    next();
}