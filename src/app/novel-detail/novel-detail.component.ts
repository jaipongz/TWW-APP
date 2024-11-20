import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { NovelService } from '../services/novel.service';
import { faCamera, faCaretDown, faPlus, faBookOpen, faArrowUpWideShort, faPenToSquare, faComment, faPen } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { PopupService } from '../services/popup.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-novel-detail',
  templateUrl: './novel-detail.component.html',
  styleUrl: './novel-detail.component.css'
})
export class NovelDetailComponent {
  faCamera = faCamera;
  faCaretDown = faCaretDown;
  faPlus = faPlus;
  faBookOpen = faBookOpen;
  faArrowUpWideShort = faArrowUpWideShort;
  faPenToSquare = faPenToSquare;
  faComment = faComment;
  faPen = faPen;
  // faTwitch = faTwitch;
  

  showSortDropdown = false;
  showStatusStoryDropdown = false;
  showStatusCompleteDropdown = false;

  
  constructor(private novelService: NovelService, private authService:AuthService,private popupService:PopupService,private router:Router) {
    this.authService.checkLoginStatus();
    this.getNovel();
  }


  getNovelCreate = {
    group: 'original',
    type: 'describe',
  };
  
  typeStatus = {
    describe: true,
    chat: false,
    cartoon: false,
    gist: false,
    fic_describe: false,
    fic_chat: false,
    fic_doujinshi: false,
  };

  
  isOriginal = true;  // ค่าเริ่มต้นให้เป็นนิยายออรินอล
  isFanfiction = false;

  selectCategory(group: string) {
    this.isOriginal = group === 'original';
    this.isFanfiction = group === 'fanfiction';
  
     // ตั้งค่า group ใหม่ใน getNovelCreate
    this.getNovelCreate.group = group;

    //เคลียร์ค่า type ให้เป็นค่าว่าง
    this.getNovelCreate.type = '';

     // ตั้งค่าทุก typeStatus เป็น false
     Object.keys(this.typeStatus).forEach((key) => {
      this.typeStatus[key as string as keyof typeof this.typeStatus] = false;
  });
  }


  selectType(type: keyof typeof this.typeStatus): void {
    // ตั้งค่าให้ทุกประเภทเป็น false ก่อน
    Object.keys(this.typeStatus).forEach((key) => {
      this.typeStatus[key as string as keyof typeof this.typeStatus] = false;
    });

    // ตั้งค่าประเภทที่เลือกเป็น true
    this.typeStatus[type] = true;
    this.getNovelCreate.type = type; // เก็บค่าที่เลือกไว้ใน getNovelCreate.type

  }

  precreate() {
    if (!this.getNovelCreate.group || !this.getNovelCreate.type ) {
      this.popupService.showPopup('ตัวเลือกไม่ครบ');
    } else {
      this.novelService.setNovelCreate(this.getNovelCreate);
      this.router.navigate(['create-novel']);
    }
    
    
  }

  @ViewChild('sortDropdown', { static: false }) sortDropdown!: ElementRef;
  @ViewChild('createPopup', { static: false }) createPopup!: ElementRef;

  toggleSortDropdown() {
    this.showSortDropdown = !this.showSortDropdown;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = this.sortDropdown?.nativeElement;
    if (this.showSortDropdown && dropdown && !dropdown.contains(target)) {
      this.showSortDropdown = false;
    }
  }

  toggleStatusStoryDropdown() {
    this.showStatusStoryDropdown = !this.showStatusStoryDropdown;
  }

  toggleStatusCompleteDropdown() {
    this.showStatusCompleteDropdown = !this.showStatusCompleteDropdown;
  }

  // ฟังก์ชันเปิดและปิด popup
  openPopup() {
    this.createPopup.nativeElement.classList.remove('hidden');
  }

  closePopup(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target === this.createPopup.nativeElement) {
      this.createPopup.nativeElement.classList.add('hidden');
    }
  }
  
  noveldata: any[] = [];

  getNovel() {
  const keyword = ''; // ใส่ keyword ที่ต้องการ
  const start = 0; 
  const limit = 10; 

  this.authService.getNovelDetail(keyword, start, limit).subscribe({
    next: (response) => {
      if (response?.status === 'success') {
        this.noveldata = response.data.data; // เก็บข้อมูล novel ใน array
        console.log('Novels:', this.noveldata);
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
