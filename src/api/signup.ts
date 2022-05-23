import { publicAxios } from './http';

export const generateSignupEmail = (email: string) =>
  publicAxios.post('/user/generate-token-with-email', { email });

export const signupWithEmail = (payload: {
  token: string | null;
  firstName: string;
  lastName: string;
  password: string;
}) => publicAxios.put('/user/signup-with-email', payload);

export const signupWithGoogle = (tokenId: string) =>
  publicAxios.post('/user/signup-signin-google', { token: tokenId });

export const signInWithEmail = async (email: string, password: string) =>
  publicAxios.post('/user/signin-with-email', { email, password });
