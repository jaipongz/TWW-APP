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
  private apiUrl = 'http://localhost:3090';

  constructor(private router: Router, private dialogService: DialogService, private http: HttpClient, private popupService: PopupService) { }



  getNovelDetail(keyword: string, start: number, limit: number): Observable<any> {
    const token = this.getToken();

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.apiUrl}/api/novel/myNovelList/?keyword=${keyword}&start=${start}&limit=${limit}`, { headers });
  }

  getProfile() {
    const token = this.getToken();

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.apiUrl}/api/user/getProfile`, { headers });
  }

  storeNovel(formData: FormData): Observable<any> {
    const token = this.getToken();

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(`${this.apiUrl}/api/novel/storeNovel`, formData, { headers }).pipe(
      map((response) => response.data || 'No data received'),
      catchError((error) => throwError(() => new Error(`HTTP error! Status: ${error.status}`)))
    );
  }

  addCharacter(formData: FormData) : Observable<any> {
    const token = this.getToken();

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(`${this.apiUrl}/api/novel/charactor`, formData, { headers }).pipe(
      map((response) => response.data || 'No data received'),
      catchError((error) => throwError(() => new Error(`HTTP error! Status: ${error.status}`)))
    );
  }

  getCharacter(novelId:string) {
    const token = this.getToken();

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiUrl}/api/novel/allCharactor/${novelId}`, { headers });
  }

  updateCharacter(charId:string, formData: FormData){
    const token = this.getToken();

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put<any>(`${this.apiUrl}/api/novel/charactor/${charId}`, formData, { headers });
  }

  deleteCharacter(charId:string){
    const token = this.getToken();

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<any>(`${this.apiUrl}/api/novel/charactor/${charId}`,{ headers });
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


  goTo(key: any) {
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
    if (!token) {
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
      this.popupService.showPopup('ออกจากระบบเรียบร้อยแล้ว');
      window.location.reload();
      localStorage.removeItem(this.tokenKey);
      // localStorage.removeItem(this.userIdKey);
    });
  }
}