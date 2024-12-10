import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';


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
  private apiUrl = environment.API_URL;
  
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

  
 


  constructor(private http: HttpClient,private router:Router,private auth:AuthService) {

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

  goTo(key: any) {
    switch (key) {
      case 'create-novel':
        this.router.navigate(['/create-novel']);
        break;

      case 'firstpage':
        this.router.navigate(['/banner']);
        break;

      case 'subject':
        this.router.navigate(['/subject']);
        break;

      case 'edit-novel':
        this.router.navigate(['/edit-novel']);
        break;

      case 'profile-detail':
        this.router.navigate(['/profile-detail']);
        break;
      case 'createEp':
        this.router.navigate(['/createEp']);
        break;


      default:
        console.warn('Invalid key provided:', key);
        break;
    }
  }

  
  getRectag() {


    const headers = new HttpHeaders({
      'accept': 'application/json'
    });

    return this.http.get<any>(`${this.apiUrl}/recTag`);
  }
  getMaingroup() {

    const headers = new HttpHeaders({
      'accept': 'application/json'
    });

    return this.http.get<any>(`${this.apiUrl}/mainGroup`);
  }
  getSubgroup() {


    const headers = new HttpHeaders({
      'accept': 'application/json'
    });

    return this.http.get<any>(`${this.apiUrl}/subGroup`);
  }

}
