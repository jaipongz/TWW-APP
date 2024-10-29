import { Component, OnInit } from '@angular/core';
import { NovelService } from '../services/novel.service';

@Component({
  selector: 'app-novel-detail',
  templateUrl: './novel-detail.component.html',
  styleUrl: './novel-detail.component.css'
})
export class NovelDetailComponent implements OnInit {
  novel: any;
  chapters: any[] = [];
  errorMessage: string = '';

  constructor(private novelService: NovelService) {}

  ngOnInit(): void {
    const novelId = 15; // ปรับค่าให้เหมาะสมหรือนำมาจาก URL
    const start = 0;
    const limit = 15;

    this.novelService.getNovelDetail(novelId, start, limit).subscribe({
      next: (result) => {
        if (result.status === 'success') {
          this.novel = result.data;
          this.chapters = result.data.chapters;
        } else {
          this.errorMessage = result.message;
        }
      },
      error: (error) => {
        console.error('Error fetching novel details:', error);
        this.errorMessage = 'Error fetching novel details';
      }
    });
  }

  parseTags(tagsString: string): string[] {
    try {
      const tagsObj = JSON.parse(tagsString);
      return Object.values(tagsObj);
    } catch (error) {
      console.error('Error parsing tags:', error);
      return [];
    }
  }
}
