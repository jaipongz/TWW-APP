import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NovelService {
  private apiUrl = 'http://localhost:3090/api/novel';
  // private apiUrl = 'http://localhost:3090/api/novel/storeNovel';
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTczMDYyMTY4OSwiZXhwIjoxNzMzMjEzNjg5fQ.3cWhDqm_371U6wJwUFWH8of0JJ6Mjox74NnMiNSqgTg';
  
  constructor(private http: HttpClient) {}

  getNovelDetail(novelId: number, start: number, limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/getNovelDetail/${novelId}?start=${start}&limit=${limit}`);
  }

  storeNovel(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post<any>(`${this.apiUrl}/storeNovel`, formData, { headers }).pipe(
      map((response) => response.data || 'No data received'),
      catchError((error) => throwError(() => new Error(`HTTP error! Status: ${error.status}`)))
    );
  }

 
}
