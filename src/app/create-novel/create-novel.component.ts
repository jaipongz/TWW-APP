import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Cropper from 'cropperjs';

interface Novel {
  novelName: string;
  penName: string;
  group: string;
  type: string;
  mainGroups: string;
  selectedSubCategory1: string;
  selectedSubCategory2: string;
  tag: string;
  rate: string;
  desc: string;
  novel_propic: File | null;
  userId: string;
}

interface DropdownItem {
  group: string;
  label: string;
  desc: string;
}

@Component({
  selector: 'app-create-novel',
  templateUrl: './create-novel.component.html',
  styleUrls: ['./create-novel.component.css']
})

export class CreateNovelComponent implements OnInit {
  novel_propic: File | null = null;
  croppedImage: string | null = null;
  croppedImageBlob: Blob | null = null;
  cropper: any;
  isModalOpen = false;
  imageUrl: string = '';
  newTag: string = '';
  tags: string[] = [];
  
  groupedData: { [key: string]: DropdownItem[] } = {};
  selectedItem: string = '';
  selectedSubCategory1: string = '';
  selectedSubCategory2: string = '';
  selectedLabels: string[] = [];
  subGroups: any[] = [];
  

  tageRec = [
    { tag: 'rec1' },
    { tag: 'rec2' },
    { tag: 'rec3' },
    { tag: 'rec4' },
    { tag: 'rec5' },
    { tag: 'rec6' },
    { tag: 'rec7' },
    { tag: 'rec8' },
  ];

  novel: Novel = {
    novelName: '',
    penName: 'test',
    group: 'fanfig',
    type: 'describe',
    mainGroups: '',
    selectedSubCategory1: '',
    selectedSubCategory2: '',
    tag: '',
    rate: '18+',
    desc: '',
    novel_propic: null,
    userId: 'bonza1230',
  };


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getSubGroups();
    this.fetchData();

  }



  onSelectItem(event: Event): void {
    this.novel.mainGroups = (event.target as HTMLSelectElement).value;
  }
  


  filteredSubGroups(category: string) {
    // กรองตัวเลือกที่ต้องซ่อนในแต่ละ dropdown
    return this.subGroups.filter(subGroup => {
        if (category === 'sub-category1') {
            return subGroup.label !== this.selectedSubCategory2;
        } else if (category === 'sub-category2') {
            return subGroup.label !== this.selectedSubCategory1;
        }
        return true;
    });
}

