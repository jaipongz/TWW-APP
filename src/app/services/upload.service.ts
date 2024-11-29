import { Injectable } from '@angular/core';
import Cropper from 'cropperjs';
import { PopupService } from './popup.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private cropper: Cropper | null = null;
  private cropModal: HTMLElement | null = null;
  public  imagePreview: HTMLImageElement | null = null;
  public  croppedImageBlob: Blob | null = null;
  public  croppedImage: string | null = null;
  

  constructor(private popupService: PopupService) {}

  handleFileSelect(event: Event, openCropToolCallback: (imageSrc: string) => void): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.popupService.showPopup("กรุณาอัปโหลดไฟล์ภาพเท่านั้น");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // ตรวจสอบขนาดไฟล์
      this.popupService.showPopup("ไฟล์ภาพต้องมีขนาดไม่เกิน 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        openCropToolCallback(img.src); // เปิดเครื่องมือการครอป
      };
    };
    reader.readAsDataURL(file);
  }

  openCropTool(imageSrc: string, cropModalId: string, imagePreviewId: string): void {
    this.cropModal = document.getElementById(cropModalId);
    this.imagePreview = document.getElementById(imagePreviewId) as HTMLImageElement;
    if (this.imagePreview && this.cropModal) {
      this.imagePreview.src = imageSrc;
      this.cropModal.style.display = 'block'; // แสดง Modal
      this.cropper = new Cropper(this.imagePreview, {
        aspectRatio: 1, // อัตราส่วน 1:1
        viewMode: 2,
        movable: false,
        zoomable: false,
        scalable: false,
        rotatable: false,
      });
    }
  }

  async cropImage(): Promise<void> {
    if (!this.cropper) {
      console.error('Cropper instance not initialized.');
      return;
    }

    const croppedCanvas = this.cropper.getCroppedCanvas({
      width: 300,
      height: 300,
    });

    croppedCanvas.toBlob((blob: Blob | null) => {
      if (blob) {
        this.croppedImage =  URL.createObjectURL(blob);
        const croppedImageContainer = document.getElementById('croppedImageContainer');
        if (croppedImageContainer) {
          croppedImageContainer.style.display = 'block';
        }
        this.croppedImageBlob = blob;
        console.log('cropurl:',this.croppedImage);
        console.log('croblob:',this.croppedImageBlob);
        this.closeModal();
      }
    }, 'image/jpeg');
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
