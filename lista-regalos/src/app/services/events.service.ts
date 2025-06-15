import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private apiUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  getEventsByHost(hostId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}?userId=${hostId}`);
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  verifyEventCode(code: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}?code=${code}`);
  }
}
