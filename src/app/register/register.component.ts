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
  password: string = '';
  passwordConfirm: string = '';
  email: string = '';
  showPopup: boolean = false;
  popupMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

 
  constructor(private router: Router, private http: HttpClient) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
 
  register() {
    if (!this.username || !this.password || !this.passwordConfirm || !this.email) {
      this.popupMessage = 'กรุณาใส่ข้อมูลให้ครบทุกช่อง';
      this.showPopup = true;
    } else if (this.password.length < 8) {
      this.popupMessage = 'Password must be at least 8 characters';
      this.showPopup = true;
    } else if (this.password !== this.passwordConfirm) {
      this.popupMessage = 'Passwords do not match';
      this.showPopup = true;
    } else {
      // Register logic here
      console.log('Form Submitted');

      const payload = {
        username: this.username,
        email: this.email,
        password: this.password,
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
          this.router.navigate(['banner']);
        },
        error => {
          console.error('Registration error:', error);
          // Handle error, e.g., show a notification to the user
        }
      );
    }
    }
    
   
  closePopup() {
    this.showPopup = false;
  }
  return() {
    this.router.navigate(['login']);
  }
}
