import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";


// Configura la URL de tu servidor GraphQL (ajusta según tu entorno)
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql", // Cambia esta URL
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;