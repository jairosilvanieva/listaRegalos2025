import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; 
import { map, catchError } from 'rxjs/operators'; 
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; 

  constructor(private http: HttpClient, private router: Router) {}

 
  login(email: string, password: string): Observable<string | null> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((users: User[]): string | null => {
        const user = users.find((u: User) => u.email === email && u.password === password);
        return user?.id ?? null; 
      }),
      catchError(() => of(null))
    );
  }
  

  
  saveSession(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  
  logout(): void {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  
  isAuthenticated(): boolean {
    return localStorage.getItem('userId') !== null;
  }

  
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, user);
  }
}
