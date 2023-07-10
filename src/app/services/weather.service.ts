import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  message: string | undefined;
  private subject = new Subject<any>();

  constructor() {}

  setMessage(data: any) {
    this.message = data;
  }

  getMessage() {
    return this.message;
  }

  sendClickEvent() {
    this.subject.next(null);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
