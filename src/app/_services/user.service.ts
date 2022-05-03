import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Article} from "../models/article.model";
import {User} from "../models/user.model";

const API_URL = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + '/public', { responseType: 'text' });
  }

  getUserList(): Observable<any> {
    return this.http.get<User[]>(API_URL);
  }
  //
  // getAll(): Observable<User[]> {
  //   return this.http.get<User[]>(API_URL);
  // }

  get(id: any): Observable<User> {
    return this.http.get(`${API_URL}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(API_URL, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }


  findByEmail(email: any): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}?email=${email}`);
  }







  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + '/admin', { responseType: 'text' });
  }
}
