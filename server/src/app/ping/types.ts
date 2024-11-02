export const types = `#graphql

    input CreatePingData {
        content: String!
        imageURL: String
    }

    type Ping {
        id: ID!
        content: String!
        imageURL: String

        author: User
    }
`