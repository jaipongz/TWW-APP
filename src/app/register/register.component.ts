// register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs'; // Optional for handling responses

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Fix the property name to `styleUrls`
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  register() {
    const payload = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:3090/register', payload, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).subscribe(
      response => {
        console.log('Registration successful:', response);
        // Navigate to login page or perform other actions
        this.router.navigate(['login']);
      },
      error => {
        console.error('Registration error:', error);
        // Handle error, e.g., show a notification to the user
      }
    );
  }

  return() {
    this.router.navigate(['login']);
  }
}
