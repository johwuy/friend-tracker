import { Routes } from '@angular/router';
import { HomePage } from './features/pages/home/home.page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage }
];
