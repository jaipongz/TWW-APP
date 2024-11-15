// src/app/services/popup.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  // ใช้ BehaviorSubject เพื่อควบคุมการแสดงผลของ popup
  private popupVisibility = new BehaviorSubject<boolean>(false);
  private popupMessage = new BehaviorSubject<string>('');

  // Observable ให้คอมโพเนนต์อื่น subscribe
  public isPopupVisible$ = this.popupVisibility.asObservable();
  public popupMessage$ = this.popupMessage.asObservable();

  // เปิด Popup พร้อมข้อความ
  showPopup(message: string) {
    this.popupMessage.next(message);
    this.popupVisibility.next(true);
    return this.popupVisibility.next(true);
  }

  // ปิด Popup
  closePopup() {
    this.popupVisibility.next(false);
  }

  
}
