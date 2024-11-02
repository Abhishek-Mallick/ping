import { GraphqlContext } from "../../interfaces";

interface CreateTweetPayload {
        content: string;
        imageURL?: string;
}

const mutation = {
    createTweet: (parent: any, { payload }:{ payload: CreateTweetPayload }, ctx: GraphqlContext) => {
        return "Tweet created";
    }
}