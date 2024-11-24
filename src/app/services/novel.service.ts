import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Novel {
  novelName: string;
  penName: string;
  group: string;
  type: string;
  mainGroups: string;
  selectedSubCategory1: string;
  selectedSubCategory2: string;
  tag: string;
  rate: string;
  desc: string;
  novel_propic: File | null;
  userId: any;
}

@Injectable({
  providedIn: 'root'
})
export class NovelService {
  private readonly tokenKey = 'token';
  private novelCreate = {
    group: '',
    type: '',
  };

  private novelData: Novel = {
    novelName: '',
    penName: '',
    group: '',
    type: '',
    mainGroups: '',
    selectedSubCategory1: '',
    selectedSubCategory2: '',
    tag: '',
    rate: '',
    desc: '',
    novel_propic: null,
    userId: '',
  };

  
 
  private apiUrl = 'http://localhost:3090';

  constructor(private http: HttpClient) {

  }

  setNovelCreate(data: { group: string; type: string }): void {
    this.novelCreate = data;
  }

  getNovelCreate(): { group: string; type: string } {
    return this.novelCreate;
  }

  typeMapping(): { [key: string]: string } {
    return {
      describe: 'บรรยาย',
      chat: 'แชท',
      cartoon: 'การ์ตูน/ภาพประกอบ',
      gist: 'กระทู้',
      fic_describe: 'ฟิคบรรยาย',
      fic_chat: 'ฟิคแชท',
      fic_doujinshi: 'โดจินชิ/แฟนอาร์ต',
    };
  }

   // Set novel data
   setNovelData(novel: Novel): void {
    this.novelData = { ...novel };
  }

  // Get novel data
  getNovelData(): Novel {
    return this.novelData;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
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

}
