import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { NovelService } from '../services/novel.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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

  
  constructor(private fb: FormBuilder, private novelService: NovelService, private authService:AuthService,private popupService:PopupService,private router:Router) {
    this.novelForm = this.fb.group({
      novelName: ['', Validators.required],
      penName: ['', Validators.required],
      group: ['fiction', Validators.required],
      type: ['DES', Validators.required],
      tags: this.fb.array([]),
      rate: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      desc: ['', Validators.required],
      novel_propic: [null, Validators.required],
      userId: ['', Validators.required]
    });
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

  novelForm: FormGroup;
  tagsList = [
    { value: 'fantasy', label: 'แฟนตาซี (Fantasy)' },
    { value: 'romance', label: 'โรแมนติก (Romance)' },
    { value: 'action', label: 'แอ็คชั่น (Action)' },
    // (รายการแท็กอื่น ๆ ...)
  ];


  get tags(): FormArray {
    return this.novelForm.get('tags') as FormArray;
  }

  onTagChange(event: any, tag: string) {
    if (event.target.checked) {
      this.tags.push(this.fb.control(tag));
    } else {
      const index = this.tags.controls.findIndex(x => x.value === tag);
      this.tags.removeAt(index);
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.novelForm.patchValue({ novel_propic: file });
  }

  submitForm() {
    const formData = new FormData();
    Object.keys(this.novelForm.controls).forEach(key => {
      if (key === 'tags') {
        formData.append(key, JSON.stringify(this.tags.value));
      } else {
        formData.append(key, this.novelForm.get(key)?.value);
      }
    });

    this.authService.storeNovel(formData).subscribe({
      next: (response: any) => alert(response.message),
      error: (error) => {
        console.error('Error:', error);
        alert('An error occurred.');
      }
    });
  }
}
