import { Component } from '@angular/core';


@Component({
  selector: 'app-create-novel',
  templateUrl: './create-novel.component.html',
  styleUrl: './create-novel.component.css'
})
export class CreateNovelComponent {

  selectedFile: File | null = null;

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

  croppedImage: string | null = null;

  handleFileSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          this.openCropTool(img);
        };
      };
      reader.readAsDataURL(file);
    }
  }

  openCropTool(image: HTMLImageElement): void {
    // Open a cropping tool here or use a cropping library like CropperJS
    // After cropping, set the cropped image data URL
    this.croppedImage = image.src; // Replace with cropped image's data URL
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
