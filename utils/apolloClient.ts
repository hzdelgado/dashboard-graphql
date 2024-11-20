import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";


// Función para obtener el token desde el almacenamiento (por ejemplo, localStorage)
const getToken = () => {
  // Asumimos que el token está guardado en el localStorage
  return localStorage.getItem("token"); // Cambia esto según donde guardes el token
};

// Crear el enlace de autenticación
const authLink = new ApolloLink((operation, forward) => {
    // Verifica si la operación es una mutación de login o addUser (puedes ajustarlo a más mutaciones o queries)
    const isLoginOrAddUser = operation.operationName === "login" || operation.operationName === "addUser";

    if (!isLoginOrAddUser) {
      // Si no es login ni addUser, agregamos el token al encabezado
      const token = getToken();
      if (token) {
        operation.setContext({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }
  

  return forward(operation);
});

// Configura la URL de tu servidor GraphQL (ajusta según tu entorno)
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql", // Cambia esta URL
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;