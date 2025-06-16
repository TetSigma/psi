import { verifyJwt } from '../utils/jwt';
import prisma from '../utils/prisma';
export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Authorization token missing or malformed' });
            return; // don't return res, just exit middleware
        }
        const token = authHeader.split(' ')[1];
        const decoded = verifyJwt(token);
        if (!decoded || !decoded.userId) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }
        req.user = { userId: user.id };
        next();
    }
    catch (err) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
};
