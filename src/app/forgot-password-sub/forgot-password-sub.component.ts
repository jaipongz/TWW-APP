import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-sub',
  templateUrl: './forgot-password-sub.component.html',
  styleUrl: './forgot-password-sub.component.css'
})
export class ForgotPasswordSubComponent {

  constructor (private router : Router, private http :HttpClient ) {}

  confirm() {

  }

}
