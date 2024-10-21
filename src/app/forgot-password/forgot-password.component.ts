import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
 

  constructor (private router : Router, private http :HttpClient, public dialog: MatDialog, public dialogRef: MatDialogRef<ForgotPasswordComponent> ) {
    this.startTimer();
  }

  email: string = '';
  emailForOtp: string = '';
  popupMessage: string = '';
  password: string = '';
  passwordConfirm: string = '';
  isOtpVerified: boolean = false; // ตัวแปรเพื่อแสดงฟอร์มกรอกรหัสผ่าน
  isEmailSubmitted: boolean = false;
  showPopup: boolean = false;
  

  otp: string[] = ['', '', '', '', '', '']; // ช่องสำหรับเก็บ OTP





  

 showResendButton: boolean = true;
 counter: number = 60;
 interval: any;


  
  submitemail() {
    if (!this.email) {
      this.popupMessage = 'Emailไม่ถูกต้องหรือEmailนี้ยังไม่ได้สมัคร';
      this.showPopup = true;
      
    }else {
    this.isEmailSubmitted = true;

    const payload = {
      email: this.email
    };
    this.http.post('http://localhost:3090/forgotPassword',payload, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).subscribe(
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
  }}


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
    this.http.post('http://localhost:3090/forgotPassword',payload, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).subscribe(
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
  
    this.http.post('http://localhost:3090/verifyPassword', payload, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).subscribe(
      (response: any) => {
        if (response.status === 'success') { 
          console.log('OTP Verified Successfully');
          this.isOtpVerified = true;
         

        } else {
           this.popupMessage = response.message;  // ข้อความที่ได้รับจาก API
           console.error('Invalid OTP:', response.message);
           this.showPopup = true; // แสดง popup ข้อความ OTP ผิดพลาด
        }
      },
      error => {
        console.error('Verification error:', error);
        // แสดงข้อความข้อผิดพลาดหากเกิดปัญหาในการติดต่อ API
        this.popupMessage = 'มีข้อผิดพลาดในการยืนยัน OTP';
        this.showPopup = true;
      }
    );
  }

  resetPassword() {
    if (this.password !== this.passwordConfirm) {
      this.popupMessage = 'รหัสผ่านไม่ตรงกัน';
      this.showPopup = true;
      return;
    }
  
    const payload = {
      email: this.emailForOtp,
      newPassword: this.password
    };
  
    this.http.post('http://localhost:3090/resetPassword', payload, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).subscribe(
      response => {
        this.dialogRef.close();
        console.log('Password reset successful');
        // อาจเปลี่ยนไปหน้าอื่น หรือแสดงข้อความสำเร็จ
        this.dialog.open(LoginComponent);
      },
      error => {
        this.popupMessage = 'ไม่สามารถรีเซ็ตรหัสผ่านได้';
        this.showPopup = true;
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
    this.dialogRef.close(); 
  }

  closePopup() {
    this.showPopup = false;
  }


}
