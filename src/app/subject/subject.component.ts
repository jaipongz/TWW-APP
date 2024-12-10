import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { NovelService } from '../services/novel.service';
import { AuthService } from '../services/auth.service';
import { PopupService } from '../services/popup.service';
import { UploadService } from '../services/upload.service';
import { customConfirm } from '../services/customConfirm.service';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@wfpena/angular-wysiwyg';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent implements OnInit {
  novel: any;
  createCharacter = false;
  name = '';
  role = '';
  data:any;
  addtag = false;
  addStory = false;

  constructor(private cdr: ChangeDetectorRef,
    private novelService: NovelService,
    private authService: AuthService,
    private popupService: PopupService,
    public uploadService: UploadService,
    private customconfirm: customConfirm,
    private eRef: ElementRef,
    private router: Router) { }

    config: AngularEditorConfig = {
      editable: true,
      minHeight: '200px',
      maxHeight: '300px',
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
        { class: 'arial', name: 'Arial' },
        { class: 'times-new-roman', name: 'Times New Roman' },
        { class: 'roboto-condensed-embedded', name: 'Roboto' },
        { class: 'comic-sans-ms', name: 'Comic Sans MS' },
        { class: 'roboto-slab', name: 'RobotoSlab', label: 'Roboto Custom' },
        { class: 'custom-font', name: 'Custom Font', label: 'ฟอนต์พิเศษ' } // ฟอนต์ใหม่
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
        ['insertImage'],
        ['insertVideo'],
        ['toggleEditorMode'],
      ],
     };


  ngOnInit(): void {
    this.getNovel();
    this.typeMapping();
    
  }

  saveToSessionStorage() {
    try {
      // แปลงข้อมูล novel เป็น JSON และเก็บใน localStorage
      console.log('Saving to localStorage', this.novel.novel_desc);
      sessionStorage.setItem('getDesc', JSON.stringify(this.novel.novel_desc));

    } catch (error) {
      console.error('Error saving to localStorage:', error);

    }
  }

  getToSessionStorage() {
    const storedData = sessionStorage.getItem('getDesc');
    if (storedData) {
      try {
        this.novel.novel_desc = JSON.parse(storedData);
        console.log('Loaded data from localStorage:', this.novel.novel_desc);
      } catch (error) {
        console.error('Failed to parse JSON:', error);
        sessionStorage.removeItem('getDesc');
      }
    }
   }

   editRecDesc(){
    this.addStory = !this.addStory
   }

   async addRecDesc() {
    const confirmed = await this.customconfirm.customConfirm('ต้องการแก้ไข')
    if (confirmed) {
      this.updateRecDesc();
      sessionStorage.removeItem('getDesc');
      this.addStory = false;
    }
   }

   updateRecDesc() {
    if (!this.novel?.novel_id) {
      this.popupService.showPopup('ไม่มี Novel ID');
      return;
    }
    const novelId = this.novel?.novel_id;
    // // เพิ่มโค้ดสำหรับบันทึกข้อมูล
    const formData = new FormData();
    // เพิ่มข้อมูล text fields ลงใน FormData
    formData.append('desc', this.novel.novel_desc);

    // เรียกใช้ service เพื่อส่งข้อมูลไปยัง API
    this.authService.updateNovel(novelId,formData).subscribe({
      next: () => {
        this.popupService.showPopup('แก้ไขแนะนำเรื่องสำเร็จ');
        
        setTimeout(() => {
          this.popupService.closePopup();
        }, 2000);
      },
      error: (error) => this.popupService.showPopup(error.message),
    });
  }

  @ViewChild('createPopup', { static: false }) createPopup!: ElementRef;

  getNovel =  () => {
    const state = history.state;
    this.data = state.novel?.novel_id ?? state.novelId;
    // console.log('NOVELL ID', this.data);
    
    // console.log(state.novel.novel_id);
    
    // console.log(this.novel);
    this.authService.getNovelDetal(this.data).subscribe({
      next: (data) => {
        this.novel = data.data;
        this.getCharactor();
        this.getChapter();
        // console.log(data.data);
        
      },
      error: (error) => {
        this.handleError(error, 'การสร้างตัวละครล้มเหลว');
      },
    });
    // this.cdr.detectChanges();
  }

  typeMapping() {
    return this.novelService.typeMapping();
  }



  toggleStatus(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.novel.published = 'T'; // ถ้าติ๊กถูกให้เก็บ T
      this.authService.updateStatus(this.novel.novel_id,'published',this.novel.published).subscribe({
        next: (data) => {
          // console.log(data);
        },
        error: (error) => {
          this.handleError(error, 'การสร้างตัวละครล้มเหลว');
        },
      });
    } else {
      this.novel.published = 'F'; // ถ้าไม่ติ๊กให้เก็บ F
      this.authService.updateStatus(this.novel.novel_id,'published',this.novel.published).subscribe({
        next: (data) => {
          // console.log(data);
        },
        error: (error) => {
          this.handleError(error, 'การสร้างตัวละครล้มเหลว');
        },
      });
    }
    // console.log(this.novel.published);
  }

  toggleStatusEnd(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.novel.end = 'T'; // ถ้าติ๊กถูกให้เก็บ T
      this.authService.updateStatus(this.novel.novel_id,'end',this.novel.end).subscribe({
        next: (data) => {
          // console.log(data);
        },
        error: (error) => {
          this.handleError(error, 'การสร้างตัวละครล้มเหลว');
        },
      });

    } else {
      this.novel.end = 'F'; // ถ้าไม่ติ๊กให้เก็บ F
      this.authService.updateStatus(this.novel.novel_id,'end',this.novel.end).subscribe({
        next: (data) => {
          // console.log(data);
        },
        error: (error) => {
          this.handleError(error, 'การสร้างตัวละครล้มเหลว');
        },
      });

    }
    // console.log(this.novel.status)
  }

  onAdd() {
    this.createCharacter = !this.createCharacter;
  }
  closeAdd() {
    this.name = '';
    this.role = '';
    this.currentCharactor = null;
    this.uploadService.croppedImage = null;
    this.createCharacter = !this.createCharacter;
  }

  closePopup(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target === this.createPopup.nativeElement) {
      this.createPopup.nativeElement.classList.add('hidden');
    }
  }

  onFileChange(event: Event): void {
    this.uploadService.handleFileSelect(event, (imageSrc: string) => {
      // หลังจากเลือกไฟล์จะเปิดเครื่องมือการครอปภาพ
      this.uploadService.openCropTool(imageSrc, 'cropModal', 'imagePreview');
    });
    
  }
  
  // closeModal(): void {
  //   this.uploadService.closeModal();
  // }
  onAutoClick(): void {
    // console.log('Auto-click triggered!');
    // You can perform any action here that you want to run automatically after closing the modal
    // this.createcharacter();
  }
  

  private createFormData(): FormData {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('role', this.role);

    // ตรวจสอบรูปภาพ
    if (this.uploadService.croppedImageBlob) {
      // หากมีรูปภาพที่ถูกครอบใหม่
      formData.append('charPic', this.uploadService.croppedImageBlob, 'charactor.png');
    } else if (this.currentCharactor?.image_path) {
      // หากไม่มีการครอบรูปใหม่ ให้ใช้รูปเดิม
      formData.append('existingCharPic', this.currentCharactor.image_path);
    }

    if (this.novel?.novel_id) {
      formData.append('novel_id', this.novel.novel_id);
    }

    return formData;
  }

  private handleError(error: any, defaultMessage: string) {
    const errorMessage = error.status === 0
      ? 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่'
      : `${defaultMessage}: ${error.message}`;
    this.popupService.showPopup(errorMessage);
    console.error('API Error:', error);
  }

  createcharacter() {
    if (!this.novel?.novel_id) {
      this.popupService.showPopup('ไม่มี Novel ID สำหรับการสร้างตัวละคร');
      return;
    }

    const formData = this.createFormData();

    this.authService.addCharacter(formData).subscribe({
      next: (data) => {
        this.popupService.showPopup('สร้างตัวละครสำเร็จ');
        // console.log('Create Response:', data);
      },
      error: (error) => {
        this.handleError(error, 'การสร้างตัวละครล้มเหลว');
      },
    });
  }

  chapters: any[] = [];
  totalChapter: any;
  perPageChapter: any;
  nowPageChapter: any;

  getChapter() {
    if (!this.novel?.novel_id) {
      this.popupService.showPopup('ไม่มี Novel ID สำหรับการดึงตอน');
      return;
    }

    this.authService.getAllDescChapter(this.novel?.novel_id).subscribe({
      next: (data) => {
        // this.popupService.showPopup('สร้างตัวละครสำเร็จ');
        this.chapters = data.data
        this.totalChapter = data.total
        this.perPageChapter = data.perPage
        this.nowPageChapter = data.nowPage
        console.log('Chapter Response:', this.chapters);
      },
      error: (error) => {
        this.handleError(error, 'การสร้างตัวละครล้มเหลว');
      },
    });
  }

  updateTag() {
    if (!this.novel?.novel_id) {
      this.popupService.showPopup('ไม่มี Novel ID');
      return;
    }
    const novelId = this.novel?.novel_id;
    // // เพิ่มโค้ดสำหรับบันทึกข้อมูล
    const formData = new FormData();
    // เพิ่มข้อมูล text fields ลงใน FormData
    formData.append('tag', this.novel.tag);

    // เรียกใช้ service เพื่อส่งข้อมูลไปยัง API
    this.authService.updateNovel(novelId,formData).subscribe({
      next: (data) => {
        // this.popupService.showPopup('เพิ่ม');
        
        setTimeout(() => {
          this.popupService.closePopup();
        }, 2000);
      },
      error: (error) => this.popupService.showPopup(error.message),
    });
  }


  updatecharacter() {
    const charId = this.currentCharactor?.id;

    if (!charId) {
      this.popupService.showPopup('ไม่มี ID ตัวละครสำหรับการอัปเดต');
      return;
    }

    const formData = this.createFormData();

    this.authService.updateCharacter(charId, formData).subscribe({
      next: (data) => {
        this.popupService.showPopup('อัปเดตตัวละครสำเร็จ');
        // console.log('Update Response:', data);
      },
      error: (error) => {
        this.handleError(error, 'การอัปเดตตัวละครล้มเหลว');
      },
    });
  }
  addNewChapter() {
    const novelId = this.novel?.novel_id;

    if (novelId) {
      // ส่งค่า novelId ไปหน้าใหม่ผ่าน queryParams
      this.router.navigate(['/createEp'], { queryParams: { novelId } });
      
      // หรือส่งผ่าน state (หากต้องการข้อมูลเพิ่มเติม)
      // this.router.navigateByUrl('/new-chapter', { state: { novelId } });
    } else {
      console.warn('Novel ID is undefined!');
    }
  
  }

  async precreate() {
    // console.log('On precreate');
    
    // ตรวจสอบว่าได้ครอบรูปภาพแล้วหรือยัง
    if (!this.uploadService.croppedImage) {
      this.popupService.showPopup("กรุณาเลือกรูปภาพและครอบรูปก่อน");
      return;
    }

    if (this.name.length < 2 || this.name.length > 50) {
      this.popupService.showPopup("ชื่อตัวละครต้องมีความยาวระหว่าง 2 ถึง 50 ตัวอักษร");
      return;
    }

    if (this.role.length < 2 || this.role.length > 80) {
      this.popupService.showPopup("สถานะตัวละครต้องมีความยาวระหว่าง 2 ถึง 80 ตัวอักษร");
      return;
    }

    const confirmed = await this.customconfirm.customConfirm("คุณต้องการสร้างตัวละครนี้?");
    if (confirmed) {
      if (this.currentCharactor?.id) {
        this.updatecharacter();
        
      } else {
        this.createcharacter();
      }
      this.getCharactor();
      this.closeAdd();
    }

  }

  charactors: any[] = [];
  currentCharactor: any = null;

  getCharactor() {
    const novelId = this.novel?.novel_id;

    if (!novelId) {
      console.error('Novel ID is missing');
      this.popupService.showPopup('ไม่พบข้อมูล Novel ID');
      return;
    }

    this.authService.getCharacter(novelId).subscribe({
      next: (response) => {
        // console.log('API Response:', response);
        if (response?.status === 'success') {
          this.charactors = response.data.data;
        } else {
          console.error('Failed to fetch characters:', response);
        }
      },
      error: (err) => {
        console.error('API Error:', err);
      },
    });

  }

  charEdit(index: number) {

    this.onAdd();
    // ดึงข้อมูลของตัวละครที่ต้องการแก้ไข
    this.currentCharactor = { ...this.charactors[index] };

    // ตัวอย่าง: ใช้งานค่าที่ดึงมา
    // console.log('Editing Character:', this.currentCharactor);

    // ทำการแก้ไข
    this.name = this.currentCharactor.name;
    this.role = this.currentCharactor.role;
    this.uploadService.croppedImage = this.currentCharactor.image_path;

  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.add-tag')) {
      this.addtag = false; // ปิดเมื่อคลิกนอก .add-tag
    }
  }
  
  showAddTag(){
    this.addtag = !this.addtag;
  }

  async charDelete(index: number){
    const charId = this.charactors[index]?.id;

    if (!charId) {
      this.popupService.showPopup('ไม่พบ ID ตัวละครที่ต้องการลบ');
      return;
    }

    const confirmed = await this.customconfirm.customConfirm(`ต้องการลบตัวละคร${this.charactors[index]?.name}`)
    if (confirmed) {
      this.authService.deleteCharacter(charId).subscribe({
        next: (data) => {
          this.popupService.showPopup('ลบตัวละครสำเร็จ'); 
          // ลบตัวละครออกจากรายการใน UI
          this.charactors.splice(index, 1);
        },
        error: (error) => {
          this.handleError(error, 'การลบตัวละครล้มเหลว');
        },
      });
    }
  }
  get tagsArray(): string[] {
    return this.novel.tag ? this.novel.tag.split(', ').filter((tag: string) => tag.trim() !== '') : [];
  }
  async deltag(tag: string) {
    const confirmed = await this.customconfirm.customConfirm(`ต้องการลบแท็ก ${tag}`);
    if (confirmed){
      const updatedTags = this.tagsArray.filter(t => t !== tag); // ลบแท็กที่เลือก
      this.novel.tag = updatedTags.join(', '); // อัปเดตค่ากลับในรูปแบบสตริง
      this.updateTag();
    }
  }


newTag = '';
addTag(): void {
  if (this.newTag.trim() && !this.tagsArray.includes(this.newTag.trim())) {
    const updatedTags = [...this.tagsArray, this.newTag.trim()];
    this.novel.tag = updatedTags.join(', ');
    this.updateTag();
    this.newTag = ''; // ล้างค่าอินพุต
    this.addtag = false;
  }
}

saveDesc(){

}

  profileData: any;

  getProfile() {
    this.authService.getProfile().subscribe({
      next: (response: any) => {
        if (response?.status === 'success') {
          // console.log(response);

          this.profileData = response.data; // Store fetched data in `profileData`
          console.log('Profile Data:', this.profileData);
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
