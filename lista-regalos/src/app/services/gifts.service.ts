import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gift } from '../interfaces/gift.interface';
import { Event } from '../interfaces/event.interface';
import { Guest } from '../interfaces/guest.interface';

@Injectable({
  providedIn: 'root',
})
export class GiftsService {
  private apiUrl = 'http://localhost:3000/gifts';
  private eventsUrl = 'http://localhost:3000/events';
  private guestsUrl = 'http://localhost:3000/guests';

  constructor(private http: HttpClient) {}

  getGiftsByEvent(eventId: string): Observable<Gift[]> {
    return this.http.get<Gift[]>(`${this.apiUrl}?eventId=${eventId}`);
  }

  addGift(gift: Gift): Observable<Gift> {
    return this.http.post<Gift>(this.apiUrl, gift);
  }

  updateGift(gift: Gift): Observable<Gift> {
    return this.http.put<Gift>(`${this.apiUrl}/${gift.id}`, gift);
  }

  verifyEventCode(code: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventsUrl}?code=${code}`);
  }

  registerGuest(guest: Guest): Observable<Guest> {
    return this.http.post<Guest>(this.guestsUrl, guest);
  }

  verifyGuest(guest: Guest): Observable<Guest[]> {
    return this.http.get<Guest[]>(`${this.guestsUrl}?dni=${guest.dni}&eventId=${guest.eventId}`);
  }
}
