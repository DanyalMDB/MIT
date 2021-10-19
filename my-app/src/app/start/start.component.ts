import { Component, OnInit } from '@angular/core';
import { StartService } from './start.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private service: StartService) { }

  article;
  articles = [];
  title = "News"
  successMsg = ""
  isArticle = false;
  isArticles = true;

  ngOnInit(): void {
    this.getAll()
  }

  getAll(): void {
    this.service.getNews().subscribe({
      next: data => {
        this.articles = data['result'];
        this.isArticle = false;
        this.isArticles = true;
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
    this.service.getNewsById(id).subscribe({
      next: data => {
        this.article = data['result'];
        this.isArticle = true;
        this.isArticles = false;
      },
      error: error => {
        if(error['statusText'] == "Not Found") {
          this.successMsg = "No Detail Exist"
        } else {
          this.successMsg = "No Detail Found"
        }
      }
    });
  }
}
