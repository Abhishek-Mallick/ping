import { graphql } from "@/gql"

export const getAllPingsQuery = graphql(`#graphql
    query GetAllPings {
        getAllPings {
            id
            content
            imageURL
            author {
                firstName
                lastName
                profileImageURL
            }
        }
    }
`)