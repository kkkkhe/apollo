import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { createFragmentRegistry } from "@apollo/client/cache";

const cache = new InMemoryCache({
  fragments: createFragmentRegistry(gql`
    fragment UserFragment on User {
      id,
      name,
      surname
    }
  `)
});
export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache,
});