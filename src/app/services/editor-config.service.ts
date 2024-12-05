import { Injectable } from '@angular/core';
import { AngularEditorConfig } from '@wfpena/angular-wysiwyg';

@Injectable({
  providedIn: 'root'
})
export class EditorConfigService {

  constructor() { }
  public mainconfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    textAreaBackgroundColor: 'white',
    // textAreaResize:'none',
    placeholder: 'Enter text here...',
    translate: 'yes',
    sanitize: true,
    enableToolbar: true,
    outline: false,
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
      // ['toggleEditorMode'],
    ]
  }

  public config: AngularEditorConfig = {
    ...this.mainconfig,
    minHeight: '300px',
    maxHeight: '600px',
    minWidth: '160px',
  };
}
