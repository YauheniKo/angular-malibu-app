import {Tag} from "./tag.model";

export class Article {
  id?: any;
  userId?:any;
  username?:string;
  title?: string;
  description?: string;
  text?: string;
  tag?: Tag[];
  published?: boolean;
}
