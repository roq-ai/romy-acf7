import { QuoteInterface } from 'interfaces/quote';
import { GetQueryInterface } from 'interfaces';

export interface InsightInterface {
  id?: string;
  content: string;
  quote_id: string;
  created_at?: any;
  updated_at?: any;

  quote?: QuoteInterface;
  _count?: {};
}

export interface InsightGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  quote_id?: string;
}
