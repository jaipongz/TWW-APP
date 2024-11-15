import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from './dialog.service';
@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private readonly tokenKey = 'token';
    private readonly userIdKey = 'userId';

  
    constructor(private router: Router,private dialogService: DialogService) {}
  
    get isLoggedIn(): boolean {
      return !!localStorage.getItem(this.tokenKey);
    }
  
    getToken(): string | null {
      return localStorage.getItem(this.tokenKey);
    }
  
    getUserId(): string | null {
      return localStorage.getItem(this.userIdKey);
    }
  

    checkLoginStatus() {
      const token = this.getToken();
      const userId = this.getUserId();
      
      if (!token && !userId) {
        console.log('No token found, redirecting to login');
        const cpnfirmed = confirm('กรุณาเข้าสู่ระบบ');
        if(cpnfirmed){
        this.dialogService.openLoginDialog(); 
        }else {
            this.router.navigate(['/banner']);
        }
        
      } else {
        console.log('Token found:', token);
      }
    }

    lockpage(){
      
    }
  
    // Clear all auth-related localStorage items when logging out
    logout(): void {
        this.router.navigate(['/banner']).then(() => {
            window.location.reload();
            
            localStorage.removeItem(this.tokenKey);
            localStorage.removeItem(this.userIdKey);
            console.log('Logged out and redirected to login page');
          });
    }
  }