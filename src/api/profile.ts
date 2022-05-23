import { privateAxios } from './http';

// eslint-disable-next-line import/prefer-default-export
export const getProfile = () => privateAxios.get('/user/profile');
