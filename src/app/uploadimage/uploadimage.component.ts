import { Component, } from '@angular/core';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrl: './uploadimage.component.css'
})
export class UploadimageComponent {
  croppedImage: string | null = null;

  constructor(private uploadService: UploadService ) {}

  handleFileSelect(event: Event): void {
    this.uploadService.handleFileSelect(event, (imageSrc: string) => {
      this.uploadService.openCropTool(imageSrc, 'cropModal', 'imagePreview');
    });
  }

  async cropImage(): Promise<void> {
    const blob = await this.uploadService.cropImage();
    if (blob) {
      this.croppedImage = URL.createObjectURL(blob);
      const croppedImageContainer = document.getElementById('croppedImageContainer');
      if (croppedImageContainer) {
        croppedImageContainer.style.display = 'block';
      }
      this.uploadService.closeModal();
    }
  }

  closeModal(): void {
    this.uploadService.closeModal();
  }
}
