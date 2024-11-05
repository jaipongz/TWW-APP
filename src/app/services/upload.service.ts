import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = 'http://localhost:3090/api/user/updateProfilePic';

  constructor(private http: HttpClient) { }

  uploadProfilePicture(blob: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('userId', '36'); // Replace with actual user ID
    formData.append('profile_pic', blob, 'profile.jpg');
    
    const headers = new HttpHeaders({
      Authorization: 'Bearer YOUR_TOKEN_HERE' // Replace with actual token if required
    });

    return this.http.post(this.apiUrl, formData, { headers });
  }
  
}
