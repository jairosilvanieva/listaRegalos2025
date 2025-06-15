import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'lista-regalos';

  constructor(private authService: AuthService, private router: Router) {}

 
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  
  isGuestLoggedIn(): boolean {
    return localStorage.getItem('nombreInvitado') !== null;
  }

  
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  
  logoutGuest() {
    
    localStorage.removeItem('nombreInvitado');
    localStorage.removeItem('apellidoInvitado');
    localStorage.removeItem('dniInvitado');
    localStorage.removeItem('eventCode');
    
    this.router.navigate(['/']);
  }
}
