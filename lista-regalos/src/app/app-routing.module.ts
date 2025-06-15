import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { GiftListComponent } from './components/gift-list/gift-list.component';
import { GuestComponent } from './components/guest/guest.component';
import { LoginComponent } from './components/login/login.component';
import { GuestMenuComponent } from './components/guest-menu/guest-menu.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthGuard } from './guards/auth.guard'; // 👈 Importa el guard

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'events/:eventId/gifts', component: GiftListComponent, canActivate: [AuthGuard] },
  { path: 'guest', component: GuestComponent, canActivate: [AuthGuard] },
  { path: 'guest/events/:eventId/gifts', component: GuestMenuComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
