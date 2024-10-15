import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  showPopup: boolean = false;
  popupMessage: string = '';
  showPassword: boolean = false;
  

  constructor(private router: Router, private http: HttpClient) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (!this.username || !this.password) {
      this.popupMessage = 'กรุณาใส่ข้อมูลให้ครบทุกช่อง';
      this.showPopup = true;
    } else if (this.password.length < 8) {
      this.popupMessage = 'Password must be at least 8 characters';
      this.showPopup = true;
    } else {
      // Register logic here
      console.log('Form Submitted');

      const payload = {
        username: this.username,
        password: this.password,
      };

      this.http.post('http://localhost:3090/login', payload, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          localStorage.setItem('token', response.token); // Store the token
          this.router.navigate(['banner']); // Navigate to the banner page
        },
        error => {
          console.error('Login error:', error);
        }
      );
    }
}
  closePopup() {
    this.showPopup = false;
  }
}
