import { Component } from '@angular/core';
import { faHeart, faEye, faPlus, faGift, faStar, faList, faMessage, faBookmark, faTag, faChevronLeft, faChevronRight, faFileLines } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lits',
  templateUrl: './lits.component.html',
  styleUrl: './lits.component.css'
})
export class LitsComponent {
  faHeart = faHeart;
  faEye = faEye;
  faPlus = faPlus;
  faGift = faGift;
  faStar = faStar;
  faList = faList;
  faMessage = faMessage;
  faBookmark = faBookmark;
  faTag = faTag;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faFileLines = faFileLines;
}
