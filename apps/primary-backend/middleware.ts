import type { NextFunction, Response, Request } from "express";
import  jwt  from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next:NextFunction) {
    try {
        const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({message: "missing token"})
        return;
    }
 
    console.log("jwt publlic key", process.env.JWT_PUBLIC_KEY)
    const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY!, {
        algorithms: ["RS256"]
    });

     console.log(decoded)
    if (!decoded) {
        res.json(401).json({message: "Unauthorized token"})
        return; 
    }

    console.log(decoded)

    const userId = (decoded as any).sub;
    
    if (!userId) {
        res.json(401).json({message: "Unauthorized token"})
        return;
    }

    req.userId = userId;
    next();
    } catch (err) {
        console.error("error",err)
        res.status(401).json({message: "Unauthorized token"})
    }
    
}