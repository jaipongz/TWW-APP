import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  // Properties for login popup
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  // showLoginPopup: boolean = false;

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token; // Set isLoggedIn to true if token exists
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove token on logout
    this.isLoggedIn = false;
    this.router.navigate(['banner']); // Redirect to login page
  }
  // showLoginPopup = false; // ตัวแปรนี้จะใช้สำหรับควบคุมการแสดง popup

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
    //
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      //
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // ฟังก์ชันสำหรับแสดง popup
  // openLoginPopup() {
  //   this.showLoginPopup = true;
  // }

  // ฟังก์ชันสำหรับปิด popup
  // closeLoginPopup() {
  //   this.showLoginPopup = false;
  // }

  // login() {
  //   // เพิ่มโค้ดการล็อกอินของคุณที่นี่
  //   this.closeLoginPopup(); // ปิด popup เมื่อเข้าสู่ระบบสำเร็จ
  // }
}
