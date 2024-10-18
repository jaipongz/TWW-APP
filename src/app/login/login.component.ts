import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

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
  // showLoginPopup: boolean = false;
  

  constructor(private router: Router, private http: HttpClient, public dialogRef: MatDialogRef<LoginComponent>, public dialog: MatDialog) { }



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
  onNoClick(): void {
    this.dialogRef.close();
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
          localStorage.setItem('token', response.token); // Store the token\
          this.dialogRef.close();
          this.router.navigate(['banner']).then(() => {
            window.location.reload(); // รีเฟรชหน้าเว็บหลังจากการ navigate สำเร็จ
          });
          
        },
        error => {
          console.error('Login error:', error);
        }
      );
    }
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      //
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });}

  closePopup() {
    this.showPopup = false;
  }
}
