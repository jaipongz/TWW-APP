import { Component } from '@angular/core';
import { AngularEditorConfig } from '@wfpena/angular-wysiwyg';


@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrl: './create-topic.component.css'
})
export class CreateTopicComponent {

  data = {
    editorContent1:  '',
    editorContent2:  '',
    chaptername: '',
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

   saveToSessionStorage() {
    try {
      // แปลงข้อมูล novel เป็น JSON และเก็บใน localStorage
      console.log('Saving to localStorage', this.data);
      sessionStorage.setItem('getEpCreate', JSON.stringify(this.data));

    } catch (error) {
      console.error('Error saving to localStorage:', error);

    }
  }

  tags = [
    { value: 'love', label: 'รัก' },
    { value: 'romance', label: 'โรแมนซ์' },
    { value: 'fantasy', label: 'แฟนตาซี' },
    { value: 'teenlove', label: 'รักวัยรุ่น' },
    { value: 'drama', label: 'ดราม่า' }
  ];

  selectedTag: string = ''; // ตัวแปรที่ใช้เก็บค่าที่เลือกจาก dropdown
}
