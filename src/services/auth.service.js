import prisma from '../utils/prisma';
import { hashPassword, comparePassword } from "../utils/brcypt";
import { signJwt } from '../utils/jwt';
export const registerUser = async (email, password, name) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('Email already registered');
    }
    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
        data: { email, password: hashed, name },
    });
    const token = signJwt({ userId: user.id });
    return { user, token };
};
export const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const valid = await comparePassword(password, user.password);
    if (!valid) {
        throw new Error('Invalid credentials');
    }
    const token = signJwt({ userId: user.id });
    return { user, token };
};
