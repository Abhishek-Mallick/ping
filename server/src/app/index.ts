import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { prismaClient } from '../clients/db';
import cors from 'cors';
 
import { User } from "./user"
import { GraphqlContext } from '../interfaces';
import JWTService from '../services/jwt';

export async function initServer() {
    const app = express();

    app.use(bodyParser.json()); // middleware
    app.use(cors());

    const graphqlServer = new ApolloServer<GraphqlContext>({
        typeDefs: `
            ${User.types}
            type Query {
                ${User.queries}
            }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries,
            },
        },
      });
    
    await graphqlServer.start();

    app.use('/graphql', expressMiddleware(graphqlServer, {context: async({ req,res }) => {
        // since header looks like "authorization": "Bearer eyJhbGciOiJIUzI1NiI...." we split it using Bearer and take the second part
        return {
            user: req.headers.authorization ? JWTService.decodeToken(req.headers.authorization.split('Bearer ')[1]) : undefined,
            prisma: prismaClient,
        }
    }}));

    return app;
}