import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private base_url = baseUrl.server;
  url = 'https://api.openweathermap.org/data/2.5/forecast';
  params = {
    q: '',
    cnt: '8',
    units: 'metric',
    APPID: '010721642521f31b0fbc8c3831d45951',
  };

  private httpOptions = {
    headers: {
      // Authorization: `Bearer ${this.authService.getJwtToken()}`,
    },
  };

  constructor(private http: HttpClient) {}

  postData(endpoint: any, data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.base_url + endpoint,
      data,
      this.httpOptions
    );
  }

  getSingleNoAuth(endpoint: any) {
    return this.http.get(this.base_url + endpoint).pipe(retry(1));
  }

  getSingleNoAuthID(endpoint: any, id: any) {
    return this.http.get(this.base_url + endpoint + id).pipe(retry(1));
  }

  getAuthSingle(endpoint: any): Observable<any[]> {
    return this.http
      .get<any[]>(this.base_url + endpoint, this.httpOptions)
      .pipe(retry(1));
  }

  getAuthSingleID(endpoint: any, id: any): Observable<any[]> {
    return this.http
      .get<any[]>(this.base_url + endpoint + id, this.httpOptions)
      .pipe(retry(1));
  }

  updateData(endpoint: any, data: any): Observable<any[]> {
    return this.http
      .patch<any[]>(this.base_url + endpoint, data, this.httpOptions)
      .pipe(retry(1));
  }

  updatePutData(endpoint: any, data: any): Observable<any[]> {
    return this.http
      .put<any[]>(this.base_url + endpoint, data, this.httpOptions)
      .pipe(retry(1));
  }

  deleteData(endpoint: any, id: any): Observable<any[]> {
    return this.http.delete<any[]>(
      this.base_url + endpoint + id,
      this.httpOptions
    );
  }
}
