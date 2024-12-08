import { loginUser, signUpUser } from '../../../services/authService';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import client from "@/utils/apolloClient";  // Importa el cliente real que deseas mockear

// Mockear el cliente Apollo
jest.mock('@/utils/apolloClient', () => ({
    mutate: jest.fn(),
  }));
  
  const mockClient = client as jest.Mocked<typeof client>;

describe('Test GraphQL Services', () => {
  it('should login a user successfully', async () => {
    // Simula la respuesta de la mutación de login
    const mockLoginResponse = {
      data: {
        login: {
          token: 'mockedToken',
          email: 'test@example.com',
          userId: '123',
          userName: 'Test User',
          profile: 'admin',
        },
      },
    };

    mockClient.mutate.mockResolvedValue(mockLoginResponse);

    // Llamar a la función loginUser y verificar la respuesta
    const response = await loginUser('test@example.com', 'password123');
    
    expect(response).toEqual(mockLoginResponse.data.login);
    expect(client.mutate).toHaveBeenCalledWith({
      mutation: gql`
        mutation login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
            email
            userId
            userName
            profile
          }
        }
      `,
      variables: {
        email: 'test@example.com',
        password: 'password123',
      },
    });
  });

  it('should sign up a user successfully', async () => {
    // Simula la respuesta de la mutación de registro
    const mockSignUpResponse = {
      data: {
        addUser: {
          token: 'mockedToken',
          email: 'newuser@example.com',
          userId: '124',
          userName: 'New User',
          profile: 'user',
        },
      },
    };

    // Configurar la respuesta mockeada
    mockClient.mutate.mockResolvedValue(mockSignUpResponse);

    // Llamar a la función signUpUser y verificar la respuesta
    const response = await signUpUser('New User', 'newuser@example.com', 'password123');

    expect(response).toEqual(mockSignUpResponse.data.addUser);
    expect(client.mutate).toHaveBeenCalledWith({
      mutation: gql`
        mutation addUser($name: String!, $email: String!, $password: String!) {
          addUser(name: $name, email: $email, password: $password) {
            token
            email
            userId
            userName
            profile
          }
        }
      `,
      variables: {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'password123',
      },
    });
  });

  it('should throw an error when login fails', async () => {
    // Simula un error en la mutación
    const mockError = new Error('Login failed');
    mockClient.mutate.mockRejectedValue(mockError);

    // Verificar que la función lanza un error
    await expect(loginUser('test@example.com', 'wrongpassword')).rejects.toThrow('Login failed');
  });

  it('should throw an error when sign up fails', async () => {
    // Simula un error en la mutación
    const mockError = new Error('Sign up failed');
    mockClient.mutate.mockRejectedValue(mockError);

    // Verificar que la función lanza un error
    await expect(signUpUser('New User', 'newuser@example.com', 'password123')).rejects.toThrow('Sign up failed');
  });
});
