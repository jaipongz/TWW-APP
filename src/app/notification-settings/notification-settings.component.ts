import { Component } from '@angular/core';

interface NotificationSetting {
  label: string;
  active: boolean;
}

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrl: './notification-settings.component.css'
})
export class NotificationSettingsComponent {
  notificationSections = [
    {
      title: 'เปิดแจ้งเตือน',
      settings: [{ label: 'เปิดแจ้งเตือน', active: true }]
    },
    {
      title: 'สำหรับแจ้งเตือนผลสอบ',
      settings: [
        { label: 'แจ้งเตือนเมื่อมีการสอบใหม่', active: true },
        { label: 'แจ้งเตือนเมื่อมีคะแนนออกใหม่', active: true },
        { label: 'แจ้งเตือนโปรโมชั่นเรื่องที่ติดตาม', active: true }
      ]
    },
    {
      title: 'สำหรับนักเขียน',
      settings: [
        { label: 'แจ้งเตือนแฟนเพจ', active: true },
        { label: 'แจ้งเตือนแฟนเพจเรื่องอัพเดทใหม่', active: true },
        { label: 'แจ้งเตือนผู้ติดตามใหม่', active: true },
        { label: 'แจ้งเตือนผู้ถูกใจบทความ', active: true },
        { label: 'แจ้งเตือนความคิดเห็นและรีวิว', active: true },
        { label: 'แจ้งเตือนตอบกลับความคิดเห็นและรีวิว', active: false }
      ]
    },
    {
      title: 'อื่น ๆ',
      settings: [
        { label: 'แจ้งเตือนเมื่อโปรไฟล์มีการอัพเดท', active: true },
        { label: 'แจ้งเตือนข่าวสารใหม่', active: true }
      ]
    }
  ];

  toggleNotification(setting: NotificationSetting) {
    setting.active = !setting.active;
  }

  cancel() {
    // โค้ดสำหรับการยกเลิกการเปลี่ยนแปลง (ถ้าต้องการ)
  }

  save() {
    // โค้ดสำหรับการบันทึกการเปลี่ยนแปลง
  }
}
