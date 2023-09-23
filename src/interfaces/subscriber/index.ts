import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SubscriberInterface {
  id?: string;
  user_id: string;
  subscription_date?: any;
  expiration_date?: any;
  status: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface SubscriberGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  status?: string;
}
