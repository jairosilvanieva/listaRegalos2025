import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { GiftsService } from '../../services/gifts.service';
import { Event } from 'app/interfaces/event.interface';
import { Gift } from 'app/interfaces/gift.interface';

@Component({
  selector: 'app-guest-menu',
  templateUrl: './guest-menu.component.html',
  styleUrls: ['./guest-menu.component.css'],
})
export class GuestMenuComponent implements OnInit {
  event!: Event;
  gifts: Gift[] = [];

  constructor(
    private eventsService: EventsService,
    private giftsService: GiftsService
  ) {}

  ngOnInit(): void {
    const eventCode = localStorage.getItem('eventCode');
    if (eventCode) {
      this.loadEvent(eventCode); 
    }
  }

  loadEvent(code: string): void {
    this.eventsService.verifyEventCode(code).subscribe((events: Event[]) => {
      if (events.length > 0) {
        this.event = events[0];
        this.loadGifts(this.event.id); 
      } else {
        alert('Evento no encontrado');
      }
    });
  }

  loadGifts(eventId: string): void {
    this.giftsService.getGiftsByEvent(eventId).subscribe((gifts: Gift[]) => {
      this.gifts = gifts;
    });
  }

  selectGift(gift: Gift): void {
    if (!gift.isSelected) {
      const invitado = {
        nombre: localStorage.getItem('nombreInvitado') || '',
        apellido: localStorage.getItem('apellidoInvitado') || '',
        dni: localStorage.getItem('dniInvitado') || '',
      };

      gift.isSelected = true;
      gift.selectedBy = invitado;

      this.giftsService.updateGift(gift).subscribe(() => {
        alert('Regalo seleccionado exitosamente');
        this.loadGifts(this.event.id);
      });
    } else {
      alert('Este regalo ya ha sido seleccionado.');
    }
  }

  verProducto(permalink: string): void {
    window.open(permalink, '_blank');
  }
}
