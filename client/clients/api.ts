import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.GRAPHQL_ENDPOINT || 'http://localhost:8000/graphql';

const isClient = typeof window !== 'undefined'; // that is if its a server side rendered page it should be set as false

// check to authorize the user should only be done on the client side
// export const graphqlClient = new GraphQLClient(endpoint, {
//     headers: () => ({
//         Authorization: isClient ? `Bearer ${window.localStorage.getItem("__ping_token")}` : "",
//     })
// });

export const graphqlClient = new GraphQLClient(endpoint);