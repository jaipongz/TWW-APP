import { Component, HostListener, ViewChild, ElementRef,OnInit } from '@angular/core';
import { NovelService } from '../services/novel.service';
import { faCamera, faCaretDown, faPlus, faBookOpen, faArrowUpWideShort,faArrowDownWideShort, faPenToSquare, faComment, faPen } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { PopupService } from '../services/popup.service';
import { Router } from '@angular/router';
import { customConfirm } from '../services/customConfirm.service';
import { UploadService } from '../services/upload.service';
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
  faArrowDownWideShort = faArrowDownWideShort;
  isArrowUp = true;
  faPenToSquare = faPenToSquare;
  faComment = faComment;
  faPen = faPen;
  // faTwitch = faTwitch;


  showSortDropdown = false;
  showStatusStoryDropdown = false;
  showStatusCompleteDropdown = false;

  userId:any;

  constructor(private novelService: NovelService, 
    private authService: AuthService, 
    private popupService: PopupService, 
    private router: Router,
    private customconfirm:customConfirm,
    private uploadService:UploadService) {
    this.authService.checkLoginStatus();
    this.getNovel();
    this.getProfile();
    this.getCountNovel();
    this.userId = this.authService.getUserId();
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
  
  ngOnInit(): void {
    
    // สมัครรับ EventEmitter เพื่อเรียก updateProfile เมื่อการครอปเสร็จ
    this.uploadService.cropCompleted.subscribe(() => {
      this.updateProfile();
      window.location.reload();
    });

    
  }

  toggleIcon(): void {
    this.isArrowUp = !this.isArrowUp; 
    this.sortOrder = this.isArrowUp ? 'desc' : 'asc'; 
  }

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
    if (!this.getNovelCreate.group || !this.getNovelCreate.type) {
      this.popupService.showPopup('ตัวเลือกไม่ครบ');
    } else if (this.getNovelCreate.type === 'gist') {
      this.novelService.setNovelCreate(this.getNovelCreate);
      this.router.navigate(['createTopic']);
    } else {
      this.novelService.setNovelCreate(this.getNovelCreate);
      this.router.navigate(['create-novel']);
    }
  }

  showDashboard = false; // ตัวแปรควบคุมการแสดงผลแดชบอร์ด
  chartOptions = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Example Data',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Item A' },
          { value: 735, name: 'Item B' },
          { value: 580, name: 'Item C' },
          { value: 484, name: 'Item D' },
          { value: 300, name: 'Item E' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      data: ['Evaporation', 'Precipitation', 'Temperature'],
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisPointer: {
          type: 'shadow',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Precipitation',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value} ml',
        },
      },
      {
        type: 'value',
        name: 'Temperature',
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
          formatter: '{value} °C',
        },
      },
    ],
    // เพิ่ม series ที่นี่
    series: [
      {
        name: 'Evaporation',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value: number) {
            return value + ' ml';
          },
        },
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6],
      },
      {
        name: 'Precipitation',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value: number) {
            return value + ' ml';
          },
        },
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6],
      },
      {
        name: 'Temperature',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value: number) {
            return value + ' °C';
          },
        },
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3],
      },
    ],
  };

  toggleDashboard() {
    this.showDashboard = !this.showDashboard;
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
  profileData: any;
  countNovel: any;
  getNovel() {
    const keyword = ''; // ใส่ keyword ที่ต้องการ
    const start = '';
    const limit = '';

    this.authService.getNovelDetail(keyword, start, limit).subscribe({
      next: (response) => {
        if (response?.status === 'success') {
          this.noveldata = response.data.data; // เก็บข้อมูล novel ใน array
          console.log('Novels:', this.noveldata);
          this.filterNovelData();
        } else {
          console.error('Failed to fetch novels:', response);
        }
      },
      error: (err) => {
        console.error('Error fetching novels:', err);
      },
    });
  }
async deleteNovel(index: number){
  const novelId = this.noveldata[index]?.novel_id;
  const novelName = this.noveldata[index]?.novel_name;

    if (!novelId) {
      this.popupService.showPopup('ไม่พบ ID เรื่องที่ต้องการลบ');
      return;
    }
    const confirmed = await this.customconfirm.customConfirm(`ต้องการลบเรื่อง ${novelName}`);
    if (confirmed) {
      this.authService.deleteNovel(novelId).subscribe({
        next: () => {
          this.popupService.showPopup(`ลบเรื่อง ${novelName} สำเร็จแล้ว`);
          this.getNovel();
        },
        error: () => {
          this.popupService.showPopup(`ลบเรื่อง ${novelName} ไม่สำเร็จ กรุณาลองใหม่`);
        }
      })
    }
  
}
filteredNovelData = [...this.noveldata];
selectedStatus: string = 'ทั้งหมด';
sortOrder: 'asc' | 'desc' = 'desc';
selectedComplete: string = 'ทั้งหมด';

selectStatus(status: string) {
  this.selectedStatus = status;
  this.filterNovelData();
  this.showStatusStoryDropdown = false;
}
selectComplete(status: string) {
  this.selectedComplete = status;
  this.filterNovelData();
  this.showStatusCompleteDropdown = false;
}

filterNovelData() {
  this.filteredNovelData = this.noveldata.filter(data => {
    let statusMatch = true;
    let completeMatch = true;

    // กรองตามสถานะ (เผยแพร่แล้ว/ร่าง)
    switch (this.selectedStatus) {
      case 'เผยแพร่แล้ว':
        statusMatch = data.published === 'T';
        break;
      case 'ร่าง':
        statusMatch = data.published === 'F';
        break;
      default:
        statusMatch = true; // แสดงทั้งหมดถ้าไม่ได้เลือกสถานะ
    }

    // กรองตามสถานะจบ/ไม่จบ
    switch (this.selectedComplete) {
      case 'จบแล้ว':
        completeMatch = data.end === 'T';
        break;
      case 'ยังไม่จบ':
        completeMatch = data.end === 'F';
        break;
      default:
        completeMatch = true; // แสดงทั้งหมดถ้าไม่ได้เลือกสถานะ
    }

    // รวมเงื่อนไขทั้งสอง
    return statusMatch && completeMatch;
  });
}



  timeAgoThai(updatedAt: string): string {
    const now = new Date();
    const updatedTime = new Date(updatedAt); // Convert string to Date object
    const diffInSeconds = Math.floor((now.getTime() - updatedTime.getTime()) / 1000);

    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;
    const secondsInWeek = 7 * secondsInDay;
    const secondsInMonth = 30 * secondsInDay; // Approximation
    const secondsInYear = 365 * secondsInDay; // Approximation

    if (diffInSeconds < secondsInMinute) {
      return `${diffInSeconds} วินาที ที่แล้ว`;
    } else if (diffInSeconds < secondsInHour) {
      const minutes = Math.floor(diffInSeconds / secondsInMinute);
      return `${minutes} นาที ที่แล้ว`;
    } else if (diffInSeconds < secondsInDay) {
      const hours = Math.floor(diffInSeconds / secondsInHour);
      return `${hours} ชั่วโมง ที่แล้ว`;
    } else if (diffInSeconds < secondsInWeek) {
      const days = Math.floor(diffInSeconds / secondsInDay);
      return `${days} วัน ที่แล้ว`;
    } else if (diffInSeconds < secondsInMonth) {
      const weeks = Math.floor(diffInSeconds / secondsInWeek);
      return `${weeks} สัปดาห์ ที่แล้ว`;
    } else if (diffInSeconds < secondsInYear) {
      const months = Math.floor(diffInSeconds / secondsInMonth);
      return `${months} เดือน ที่แล้ว`;
    } else {
      const years = Math.floor(diffInSeconds / secondsInYear);
      return `${years} ปี ที่แล้ว`;
    }
  }
  async updateProfile(): Promise<void> {
    const formData = new FormData();
    formData.append('userId', this.userId);

    if (this.uploadService.croppedImageBlob) {
      // หากมีรูปภาพที่ถูกครอบใหม่
      formData.append('profile_pic', this.uploadService.croppedImageBlob, 'Avatar.png');
    }

    this.authService.updateProfile(formData).subscribe({
      next(response: any) {
        console.log('profile updated:', response.data);
      },
      error(err) {
        console.error('Error updating profile:', err);
      },
    });
  }

   async onFileChange(event: Event): Promise<void> {
    this.uploadService.handleFileSelect(event, (imageSrc: string) => {
      this.uploadService.openCropTool(imageSrc, 'cropModal', 'imagePreview');
    });
  }

  getProfile() {
    this.authService.getProfile().subscribe({
      next: (response: any) => {
        if (response?.status === 'success') {
          console.log(response);
          
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
  getCountNovel() {
    this.authService.getCountNovel().subscribe({
      next: (response: any) => {
        if (response?.status === 'success') {
          console.log(response);
          
          this.countNovel = response.data; // Store fetched data in `countNovel`
          console.log('Count Data:', this.countNovel);
        } else {
          console.error('Failed to fetch novels:', response);
        }
      },
      error: (err) => {
        console.error('Error fetching novels:', err);
      },
    });
  }

  addChapter(novel: any) {
    this.router.navigate(['/subject'], {
      state: { novel }
    });
  }

}
