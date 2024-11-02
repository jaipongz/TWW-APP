import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  showPassword: boolean = false;
  username: string = 'usernamelove';

  constructor(private router: Router, public dialogService: DialogService, private popupService: PopupService) {}

  ngOnInit(): void {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token; // Set isLoggedIn to true if token exists
    if (!token) {
      console.log('No token found, redirecting to login');
      // บันทึก URL ปัจจุบันลงใน localStorage
      // localStorage.setItem('redirectUrl', window.location.href);
    } else {
      console.log('Token found:', token);
      this.isLoggedIn = true;
    }
  }

  logout(): void {

    localStorage.removeItem('token'); // Remove token on logout
    this.isLoggedIn = false;
    this.isMenuOpen = false;
    window.location.reload();
    
  }
  // showLoginPopup = false; // ตัวแปรนี้จะใช้สำหรับควบคุมการแสดง popup

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  openLoginDialog(): void {
    this.dialogService.openLoginDialog()
  }

  openRegisterDialog(): void {
    this.dialogService.openRegisterDialog()
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  closePopup() {
    this.popupService.closePopup();
  }
}
