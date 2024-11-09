import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import Cropper from 'cropperjs';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrl: './uploadimage.component.css'
})
export class UploadimageComponent implements OnInit {


 selectedFile: File | null = null;
  croppedImage: string | null = null;
  cropper: any;
  isModalOpen = true;


  ngOnInit(): void {
    
  }

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

  handleFileSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          this.openCropTool(img.src); // ส่ง src ของรูปภาพไปยัง openCropTool
        };
      };
      reader.readAsDataURL(file);
    }
  }

  openCropTool(imageSrc: string): void {
    const cropModal = document.getElementById('cropModal') as HTMLElement;
    const imagePreview = document.getElementById('imagePreview') as HTMLImageElement;
    imagePreview.src = imageSrc;
    cropModal.style.display = 'block'; // แสดง modal

    // Initialize Cropper.js with the image
    this.cropper = new Cropper(imagePreview, {
      aspectRatio: 1,
      viewMode: 1,
      movable: true,
      zoomable: true,
      scalable: true,
      rotatable: false,
    });
  }

  cropImage(): void {
    if (!this.cropper) return;

    const croppedCanvas = this.cropper.getCroppedCanvas({
      width: 300,
      height: 300,
    });

    if (croppedCanvas) {
      croppedCanvas.toBlob((blob: Blob | null) => {
        if (blob) {
          const croppedImageContainer = document.getElementById('croppedImageContainer') as HTMLElement;
          const croppedImage = document.getElementById('croppedImage') as HTMLImageElement;

          this.croppedImage = URL.createObjectURL(blob); // กำหนด URL ของรูปที่ครอปแล้ว
          croppedImage.src = this.croppedImage;

          croppedImageContainer.style.display = 'block'; // แสดงรูปภาพที่ครอปแล้ว
          this.isModalOpen = false;
          this.closeModal(); // ปิด modal
        }
      }, 'image/jpeg');
    }
  }

  closeModal(): void {
    const cropModal = document.getElementById('cropModal') as HTMLElement;
    cropModal.style.display = 'none';
    if (this.cropper) {
      this.cropper.destroy();
      this.cropper = null;
    }
  }

  
  // uploadImage(): void {
  //   if (!this.croppedBlob) {
  //     alert('Please select an image and crop it before uploading.');
  //     return;
  //   }
  
  //   this.uploadService.uploadProfilePicture(this.croppedBlob).subscribe(
  //     () => alert('Profile picture uploaded successfully!'),
  //     (error) => {
  //       console.error('Error uploading profile picture:', error);
  //       alert('Failed to upload profile picture.');
  //     }
  //   );
  // }
}
