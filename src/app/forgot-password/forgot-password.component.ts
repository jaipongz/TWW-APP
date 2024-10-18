import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  constructor (private router : Router, private http :HttpClient, public dialog: MatDialog, public dialogRef: MatDialogRef<ForgotPasswordComponent> ) {}

  email: string = '';
  popupMessage: string = '';
  isEmailSubmitted: boolean = false;
  showPopup: boolean = false;
 // ตัวแปรเก็บ OTP ที่กรอกจากผู้ใช้
 otp1: string = '';
 otp2: string = '';
 otp3: string = '';
 otp4: string = '';
 otp5: string = '';
 otp6: string = '';

 // รหัส OTP ที่ระบบส่ง (ในตัวอย่างนี้จะกำหนดไว้ก่อน แต่ในทางปฏิบัติจะได้จาก API)
 expectedOtp: string = '123456';
  
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
      },
      error => {
        console.error('Registration error:', error);
        // Handle error, e.g., show a notification to the user
      }
    )
  }}


  verifyOtp() {
    let userOtp = `${this.otp1}${this.otp2}${this.otp3}${this.otp4}${this.otp5}${this.otp6}`;
    
    if ( userOtp !== this.expectedOtp) {
      this.popupMessage = 'OTPไม่ถูกต้อง';
      console.error('Invalid OTP');
      this.showPopup = true;
      // แสดงข้อความ OTP ผิดพลาด
      
    } else {
      console.log('OTP Verified Successfully');
      this.router.navigateByUrl('forgot-password-sub')
      // ทำสิ่งที่ต้องการหลังจาก OTP ถูกต้อง เช่น เปลี่ยนหน้า
      
    }
    // const payload = {
    //   email: this.email
      
    // };
    // this.http.post('http://localhost:3090/verifyPassword',payload, {
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   }
    // }).subscribe(
    //   response => {

    //     console.log('Registration successful:', response);
    //   },
    //   error => {
    //     console.error('Registration error:', error);
      
    //   }
    // ) 
  }
   // ฟังก์ชันสำหรับย้ายไปยังช่องถัดไปเมื่อกรอก OTP เสร็จ
   moveToNext(event: any, nextInput: any) {
    if (event.target.value.length === 1 && nextInput) {
      nextInput.focus();
    }
  }

  resendOtp() {
    console.log('Resend OTP code');
    // เรียก API เพื่อส่งรหัส OTP ใหม่
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
