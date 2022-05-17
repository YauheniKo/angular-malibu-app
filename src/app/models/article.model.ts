import {Tag} from "./tag.model";

export class Article {
  id?: any;
  userId?: any;
  username?: string;
  title?: string;
  description?: string;
  text?: string;
  tags?: Tag[];
  likes?: any;
  meLiked?: boolean;
  published?: boolean;
  filesUrl?: Array<string> = []

}
