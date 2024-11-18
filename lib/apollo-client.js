import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Reemplaza con tu endpoint GraphQL
  cache: new InMemoryCache(),
});

export default client;