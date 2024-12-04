import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { angularEditorConfig, AngularEditorConfig } from '@wfpena/angular-wysiwyg';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.css',
  template: `
    <div class="container">
      <angular-editor
        id="editor1"
        [(ngModel)]="htmlContent"
        [config]="config1"
        (ngModelChange)="onModelChange($event)"
        (blur)="onBlur($event)">
      </angular-editor>
    </div>
  `,
})
export class TextEditorComponent {

  @Input() htmlContent: string = ''; // รับค่าจากหน้าที่เรียก
  @Output() htmlContentChange = new EventEmitter<string>(); // ส่งค่ากลับเมื่อมีการเปลี่ยนแปลง
  
  
  editorConfig!: AngularEditorConfig;
  angularEditorLogo:any;
  form!: FormGroup;

  constructor( 
    private formBuilder: FormBuilder,
    private http: HttpClient,){}

    // @Input() 
    config1: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '300px',
    minWidth: '160px',
    maxHeight: '15rem',
    textAreaBackgroundColor: 'white',
    textAreaResize:'none',
    placeholder: 'Enter text here...',
    translate: 'yes',
    sanitize: true,
    enableToolbar: true,
    // toolbarPosition: 'top',
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
    textPatternsEnabled:true,
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
    // uploadUrl: 'http://localhost:9000/upload_img',
    // upload: (file) => {
    //   const url = 'http://localhost:9000/upload_img';
    //   const uploadData: FormData = new FormData();
    //   uploadData.append('file', file, file.name);
    //   return this.http.post<{file:string, url: string}>(url, uploadData, {
    //     // reportProgress: true,
    //     observe: 'response',
    //     // withCredentials: this.uploadWithCredentials,
    //   })
    //   .pipe(
    //     map(response => {
    //       const imageUrl = response.body.url;
    //       return { ...response, body: { imageUrl }} as HttpResponse<UploadResponse>;
    //     })
    //   );
    // },
    editHistoryLimit: 3,
    imageResizeSensitivity: 2,
    toolbarHiddenButtons: [
      // ['bold', 'italic'],
      // ['fontSize'],
      ['insertVideo'],
      // ['insertHTML'],
    ]
  };
  // @Output() config1ContentChange = new EventEmitter<string>();

  onModelChange(newContent: string) {
    this.htmlContentChange.emit(newContent); // ส่งค่าออกไป

    // if (this.config) {
    //   // Merge the custom config with the default config if necessary
    //   this.config = { ...this.editorConfig, ...this.config };
    // }
  }
  // ngOnChanges() {
  
  // }
  
  onChange(event: any) {
    console.log('changed');
    // const text = this.htmlContent;
    // console.log('text',text);
  }

  onBlur(event: any) {
    console.log('blur ' + event);
  }

  // onChange2(event: any) {
  //   console.warn(this.form.value);
  // }

  // onChange3(event: any) {}

  isObject(val: any): boolean {
    return this.getTypeofVariable(val) === 'object';
  }

  getTypeofVariable(value: any) {
    return typeof value;
  }

}
