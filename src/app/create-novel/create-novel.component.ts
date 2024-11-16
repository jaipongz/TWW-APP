import { Component, OnInit, ElementRef, ViewChild, HostListener, AfterViewChecked } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  novel_propic: File | null;
  userId: string;
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

export class CreateNovelComponent implements OnInit,AfterViewChecked {
  novel_propic: File | null = null;
  isModalOpen = false;
  newTag: string = '';
  tags: string[] = [];

  groupedData: { [key: string]: DropdownItem[] } = {};
  selectedItem: string = '';
  selectedSubCategory1: string = '';
  selectedSubCategory2: string = '';
  selectedLabels: string[] = [];
  subGroups: any[] = [];
  isEditingPenName = false;
  @ViewChild('penNameInput', { static: false }) penNameInput!: ElementRef;

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
    group: 'fanfig',
    type: 'describe',
    mainGroups: '',
    selectedSubCategory1: '',
    selectedSubCategory2: '',
    tag: '',
    rate: '',
    desc: '',
    novel_propic: null,
    userId: 'bonza1230',
  };


  constructor(private http: HttpClient,
    private novelService: NovelService, 
    private popupService: PopupService,
    private authService: AuthService,) { }

  ngOnInit(): void {
    this.getSubGroups();
    this.fetchData();
    this.authService.checkLoginStatus();
  }



  onSelectItem(event: Event): void {
    this.novel.mainGroups = (event.target as HTMLSelectElement).value;
  }



  filteredSubGroups(category: string) {
    return this.subGroups.filter(subGroup => {
      // กรองตัวเลือกที่ไม่ต้องแสดงในแต่ละ dropdown
      if (category === 'sub-category1') {
        return subGroup.label !== this.novel.selectedSubCategory2; // ไม่แสดงค่าที่เลือกใน sub-category2
      } else if (category === 'sub-category2') {
        return subGroup.label !== this.novel.selectedSubCategory1; // ไม่แสดงค่าที่เลือกใน sub-category1
      }
      return true; // กรณี default แสดงทั้งหมด
    });
  }
  

  // updateNovelSubGroups() {
  //   this.subGroups = [this.selectedSubCategory1, this.selectedSubCategory2].filter(val => val);
  // }

  // onSelectionChange(): void {

  //   this.selectedLabels = [this.selectedSubCategory1, this.selectedSubCategory2].filter(val => val);
  //   console.log('Selected Labels:', this.selectedLabels);
  // }


  // Update tags dynamically and store in the novel object
  updateNovelTags(): void {
    this.novel.tag = this.tags.join(', ');
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

  // Handle recommended tags click event
  addTagRec(tagName: string) {
    console.log(`Tag added: ${tagName}`);
    this.tags.push(tagName);

    // Remove from recommendations
    const index = this.tageRec.findIndex(tag => tag.tag === tagName);
    if (index !== -1) {
      this.tageRec.splice(index, 1);
    }

    this.updateNovelTags();  // Update novel.tag
  }

  // Add a custom tag via input
  addTag() {
    if (this.newTag && this.tags.length < 18) {
      this.tags.push(this.newTag);
      this.newTag = '';
      this.updateNovelTags();  // Update novel.tag
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

  // Submit the novel form
 submit(): void {
    console.log('Form Submitted', this.novel);

    // ตรวจสอบว่าได้ครอบรูปภาพแล้วหรือยัง
    if (!this.uploadimageComponent?.croppedImageBlob) {
      this.popupService.showPopup("กรุณาเลือกรูปภาพและครอบรูปก่อน");
      return;
    }

    // ตรวจสอบข้อมูลที่กรอก
    // if (!this.novel.novelName || !this.novel.penName || !this.novel.mainGroups ||  
    //     !this.novel.tag || !this.novel.rate || !this.novel.desc) {
    //   this.popupService.showPopup("กรอกข้อมูลให้ครบ");
    //   return;
    // }

    this.resetValidation();

    let hasError = false;
  
    // ตรวจสอบฟิลด์แต่ละอัน
    if (!this.novel.novelName) {
      this.setInvalidField('title');
      hasError = true;
    }
    if (!this.novel.penName) {
      this.setInvalidField('penNameInput');
      hasError = true;
    }
    if (!this.novel.desc) {
      this.setInvalidField('subtitle');
      hasError = true;
    }
    if (!this.novel.rate) {
      this.setInvalidField('rating');
      hasError = true;
    }
    if (!this.novel.tag) {
      this.setInvalidField('tag');
      hasError = true;
    }  
    if (!this.selectedItem) {
      this.setInvalidField('subItemSelect');
      hasError = true;
    }
  
    // ถ้ามีข้อผิดพลาด ให้แสดงข้อความเตือน
    if (hasError) {
      this.popupService.showPopup('กรอกข้อมูลให้ครบ');
      return;
    }
    
  // ถ้าข้อมูลครบถ้วนให้ดำเนินการบันทึก
  this.saveNovel();
  }

  saveNovel() {
    console.log('Saving novel...', this.novel);
    // เพิ่มโค้ดสำหรับบันทึกข้อมูล
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
    formData.append('userId', this.novel.userId);

    // เพิ่มรูปภาพที่ครอบแล้วลงใน FormData
    const croppedImageBlob = this.uploadimageComponent.croppedImageBlob;
    if (croppedImageBlob) {
      formData.append('novel_propic', croppedImageBlob, "novelpropic.jpg");
    }

    // เรียกใช้ service เพื่อส่งข้อมูลไปยัง API
    this.novelService.storeNovel(formData).subscribe({
      next: (data) => {
        this.popupService.showPopup(JSON.stringify(data));
        setTimeout(() => {
          this.popupService.closePopup();
          window.location.reload();
        }, 2000);
      },
      error: (error) => this.popupService.showPopup(error.message),
    });
  }

      // fetch('http://localhost:3090/api/novel/storeNovel', {
      //   method: 'POST',
      //   headers: {
      //     Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTczMDYyMTY4OSwiZXhwIjoxNzMzMjEzNjg5fQ.3cWhDqm_371U6wJwUFWH8of0JJ6Mjox74NnMiNSqgTg",
      //   },
      //   body: formData, 
      // })
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error(`HTTP error! Status: ${response.status}`);
      //     }
      //     return response.json();
      //   })
      //   .then((data) => {

      //     if (data && data.data) {
      //       this.popupService.showPopup(JSON.stringify(data.data));
      //     } else {
      //       this.popupService.showPopup("No data received");
      //     }
      //   })
      //   .catch((error) => this.popupService.showPopup(JSON.stringify(error.error)));




  // Adjust the textarea height as the user types
  adjustHeight(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.style.height = 'auto';
    input.style.height = `${input.scrollHeight}px`;
  }

  goBack() {

  }
}