// updateNovelSubGroups() {
//   this.novel.subGroups = [this.selectedSubCategory1, this.selectedSubCategory2].filter(val => val);
// }
 
  // onSelectionChange(): void {

  //   this.selectedLabels = [this.selectedSubCategory1, this.selectedSubCategory2].filter(val => val);
  //   console.log('Selected Labels:', this.selectedLabels);
  // }


  // Update tags dynamically and store in the novel object
  updateNovelTags(): void {
    this.novel.tag = this.tags.join(', ');
  }

  // Hovering over a category to show a description
  hoveredGroup: { label: string; desc: string } | null = null;

  onHover(group: { label: string; desc: string }) {
    this.hoveredGroup = group;
    console.log('Hovering over:', group);
  }

  onLeave() {
    this.hoveredGroup = null;
    console.log('Mouse left');
  }

  // Handle recommended tags click event
  addTagRec(tagName: string) {
    console.log(`Tag added: ${tagName}`);
    this.tags.push(tagName);

    // Remove from recommendations
    const index = this.tageRec.findIndex(tag => tag.tag === tagName);
    if (index !== -1) {
      this.tageRec.splice(index, 1);
    }

    this.updateNovelTags();  // Update novel.tag
  }

  // Add a custom tag via input
  addTag() {
    if (this.newTag && this.tags.length < 18) {
      this.tags.push(this.newTag);
      this.newTag = '';
      this.updateNovelTags();  // Update novel.tag
    }
  }

  // Fetch main groups
  fetchData(): void {
    this.http.get<{ status: string; data: DropdownItem[] }>('http://localhost:3090/mainGroup')
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.groupedData = response.data.reduce((acc: { [key: string]: DropdownItem[] }, item: DropdownItem) => {
              if (!acc[item.group]) {
                acc[item.group] = [];
              }
              acc[item.group].push(item);
              return acc;
            }, {});
          }
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
  }

  // Get the subgroups for categories
  getSubGroups(): void {
    this.http.get<any>('http://localhost:3090/subGroup', {
      headers: {
        'accept': 'application/json'
      }
    }).subscribe(
      (response) => {
        this.subGroups = response.data;
        console.log('Fetched subGroups:', this.subGroups);
      },
      (error) => {
        console.error('Error fetching subGroups:', error);
      }
    );
  }

  // Handle file selection and trigger the cropper tool
  handleFileSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          this.openCropTool(img.src);
        };
      };
      reader.readAsDataURL(file);
    }
  }

  // Initialize the cropping tool with Cropper.js
  openCropTool(imageSrc: string): void {
    const cropModal = document.getElementById('cropModal') as HTMLElement;
    const imagePreview = document.getElementById('imagePreview') as HTMLImageElement;
    imagePreview.src = imageSrc;
    cropModal.style.display = 'block';
    this.cropper = new Cropper(imagePreview, {
      aspectRatio: 1,
      viewMode: 2,
      movable: false,
      zoomable: false,
      scalable: false,
      rotatable: false,
    });
  }

  // Crop the image and store the blob
  cropImage(): void {
    if (!this.cropper) return;
    const croppedCanvas = this.cropper.getCroppedCanvas({
      width: 300,
      height: 300,
    });
    if (croppedCanvas) {
      croppedCanvas.toBlob((blob: Blob | null) => {
        if (blob) {
          this.croppedImageBlob = blob;
          this.croppedImage = URL.createObjectURL(blob);
          const croppedImageContainer = document.getElementById('croppedImageContainer') as HTMLElement;
          const croppedImage = document.getElementById('croppedImage') as HTMLImageElement;
          croppedImage.src = this.croppedImage;
          croppedImageContainer.style.display = 'block';
          this.isModalOpen = false;
          this.closeModal();
        }
      }, 'image/jpeg');
    }
  }

  // Close the modal and reset the cropper
  closeModal(): void {
    const cropModal = document.getElementById('cropModal') as HTMLElement;
    cropModal.style.display = 'none';
    if (this.cropper) {
      this.cropper.destroy();
      this.cropper = null;
    }
  }

  // Submit the profile picture
  submitProfilePic(): void {
    if (!this.croppedImageBlob) {
      console.error("กรุณาเลือกรูปภาพก่อน");
      return;
    }
    const formData = new FormData();
    formData.append('userId', 'bonza1230');
    formData.append("profile_pic", this.croppedImageBlob, " .jpg");
    const headers = new HttpHeaders({
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTczMDYyMTY4OSwiZXhwIjoxNzMzMjEzNjg5fQ.3cWhDqm_371U6wJwUFWH8of0JJ6Mjox74NnMiNSqgTg',
    });
    this.http.post('http://localhost:3090/api/user/updateProfilePic', formData, { headers })
      .subscribe(
        (response) => console.log('อัปเดตรูปโปรไฟล์สำเร็จ:', response),
        (error) => console.error('เกิดข้อผิดพลาดในการอัปเดตรูปโปรไฟล์:', error)
      );
  }




  // Submit the novel form
  submit(): void {
    console.log('Form Submitted', this.novel);
    if (!this.croppedImageBlob) {
      console.error("กรุณาเลือกรูปภาพก่อน");
      return;
    }

    const formData = new FormData();

    // เพิ่มข้อมูล text fields ลงใน FormData
    formData.append('novelName', this.novel.novelName);
    formData.append('penName', this.novel.penName);
    formData.append('group', this.novel.group);
    formData.append('type', this.novel.type);
    formData.append('mainGroup', this.novel.mainGroups);
    formData.append('subGroup1', this.novel.selectedSubCategory1);
    formData.append('subGroup2', this.novel.selectedSubCategory2);
    formData.append('tag', this.novel.tag);
    formData.append('rate', this.novel.rate);
    formData.append('desc', this.novel.desc);
    formData.append('userId', this.novel.userId);

    // เพิ่ม `subGroups` เป็น JSON string ใน FormData
    // formData.append('subGroups', JSON.stringify(this.novel.subGroups));

    formData.append('novel_propic', this.croppedImageBlob, "novelpropic.jpg");

    console.log(formData);
    fetch('http://localhost:3090/api/novel/storeNovel', {
      method: 'POST',
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTczMDYyMTY4OSwiZXhwIjoxNzMzMjEzNjg5fQ.3cWhDqm_371U6wJwUFWH8of0JJ6Mjox74NnMiNSqgTg", // Replace with actual token if required
      },
      body: formData,
    })
    
      .then((response) => response.json())
      
      .then((data: any) => console.log('Success:', data))
      .catch((error) => console.error('Error:', error));
  }

  // Adjust the textarea height as the user types
  adjustHeight(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.style.height = 'auto';
    input.style.height = `${input.scrollHeight}px`;
  }

  goBack() {

  }
}
