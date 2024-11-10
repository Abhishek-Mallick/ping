import { graphqlClient } from "@/clients/api"
import { getAllPingsQuery } from "@/graphql/query/ping"
import { useQuery } from "@tanstack/react-query"

export const useGetAllPings = () => {
    const query = useQuery({
        queryKey: ['all-tweets'],
        queryFn: () => graphqlClient.request(getAllPingsQuery)
    })
    return { ...query, pings: query.data?.getAllPings }
}