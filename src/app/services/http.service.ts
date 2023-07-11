import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  params = {
    q: '',
    cnt: '8',
    units: 'metric',
  };

  private httpOptions = {
    headers: {
      // Authorization: `Bearer ${this.authService.getJwtToken()}`,
    },
  };

  constructor(private http: HttpClient) {}

  getCities() {
    return this.http.get<any>('/assets/city.list.json');
  }

  postData(endpoint: any, data: any): Observable<any[]> {
    return this.http.post<any[]>(endpoint, data, this.httpOptions);
  }

  getSingleNoAuth(endpoint: any) {
    return this.http.get(endpoint).pipe(retry(1));
  }

  getSingleNoAuthID(endpoint: any, id: any) {
    return this.http.get(endpoint + id).pipe(retry(1));
  }

  getAuthSingle(endpoint: any): Observable<any[]> {
    return this.http.get<any[]>(endpoint, this.httpOptions).pipe(retry(1));
  }

  getAuthSingleID(endpoint: any, id: any): Observable<any[]> {
    return this.http.get<any[]>(endpoint + id, this.httpOptions).pipe(retry(1));
  }

  updateData(endpoint: any, data: any): Observable<any[]> {
    return this.http
      .patch<any[]>(endpoint, data, this.httpOptions)
      .pipe(retry(1));
  }

  updatePutData(endpoint: any, data: any): Observable<any[]> {
    return this.http
      .put<any[]>(endpoint, data, this.httpOptions)
      .pipe(retry(1));
  }

  deleteData(endpoint: any, id: any): Observable<any[]> {
    return this.http.delete<any[]>(endpoint + id, this.httpOptions);
  }
}
