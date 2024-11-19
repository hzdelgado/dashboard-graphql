import client from "../utils/apolloClient";
import { gql, useQuery } from "@apollo/client";

// Definir la mutación de GraphQL
const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const loginUser = async (email: string, password: string) => {
  try {
    // Realizar la mutación con Apollo Client
    const { data } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email, password },
    });

    return data.login;  // Retorna los datos del usuario (token, user)
  } catch (error: any) {
    throw new Error(error.message || "Login failed");
  }
};
