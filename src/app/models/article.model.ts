import {Tag} from "./tag.model";

export class Article {
  id?: any;
  userId?:any;
  username?:string;
  title?: string;
  description?: string;
  text?: string;
  tag?: Tag[];
  likes?:any;
  meLiked?:boolean;
  published?: boolean;
}
