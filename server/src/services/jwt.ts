import { User } from "@prisma/client";
import { prismaClient } from "../clients/db";
import JWT from 'jsonwebtoken';
import { JWTUser } from "../interfaces";

const JWT_SECRET = process.env.JWT_SECRET;

class JWTService {
    public static generateTokenForUser(user: User) {
        const payload: JWTUser = {
            id: user?.id,
            email: user?.email,
        };
        
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token = JWT.sign(payload, JWT_SECRET);
        return token;
    }

    public static decodeToken(token: string) {
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        return JWT.verify(token, JWT_SECRET) as JWTUser;
    }
}

export default JWTService;
