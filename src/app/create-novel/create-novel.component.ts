import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NovelService } from '../services/novel.service';
import { faCamera, faCaretDown, faPlus, faBookOpen, faArrowUpWideShort, faPenToSquare, faComment, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-novel',
  templateUrl: './create-novel.component.html',
  styleUrl: './create-novel.component.css'
})
export class CreateNovelComponent {
  faCamera = faCamera;
  faCaretDown = faCaretDown;
  faPlus = faPlus;
  faBookOpen = faBookOpen;
  faArrowUpWideShort = faArrowUpWideShort;
  faPenToSquare = faPenToSquare;
  faComment = faComment;
  faPen = faPen;
  // faTwitch = faTwitch;
  

  showSortDropdown = false;
  showStatusStoryDropdown = false;
  showStatusCompleteDropdown = false;

  isOriginal = true;  // ค่าเริ่มต้นให้เป็นนิยายออรินอล
  isFanfiction = false;

  selectCategory(category: string) {
    this.isOriginal = category === 'original';
    this.isFanfiction = category === 'fanfiction';
  }

  @ViewChild('sortDropdown', { static: false }) sortDropdown!: ElementRef;
  @ViewChild('createPopup', { static: false }) createPopup!: ElementRef;

  toggleSortDropdown() {
    this.showSortDropdown = !this.showSortDropdown;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = this.sortDropdown?.nativeElement;
    if (this.showSortDropdown && dropdown && !dropdown.contains(target)) {
      this.showSortDropdown = false;
    }
  }

  toggleStatusStoryDropdown() {
    this.showStatusStoryDropdown = !this.showStatusStoryDropdown;
  }

  toggleStatusCompleteDropdown() {
    this.showStatusCompleteDropdown = !this.showStatusCompleteDropdown;
  }

  // ฟังก์ชันเปิดและปิด popup
  openPopup() {
    this.createPopup.nativeElement.classList.remove('hidden');
  }

  closePopup(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target === this.createPopup.nativeElement) {
      this.createPopup.nativeElement.classList.add('hidden');
    }
  }

  novelForm: FormGroup;
  tagsList = [
    { value: 'fantasy', label: 'แฟนตาซี (Fantasy)' },
    { value: 'romance', label: 'โรแมนติก (Romance)' },
    { value: 'action', label: 'แอ็คชั่น (Action)' },
    // (รายการแท็กอื่น ๆ ...)
  ];

  constructor(private fb: FormBuilder, private novelService: NovelService) {
    this.novelForm = this.fb.group({
      novelName: ['', Validators.required],
      penName: ['', Validators.required],
      group: ['fiction', Validators.required],
      type: ['DES', Validators.required],
      tags: this.fb.array([]),
      rate: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      desc: ['', Validators.required],
      novel_propic: [null, Validators.required],
      userId: ['', Validators.required]
    });
  }

  get tags(): FormArray {
    return this.novelForm.get('tags') as FormArray;
  }

  onTagChange(event: any, tag: string) {
    if (event.target.checked) {
      this.tags.push(this.fb.control(tag));
    } else {
      const index = this.tags.controls.findIndex(x => x.value === tag);
      this.tags.removeAt(index);
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.novelForm.patchValue({ novel_propic: file });
  }

  submitForm() {
    const formData = new FormData();
    Object.keys(this.novelForm.controls).forEach(key => {
      if (key === 'tags') {
        formData.append(key, JSON.stringify(this.tags.value));
      } else {
        formData.append(key, this.novelForm.get(key)?.value);
      }
    });

    this.novelService.storeNovel(formData).subscribe({
      next: (response: any) => alert(response.message),
      error: (error) => {
        console.error('Error:', error);
        alert('An error occurred.');
      }
    });
  }
}
