import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const loginPayload = {
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:5000/api/users/login', loginPayload)
      .subscribe({
        next: (response: any) => {
          console.log('Login successful', response);
          // Store the token and navigate to another page if needed
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
  }
}
