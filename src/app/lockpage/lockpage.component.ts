import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DialogService } from '../services/dialog.service';
import { PopupService } from '../services/popup.service';
@Component({
  selector: 'app-lockpage',
  templateUrl: './lockpage.component.html',
  styleUrl: './lockpage.component.css'
})
export class LockpageComponent implements OnInit {
  token: string | null = null;

  constructor(private authService:AuthService,private dialogService:DialogService,
    private popupService:PopupService,) { }

  ngOnInit(): void {
    // Check if a token exists
    this.token = this.authService.getToken(); // Assuming this method gets the token
    this.checkbox();
  }
  checkbox(): void {
    // Select the container element
    const container = document.getElementById("container");

    // If there's a token, hide the checkbox container
    if (this.token) {
      if (container) {
        container.style.display = 'none'; // Hide the container
      }
    } else {
      // If there's no token, add the click event to the container
      if (container) {
        container.addEventListener("click", () => {
          this.popupService.showPopup('กรุณาเข้าสู่ระบบ');
          this.dialogService.openLoginDialog();
        });
      }
    }

    // Select the checkbox input element
    const checkbox = document.getElementById("toggle") as HTMLInputElement;

    // Add event listener for checkbox change
    if (checkbox) {
      checkbox.addEventListener("change", () => {
        console.log(checkbox.checked ? "Locked" : "Unlocked");
      });
    }
  }
}
