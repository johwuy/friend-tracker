import { Routes } from '@angular/router';
import { HomePage } from './features/pages/home/home.page';
import { ContactPage } from '@features/pages/contact/contact.page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'contact', redirectTo: 'home', pathMatch: 'full' },
  { path: 'contact/:id', component: ContactPage }
];
