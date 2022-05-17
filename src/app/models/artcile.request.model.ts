import {Tag} from "./tag.model";


export class ArticleRequest {
  userId?: string;
  title?: string;
  description?: string;
  text?: string;
  tags?: Tag[];
  formData?: FormData;
}
