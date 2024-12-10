import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { PopupService } from '../services/popup.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  showPassword: boolean = false;
  // showLoginPopup: boolean = false;


  constructor(private auth: AuthService, private http: HttpClient, private dialogService: DialogService, private popupService: PopupService) { }

  ngOnInit(): void {

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  login() {
    if (!this.username || !this.password) {
      this.popupService.showPopup('กรุณาใส่ข้อมูลให้ครบทุกช่อง');

    } else if (this.password.length < 8) {
      this.popupService.showPopup('กรุณาใส่ข้อมูลไม่ถึง8ตัว');

    } else {
       const payload = {
        username: this.username,
        password: this.password,
      };

      this.auth.authLogin(payload).subscribe(
        (response: any) => {
          // if (response.status === 'success' && !response.data.error)
          if (!response.data.error) {
            this.popupService.showPopup('Login successful:');
            localStorage.setItem('token', response.data.token); // Store the token
            localStorage.setItem('userId', response.data.userId);
            setTimeout(() => {
              this.dialogService.closeDialog('login');
              window.location.reload();
            }, 3000);
          } else {
            // Show error message if login failed
            this.popupService.showPopup = response.data.error || 'Login failed. Please check your username and password';

          }
        },
        (error) => {
          // Handle any errors from the HTTP request itself
          this.popupService.showPopup('An error occurred. Please try again later.');
        }
      );
    }
  }

  openRegisterDialog(){
    this.dialogService.openRegisterDialog();
  }

  openForgotpass() {
    this.dialogService.openForgotpassDialog();
  }

  // loginWithGoogle() {
  //   const currentUrl = window.location.href;  // เก็บ URL ปัจจุบัน
  //   localStorage.setItem('redirectUrl', currentUrl);  // เก็บ URL ใน localStorage

  //   // นำทางไปยัง Google OAuth
  //   window.location.href = 'http://localhost:3090/auth/google';
  // }


  closeotp() {
    this.dialogService.closeDialog('login');
  }



}
