import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  registrarUsuario() {
    if (this.registerForm.valid) {
      const newUser: User = {
        id: this.generateUniqueId(),
        name: this.registerForm.value.nombre,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        events: [],
      };

      this.authService.registerUser(newUser).subscribe({
        next: () => {
          alert('Usuario registrado con éxito');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al registrar el usuario:', error);
        },
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
