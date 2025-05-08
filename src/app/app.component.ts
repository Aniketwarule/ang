import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

interface User {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterModule, NgIf],
  template: `
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .container {
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    a {
      color: #007bff;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  `]
})
export class AppComponent {
  title = 'user-auth-app';
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, NgIf],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form (ngSubmit)="login()">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" [(ngModel)]="email" name="email">
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" [(ngModel)]="password" name="password">
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a routerLink="/register">Register</a></p>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    localStorage.setItem('user', JSON.stringify({ email: this.email, password: this.password }));
    this.router.navigate(['/profile']);
  }
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, NgIf],
  template: `
    <div class="register-container">
      <h2>Register</h2>
      <form (ngSubmit)="register()">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" [(ngModel)]="name" name="name">
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" [(ngModel)]="email" name="email">
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" [(ngModel)]="password" name="password">
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a routerLink="/login">Login</a></p>
    </div>
  `
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private router: Router) {}

  register() {
    localStorage.setItem('user', JSON.stringify({ name: this.name, email: this.email, password: this.password }));
    this.router.navigate(['/profile']);
  }
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="profile-container">
      <h2>Profile</h2>
      <div *ngIf="user">
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Password:</strong> {{ user.password }}</p>
      </div>
      <div *ngIf="!user">
        <p>No user data found. Please <a routerLink="/login">login</a> or <a routerLink="/register">register</a>.</p>
      </div>
    </div>
  `
})
export class ProfileComponent {
  user: User | null = null;

  constructor() {
    const userStr = localStorage.getItem('user');
    this.user = userStr ? JSON.parse(userStr) : null;
  }
}
