import client from "../utils/apolloClient";
import { gql } from "@apollo/client";

// Definir la mutación de GraphQL
const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      email
      userId
      userName
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      email
      userId
      userName
    }
  }
`;

export const loginUser = async (email: string, password: string) => {
  try {
    const { data } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email, password },
    });

    return data.login;
  } catch (error: any) {
    throw new Error(error.message || "Login failed");
  }
};

export const signUpUser = async (name: string, email: string, password: string) => {
  try {
    
    const { data } = await client.mutate({
      mutation: REGISTER_MUTATION,
      variables: { name, email, password },
    });

    return data.addUser; 
  } catch (error: any) {
    throw new Error(error.message || "Sign up failed");
  }
};
