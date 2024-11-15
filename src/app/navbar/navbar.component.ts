import { Component, OnInit, HostListener,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { PopupService } from '../services/popup.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  showPassword: boolean = false;
  username: string = 'usernamelove';

  constructor(private router: Router, public dialogService: DialogService, 
    private popupService: PopupService,private elementRef: ElementRef,private authService:AuthService) {}

  ngOnInit(): void {
    this.authService.getToken();

  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  logout(): void {
    const confirmed = confirm('ต้องการออกจากระบบหรือไม่');
  if (confirmed) {
    this.authService.logout();
  }
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


  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    // ตรวจสอบว่าคลิกอยู่นอกเมนู
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  
  
  closePopup() {
    this.popupService.closePopup();
  }
}
