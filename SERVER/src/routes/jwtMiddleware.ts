// --------------- IMPORTS ---------------
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


// --------------- MIDDLEWARE ---------------
const authenticateToken = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, 'your_secret_key', (error: any, user: any) => {
        if (error) {
            return res.status(403).json({ message: 'Forbidden' });
        } else {
            req.user = user;
            next();
        };
    });
};


// --------------- EXPORTS ---------------
export default authenticateToken;