import { Component, OnInit, ElementRef, ViewChild, HostListener, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PopupService } from '../services/popup.service';
import { NovelService } from '../services/novel.service';
import { AuthService } from '../services/auth.service';
import { UploadimageComponent } from '../uploadimage/uploadimage.component';

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
  novel_propic: string | null;
  userId: string | null;
  status: string;
}

interface DropdownItem {
  group: string;
  label: string;
  desc: string;
}

@Component({
  selector: 'app-create-novel',
  templateUrl: './create-novel.component.html',
  styleUrls: ['./create-novel.component.css']
})

export class CreateNovelComponent implements OnInit, AfterViewChecked {
  // novel_propic: File | null = null;
  isModalOpen = false;
  newTag: string = '';
  tags: string[]= [];
  checkform = false;

  groupedData: { [key: string]: DropdownItem[] } = {};
  selectedItem: string = '';
  selectedLabels: string[] = [];
  subGroups: any[] = [];
  isEditingPenName = false;
  @ViewChild('penNameInput', { static: false }) penNameInput!: ElementRef;
  novelData!: { group: string; type: string };
  tageRec = [
    { tag: 'rec1' },
    { tag: 'rec2' },
    { tag: 'rec3' },
    { tag: 'rec4' },
    { tag: 'rec5' },
    { tag: 'rec6' },
    { tag: 'rec7' },
    { tag: 'rec8' },
  ];

  rates = [
    { rate: 'ทั่วไป' },
    { rate: '18+' },
    { rate: '25+' },
  ]

  novel: Novel = {
    novelName: '',
    penName: '',
    group: 'original',
    type: 'describe',
    mainGroups: '',
    selectedSubCategory1: '',
    selectedSubCategory2: '',
    tag: '',
    rate: '',
    desc: '',
    novel_propic: null,
    userId: '',
    status: 'F',
  };


  constructor(private http: HttpClient,
    private novelService: NovelService,
    private popupService: PopupService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef) { 
      this.getToLocalStorage();
    }

  ngOnInit(): void {
    this.getSubGroups();
    this.fetchData();
    this.authService.checkLoginStatus();
    this.typeMapping();
    // this.novel.userId = this.authService.getUserId();
    this.novelData = this.novelService.getNovelCreate();
    this.updateNovel();

    
 
  }

  saveToLocalStorage() {
    // เก็บค่าล่าสุดลงใน LocalStorage
    console.log('Saving to localStorage', this.novel);
    localStorage.setItem('getNovelCreate', JSON.stringify(this.novel));
    this.checkform = true;
  }

 getToLocalStorage() {
  const storedData = localStorage.getItem('getNovelCreate');
  if (storedData) {
  const confirmed = confirm(`ต้องการนำนิยายที่เขียนไว้กลับมาหรือไม่`);
  if (confirmed) {
    this.novel = JSON.parse(storedData);
    console.log('Loaded data from localStorage:', this.novel);
  } else {
    localStorage.removeItem('getNovelCreate');
  }
}
 }

  onSelectItem(event: Event): void {
    this.novel.mainGroups = (event.target as HTMLSelectElement).value;
  }

  updateNovel(): void {
    // ตรวจสอบว่ามีค่าใน novelData ก่อนอัปเดต
    if (this.novelData) {
      // ตรวจสอบว่า group และ type มีค่า
      if (this.novelData.group) {
        this.novel.group = this.novelData.group;
        this.saveToLocalStorage();
      }
      if (this.novelData.type) {
        this.novel.type = this.novelData.type;
        this.saveToLocalStorage();
      }
      
    } else {
      alert('ไม่ได้รับค่าจากการสร้าง');
      window.history.back();
    }
  }

    // อัปเดตข้อมูลแท็กใน novel
  updateNovelTags(): void {
    if (this.tags.length > 0) {
      this.novel.tag = this.tags.join(', ');
      this.saveToLocalStorage();
    } else {
      this.novel.tag = '';
    }
  }

