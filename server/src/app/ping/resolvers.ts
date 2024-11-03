import { prismaClient } from "../../clients/db";
import { GraphqlContext } from "../../interfaces";

interface CreateTweetPayload {
        content: string;
        imageURL?: string;
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

export const resolvers = { mutation }