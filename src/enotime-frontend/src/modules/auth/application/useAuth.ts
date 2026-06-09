import { useState } from 'react';
import { authGateway } from '../infrastructure/authGateway';
import type { RegisterPayload, User } from '../domain/authTypes';
import { toast } from 'sonner';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (email: string, password: string, onSuccess: (user: User) => void) => {
    setIsLoading(true);
    try {
      const data = await authGateway.loginLocal(email, password);
      const storedUser = {
        ...data.user,
        fullName: data.user.fullName || data.user.email,
      };

      localStorage.setItem('enotime_token', data.token);
      localStorage.setItem('enotime_user', JSON.stringify(storedUser));
      toast.success('Welcome back!');
      onSuccess(storedUser);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Incorrect credentials.';
      toast.error('Access Denied', { description: message });
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (payload: RegisterPayload, onSuccess: () => void) => {
    setIsLoading(true);
    try {
      await authGateway.register(payload);
      toast.success('User registered successfully!');
      onSuccess();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create user.';
      toast.error('Registration Error', { description: message });
    } finally {
      setIsLoading(false);
    }
  };

  return { login, registerUser, isLoading };
};