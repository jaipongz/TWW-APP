import { Component } from '@angular/core';

@Component({
  selector: 'app-category-novel',
  templateUrl: './category-novel.component.html',
  styleUrl: './category-novel.component.css'
})
export class CategoryNovelComponent { 
  activeTab: string = '';
  buttonText: string = '+ สร้างลิสต์ใหม่'; // ข้อความเริ่มต้นของปุ่ม

  activateTab(tab: string): void {
    this.activeTab = this.activeTab === tab ? '' : tab;
  }
  novelsub =false;
  ebooksub =false;
  cartoonsub =false;
  constructor() {}
  novel(){
    this.novelsub=!this.novelsub; 
    this.ebooksub =false;
    this.cartoonsub =false;
    this.updateButtonText();

  }
  ebook(){
    this.novelsub=false; 
    this.ebooksub =!this.ebooksub;
    this.cartoonsub =false;
    this.updateButtonText();
  }
  cartoon(){
    this.novelsub=false; 
    this.ebooksub =false;
    this.cartoonsub =!this.cartoonsub;
    this.updateButtonText();
  }
  updateButtonText() {
    if (this.activeTab === 'novel') {
      this.buttonText = 'เพิ่มลิสต์นิยายบรรยาย';
    } else if (this.activeTab === 'ebook') {
      this.buttonText = 'เพิ่มลิสต์นิยายแชท';
    } else if (this.activeTab === 'cartoon') {
      this.buttonText = 'เพิ่มลิสต์กระทู้';
    } else {
      this.buttonText = '+ สร้างลิสต์ใหม่';
    }
  }
}

