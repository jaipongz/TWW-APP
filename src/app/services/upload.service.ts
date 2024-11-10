import { Injectable } from '@angular/core';
import Cropper from 'cropperjs';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private cropper: Cropper | null = null;
  private cropModal: HTMLElement | null = null;
  private imagePreview: HTMLImageElement | null = null;

  constructor() {}

  handleFileSelect(event: Event, openCropToolCallback: (imageSrc: string) => void): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          openCropToolCallback(img.src);
        };
      };
      reader.readAsDataURL(file);
    }
  }

  openCropTool(imageSrc: string, cropModalId: string, imagePreviewId: string): void {
    this.cropModal = document.getElementById(cropModalId);
    this.imagePreview = document.getElementById(imagePreviewId) as HTMLImageElement;
    if (this.imagePreview && this.cropModal) {
      this.imagePreview.src = imageSrc;
      this.cropModal.style.display = 'block';
      this.cropper = new Cropper(this.imagePreview, {
        aspectRatio: 1,
        viewMode: 2,
        movable: false,
        zoomable: false,
        scalable: false,
        rotatable: false,
      });
    }
  }

  cropImage(): Promise<Blob | null> {
    return new Promise((resolve) => {
      if (this.cropper) {
        const croppedCanvas = this.cropper.getCroppedCanvas({
          width: 300,
          height: 300,
        });
        croppedCanvas.toBlob((blob: Blob | null) => {
          resolve(blob);
        }, 'image/jpeg');
      } else {
        resolve(null);
      }
    });
  }

  closeModal(): void {
    if (this.cropModal) {
      this.cropModal.style.display = 'none';
    }
    if (this.cropper) {
      this.cropper.destroy();
      this.cropper = null;
    }
  }
}
