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

// Mutación para agregar un nuevo usuario (Ejemplo)
const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      userId
      userName
      email
    }
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

// Función para agregar un usuario
export const addUser = async (name: string, email: string, password: string) => {
  try {
    const { data } = await client.mutate({
      mutation: ADD_USER,
      variables: { name, email, password },
    });
    return data.addUser;
  } catch (error: any) {
    throw new Error("Error adding user: " + error.message);
  }
};
