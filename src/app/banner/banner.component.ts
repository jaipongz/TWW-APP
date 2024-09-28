import { Component, HostListener, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit, OnDestroy {
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
  isMobileView: boolean = false;
  slideInterval!: any;  // Store the interval ID

  constructor() {}

  ngOnInit(): void {
    this.checkViewport();
    this.startAutoSlide();  // Start auto-sliding when component initializes
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();  // Clear the interval when the component is destroyed
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkViewport();
  }

  checkViewport(): void {
    this.isMobileView = window.innerWidth <= 843;
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
    this.slideInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.scrollToSlide();
    }, 3000);
  }

  stopAutoSlide(): void {
    clearInterval(this.slideInterval);
  }
}
