// register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PopupService } from '../services/popup.service';
import { DialogService } from '../services/dialog.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  otpcheck = '';
  password = '';
  passwordConfirm = '';
  showOtpInput = false;
  countdown = 0;
  countdownInterval: any;
  showPassword = false;
  showConfirmPassword = false;
  isInputReadonly: boolean = false;
  otpVerified: boolean = false;

  constructor(private router: Router, private http: HttpClient,private dialogService: DialogService, private popupService: PopupService) {

  }



  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  register() {
    if (!this.username || !this.password || !this.passwordConfirm || !this.email) {
      this.popupService.showPopup('กรุณาใส่ข้อมูลให้ครบทุกช่อง');
    } else if (this.password.length < 8) {
      this.popupService.showPopup('กรุณาใส่ข้อมูลไม่ถึง8ตัว');
    } else if (!this.otpVerified) {
      this.popupService.showPopup('กรุณายืนยันEMAIL');
    } else if (this.password !== this.passwordConfirm) {
      this.popupService.showPopup('รหัสผ่านไม่ตรงกัน');
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
        (response: any) => {
          if (response.status === 'success') {
            this.popupService.showPopup('Registration successful');
            setTimeout(() => {
              this.dialogService.openLoginDialog();
            }, 3000);

          } else {
            this.popupService.showPopup(response.data || 'Registration failed');
          }
        },
        error => {
          console.error('Error:', error);
          this.popupService.showPopup('An error occurred during registration');
        }
      );
    }
  }

  verifyEmail() {
    if (!this.email || !this.validateEmail(this.email)) {
      this.popupService.showPopup('Email ไม่ถูกต้อง');
      return;
    }
    this.startCountdown();
    const payload = { email: this.email };
    this.http.post('http://localhost:3090/verifiedEmail', payload).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.showOtpInput = true; // แสดง input สำหรับ OTP
          setTimeout(() => {
            this.popupService.showPopup(response.message)
          }, 3000);
          this.email = response.data;
        } else {
          this.popupService.showPopup(response.message || 'Verification failed');
        }
      },
      error => {
        if (error.status === 409) {
          this.popupService.showPopup('Email นี้ได้รับการยืนยันแล้วหรือมีปัญหา กรุณาตรวจสอบอีกครั้ง');
          this.countdown = 0;
        } else {
          console.error('Error:', error);
          this.popupService.showPopup('An error occurred. Please try again later.');
          this.countdown = 0;
        }
      }
    );
  }

  checkOtpLength() {
    if (this.otpcheck && this.otpcheck.toString().length === 6) {
      this.verifyOtp();
    }
  }
  verifyOtp() {

    const payload = {
      email: this.email,
      otp: this.otpcheck.toString(),
    };

    this.http.post('http://localhost:3090/verifyPassword', payload, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.popupService.showPopup('OTP Verified Successfully');
          this.isInputReadonly = true;
          this.countdown = 0;
          this.otpVerified = true;

        } else {
          this.popupService.showPopup = response.message;  // ข้อความที่ได้รับจาก API
        }
      },
      error => {
        console.error('Verification error:', error);
        // แสดงข้อความข้อผิดพลาดหากเกิดปัญหาในการติดต่อ API
        this.popupService.showPopup('มีข้อผิดพลาดในการยืนยัน OTP');
      }
    );
  }

  // ฟังก์ชันเริ่มต้นนับถอยหลัง
  startCountdown() {
    this.countdown = 60;
    this.countdownInterval = setInterval(() => {
      this.countdown -= 1;
      if (this.countdown === 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }



  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


  resendOtp() {
    clearInterval(this.countdownInterval);
    this.verifyEmail(); // ส่ง OTP ใหม่
  }

  return() {
    this.dialogService.openLoginDialog();
  }
  closeotp() {
    this.dialogService.closeDialog('register');
  }
}
