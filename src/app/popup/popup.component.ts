import { Component } from '@angular/core';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  
  popupVisible$;
  popupMessage$;
  constructor(private popupService: PopupService) {  
    this.popupVisible$ = this.popupService.isPopupVisible$;
    this.popupMessage$ = this.popupService.popupMessage$;
  }
  


  closePopup() {
    this.popupService.closePopup();
  }
}
