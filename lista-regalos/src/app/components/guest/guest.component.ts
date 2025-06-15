import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GiftsService } from '../../services/gifts.service';
import { Event } from 'app/interfaces/event.interface';
import { Guest } from 'app/interfaces/guest.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css'],
})
export class GuestComponent {
  guestForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private giftsService: GiftsService,
    private router: Router
  ) {
    this.guestForm = this.fb.group({
      eventCode: ['', Validators.required],
      nombreInvitado: ['', Validators.required],
      apellidoInvitado: ['', Validators.required],
      dniInvitado: ['', Validators.required],
    });
  }

  ingresarComoInvitado() {
    if (this.guestForm.valid) {
      const { eventCode, nombreInvitado, apellidoInvitado, dniInvitado } = this.guestForm.value;
      
      this.giftsService.verifyEventCode(eventCode).subscribe(
        (eventos: Event[]) => {
          if (eventos.length > 0) {
            const evento = eventos[0];
            const invitado: Guest = {
              nombre: nombreInvitado,
              apellido: apellidoInvitado,
              dni: dniInvitado,
              eventId: evento.id,
            };

            this.giftsService.verifyGuest(invitado).subscribe((guests: Guest[]) => {
              if (guests.length === 0) {
                this.giftsService.registerGuest(invitado).subscribe(() => {
                  this.onSuccessfulGuestRegistration();
                });
              } else {
                this.onSuccessfulGuestRegistration();
              }
            });
          } else {
            alert('Código de evento no válido');
          }
        },
        (error) => {
          console.error('Error al verificar el código del evento:', error);
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  onSuccessfulGuestRegistration(): void {
    const { nombreInvitado, apellidoInvitado, dniInvitado, eventCode } = this.guestForm.value;
    localStorage.setItem('nombreInvitado', nombreInvitado);
    localStorage.setItem('apellidoInvitado', apellidoInvitado);
    localStorage.setItem('dniInvitado', dniInvitado);
    localStorage.setItem('eventCode', eventCode);

    this.router.navigate(['/guest/events', eventCode, 'gifts']);
  }
}
