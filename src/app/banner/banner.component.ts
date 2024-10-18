import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit, OnDestroy {
  constructor(private router :Router, private http : HttpClient) {}


  @ViewChild('flexcard', { static: true }) flexcard!: ElementRef;
  currentIndex: number = 0;
  slides = [
    { image: 'https://f.ptcdn.info/648/068/000/q7mr6ak8fdRxVA9ZBhY-o.jpg', title: 'Title 1' },
    { image: 'https://scontent.fbkk13-1.fna.fbcdn.net/v/t1.6435-9/129916056_440002277399906_460674330335970150_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeH8p3IXv3RX3XhX6oJZbzXrKejQQfdB82Yp6NBB90HzZtDfHmFBJTAWR1EwUxHBbrbIw4tpnlKTq2YdGbeJZZq1&_nc_ohc=syu_dsK4sNAQ7kNvgGvkc2v&_nc_ht=scontent.fbkk13-1.fna&_nc_gid=A49BF8B49ddM3IAevY2PnIX&oh=00_AYD3CrhXVbmtShDV6IyFlFbMRKMyfnOx5hh5N0jAZBTWNQ&oe=671DE7F8', title: 'Title 2' },
    { image: 'https://scontent.fbkk8-4.fna.fbcdn.net/v/t1.6435-9/119609932_376468370419964_2429540315894928559_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFcw14OkQld1x1PJUZO5BpQoyPEH6Tbhk-jI8QfpNuGT9lDfda0OlPbDnfGI3Kxp2jAJvMYgD4d1mOaGbx8jy4X&_nc_ohc=n5KbptZXKSUQ7kNvgEbHX2u&_nc_ht=scontent.fbkk8-4.fna&_nc_gid=AgUk1XBQgZRL-xCeCmIiM9y&oh=00_AYDMe1wAPyuBCLLO7zxCGRafo3FXKJJ5Z35Qasyrzkb5pw&oe=671E08A1', title: 'Title 3' },
    { image: 'https://f.ptcdn.info/080/004/000/1365740188-toriko4044-o.jpg', title: 'Title 4' },
    { image: 'https://www.anime-sugoi.com/upload/9638355b86398bccc2f5145330592542.jpg', title: 'Title 5' },
    // Add more slides as needed
  ];
  // isMobileView: boolean = false;
  slideInterval!: any;  // Store the interval ID

  

  ngOnInit(): void {
    // this.checkViewport();
    this.startAutoSlide();  // Start auto-sliding when component initializes
    
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token found:', token);
      // Proceed with banner page logic
    } else {
      console.log('No token found, redirecting to login');
      // this.router.navigate(['login']); // Redirect to login if no token
    }
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();  // Clear the interval when the component is destroyed
  }

  // @HostListener('window:resize', [])
  // onResize() {
  //   this.checkViewport();
  // }

  // checkViewport(): void {
  //   this.isMobileView = window.innerWidth <= 843;
  // }
  
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
    this.slideInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.scrollToSlide();
    }, 3000);
  }

  stopAutoSlide(): void {
    clearInterval(this.slideInterval);
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
  ]

  
  currentRecomment = 0;

  get visibleCards() {
    return this.recmmend.slice(this.currentRecomment, this.currentRecomment + 5); // แสดงการ์ด 3 อันจากดัชนีปัจจุบัน
  }

  nextCard() {
    if (this.currentRecomment < this.recmmend.length - 5) {
      this.currentRecomment += 1; // เลื่อนดูการ์ดถัดไป
    }
  }

  prevCard() {
    if (this.currentRecomment > 0) {
      this.currentRecomment -= 1; // เลื่อนดูการ์ดก่อนหน้า
    }
  }



  novelupdate = [
    {image: 'https://f.ptcdn.info/648/068/000/q7mr6ak8fdRxVA9ZBhY-o.jpg', name: 'title1', penname: 'penname1', ep: 'ep1'},
    {image: 'https://f.ptcdn.info/648/068/000/q7mr6ak8fdRxVA9ZBhY-o.jpg', name: 'title1', penname: 'penname1', ep: 'ep1'},
    {image: 'https://f.ptcdn.info/648/068/000/q7mr6ak8fdRxVA9ZBhY-o.jpg', name: 'title1', penname: 'penname1', ep: 'ep1'},
    {image: 'https://f.ptcdn.info/648/068/000/q7mr6ak8fdRxVA9ZBhY-o.jpg', name: 'title1', penname: 'penname1', ep: 'ep1'},
    {image: 'https://f.ptcdn.info/080/004/000/1365740188-toriko4044-o.jpg', name: 'title2', penname: 'penname2', ep: 'ep2'},
    {image: 'https://f.ptcdn.info/080/004/000/1365740188-toriko4044-o.jpg', name: 'title2', penname: 'penname2', ep: 'ep2'},
    {image: 'https://f.ptcdn.info/080/004/000/1365740188-toriko4044-o.jpg', name: 'title2', penname: 'penname2', ep: 'ep2'},
    {image: 'https://f.ptcdn.info/080/004/000/1365740188-toriko4044-o.jpg', name: 'title2', penname: 'penname2', ep: 'ep2'},
    {image: 'https://f.ptcdn.info/080/004/000/1365740188-toriko4044-o.jpg', name: 'title2', penname: 'penname2', ep: 'ep2'},
    {image: 'https://www.anime-sugoi.com/upload/9638355b86398bccc2f5145330592542.jpg', name: 'title3', penname: 'penname3', ep: 'ep3'},
    {image: 'https://www.anime-sugoi.com/upload/9638355b86398bccc2f5145330592542.jpg', name: 'title3', penname: 'penname3', ep: 'ep3'},
    {image: 'https://www.anime-sugoi.com/upload/9638355b86398bccc2f5145330592542.jpg', name: 'title3', penname: 'penname3', ep: 'ep3'},
    {image: 'https://www.anime-sugoi.com/upload/9638355b86398bccc2f5145330592542.jpg', name: 'title3', penname: 'penname3', ep: 'ep3'},
    {image: 'https://www.anime-sugoi.com/upload/9638355b86398bccc2f5145330592542.jpg', name: 'title3', penname: 'penname3', ep: 'ep3'},
    {image: 'https://www.anime-sugoi.com/upload/9638355b86398bccc2f5145330592542.jpg', name: 'title3', penname: 'penname3', ep: 'ep3'},
    {image: 'https://wallpapers.com/images/featured/male-anime-characters-e5qgslpvg4gaf0rc.jpg', name: 'title4', penname: 'penname4', ep: 'ep4'},
    {image: 'https://wallpapers.com/images/featured/male-anime-characters-e5qgslpvg4gaf0rc.jpg', name: 'title4', penname: 'penname4', ep: 'ep4'},
    {image: 'https://wallpapers.com/images/featured/male-anime-characters-e5qgslpvg4gaf0rc.jpg', name: 'title4', penname: 'penname4', ep: 'ep4'},
    {image: 'https://t3.ftcdn.net/jpg/08/15/62/26/360_F_815622609_toLonURjFLS0I1vtK0NeTocROaHsFGlL.jpg', name: 'title5', penname: 'penname5', ep: 'ep5'},
    {image: 'https://t3.ftcdn.net/jpg/08/15/62/26/360_F_815622609_toLonURjFLS0I1vtK0NeTocROaHsFGlL.jpg', name: 'title5', penname: 'penname5', ep: 'ep5'},
    {image: 'https://t3.ftcdn.net/jpg/08/15/62/26/360_F_815622609_toLonURjFLS0I1vtK0NeTocROaHsFGlL.jpg', name: 'title5', penname: 'penname5', ep: 'ep5'},
    {image: 'https://t3.ftcdn.net/jpg/08/15/62/26/360_F_815622609_toLonURjFLS0I1vtK0NeTocROaHsFGlL.jpg', name: 'title5', penname: 'penname5', ep: 'ep5'},
    {image: 'https://t3.ftcdn.net/jpg/08/15/62/26/360_F_815622609_toLonURjFLS0I1vtK0NeTocROaHsFGlL.jpg', name: 'title5', penname: 'penname5', ep: 'ep5'},
  ]

}
