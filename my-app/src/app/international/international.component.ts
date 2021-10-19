import { Component, OnInit } from '@angular/core';
import { InternationalService } from './international.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-international',
  templateUrl: './international.component.html',
  styleUrls: ['./international.component.css']
})
export class InternationalComponent implements OnInit {

  constructor(private service: InternationalService, private router: Router) { }

  international;
  internationals = [];
  title = "International"
  successMsg = ""
  isInternational = false;
  isInternationals = true;

  ngOnInit(): void {
    this.getAll()
  }

  getAll(): void {
    this.service.getInternational().subscribe({
      next: data => {
        this.internationals = data['result'];
        this.isInternational = false;
        this.isInternationals = true;
      },
      error: error => {
        if(error['statusText'] == "Not Found") {
          this.successMsg = "No Record Exist"
        } else {
          this.successMsg = "No Record Found"
        }
      }
    });
  }

  gotoDetail(id: string): void {
    this.service.getInternationalById(id).subscribe({
      next: data => {
        this.international = data['result'];
        this.isInternational = true;
        this.isInternationals = false;
        this.title = "Detail"
      },
      error: error => {
        console.log(error)
        if(error['statusText'] == "Not Found") {
          this.successMsg = "No Detail Exist"
        } else {
          this.successMsg = "No Detail Found"
        }
      }
    });
  }

  redirectTo(url: string): void {
    console.log()
    this.router.navigate(['/' + url]);
  }
}
