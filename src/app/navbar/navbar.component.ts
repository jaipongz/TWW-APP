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
  profileData: any;
  showPassword: boolean = false;
  username: string = 'usernamelove';
  isSideOpen: boolean = false;
  isMenuOpen = false;

  constructor(private router: Router, public dialogService: DialogService, 
    private popupService: PopupService,private elementRef: ElementRef,private authService:AuthService) {
      
    }

  ngOnInit(): void {
    this.getProfile();
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

  
  sidebar($event:any){
  this.isSideOpen = !this.isSideOpen; // เปลี่ยนสถานะ true <-> false
  console.log('Sidebar status:', this.isSideOpen); // ตรวจสอบสถานะ
  
  }
  
  closePopup() {
    this.popupService.closePopup();
  }

  getProfile() {
    const token = this.authService.isLoggedIn;
    if (token) {
      this.authService.getProfile().subscribe({
        next: (response: any) => {
          if (response?.status === 'success') {
            // console.log(response);
            this.profileData = response.data; // Store fetched data in `profileData`
            // console.log('Profile Data:', this.profileData);
          } else {
            console.error('Failed to fetch novels:', response);
          }
        },
        error: (err) => {
          console.error('Error fetching novels:', err);
        },
      });
    }
    }
}
