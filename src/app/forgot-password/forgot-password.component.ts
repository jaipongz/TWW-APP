import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { PopupService } from '../services/popup.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {


  constructor(private router: Router, private http: HttpClient, private dialogService: DialogService, private popupService: PopupService,private auth:AuthService) {
    this.startTimer();
  }

  email: string = '';
  emailForOtp: string = '';
  password: string = '';
  passwordConfirm: string = '';
  isOtpVerified: boolean = false; // ตัวแปรเพื่อแสดงฟอร์มกรอกรหัสผ่าน
  isEmailSubmitted: boolean = false;
  otp: string[] = ['', '', '', '', '', '']; // ช่องสำหรับเก็บ OTP
  showResendButton: boolean = true;
  counter: number = 60;
  interval: any;



  submitemail() {
    if (!this.email) {
      this.popupService.showPopup('Emailไม่ถูกต้องหรือEmailนี้ยังไม่ได้สมัคร');
    } else {
      this.isEmailSubmitted = true;
      const payload = {
        email: this.email
      };
      this.auth.authforgotPass(payload).subscribe(
        response => {
          this.isEmailSubmitted = true;
          console.log('Registration successful:', response);
          // Navigate to login page or perform other actions
          this.emailForOtp = this.email;
        },
        error => {
          console.error('Registration error:', error);
          // Handle error, e.g., show a notification to the user
        }
      )
    }
  }


  startTimer() {
    this.showResendButton = true;
    this.counter = 60;
    this.interval = setInterval(() => {
      this.counter--;
      if (this.counter === 0) {
        this.showResendButton = true;
        clearInterval(this.interval);
      }
    }, 1000); // 1000 milliseconds = 1 second
  }

  resendOtp() {
    const payload = {
      email: this.emailForOtp
    };
    this.auth.authforgotPass(payload).subscribe(
      response => {
        this.isEmailSubmitted = true;
        console.log('Registration successful:', response);
        // Navigate to login page or perform other actions
      },
      error => {
        console.error('Registration error:', error);
        // Handle error, e.g., show a notification to the user
      }
    )
    this.startTimer(); // เริ่มการนับถอยหลังอีกครั้ง
  }


  verifyOtp() {
    const userOtp = this.otp.join(''); // รวบรวมตัวเลขจากอาร์เรย์เป็นสตริงเดียว
    const payload = {
      email: this.emailForOtp, // ดึงค่า email ที่เก็บไว้จาก component
      otp: userOtp
    };

    this.auth.authPass(payload).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          console.log('OTP Verified Successfully');
          this.isOtpVerified = true;
        } else {
          this.popupService.showPopup = response.message;  // ข้อความที่ได้รับจาก API
          console.error('Invalid OTP:', response.message);
        }
      },
      error => {
        console.error('Verification error:', error);
        // แสดงข้อความข้อผิดพลาดหากเกิดปัญหาในการติดต่อ API
        this.popupService.showPopup('มีข้อผิดพลาดในการยืนยัน OTP');
      }
    );
  }

  resetPassword() {
    if (this.password !== this.passwordConfirm) {
      this.popupService.showPopup('รหัสผ่านไม่ตรงกัน');

      return;
    }

    const payload = {
      email: this.emailForOtp,
      newPassword: this.password
    };

    this.auth.authresetPass(payload).subscribe(
      response => {
        this.dialogService.closeDialog('forgotPassword');
        console.log('Password reset successful');
        // อาจเปลี่ยนไปหน้าอื่น หรือแสดงข้อความสำเร็จ
        this.dialogService.openLoginDialog();
      },
      error => {
        this.popupService.showPopup('ไม่สามารถรีเซ็ตรหัสผ่านได้');
      }
    );
  }

  // ฟังก์ชันสำหรับย้ายไปยังช่องถัดไปเมื่อกรอก OTP เสร็จ
  moveToNext(event: any, nextInput: any) {
    if (event.target.value.length === 1 && nextInput) {
      nextInput.focus();
    }
  }



  // ฟังก์ชันตรวจสอบรูปแบบอีเมลอย่างง่าย
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }


  closeotp() {
    this.dialogService.closeDialog('forgotPassword');
  }

  closePopup() {
    this.popupService.closePopup()
  }


}
