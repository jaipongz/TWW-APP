import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token; // Set isLoggedIn to true if token exists
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove token on logout
    this.isLoggedIn = false;
    this.router.navigate(['#']); // Redirect to login page
  }
}
