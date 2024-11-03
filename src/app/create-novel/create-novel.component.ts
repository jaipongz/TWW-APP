import { Component } from '@angular/core';


@Component({
  selector: 'app-create-novel',
  templateUrl: './create-novel.component.html',
  styleUrl: './create-novel.component.css'
})
export class CreateNovelComponent {
  novel = {
    title: '',
    subtitle: '',
    mainCategory: '',
    subCategory1: '',
    subCategory2: '',
    rating: ''
  };
  imageUrl: string = '';
  tags: string[] = [];
  newTag: string = '';

  uploadImage() {
    // Image upload logic
  }
  addTag() {
    if (this.newTag && this.tags.length < 5) {
      this.tags.push(this.newTag);
      this.newTag = '';
    }
  }

  goBack() {
    // Logic for navigating back
  }

  submit() {
    console.log('Form Submitted', this.novel, this.tags);
    // Form submission logic
  }


  adjustHeight(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.style.height = 'auto'; // Reset height to calculate scrollHeight accurately
    input.style.height = `${input.scrollHeight}px`;
  }
}
