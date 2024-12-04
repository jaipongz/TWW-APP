import { Component } from '@angular/core';
import { AngularEditorConfig } from '@wfpena/angular-wysiwyg';
import { AuthService } from '../services/auth.service';
import { PopupService } from '../services/popup.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ceate-novel-ep',
  templateUrl: './ceate-novel-ep.component.html',
  styleUrl: './ceate-novel-ep.component.css',
  template: `
    <div class="editorContent1">
      <h3>Editor 1</h3>
      <app-text-editor
        [htmlContent]="editorContent1"
        (htmlContentChange)="onEditor1Change($event)"
        [config]="config1">
        <!-- (config1ContentChange)="onEditor1Change($event)" -->
      </app-text-editor>
      <p>Output Editor 1: {{ editorContent1 }}</p>
    </div>

    <div>
      <h3>Editor 2</h3>
      <app-text-editor
        [htmlContent]="editorContent2"
        (htmlContentChange)="onEditor2Change($event)"
        [config]="config2">
        
      </app-text-editor>
      <p>Output Editor 2: {{ editorContent2 }}</p>
    </div>
  `,
})
export class CeateNovelEpComponent {

  chapterid='';
  editorContent1: string = '';
  editorContent2: string = '';
  chaptername: string = ''

  writerMsg= '';
  isLoading: boolean | undefined;
  novelId = '';
  comment: 'T' | 'F' = 'F';


  constructor(private authService: AuthService,
    private popupService:PopupService,
    private route:ActivatedRoute,
  ){
    this.authService.getToken();
    this.getNovel();
  }

  config1: AngularEditorConfig = { 
    editable: true,
    minHeight: '300px',
    maxHeight: '600px',
    placeholder: 'Enter text here...',
   };

  config2: AngularEditorConfig = {
    editable: true,
    minHeight: '200px',
    maxHeight: '300px',
    placeholder: 'Enter text here...',
   };

   toggle(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.comment = checkbox.checked ? 'T' : 'F';
    console.log('Comment Permission:', this.comment);
  }

  // อัปเดตค่าเมื่อ Editor 1 มีการเปลี่ยนแปลง
  onEditor1Change(newContent: string) {
    this.editorContent1 = newContent;
  }

  // อัปเดตค่าเมื่อ Editor 2 มีการเปลี่ยนแปลง
  onEditor2Change(newContent: string) {
    this.editorContent2 = newContent;
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
