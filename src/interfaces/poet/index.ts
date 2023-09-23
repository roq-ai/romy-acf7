import { GetQueryInterface } from 'interfaces';

export interface PoetInterface {
  id?: string;
  name: string;
  birth_date?: any;
  death_date?: any;
  nationality?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface PoetGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  nationality?: string;
}
