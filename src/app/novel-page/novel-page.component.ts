import { Component } from '@angular/core';

@Component({
  selector: 'app-novel-page',
  templateUrl: './novel-page.component.html',
  styleUrl: './novel-page.component.css'
})
export class NovelPageComponent {
  comments = [
    { id: 1, title: 'ความคิดเห็นที่ 1', text: 'ข้อความความคิดเห็น...', avatarUrl: 'https://storage.googleapis.com/a1aa/image/eviqgTW7dbxFS6D9fJVAeOfmO9SexfX1S7OfGYTGyemuvUlrTA.jpg' },
    { id: 2, title: 'ความคิดเห็นที่ 2', text: 'ข้อความความคิดเห็น...', avatarUrl: 'https://storage.googleapis.com/a1aa/image/eviqgTW7dbxFS6D9fJVAeOfmO9SexfX1S7OfGYTGyemuvUlrTA.jpg' },
    { id: 3, title: 'ความคิดเห็นที่ 3', text: 'ข้อความความคิดเห็น...', avatarUrl: 'https://storage.googleapis.com/a1aa/image/eviqgTW7dbxFS6D9fJVAeOfmO9SexfX1S7OfGYTGyemuvUlrTA.jpg' },
    { id: 4, title: 'ความคิดเห็นที่ 4', text: 'ข้อความความคิดเห็น...', avatarUrl: 'https://storage.googleapis.com/a1aa/image/eviqgTW7dbxFS6D9fJVAeOfmO9SexfX1S7OfGYTGyemuvUlrTA.jpg' },
    { id: 5, title: 'ความคิดเห็นที่ 5', text: 'ข้อความความคิดเห็น...', avatarUrl: 'https://storage.googleapis.com/a1aa/image/eviqgTW7dbxFS6D9fJVAeOfmO9SexfX1S7OfGYTGyemuvUlrTA.jpg' }
  ];

  reply(commentId: number) {
    console.log(`Replying to comment with ID: ${commentId}`);
  }
}
