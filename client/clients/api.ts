import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.GRAPHQL_ENDPOINT || 'http://localhost:8000/graphql';
export const graphqlClient = new GraphQLClient(endpoint);
