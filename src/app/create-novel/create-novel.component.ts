import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NovelService } from '../services/novel.service';

@Component({
  selector: 'app-create-novel',
  templateUrl: './create-novel.component.html',
  styleUrl: './create-novel.component.css'
})
export class CreateNovelComponent {
  novelForm: FormGroup;
  tagsList = [
    { value: 'fantasy', label: 'แฟนตาซี (Fantasy)' },
    { value: 'romance', label: 'โรแมนติก (Romance)' },
    { value: 'action', label: 'แอ็คชั่น (Action)' },
    { value: "adventure", label: 'ผจญภัย (Adventure)' },
    { value: "mystery", label: 'สืบสวนสอบสวน (Mystery)' },
    { value: "horror", label: 'สยองขวัญ (Horror)' },
    { value: "sci-fi", label: 'ไซไฟ (Sci-Fi)' },
    { value: "supernatural", label: 'เหนือธรรมชาติ (Supernatural)' },
    { value: "drama", label: 'ดราม่า (Drama)' },
    { value: "comedy", label: 'คอมเมดี้ (Comedy)' },
    { value: "historical", label: 'ประวัติศาสตร์ (Historical)' },
    { value: "time_travel", label: 'ย้อนเวลา (Time Travel)' },
    { value: "slice_of_life", label: 'ชีวิตประจำวัน (Slice of Life)' },
    { value: "yaoi", label: 'วาย (Yaoi/BL)' },
    { value: "yuri", label: 'ยูริ (Yuri/GL)' },
    { value: "system_game", label: 'ระบบ/เกม (System/Game)' },
    { value: "war", label: 'สงคราม (War)' },
    { value: "tragedy", label: 'โศกนาฏกรรม (Tragedy)' },
    { value: "isekai", label: 'เอเซไก (Isekai)' },
    { value: "political", label: 'การเมือง (Political)' },
    { value: "romantic_comedy", label: 'โรแมนติกคอมเมดี้ (Romantic Comedy)' },
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
