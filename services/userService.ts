import client from "../utils/apolloClient";
import { gql } from "@apollo/client";

// Query para obtener los usuarios
const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      createdAt
      profile
      active
    }
  }
`;


// Mutación para actualizar un usuario (Ejemplo)
const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input)
  }
`;

// Función para obtener los usuarios
export const getUsers = async () => {
  try {
    const { data } = await client.query({ query: GET_USERS });
    return data.users;
  } catch (error: any) {
    throw new Error("Error fetching users: " + error.message);
  }
};

export const updateUser = async (input: { id: string, active: boolean, profile: string }) => {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_USER,
      variables: { input },
    });
    return data.updateUser;
  } catch (error: any) {
    throw new Error("Error updating user: " + error.message);
  }
};
