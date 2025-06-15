import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MercadoLibreResponse } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class MercadoLibreService {
  private apiUrl = 'https://api.mercadolibre.com/sites/MLA/search?q=';

  constructor(private http: HttpClient) {}

  searchProducts(query: string, limit: number, offset: number): Observable<MercadoLibreResponse> {
    return this.http.get<MercadoLibreResponse>(`${this.apiUrl}${query}&limit=${limit}&offset=${offset}`);
  }
}