  toggleStatus(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.novel.status = 'T'; // ถ้าติ๊กถูกให้เก็บ T
    } else {
      this.novel.status = 'F'; // ถ้าไม่ติ๊กให้เก็บ F
    }
  }

  typeMapping() {
    return this.novelService.typeMapping();
  }

  filteredSubGroups(category: string): Array<any> {
    // กรองตัวเลือกที่ไม่ต้องแสดงในแต่ละ dropdown
    switch (category) {
      case 'sub-category1': // ในกรณีที่กดจะส่ง sub-category1 มา
        return this.subGroups.filter( //ส่งค่าที่ได้
          subGroup => subGroup.label !== this.novel.selectedSubCategory2 //ตัวที่เลือกใน subGroup.label จะไม่มีในselectedSubCategory2
        );
      case 'sub-category2': // กลับกันกับกรณีของ sub-category1
        return this.subGroups.filter(
          subGroup => subGroup.label !== this.novel.selectedSubCategory1
        )
      default: //กรณีที่ยังไม่ได้เลือก
        return this.subGroups; //ส่งsubGroups ออกไปโดยไม่ได้ซ่อนตัวเลือก
    }



    // return this.subGroups.filter(subGroup => {
    //   // กรองตัวเลือกที่ไม่ต้องแสดงในแต่ละ dropdown
    //   if (category === 'sub-category1') {
    //     return subGroup.label !== this.novel.selectedSubCategory2; // ไม่แสดงค่าที่เลือกใน sub-category2
    //   } else if (category === 'sub-category2') {
    //     return subGroup.label !== this.novel.selectedSubCategory1; // ไม่แสดงค่าที่เลือกใน sub-category1
    //   }
    //   return true; // กรณี default แสดงทั้งหมด
    // });
  }




  // Hovering over a category to show a description
  hoveredGroup: { label: string; desc: string } | null = null;

  onHover(group: { label: string; desc: string }) {
    this.hoveredGroup = group;
    console.log('Hovering over:', group);
  }

  onLeave() {
    this.hoveredGroup = null;
    console.log('Mouse left');
  }

  // เพิ่มแท็กจาก recommended tags
  addTagRec(tagName: string): void {
    if (!tagName || this.tags.includes(tagName)) {
      return; // หยุดถ้า tag ซ้ำหรือว่าง
    }

    console.log(`Tag added: ${tagName}`);
    this.tags.push(tagName);
    this.updateNovelTags();

    const index = this.tageRec.findIndex(tag => tag.tag === tagName);
    if (index !== -1) {
      this.tageRec.splice(index, 1);
    }
  }
  
  trackByTag(index: number, tag: any): string {
    return tag.tag;
  }

  // ลบแท็กออกจาก tags
  deltag(tagName: string): void {
    if (!tagName) return;

    console.log(`Tag removed: ${tagName}`);
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

  // Add a custom tag via input
  addTag() {
    if (this.newTag && this.tags.length < 18) {
      this.tags.push(this.newTag);
      this.newTag = '';
      this.updateNovelTags();
    } else if (this.novel.tag.length >= 18) {
      this.popupService.showPopup('ไม่สามารถเพิ่มแท็กได้เกิน 18 แท็ก');
      this.newTag = '';
    }
  }

  ngAfterViewChecked() {
    if (this.isEditingPenName && this.penNameInput?.nativeElement) {
      this.penNameInput.nativeElement.focus();
    }
  }

  // แสดง input และซ่อนลิงก์
  penName() {
    this.isEditingPenName = true;
  }

  confirmPenName() {
    if (this.novel.penName.trim() === '') {
      this.novel.penName = ''; // ใส่ข้อความเริ่มต้นหากค่าว่าง
    }
    this.isEditingPenName = false;
  }

  // ตรวจจับการคลิกภายนอก
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.isEditingPenName && this.penNameInput && !this.penNameInput.nativeElement.contains(event.target)) {
      this.confirmPenName();
    }
  }

  // Fetch main groups
  fetchData(): void {
    this.http.get<{ status: string; data: DropdownItem[] }>('http://localhost:3090/mainGroup')
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.groupedData = response.data.reduce((acc: { [key: string]: DropdownItem[] }, item: DropdownItem) => {
              if (!acc[item.group]) {
                acc[item.group] = [];
              }
              acc[item.group].push(item);
              return acc;
            }, {});
          }
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
  }


  getSubGroups(): void {
    this.http.get<any>('http://localhost:3090/subGroup', {
      headers: {
        'accept': 'application/json'
      }
    }).subscribe(
      (response) => {
        this.subGroups = response.data;
        console.log('Fetched subGroups:', this.subGroups);
      },
      (error) => {
        console.error('Error fetching subGroups:', error);
      }
    );
  }

  // ฟังก์ชันสำหรับเพิ่มคลาส invalid-field
  setInvalidField(fieldId: string) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.classList.add('invalid-field');
    }
  }

  // ฟังก์ชันสำหรับลบคลาส invalid-field
  resetValidation() {
    const invalidFields = document.querySelectorAll('.invalid-field');
    invalidFields.forEach((field) => field.classList.remove('invalid-field'));
  }


  @ViewChild(UploadimageComponent) uploadimageComponent!: UploadimageComponent;

  presubmit(){
    // ตรวจสอบว่าได้ครอบรูปภาพแล้วหรือยัง
    if (!this.uploadimageComponent?.croppedImageBlob) {
      this.popupService.showPopup("กรุณาเลือกรูปภาพและครอบรูปก่อน");
      return;
    }

    
    if (!this.novel.novelName || !this.novel.penName || !this.novel.mainGroups ||
      !this.novel.tag || !this.novel.rate || !this.novel.desc) {
      this.popupService.showPopup("กรอกข้อมูลให้ครบ");
      return;
    }

    const confirmed = confirm(`คุณต้องการบันเป็น${ this.novel.status === 'T' ? 'ส่วนตัว' : 'สาธารณะ' }ใช่หรือไม่`);
    if (confirmed) {
      this.novel.status = 'T';
      if (this.novel.status){
        this.saveNovel();
      } else {
        console.log('สเตตัสไม่ถูกต้อง')
      }
    } else {
      this.novel.status = 'F';
      if (this.novel.status){
        this.saveNovel();
      } else {
        console.log('สเตตัสไม่ถูกต้อง')
      }
    }
  }

  // Submit the novel form
  // submit(): void {
  //   console.log('Form Submitted', this.novel);

  //   // this.resetValidation();

  //   // let hasError = false;

  //   // // ตรวจสอบฟิลด์แต่ละอัน
  //   // if (!this.novel.novelName) {
  //   //   this.setInvalidField('title');
  //   //   hasError = true;
  //   // }
  //   // if (!this.novel.penName) {
  //   //   this.setInvalidField('penNameInput');
  //   //   hasError = true;
  //   // }
  //   // if (!this.novel.desc) {
  //   //   this.setInvalidField('subtitle');
  //   //   hasError = true;
  //   // }
  //   // if (!this.novel.rate) {
  //   //   this.setInvalidField('rating');
  //   //   hasError = true;
  //   // }
  //   // if (!this.novel.tag) {
  //   //   this.setInvalidField('tag');
  //   //   hasError = true;
  //   // }  
  //   // if (!this.selectedItem) {
  //   //   this.setInvalidField('subItemSelect');
  //   //   hasError = true;
  //   // }

  //   // // ถ้ามีข้อผิดพลาด ให้แสดงข้อความเตือน
  //   // if (hasError) {
  //   //   this.popupService.showPopup('กรอกข้อมูลให้ครบ');
  //   //   return;
  //   // }

  //   // ถ้าข้อมูลครบถ้วนให้ดำเนินการบันทึก
  //   this.saveNovel();
  // }

  saveNovel() {

    // const payload = {
    //   novelName: this.novel.novelName,
    //   penName: this.novel.penName,
    //   group: this.novel.group,
    //   type: this.novel.type,
    //   mainGroup: this.novel.mainGroups,
    //   subGroup1: this.novel.selectedSubCategory1,
    //   subGroup2: this.novel.selectedSubCategory2,
    //   tag: this.novel.tag,
    //   rate: this.novel.rate,
    //   desc: this.novel.desc,
    //   userId: this.novel.userId,
    //   novel_propic: this.novel.novel_propic,
    // };

  

    // if (this.uploadimageComponent.croppedImageBlob) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     payload.novel_propic = reader.result as string; // แปลงให้เป็น string
    //     this.sendJsonPayload(payload); // ส่งข้อมูล
    //   };
    //   reader.readAsDataURL(this.uploadimageComponent.croppedImageBlob);
    // } else {
    //   this.sendJsonPayload(payload);
    // }

    // // เพิ่มโค้ดสำหรับบันทึกข้อมูล
    const formData = new FormData();
    // เพิ่มข้อมูล text fields ลงใน FormData
    formData.append('novelName', this.novel.novelName);
    formData.append('penName', this.novel.penName);
    formData.append('group', this.novel.group);
    formData.append('type', this.novel.type);
    formData.append('mainGroup', this.novel.mainGroups);
    formData.append('subGroup1', this.novel.selectedSubCategory1);
    formData.append('subGroup2', this.novel.selectedSubCategory2);
    formData.append('tag', this.novel.tag);
    formData.append('rate', this.novel.rate);
    formData.append('desc', this.novel.desc);
    formData.append('status', this.novel.status);

    // formData.append('userId', this.novel.userId ||'');
    // const userId = this.novel.userId; // userId เป็น string | null
    // if (userId !== null) {
    //     formData.append("userId", userId);
    // } else {
    //     console.error("User ID is null, skipping...");
    // }
    
    // เพิ่มรูปภาพที่ครอบแล้วลงใน FormData
    if (this.uploadimageComponent.croppedImageBlob) {
      formData.append('novel_propic', this.uploadimageComponent.croppedImageBlob, "novel_propic.png");
    }

    // เรียกใช้ service เพื่อส่งข้อมูลไปยัง API
    this.authService.storeNovel(formData).subscribe({
      next: (data) => {
        this.popupService.showPopup(JSON.stringify(data));
        console.log(this.novel);
        setTimeout(() => {
          this.popupService.closePopup();
          this.authService.goTo('create');
        }, 2000);
      },
      error: (error) => this.popupService.showPopup(error.message),
    });
  }



  // sendJsonPayload(payload: any): void {
  //   this.authService.storeNovel(payload).subscribe({
  //     next: (data) => {
  //       this.popupService.showPopup(JSON.stringify(data));
  //       console.log('Saving novel...', payload);
  //       setTimeout(() => {
  //         this.popupService.closePopup();
  //         // window.location.reload();
  //       }, 2000);
  //     },
  //     error: (error) => this.popupService.showPopup(error.message),
  //   });
  // }



  // Adjust the textarea height as the user types
  adjustHeight(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.style.height = 'auto';
    input.style.height = `${input.scrollHeight}px`;
  }

  goBack() {
    window.history.back();
    this.checkform = false;
  }
}
