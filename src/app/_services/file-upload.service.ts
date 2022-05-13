import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ArticleRequest} from "../models/artcile.request.model";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'http://localhost:8080/api/articles/image/angular';

  constructor(private http: HttpClient) {
  }

  // upload(files: FileList): Observable<HttpEvent<any>> {
  //   const formData: FormData = new FormData();
  //
  //   // @ts-ignore
  //   for (const file of files) {
  //     formData.append('file', file);
  //   }
  //
  //   const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
  //     reportProgress: true,
  //     responseType: 'json'
  //   });
  //   return this.http.request(req);
  // }
  upload(files: FileList): Observable<any> {
    const formData: FormData = new FormData();

    // @ts-ignore
    for (const file of files) {
      formData.append('file', file);
    }

    formData.append('article', new Blob([JSON.stringify({
      "userId": 7788,
      "tagName": "someTag"
    })], {
      type: "application/json"
    }));
    return this.http.post(`${this.baseUrl}/upload`, formData, {
      headers: {'header1': 'value1'}
    });
  }

  // getFiles(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/files`);
  // }
}
