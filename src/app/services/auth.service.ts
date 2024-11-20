import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DialogService } from './dialog.service';
import { PopupService } from './popup.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'token';
  // private readonly userIdKey = 'userId';
  private apiUrl = 'http://localhost:3090/api/novel';

  constructor(private router: Router, private dialogService: DialogService, private http: HttpClient, private popupService: PopupService) { }



  getNovelDetail(keyword: string, start: number, limit: number): Observable<any> {
    const token = this.getToken();

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    
    return this.http.get(`${this.apiUrl}/myNovelList/?keyword=${keyword}&start=${start}&limit=${limit}`, { headers });
  }

  storeNovel(formData: FormData): Observable<any> {
    const token = this.getToken();

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(`${this.apiUrl}/storeNovel`, formData, { headers }).pipe(
      map((response) => response.data || 'No data received'),
      catchError((error) => throwError(() => new Error(`HTTP error! Status: ${error.status}`)))
    );
  }

  // storeNovel(payload: any): Observable<any> {
  //   const token = this.getToken();

  //   if (!token) {
  //     throw new Error('Authentication token is missing');
  //   }

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this.http.post(`${this.apiUrl}/storeNovel`, payload, { headers });
  // }



  get isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // getUserId(): string | null {
  //   return localStorage.getItem(this.userIdKey);
  // }


  goTo( key:any ){
    switch (key) {
      case 'create':
        this.router.navigate(['/create-novel']);
        break;
    
      case 'firstpage':
        this.router.navigate(['/banner']);
        break;
    
    
      default:
        console.warn('Invalid key provided:', key);
        break;
    }
  }


  checkLoginStatus() {
    const token = this.getToken();
    // const userId = this.getUserId();
    // && !userId
    if (!token ) {
      console.log('No token found, redirecting to login');
      const cpnfirmed = confirm('กรุณาเข้าสู่ระบบ');
      if (cpnfirmed) {
        this.router.navigate(['/banner']);
        this.dialogService.openLoginDialog();
      } else {
        this.router.navigate(['/banner']);
      }

    } else {
      console.log('Token found:', token);
    }
  }

  lockpage() {

  }

  // Clear all auth-related localStorage items when logging out
  logout(): void {
    this.router.navigate(['/banner']).then(() => {
      window.location.reload();
      localStorage.removeItem(this.tokenKey);
      // localStorage.removeItem(this.userIdKey);
      this.popupService.showPopup('ออกจากระบบเรียบร้อยแล้ว');
    });
  }
}