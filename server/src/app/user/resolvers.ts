import axios from 'axios'
import { prismaClient } from '../../clients/db';
import JWTService from '../../services/jwt';
import { GraphqlContext } from '../../interfaces';
import { User } from '@prisma/client';

interface GoogleTokenResult {
    iss?: string;
    azp?: string;
    aud?: string;
    sub?: string;
    email: string;
    email_verified: string;
    nbf?: string;
    name?: string;
    picture?: string;
    given_name: string;
    family_name?: string;
    iat?: string;
    exp?: string;
    jti?: string;
    alg?: string;
    kid?: string;
    typ?: string;
}

const queries = {
    verifyGoogleToken: async(parent: any, { token }:{token: string}) => {
        const googleToken = token;
        const googleOauthURL = new URL('https://oauth2.googleapis.com/tokeninfo');
        googleOauthURL.searchParams.set('id_token', googleToken);

        const { data } = await axios.get<GoogleTokenResult>(googleOauthURL.toString(), {
            responseType: 'json',
        });

        // check if the token is valid
        if (data.email_verified !== 'true') {
            throw new Error('Invalid token');
        }

        // check if user exists in the database
        const user = await prismaClient.user.findUnique({ where: { email: data.email }, });
        // if no user then create a new user in the database
        if(!user) {
            await prismaClient.user.create({
                data: {
                    email: data.email,
                    firstName: data.given_name,
                    lastName: data.family_name,
                    profileImageURL: data.picture,
                },
            });
        }
        
        const userInDb = await prismaClient.user.findUnique({ where: { email: data.email }, });
        if(!userInDb) {
            throw new Error('User with email not found');
        }
        const userToken = await JWTService.generateTokenForUser(userInDb);
        return userToken;
    },
    getCurrentUser: async(parent: any, args: any, ctx: GraphqlContext) => {
        const id = ctx.user?.id;

        if(!id)
            return null;
        const user = await prismaClient.user.findUnique({ where: { id }, });
        return user;
    },
};

const extraResolvers = {
    User: {
        pings: (parent: User) => prismaClient.ping.findMany({ where: { authorId: parent.id } }),
    }
}

export const resolvers = { queries, extraResolvers }; 