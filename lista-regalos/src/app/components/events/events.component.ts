import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { AuthService } from '../../services/auth.service';
import { Event } from 'app/interfaces/event.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  userId: string = '';
  eventForm: FormGroup;

  constructor(
    private authService: AuthService,
    private eventsService: EventsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.eventForm = this.fb.group({
      eventType: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', [Validators.required, this.dateValidator]],
      time: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';

    if (this.userId) {
      this.loadEvents();
    }
  }

  loadEvents(): void {
    this.eventsService.getEventsByHost(this.userId).subscribe((data: Event[]) => {
      this.events = data;
    });
  }

  createEvent(): void {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched(); // Para mostrar errores si hay campos inválidos
      return;
    }

    const userId = this.authService.getUserId();
    if (userId) {
      const newEvent: Event = {
        id: this.generateUniqueId(),
        eventType: this.eventForm.value.eventType,
        location: this.eventForm.value.location,
        date: this.eventForm.value.date,
        time: this.eventForm.value.time,
        description: this.eventForm.value.description,
        code: this.generateUniqueCode(),
        userId: userId,
      };

      this.eventsService.createEvent(newEvent).subscribe({
        next: () => {
          alert('Event successfully created');
          this.loadEvents();
          this.eventForm.reset(); // Reiniciar el formulario después de crear el evento
        },
        error: (error) => {
          console.error('Error creating event:', error);
          alert('Error creating event');
        },
      });
    }
  }

  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  generateUniqueCode(): string {
    let uniqueCode = '';
    let codeExists = true;

    while (codeExists) {
      uniqueCode = Math.random().toString(36).substr(2, 8).toUpperCase();
      codeExists = this.events.some((event) => event.code === uniqueCode);
    }

    return uniqueCode;
  }

  selectGifts(eventId: string): void {
    this.router.navigate(['/events', eventId, 'gifts']);
  }

  logout(): void {
    this.authService.logout();
  }

  // Validador para asegurarse de que la fecha sea futura o actual
  dateValidator(control: any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Configura la hora a las 0 para comparar solo la fecha
    return selectedDate >= today ? null : { invalidDate: true };
  }
}
