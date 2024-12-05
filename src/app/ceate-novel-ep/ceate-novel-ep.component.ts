import { Component } from '@angular/core';
import { AngularEditorConfig } from '@wfpena/angular-wysiwyg';
import { AuthService } from '../services/auth.service';
import { PopupService } from '../services/popup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorConfigService } from '../services/editor-config.service';

@Component({
  selector: 'app-ceate-novel-ep',
  templateUrl: './ceate-novel-ep.component.html',
  styleUrl: './ceate-novel-ep.component.css',
})
export class CeateNovelEpComponent {

  chapterid='';
  editorContent1: string = '';
  editorContent2: string = '';
  chaptername: string = ''

  isLoading: boolean | undefined;
  novelId = '';
  comment: 'T' | 'F' = 'F';
  

  constructor(private authService: AuthService,
    private popupService:PopupService,
    private route:ActivatedRoute,
    private configService: EditorConfigService,
  ){
    this.authService.getToken();
    this.getNovel();
    
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
    sanitize: false,
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
    textPatternsEnabled: false,
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
      // ['bold', 'italic'],
      // ['fontSize'],
      ['insertVideo'],
      // ['insertHTML'],
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
    sanitize: false,
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
    textPatternsEnabled: false,
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
      // ['bold', 'italic'],
      // ['fontSize'],
      ['insertVideo'],
      // ['insertHTML'],
    ]
   };

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

  addEpisode() {
    const novelId = this.novelId; // ID ของนิยาย
    const payload = {
      chapterName: this.chaptername,
      content: this.editorContent1,
      writerMsg: this.editorContent2,
      comment: this.comment,

    }
    console.log('editorContent1:', payload);
  
    // append('chapterName', 'testttttt');
    // append('content', 'sdfddfsdfsdfdsfdsf');
    // append('writerMsg', ' ');
    // append('comment', 'T');

    this.authService.addEpsode(novelId, payload).subscribe(
      (response) => {
        console.log('Episode added successfully', response);
      },
      (error) => {
        console.error('Error adding episode', error);
      }
    );
  }

  private handleError(error: any, defaultMessage: string) {
    const errorMessage = error.status === 0
      ? 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่'
      : `${defaultMessage}: ${error.message}`;
    this.popupService.showPopup(errorMessage);
    console.error('API Error:', error);
  }

  
  // Optional: Methods to show success/error messages
  showSuccessMessage(message: string) {
    // Implement a toast notification or modal to show success message
    alert(message); // Replace with better UI feedback
  }
  
  showErrorMessage(message: string) {
    // Implement a toast notification or modal to show error message
    alert(message); // Replace with better UI feedback
  }

}
