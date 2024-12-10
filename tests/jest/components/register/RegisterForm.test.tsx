import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import RegisterForm from '@/components/register/RegisterForm';
import { useLoader } from '@/context/LoaderContext';
import { signUpUser } from '@/services/authService';
import { setTokenInCookie } from '@/utils/cookies';
import { useRouter } from 'next/navigation';

// Mock de dependencias externas
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/context/LoaderContext', () => ({
  useLoader: jest.fn(),
}));

jest.mock('@/services/authService', () => ({
  signUpUser: jest.fn(),
}));

jest.mock('@/utils/cookies', () => ({
  setTokenInCookie: jest.fn(),
}));

describe('RegisterForm', () => {
  const mockPush = jest.fn();
  const mockShowLoader = jest.fn();
  const mockHideLoader = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useLoader as jest.Mock).mockReturnValue({
      showLoader: mockShowLoader,
      hideLoader: mockHideLoader,
    });
  });

  it('renders the registration form with all fields', async () => {
    render(<RegisterForm />);
    await waitFor(() => {
        expect(screen.getByLabelText('Nombre Completo')).toBeInTheDocument();
        expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument();
        expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirmar Contraseña')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Registrarse' })).toBeInTheDocument();
    });
  });

  it('shows error if password does not meet validation criteria', async () => {
    render(<RegisterForm />);

    
    fireEvent.change(screen.getByTestId('fullName'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: '123' } });
    fireEvent.change(screen.getByTestId('repeatPassword'), { target: { value: '123' } });

    await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));
    });

    await waitFor(() => {
        screen.debug();
      expect(screen.getByText(/La contraseña debe tener al menos 6 caracteres/i)).toBeInTheDocument();
    });
  });

  it('shows error if passwords do not match', async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByTestId('fullName'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByTestId('repeatPassword'), { target: { value: 'Password123' } });

    await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));
    });

    await waitFor(() => {
      expect(screen.getByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();
    });
  });

  it('shows error message if registration fails', async () => {
    (signUpUser as jest.Mock).mockRejectedValueOnce(new Error('Error al registrar'));

    render(<RegisterForm />);

    fireEvent.change(screen.getByTestId('fullName'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByTestId('repeatPassword'), { target: { value: 'Password123!' } });

    await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));
    });

    await waitFor(() => {
      expect(screen.getByText('Error al registrar')).toBeInTheDocument();
    });
  });

  it('redirects to dashboard on successful registration', async () => {
    // Espía configurado antes de renderizar
    const spy = jest.spyOn(Storage.prototype, 'setItem'); // Espía mockeado

    (signUpUser as jest.Mock).mockResolvedValueOnce({
      userId: '123',
      userName: 'Test User',
      profile: 'admin',
      token: 'fakeToken',
    });

    render(<RegisterForm />);

    fireEvent.change(screen.getByTestId('fullName'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByTestId('repeatPassword'), { target: { value: 'Password123!' } });

    await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));
    });
    await waitFor(() => {
      expect(setTokenInCookie).toHaveBeenCalledWith('fakeToken');
      // Verifica que los valores fueron guardados en localStorage}
      expect(spy).toHaveBeenCalledWith('userId', '123');
      expect(spy).toHaveBeenCalledWith('userName', 'Test User');
      expect(spy).toHaveBeenCalledWith('userProfile', 'admin');
      expect(spy).toHaveBeenCalledWith('token', 'fakeToken'); 
      expect(mockPush).toHaveBeenCalledWith('/dashboard/home');
   
    });
    spy.mockRestore();
  });

  it('shows loader during registration process', async () => {
    (signUpUser as jest.Mock).mockResolvedValueOnce({
      userId: '123',
      userName: 'Test User',
      profile: 'admin',
      token: 'fakeToken',
    });

    render(<RegisterForm />);

    fireEvent.change(screen.getByTestId('fullName'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByTestId('repeatPassword'), { target: { value: 'Password123!' } });
    
    await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));
    });
    await waitFor(() => {
        expect(mockShowLoader).toHaveBeenCalled();
        expect(mockHideLoader).toHaveBeenCalled();
    });
  });
});
