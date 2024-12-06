import { Component } from '@angular/core';
import { AngularEditorConfig } from '@wfpena/angular-wysiwyg';
import { AuthService } from '../services/auth.service';
import { PopupService } from '../services/popup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorConfigService } from '../services/editor-config.service';
import { customConfirm } from '../services/customConfirm.service';
import { NovelService } from '../services/novel.service';

@Component({
  selector: 'app-create-novel-ep',
  templateUrl: './create-novel-ep.component.html',
  styleUrl: './create-novel-ep.component.css',
})
export class CreateNovelEpComponent {


  data = {
    editorContent1:  '',
    editorContent2:  '',
    chaptername: '',
  }


  

  isLoading: boolean | undefined;
  novelId = '';
  comment: 'T' | 'F' = 'F';
  

  constructor(private authService: AuthService,
    private popupService:PopupService,
    private route:ActivatedRoute,
    private novelService: NovelService,
    private cusComfirm:customConfirm
  ){
    this.authService.getToken();
    this.getNovel();
    this.getToSessionStorage();
  }

  config1: AngularEditorConfig = { 
    editable: true,
    minHeight: '300px',
    maxHeight: '600px',
    placeholder: 'Enter text here...',
    spellcheck: true,
    minWidth: '160px',
    textAreaBackgroundColor: 'white',
    translate: 'yes',
    sanitize: true,
    outline:false,
    enableToolbar: true,
    defaultFontName: 'Comic Sans MS',
    defaultFontSize: '5',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'roboto-condensed-embedded', name: 'Roboto' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
      { class: 'roboto-slab', name: 'RobotoSlab', label: 'Roboto Custom' },
      { class: 'custom-font', name: 'Custom Font', label: 'ฟอนต์พิเศษ' } // ฟอนต์ใหม่
    ],
    showToolbar: true,
    textPatternsEnabled: true,
    customClasses: [
      {
        name: 'quote',
        class: 'angular-editor-quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    editHistoryLimit: 3,
    imageResizeSensitivity: 2,
    toolbarHiddenButtons: [

      ['insertVideo'],
      ['toggleEditorMode'],
    ]
   };

  config2: AngularEditorConfig = {
    editable: true,
    minHeight: '200px',
    maxHeight: '300px',
    placeholder: 'Enter text here...',
    spellcheck: true,
    minWidth: '160px',
    textAreaBackgroundColor: 'white',
    translate: 'yes',
    sanitize: true,
    outline:false,
    enableToolbar: true,
    defaultFontName: 'Comic Sans MS',
    defaultFontSize: '5',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'roboto-condensed-embedded', name: 'Roboto' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
      { class: 'roboto-slab', name: 'RobotoSlab', label: 'Roboto Custom' },
      { class: 'custom-font', name: 'Custom Font', label: 'ฟอนต์พิเศษ' } // ฟอนต์ใหม่
    ],
    showToolbar: true,
    // defaultParagraphSeparator: 'p',
    textPatternsEnabled: true,
    customClasses: [
      {
        name: 'quote',
        class: 'angular-editor-quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    editHistoryLimit: 3,
    imageResizeSensitivity: 2,
    toolbarHiddenButtons: [
      ['insertImage'],
      ['insertVideo'],
      ['toggleEditorMode'],
    ]
   };

   

   saveToSessionStorage() {
    try {
      // แปลงข้อมูล novel เป็น JSON และเก็บใน localStorage
      console.log('Saving to localStorage', this.data);
      sessionStorage.setItem('getEpCreate', JSON.stringify(this.data));

    } catch (error) {
      console.error('Error saving to localStorage:', error);

    }
  }

  getToSessionStorage() {
    const storedData = sessionStorage.getItem('getEpCreate');
    if (storedData) {
      try {
        this.data = JSON.parse(storedData);
        console.log('Loaded data from localStorage:', this.data);
      } catch (error) {
        console.error('Failed to parse JSON:', error);
        sessionStorage.removeItem('getEpCreate');
      }
    }
   }


  isObject(val: any): boolean {
    return this.getTypeofVariable(val) === 'object';
  }

  getTypeofVariable(value: any) {
    return typeof value;
  }

   toggle(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.comment = checkbox.checked ? 'T' : 'F';
    console.log('Comment Permission:', this.comment);
  }



  getNovel = () => {
    this.route.queryParams.subscribe(params => {
      this.novelId = params['novelId'];
      console.log('Received novelId:', this.novelId);
    });
  }

  async btnCancel() {
    const confirmed = await this.cusComfirm.customConfirm(`ไม่ต้องการสร้างอีกต่อไป`);
    if (confirmed) {
      sessionStorage.removeItem('getEpCreate');
      this.novelService.goTo('subject');
    }
  }
  
  async addEpisode() {
    if (!this.data.chaptername) {
      this.popupService.showPopup('กรุณากรอกชื่อตอน');
      return;
    } else if (!this.data.editorContent1) {
      this.popupService.showPopup('กรุณากรอกเนื้อหา');
      return;
    }

    const confirmed = await this.cusComfirm.customConfirm(`ต้องการสร้างตอน: ${this.data.chaptername}`);
    if (confirmed) {
      const novelId = this.novelId; // ID ของนิยาย
      const payload = {
        chapterName: this.data.chaptername,
        content: this.data.editorContent1,
        writerMsg: this.data.editorContent2,
        comment: this.comment,
      }
      this.authService.addEpsode(novelId, payload).subscribe({
        next: () => {
         this.popupService.showPopup('Episode added successfully');
         setTimeout(() => {
          this.popupService.closePopup();
          this.novelService.goTo('subject');
         }, 3000);
        },
        error: (error) => {
          this.popupService.showPopup('Error adding episode');
        }}
      );
      
    } else {
      this.popupService.showPopup('Cancel');
    }
  }

  

}
