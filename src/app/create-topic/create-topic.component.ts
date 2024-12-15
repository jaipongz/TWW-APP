import { ChangeDetectorRef, Component,OnInit } from '@angular/core';
import { AngularEditorConfig } from '@wfpena/angular-wysiwyg';
import { AuthService } from '../services/auth.service';
import { PopupService } from '../services/popup.service';
import { NovelService } from '../services/novel.service';


@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrl: './create-topic.component.css'
})
export class CreateTopicComponent {

  data = {
    editorContent1:  '',
    editorContent2:  '',
    chaptername: '',
    tag:''
  }
  
  constructor(private popupService: PopupService,private cdr: ChangeDetectorRef,private authService:AuthService,private novelService:NovelService) {

  }


  config1: AngularEditorConfig = { 
    editable: true,
    minHeight: '300px',
    maxHeight: '600px',
    placeholder: 'Enter text here...',
    spellcheck: true,
    minWidth: '160px',
    textAreaBackgroundColor: 'white',
    translate: 'yes',
    sanitize: false,
    enableToolbar: true,
    defaultFontName: 'Comic Sans MS',
    defaultFontSize: '5',
    fonts: [
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    showToolbar: true,
    // defaultParagraphSeparator: 'p',
    textPatternsEnabled: false,
    customClasses: [
      {
        name: 'quote',
        class: 'angular-editor-quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    editHistoryLimit: 3,
    imageResizeSensitivity: 2,
    toolbarHiddenButtons: [
      // ['bold', 'italic'],
      ['insertImage'],
      ['insertVideo'],
      ['insertHTML'],
      ['toggleEditorMode'],
      ['blockquote','fontName','link','unlink']
    ]
   };

   saveToSessionStorage() {
    try {
      // แปลงข้อมูล novel เป็น JSON และเก็บใน localStorage
      console.log('Saving to localStorage', this.data);
      sessionStorage.setItem('getEpCreate', JSON.stringify(this.data));

    } catch (error) {
      console.error('Error saving to localStorage:', error);

    }
  }
  tageRec:any[] = [];
  tags: string[]= [];
  newTag: string = '';
  trackByTag(index: number, tag: any): string {
    return tag.tag;
  }

  updateNovelTags(): void {
    if (this.tags.length > 0) {
      this.data.tag = this.tags.join(', ');
      this.saveToSessionStorage();
    } else {
      this.data.tag = '';
    }
  }

  addTagRec(tagName: string): void {
    if (!tagName || this.tags.includes(tagName)) {
      return; // หยุดถ้า tag ซ้ำหรือว่าง
    }
    this.tags.push(tagName);
    this.updateNovelTags();

    const index = this.tageRec.findIndex(tag => tag.tag === tagName);
    if (index !== -1) {
      this.tageRec.splice(index, 1);
    }
  }
  deltag(tagName: string): void {
    if (!tagName) return;

    const index = this.tags.indexOf(tagName);

    if (index !== -1) {
      this.tags.splice(index, 1);
      this.updateNovelTags();

      // คืนค่าแท็กกลับไปยัง tageRec ถ้ายังไม่มีอยู่
      const alreadyExists = this.tageRec.some(tag => tag.tag === tagName);
      if (!alreadyExists) {
        this.tageRec.push({ tag: tagName });
        this.tageRec.sort((a, b) => a.tag.localeCompare(b.tag)); // จัดเรียงแท็กให้ง่ายต่อการอ่าน
        this.cdr.detectChanges(); // บังคับ Angular ตรวจสอบการเปลี่ยนแปลง
      }
    }
  }
  addTag() {
    if (this.newTag && this.tags.length < 20) {
      this.tags.push(this.newTag);
      this.newTag = '';
      this.updateNovelTags();
    } else if (this.data.tag.length >= 20) {
      this.popupService.showPopup('ไม่สามารถเพิ่มแท็กได้เกิน 20 แท็ก');
      this.newTag = '';
    }
  }
  getrectag() {
    this.novelService.getRectag().subscribe({
      next: (response) => {
        // แยกค่าของ `tag` ออกมาจาก `response.data`
        this.tageRec = response.data;
      },
      error: (err) => {
        this.popupService.showPopup('ไม่สามารถเรียกแท็กได้');
      }
    });
  }

  countTags(): number {
    return this.tagsArray.length;
  }
  get tagsArray(): string[] {
    return this.data.tag ? this.data.tag.split(', ').filter(tag => tag.trim() !== '') : [];
  }
  
  ngOnInit(): void {
    this.getProfile();
    this.getrectag();
  }

  profileData: any;

  submit(){

  }

  getProfile() {
    if (this.authService.isLoggedIn) { 
      this.authService.getProfile().subscribe({
        next: (response: any) => {
          if (response?.status === 'success') {
            this.profileData = response.data; 
            console.log('profile',this.profileData);
          } else {
            console.error('Failed to fetch profile data:', response);
          }
        },
        error: (err) => {
          console.error('Error fetching profile data:', err);
        },
      });
    } else {
      console.warn('User is not logged in.');
    }
}

  selectedTag: string = ''; 
}
