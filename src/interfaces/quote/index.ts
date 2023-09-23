import { InsightInterface } from 'interfaces/insight';
import { PublisherInterface } from 'interfaces/publisher';
import { GetQueryInterface } from 'interfaces';

export interface QuoteInterface {
  id?: string;
  content: string;
  publisher_id: string;
  created_at?: any;
  updated_at?: any;
  insight?: InsightInterface[];
  publisher?: PublisherInterface;
  _count?: {
    insight?: number;
  };
}

export interface QuoteGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  publisher_id?: string;
}
