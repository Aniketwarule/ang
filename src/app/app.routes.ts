import { Routes } from '@angular/router';
import { LoginComponent } from './app.component';
import { RegisterComponent } from './app.component';
import { ProfileComponent } from './app.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent }
];
