import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  showLoginPopup: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token; // Set isLoggedIn to true if token exists
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove token on logout
    this.isLoggedIn = false;
    this.router.navigate(['#']); // Redirect to login page
  }
  // showLoginPopup = false; // ตัวแปรนี้จะใช้สำหรับควบคุมการแสดง popup

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // ฟังก์ชันสำหรับแสดง popup
  openLoginPopup() {
    this.showLoginPopup = true;
  }

  // ฟังก์ชันสำหรับปิด popup
  closeLoginPopup() {
    this.showLoginPopup = false;
  }

  login() {
    // เพิ่มโค้ดการล็อกอินของคุณที่นี่
    this.closeLoginPopup(); // ปิด popup เมื่อเข้าสู่ระบบสำเร็จ
  }
}
