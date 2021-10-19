import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: ProfileService, private router: Router) { }

  title = "Profile"
  successMsg = ""
  token = ""
  user = { name: "", email: "", isAdmin: false }
  userRole = ""
  isAdmin = false

  ngOnInit(): void {
    this.getUserProfile()
  }

  getUserProfile(): void {
    if(localStorage.getItem('access_token') !== null) {
      this.service.getUserProfile(localStorage.getItem('access_token')).subscribe({
        next: data => {
          this.userRole = (data['result']['isAdmin']) ? "Admin" : "Normal User"
          this.isAdmin = (data['result']['isAdmin']) ? true : false
          this.user = data['result']
        },
        error: error => {
          if(error['statusText'] == "Not Found") {
            this.successMsg = "No Record Exist"
          } else {
            this.successMsg = "No Record Found"
          }
        }
      });
    } else {
      this.router.navigate(['/login'], { state: { message: 'Please Login' } });
    }
  }

  logout(): void {
    this.service.logoutUser().subscribe({
      next: data => {
        localStorage.removeItem('access_token');
        this.router.navigate(['/login'], { state: { message: data['message'] } });
      },
      error: error => {
        if(error['statusText'] == "Not Found") {
          this.successMsg = "Cannot Logout"
        } else {
          this.successMsg = "Cannot Logout"
        }
      }
    });
  }

  redirectTo(url: string): void {
    console.log()
    this.router.navigate(['/' + url]);
  }
}
