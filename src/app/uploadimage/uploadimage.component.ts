import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import Cropper from 'cropperjs';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrl: './uploadimage.component.css'
})
export class UploadimageComponent implements OnInit {
  @ViewChild('cropModal') cropModal!: ElementRef;
  // @ViewChild('imagePreview') imagePreview!: ElementRef;  
  @ViewChild('imagePreview', { static: true }) imagePreview!: ElementRef;


  croppedBlob: Blob | null = null;
  cropper: Cropper | null = null;
  showModal = false;

  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {}

  createImageURL(blob: Blob): string {
    return URL.createObjectURL(blob);
  }

  

  ngAfterViewInit(): void {
    if (this.imagePreview) {
      this.imagePreview.nativeElement.src = ''; // หรือค่าเริ่มต้นอื่น ๆ ที่คุณต้องการ
      console.log('imagePreview:', this.imagePreview);
    } else {
      console.error("imagePreview is undefined");
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (this.cropper) {
        this.cropper.destroy(); // ทำลาย Cropper ก่อน
        this.cropper = null;
      }
  
      const reader = new FileReader();
      reader.onload = () => {
        this.showModal = true; // แสดง modal
        this.imagePreview.nativeElement.src = reader.result as string;
  
        // ตรวจสอบว่า imagePreview มีค่า ก่อนสร้าง Cropper ใหม่
        if (this.imagePreview?.nativeElement) {
          this.cropper = new Cropper(this.imagePreview.nativeElement, {
            aspectRatio: 1,
            viewMode: 1,
            movable: true,
            zoomable: true,
            scalable: true,
            rotatable: false,
            minContainerWidth: 300, // กำหนดขนาดขั้นต่ำของ container
            minContainerHeight: 300,
            crop: (event) => {
              console.log(event.detail);
            }
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  

  cropImage(): void {
    if (!this.cropper) return;
  
    // สร้าง canvas สำหรับภาพที่ถูก crop
    const croppedCanvas = this.cropper.getCroppedCanvas({
      width: 300,
      height: 300
    });
    
    if (!croppedCanvas) {
      console.error("Cropped canvas could not be created.");
      return;
    } else {
      console.log("Cropped canvas created successfully.");
    }
  
    // แปลง croppedCanvas ให้เป็น Blob
    croppedCanvas.toBlob((blob) => {
      if (blob) {
        console.log("Blob created successfully.");
        this.croppedBlob = blob;
      } else {
        console.error("Failed to create Blob from cropped canvas.");
      }
      // ปิด modal และล้าง Cropper หลังการ crop
      this.showModal = false;
      this.cropper?.destroy();
      this.cropper = null;
    }, 'image/jpeg');
  }
  
 
  closeModal(): void {
    this.showModal = false;
    if (this.cropper) {
      this.cropper.destroy();
      this.cropper = null;
    }
    if (this.imagePreview?.nativeElement) {
      this.imagePreview.nativeElement.src = ''; // รีเซ็ต src ของ imagePreview
    }
  }
  
  uploadImage(): void {
    if (!this.croppedBlob) {
      alert('Please select an image and crop it before uploading.');
      return;
    }
  
    this.uploadService.uploadProfilePicture(this.croppedBlob).subscribe(
      () => alert('Profile picture uploaded successfully!'),
      (error) => {
        console.error('Error uploading profile picture:', error);
        alert('Failed to upload profile picture.');
      }
    );
  }
}
