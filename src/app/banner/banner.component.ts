import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { NovelService } from '../services/novel.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit, OnDestroy {
  constructor(private router :Router, private http : HttpClient,
    private novelService:NovelService
  ) {
    this.updateBtnTag();
  }
  faChevronLeft  = faChevronLeft ;
  faChevronRight   = faChevronRight  ;

  btnTag = true;



  @ViewChild('flexcard', { static: true }) flexcard!: ElementRef;
  currentIndex = 0;
  autoSlideInterval: any;

  get previousIndex(): number {
    return (this.currentIndex - 1 + this.noveldata.length) % this.noveldata.length;
  }

  get nextIndex(): number {
    return (this.currentIndex + 1) % this.noveldata.length;
  }



  ngOnInit(): void {
    this.startAutoSlide();  // Start auto-sliding when component initializes
    this.generateButtonStyles(); //สีปุ่ม
    this.getAllnovel();
  }
  noveldata:any[] = [];
  currentPage: number = 1;
  totalNovels: number = 0; 
  novelsPerPage: number = 10; 
  getAllnovel() {
    const keyword = ''; // ค้นหาด้วย keyword
    const start = this.currentPage.toString();
    const limit = this.novelsPerPage.toString();

    this.novelService.getAllnovel(keyword, start, limit).subscribe({
      next: (response) => {
        if (response?.status === 'success') {
          this.noveldata = response.data.data;
          console.log('Novels:', this.noveldata);
          this.totalNovels = response.data.total;
        } else {
          console.error('Failed to fetch novels:', response);
        }
      },
      error: (err) => {
        console.error('Error fetching novels:', err);
      },
    });
  }

  

  @HostListener('window:resize', [])
  onResize() {
    this.updateBtnTag();
  }
  ngOnDestroy(): void {
    this.stopAutoSlide();  // Clear the interval when the component is destroyed
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.scrollToSlide();
    this.stopAutoSlide();
    this.startAutoSlide();  // Restart auto-slide after manual navigation
  }
  scrollToSlide(): void {
    const slideWidth = this.flexcard.nativeElement.clientWidth;
    this.flexcard.nativeElement.scrollTo({
      left: slideWidth * this.currentIndex,
      behavior: 'smooth'
    });
  }
  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.noveldata.length;
      this.scrollToSlide();
    }, 3000);
  }
  stopAutoSlide(): void {
    clearInterval(this.autoSlideInterval);
  }




  //taglist
  category = [
    {tag: 'ยอดนิยม'},
    {tag: 'คะแนน'},
    {tag: 'นิยาย (ฟรี)'},
    {tag: 'นิยาย (VIP)'},
    {tag: 'รัก'},
    {tag: 'โรมานซ์'},
    {tag: 'รักวัยรุ่น'},
    {tag: 'จีนโบราณ'},
    {tag: 'Boy Love'},
    {tag: 'สืบสวน'},
    {tag: 'ลึกลับ'},
    {tag: 'สยองขวัญ'},
    {tag: 'สะท้อนสังคม'},
    {tag: 'แฟนตาซี'},
    {tag: 'โรแมนติก'},
    {tag: 'แอ็คชั่น'},
    {tag: 'ผจญภัย'},
    {tag: 'สืบสวนสอบสวน'},
    {tag: 'สยองขวัญ'},
    {tag: 'ไซไฟ'},
    {tag: 'เหนือธรรมชาติ'},
    {tag: 'ดราม่า'},
    {tag: 'คอมเมดี้'},
    {tag: 'ย้อนเวลา'},
    {tag: 'ชีวิตประจำวัน'},
    {tag: 'วาย'},
    {tag: 'ยูริ'},
    {tag: 'ระบบ/เกม'},
    {tag: 'สงคราม'},
    {tag: 'โศกนาฏกรรม'},
    {tag: 'เอเซไก'},
    {tag: 'การเมือง'},
    {tag: 'โรแมนติกคอมเมดี้'},
  ]
  buttonStyles: any[] = [];

   // ฟังก์ชันสร้างสีสุ่ม
   generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // ฟังก์ชันตรวจสอบว่าใช้สีขาวหรือตัวหนังสือสีดำเพื่อให้มองเห็นได้ง่าย
  getTextColor(bgColor: string): string {
    // แปลง HEX เป็น RGB
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);
    // คำนวณค่าความสว่าง (brightness)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? '#000000' : '#FFFFFF'; // หากความสว่างมากพอให้ใช้สีดำ, น้อยให้ใช้สีขาว
  }

  // ฟังก์ชันสร้างสีของปุ่มและสีตัวหนังสือ
  generateButtonStyles() {
    const buttonCount = this.category.length; // จำนวนปุ่มที่ต้องการ (เปลี่ยนได้ตามต้องการ)
    this.buttonStyles = [];

    for (let i = 0; i < buttonCount; i++) {
      const bgColor = this.generateRandomColor();
      const textColor = this.getTextColor(bgColor);

      this.buttonStyles.push({
        backgroundColor: bgColor,
        color: textColor
      });
    }
  }

  showsBtn() {
     if (window.innerWidth >= 980) {
      this.btnTag = !this.btnTag; 
    }
  }

  private updateBtnTag() {
    this.btnTag = window.innerWidth < 980; // กำหนด true เสมอถ้าจอเล็กกว่า 980px
  }

  goTotag() {

  }
  



  popular = [
    {image: 'https://f.ptcdn.info/648/068/000/q7mr6ak8fdRxVA9ZBhY-o.jpg', name: 'title1',tag: 'tag1',penname: 'penname1',ep: 'ep1'},
    {image: 'https://f.ptcdn.info/080/004/000/1365740188-toriko4044-o.jpg', name: 'title2', tag: 'tag2',penname: 'penname2',ep: 'ep2'},
    {image: 'https://www.anime-sugoi.com/upload/9638355b86398bccc2f5145330592542.jpg', name: 'title3',tag: 'tag3',penname: 'penname3',ep: 'ep3'},
  ]




  recmmend = [
    {image: 'https://f.ptcdn.info/648/068/000/q7mr6ak8fdRxVA9ZBhY-o.jpg', name: 'title1', penname: 'penname1', ep: 'ep1'},
    {image: 'https://f.ptcdn.info/080/004/000/1365740188-toriko4044-o.jpg', name: 'title2', penname: 'penname2', ep: 'ep2'},
    {image: 'https://www.anime-sugoi.com/upload/9638355b86398bccc2f5145330592542.jpg', name: 'title3', penname: 'penname3', ep: 'ep3'},
    {image: 'https://wallpapers.com/images/featured/male-anime-characters-e5qgslpvg4gaf0rc.jpg', name: 'title4', penname: 'penname4', ep: 'ep4'},
    {image: 'https://t3.ftcdn.net/jpg/08/15/62/26/360_F_815622609_toLonURjFLS0I1vtK0NeTocROaHsFGlL.jpg', name: 'title5', penname: 'penname5', ep: 'ep5'},
    {image: 'https://image.cdn2.seaart.ai/2024-08-19/cr1fn4le878c739c4qv0/62e24d7ded28af7f3ae002db9e6ffe23f67f3d35_low.webp', name: 'title6', penname: 'penname6', ep: 'ep6'},
    {image: 'https://image.cdn2.seaart.ai/2024-08-19/cr1fn4le878c739c4qv0/62e24d7ded28af7f3ae002db9e6ffe23f67f3d35_low.webp', name: 'title6', penname: 'penname6', ep: 'ep6'},
    {image: 'https://image.cdn2.seaart.ai/2024-08-19/cr1fn4le878c739c4qv0/62e24d7ded28af7f3ae002db9e6ffe23f67f3d35_low.webp', name: 'title6', penname: 'penname6', ep: 'ep6'},
    {image: 'https://image.cdn2.seaart.ai/2024-08-19/cr1fn4le878c739c4qv0/62e24d7ded28af7f3ae002db9e6ffe23f67f3d35_low.webp', name: 'title6', penname: 'penname6', ep: 'ep6'},
    {image: 'https://image.cdn2.seaart.ai/2024-08-19/cr1fn4le878c739c4qv0/62e24d7ded28af7f3ae002db9e6ffe23f67f3d35_low.webp', name: 'title6', penname: 'penname6', ep: 'ep6'},
  ];
 

  novelupdate:any[] = []

}
