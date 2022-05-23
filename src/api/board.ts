import { BoardPayload } from 'store/actions';
import { privateAxios } from './http';

export const createBoardApi = async (payload: BoardPayload) =>
  privateAxios.post('/user/board', payload);
