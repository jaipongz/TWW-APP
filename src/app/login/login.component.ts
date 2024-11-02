import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  showPopup: boolean = false;
  popupMessage: string = '';
  showPassword: boolean = false;
  // showLoginPopup: boolean = false;


  constructor(private router: Router, private http: HttpClient, public dialogRef: MatDialogRef<LoginComponent>, public dialog: MatDialog) { }

  ngOnInit(): void {

    // // หลังจาก login ผ่าน Google สำเร็จ
    // const redirectUrl = localStorage.getItem('redirectUrl');

    // if (redirectUrl) {
    //   localStorage.removeItem('redirectUrl');  // ลบ URL หลังจาก redirect แล้ว
    //   this.router.navigateByUrl(redirectUrl);  // เปลี่ยนเส้นทางไปที่ URL เดิม
    // } else {
    //   this.router.navigate(['banner']); // ถ้าไม่มี URL ให้เปลี่ยนไปหน้า default
    // }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  // ฟังก์ชันสำหรับแสดง popup
  // openLoginPopup() {
  //   this.showLoginPopup = true;
  // }

  // ฟังก์ชันสำหรับปิด popup
  // closeLoginPopup() {
  //   this.showLoginPopup = false;
  // }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

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
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).subscribe(
        (response: any) => {
          if (!response.data.error) {
            console.log('Login successful:', response);
            localStorage.setItem('token', response.data.token); // Store the token
            this.dialogRef.close();
            window.location.reload();
            // const redirectUrl = localStorage.getItem('redirectUrl') || '/defaultRoute';
            // this.router.navigate([redirectUrl]);
            // localStorage.removeItem('redirectUrl');
          } else {
            // Show error message if login failed
            this.popupMessage = response.data.error || 'Login failed. Please check your username and password';
            this.showPopup = true;
          }
        },
        (error) => {
          // Handle any errors from the HTTP request itself
          this.popupMessage = 'An error occurred. Please try again later.';
          this.showPopup = true;
        }
      );
    }
  }

  openRegisterDialog(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(RegisterComponent, {
      disableClose: true
      //
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openForgotpass() {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      disableClose: true

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // loginWithGoogle() {
  //   const currentUrl = window.location.href;  // เก็บ URL ปัจจุบัน
  //   localStorage.setItem('redirectUrl', currentUrl);  // เก็บ URL ใน localStorage

  //   // นำทางไปยัง Google OAuth
  //   window.location.href = 'http://localhost:3090/auth/google';
  // }


  closeotp() {
    this.dialogRef.close();
  }


  closePopup() {
    this.showPopup = false;
  }
}
