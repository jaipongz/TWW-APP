import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DialogService } from './dialog.service';
import { PopupService } from './popup.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'token';
  // private readonly userIdKey = 'userId';
  private apiUrl = environment.API_URL;

  constructor(private router: Router, private dialogService: DialogService, private http: HttpClient, private popupService: PopupService) { }

  authLogin(payload:any){
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/login`, payload, { headers });
  }
  authRegist(payload:any){
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/register`, payload, { headers });
  }
  authPass(payload:any){
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/verifyPassword`, payload, { headers });
  }
  authEmail(payload:any){
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/verifiedEmail`, payload, { headers });
  }
  authforgotPass(payload:any){
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/forgotPassword`, payload, { headers });
  }
  authresetPass(payload:any){
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/resetPassword`, payload, { headers });
  }
  

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
  updateNovel(novelId: string, formData: FormData) {
    const token = this.getToken();

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put<any>(`${this.apiUrl}/api/novel/updateNovel/${novelId}`, formData, { headers });
  }

  deleteNovel(novelId:string) {
    const token = this.getToken();

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<any>(`${this.apiUrl}/api/novel/destroyNovel/${novelId}`, { headers });
  }

  addCharacter(formData: FormData): Observable<any> {
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

  getCharacter(novelId: string) {
    const token = this.getToken();

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiUrl}/api/novel/allCharactor/${novelId}`, { headers });
  }

  updateCharacter(charId: string, formData: FormData) {
    const token = this.getToken();

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put<any>(`${this.apiUrl}/api/novel/charactor/${charId}`, formData, { headers });
  }


  deleteCharacter(charId: string) {
    const token = this.getToken();

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<any>(`${this.apiUrl}/api/novel/charactor/${charId}`, { headers });
  }

  addEpsode(novel_id: string, payload: any) {
    const token = this.getToken();

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(`${this.apiUrl}/api/novel/desc/${novel_id}`, payload, { headers });
  }

  getAllDescChapter(novelId: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/api/chapter/desc/getAll?novelId=${novelId}`, { headers });
  }
  getNovelDetal(novelId: string) {
    console.log('Novel Id:', novelId);

    return this.http.get<any>(`${this.apiUrl}/api/novel/getNovelDetail/${novelId}`);
  }
  updateStatus(novelId: string, command: string, status: string) {
    console.log('Novel Id:', novelId);
    const token = this.getToken();
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    console.log(token);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,  // Ensure Authorization header is correctly set
    });
  
    // Correctly pass headers and empty body in the PUT request
    return this.http.put<any>(`${this.apiUrl}/api/novel/updateStatus?novelId=${novelId}&command=${command}&status=${status}`, {}, { headers });
  }


  getCountNovel() {
    const token = this.getToken();

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.apiUrl}/api/user/getCountNovel`, { headers });
  }
  




  get isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // getUserId(): string | null {
  //   return localStorage.getItem(this.userIdKey);
  // }





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
      localStorage.removeItem(this.tokenKey);
      window.location.reload();
      this.popupService.showPopup('ออกจากระบบเรียบร้อยแล้ว');
      setTimeout(() => {
      this.popupService.closePopup();
      }, 2000);
    });
  }
}