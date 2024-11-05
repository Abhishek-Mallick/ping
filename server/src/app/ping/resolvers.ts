import { Ping } from "@prisma/client";
import { prismaClient } from "../../clients/db";
import { GraphqlContext } from "../../interfaces";

interface CreateTweetPayload {
        content: string;
        imageURL?: string;
}

const queries = {
    getAllPings: async (parent: any, args: any, ctx: GraphqlContext) => {
        return prismaClient.ping.findMany();
    },
}

const mutation = {
    createTweet: async (parent: any, { payload }:{ payload: CreateTweetPayload }, ctx: GraphqlContext) => {
        if(!ctx.user) {
            throw new Error("Unauthorized");
        }
        const ping = await prismaClient.ping.create({
            data: {
                content: payload.content,
                imageURL: payload.imageURL,
                author: { connect: { id: ctx.user.id } },
            },
        });

        return ping;
    },
};

const extraResolvers = {
    Ping: {
        author: (parent: Ping) => prismaClient.user.findUnique({ where: { id: parent.authorId } }),
    }
}

export const resolvers = { mutation, extraResolvers, queries }