import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-novel',
  templateUrl: './edit-novel.component.html',
  styleUrl: './edit-novel.component.css'
})
export class EditNovelComponent implements OnInit {
  editNovelForm: FormGroup;
  tags = [
    { label: 'แฟนตาซี (Fantasy)', value: 'fantasy' },
    { label: 'โรแมนติก (Romance)', value: 'romance' },
    // เพิ่ม tags ที่จำเป็น
  ];
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.editNovelForm = this.fb.group({
      novelName: ['', Validators.required],
      penName: ['', Validators.required],
      group: ['', Validators.required],
      type: ['', Validators.required],
      tags: this.fb.array([]),
      rate: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      desc: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadNovelData();
  }

  loadNovelData(): void {
    const novelId = 1; // Replace with dynamic ID if needed
    this.http.get(`http://localhost:3090/api/novel/updateNovel/${novelId}`).subscribe((response: any) => {
      if (response.status === 'success') {
        const novelData = response.data;
        this.editNovelForm.patchValue({
          novelName: novelData.novelName,
          penName: novelData.penName,
          group: novelData.group,
          type: novelData.type,
          rate: novelData.rate,
          desc: novelData.desc,
          userId: novelData.userId
        });
        // Set selected tags
        const tagsFormArray = this.editNovelForm.get('tags') as FormArray;
        JSON.parse(novelData.tag).forEach((tag: string) => {
          tagsFormArray.push(this.fb.control(tag));
        });
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    Object.keys(this.editNovelForm.controls).forEach(key => {
      if (key !== 'tags') {
        formData.append(key, this.editNovelForm.get(key)?.value);
      }
    });
    formData.append('tag', JSON.stringify(this.editNovelForm.get('tags')?.value));
    if (this.selectedFile) {
      formData.append('novel_propic', this.selectedFile);
    }

    this.http.put('http://localhost:3090/novel/1', formData).subscribe(
      response => alert('Novel updated successfully!'),
      error => console.error('Error updating novel:', error)
    );
  }
}
