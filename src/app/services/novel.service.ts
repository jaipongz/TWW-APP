import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NovelService {
  private apiUrl = 'http://localhost:3090/api/novel';
  // private apiUrl = 'http://localhost:3090/api/novel/storeNovel';

  constructor(private http: HttpClient) {}

  getNovelDetail(novelId: number, start: number, limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/getNovelDetail/${novelId}?start=${start}&limit=${limit}`);
  }
  storeNovel(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/storeNovel`, formData);
  }
}
