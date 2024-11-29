import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class customConfirm {

    customConfirm(message: string): Promise<boolean> {
        return new Promise((resolve) => {
          // Create backdrop
          const backdrop = document.createElement('div');
          backdrop.className = 'custom-confirm-backdrop';
      
          // Create modal box
          const modalBox = document.createElement('div');
          modalBox.className = 'custom-confirm-box';
      
          // Add message
          const msg = document.createElement('p');
          msg.textContent = message;
          modalBox.appendChild(msg);
      
          // Create buttons
          const buttonsDiv = document.createElement('div');
          buttonsDiv.className = 'custom-confirm-buttons';
      
          const yesButton = document.createElement('button');
          yesButton.className = 'btn-yes';
          yesButton.textContent = 'Yes';
          yesButton.onclick = () => {
            document.body.removeChild(backdrop);
            resolve(true);
          };
      
          const noButton = document.createElement('button');
          noButton.className = 'btn-no';
          noButton.textContent = 'No';
          noButton.onclick = () => {
            document.body.removeChild(backdrop);
            resolve(false);
          };
      
          buttonsDiv.appendChild(yesButton);
          buttonsDiv.appendChild(noButton);
          modalBox.appendChild(buttonsDiv);
      
          // Append modal to backdrop
          backdrop.appendChild(modalBox);
      
          // Add to body
          document.body.appendChild(backdrop);
        });
      }
      
      async showConfirm(): Promise<void> {
        const result = await this.customConfirm('Are you sure you want to proceed?');
        if (result) {
          alert('You clicked Yes!');
        } else {
          alert('You clicked No!');
        }
      }
      
  }