import { ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrl: './uploadimage.component.css'
})
export class UploadimageComponent implements OnInit {


  constructor(private uploadService: UploadService,private cdr: ChangeDetectorRef ) {}

  ngOnInit(): void {

  }

  cropImage(): void {
    this.uploadService.cropImage();
    this.cdr.detectChanges();
  }

  closeModal(): void {
    this.uploadService.closeModal();
  }
}
