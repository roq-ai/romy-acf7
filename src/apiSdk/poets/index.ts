import axios from 'axios';
import queryString from 'query-string';
import { PoetInterface, PoetGetQueryInterface } from 'interfaces/poet';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPoets = async (query?: PoetGetQueryInterface): Promise<PaginatedInterface<PoetInterface>> => {
  const response = await axios.get('/api/poets', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPoet = async (poet: PoetInterface) => {
  const response = await axios.post('/api/poets', poet);
  return response.data;
};

export const updatePoetById = async (id: string, poet: PoetInterface) => {
  const response = await axios.put(`/api/poets/${id}`, poet);
  return response.data;
};

export const getPoetById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/poets/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePoetById = async (id: string) => {
  const response = await axios.delete(`/api/poets/${id}`);
  return response.data;
};
