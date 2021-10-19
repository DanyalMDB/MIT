import { CreateNews, News } from './../interfaces/news.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StartService {

  constructor(private http: HttpClient) { }

  getNews(){
    return this.http.get("/api/news");
  }

  getNewsById(id: string){
    return this.http.get("/api/news/" + id);
  }

  createNews(news: CreateNews) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.http.post<News>("/api/news", news, httpOptions)
  }
}
