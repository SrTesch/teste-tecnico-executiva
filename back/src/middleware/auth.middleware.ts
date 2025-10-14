import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: number;
    email: string;
    iat: number;
    exp: number;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    const [scheme, token] = authorization.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Token em formato inválido.' });
    }

    try {
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error('Chave secreta JWT não configurada.');
        }

        const decoded = jwt.verify(token, secretKey);
        const { id, email } = decoded as TokenPayload;
        req.user = { id, email };

        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};