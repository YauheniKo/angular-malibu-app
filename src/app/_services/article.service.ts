import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Article} from "../models/article.model";
import {AppConstants} from "../app.constants";

const baseUrl = AppConstants.API_URL + 'articles';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Article[]> {
    return this.http.get<Article[]>(baseUrl);
  }

  get(id: any): Observable<Article> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  // create(data: any): Observable<any> {
  //   return this.http.post(baseUrl, data);
  // }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  findByTitle(title: any): Observable<Article[]> {
    return this.http.get<Article[]>(`${baseUrl}?title=${title}`);
  }

  gradeLike(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/like/${id}`);
  }
}
