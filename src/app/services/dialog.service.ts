import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private loginDialogRef: MatDialogRef<LoginComponent> | null = null;
  private registerDialogRef: MatDialogRef<RegisterComponent> | null = null;
  private forgotPasswordDialogRef: MatDialogRef<ForgotPasswordComponent> | null = null;

  constructor(private dialog: MatDialog) { }

  // เปิด Login Dialog
  openLoginDialog(): void {
    if (this.loginDialogRef) {
      this.loginDialogRef.close(); // ปิด dialog ก่อนหน้า
    }

    this.loginDialogRef = this.dialog.open(LoginComponent, {
      disableClose: true
    });

    this.loginDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loginDialogRef = null; // รีเซ็ต dialogRef หลังปิด Dialog
    });
  }

  // เปิด Register Dialog
  openRegisterDialog(): void {
    if (this.registerDialogRef) {
      this.registerDialogRef.close(); // ปิด dialog ก่อนหน้า
    }

    this.registerDialogRef = this.dialog.open(RegisterComponent, {
      disableClose: true
    });

    this.registerDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.registerDialogRef = null; // รีเซ็ต dialogRef หลังปิด Dialog
    });
  }

  // เปิด Forgotpassword Dialog
  openForgotpassDialog(): void {
    this.forgotPasswordDialogRef = this.dialog.open(ForgotPasswordComponent, {
      disableClose: true
    });

    this.forgotPasswordDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.forgotPasswordDialogRef = null; // รีเซ็ต dialogRef หลังปิด Dialog
    });
  }
  // ปิด Dialog ปัจจุบัน
  closeDialog(dialogType: 'login' | 'register' | 'forgotPassword'): void {
    switch (dialogType) {
      case 'login':
        if (this.loginDialogRef) {
          this.loginDialogRef.close();
          this.loginDialogRef = null;
        }
        break;
  
      case 'register':
        if (this.registerDialogRef) {
          this.registerDialogRef.close();
          this.registerDialogRef = null;
        }
        break;
  
      case 'forgotPassword':
        if (this.forgotPasswordDialogRef) {
          this.forgotPasswordDialogRef.close();
          this.forgotPasswordDialogRef = null;
        }
        break;
  
      default:
        console.warn('Unknown dialog type:', dialogType);
        break;
    }
  }
}
